// ========== 留言板功能 ==========

// Supabase 配置
const SUPABASE_URL = 'https://hdqziwoqvzlezeyfwffm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcXppd29xdnpsZXpleWZ3ZmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDA3OTAsImV4cCI6MjA4MjY3Njc5MH0.J8jnzsJjU4XE-ja-dkVbABXXJeqh-xoR_diZzXKUWw0';

// 初始化 Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========== 留言板輪播設定 ==========
let allMessages = [];           // 儲存全部留言
let currentPage = 0;            // 當前頁數（從 0 開始）
let messagesPerPage = 10;       // 每頁顯示幾則留言
let rotationInterval = null;    // 輪播計時器
let rotationPaused = false;     // 是否暫停輪播

// DOM 元素
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages-list');
const charCount = document.querySelector('.char-count');
const submitBtn = document.querySelector('.submit-btn');

// 字數計數
if (messageInput) {
    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length} / 200`;
        
        if (length >= 180) {
            charCount.style.color = '#d4a574';
        } else {
            charCount.style.color = '#999';
        }
    });
}

// 表單送出
if (messageForm) {
    messageForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const content = messageInput.value.trim();
        const author = document.getElementById('author-input').value.trim() || '訪客';
        const avatarInput = document.querySelector('input[name="avatar"]:checked');
        const avatar = avatarInput ? avatarInput.value : '😊';

        if (!content || content.length > 200) {
            showNotification('請輸入 1-200 字的留言', 'error');
            return;
        }

        if (author.length > 30) {
            showNotification('暱稱最多 30 字', 'error');
            return;
        }

        if (!validateContent(content)) {
            showNotification('留言內容不符合規定', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';

        try {
            const { data, error } = await supabaseClient
                .from('messages')
                .insert([{
                    content: content,
                    author: author,
                    avatar: avatar
                }])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            showNotification('留言成功！', 'success');
            messageInput.value = '';
            document.getElementById('author-input').value = '';
            // 重置頭像選擇為第一個選項
            document.querySelector('input[name="avatar"][value="😊"]').checked = true;
            charCount.textContent = '0 / 200';
            charCount.style.color = '#999';

            await loadMessages();
        } catch (error) {
            console.error('留言失敗:', error);
            showNotification('留言失敗，請稍後再試', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';
        }
    });
}

// ========== 載入留言（改為分頁模式）==========
async function loadMessages() {
    try {
        const { data, error } = await supabaseClient
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);  // 最多載入 50 則

        if (error) throw error;

        // 儲存全部留言
        allMessages = data || [];

        // 重置到第一頁
        currentPage = 0;

        // 在 Console 顯示資訊
        console.log('========== 留言板資訊 ==========');
        console.log('留言總數:', allMessages.length);
        console.log('每頁顯示:', messagesPerPage, '則');
        console.log('總頁數:', Math.ceil(allMessages.length / messagesPerPage));
        console.log('==============================');

        // 顯示第一頁
        displayCurrentPage();

        // 如果留言超過一頁，啟動自動輪播
        if (allMessages.length > messagesPerPage) {
            startRotation();
        } else {
            stopRotation();
        }

    } catch (error) {
        console.error('載入留言失敗:', error);
        if (messagesList) {
            messagesList.innerHTML = '<div class="loading-spinner">載入失敗</div>';
        }
    }
}

// ========== 顯示當前頁的留言 ==========
function displayCurrentPage() {
    if (!messagesList) return;

    // 如果沒有留言
    if (allMessages.length === 0) {
        messagesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💌</div>
                <p>還沒有留言，成為第一個留言的人吧！</p>
            </div>
        `;
        updateNavigationButtons();
        return;
    }

    // 計算當前頁的留言範圍
    const start = currentPage * messagesPerPage;
    const end = start + messagesPerPage;
    const pageMessages = allMessages.slice(start, end);

    // 淡出效果
    messagesList.style.opacity = '0';

    setTimeout(() => {
        // 顯示留言
        messagesList.innerHTML = pageMessages.map(msg => `
            <div class="message-card">
                <div class="message-header">
                    <div class="message-avatar">${escapeHtml(msg.avatar || '😊')}</div>
                    <div class="message-info">
                        <span class="message-author">${escapeHtml(msg.author || '訪客')}</span>
                        <span class="message-time">🕐 ${formatTime(msg.created_at)}</span>
                    </div>
                </div>
                <div class="message-content">${escapeHtml(msg.content)}</div>
            </div>
        `).join('');

        // 淡入效果
        messagesList.style.opacity = '1';

        // 更新導航按鈕和頁碼
        updateNavigationButtons();

    }, 300);  // 等待淡出完成
}

// 格式化時間
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return '剛剛';
    if (diff < 3600) return `${Math.floor(diff / 60)} 分鐘前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小時前`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} 天前`;
    
    return `${date.getMonth() + 1}/${date.getDate()}`;
}

// HTML 轉義
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 內容驗證
function validateContent(content) {
    if (content.length < 1 || content.length > 200) return false;
    if (/^(.)\1{9,}$/.test(content)) return false;
    return true;
}

// 通知
function showNotification(message, type = 'info') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            text: message,
            icon: type === 'error' ? 'error' : 'success',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    } else {
        alert(message);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadMessages();
    setInterval(loadMessages, 30000);
});
// ========== 自動輪播控制 ==========

/**
 * 啟動自動輪播
 */
function startRotation() {
    // 清除舊的計時器
    stopRotation();
    
    // 每 5 秒切換一次
    rotationInterval = setInterval(() => {
        if (!rotationPaused) {
            nextPage();
        }
    }, 5000);
    
    console.log("✅ 留言板自動輪播已啟動（每 5 秒）");
    
    // 更新自動播放指示器
    updateAutoPlayIndicator(true);
}

/**
 * 停止自動輪播
 */
function stopRotation() {
    if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
        console.log("⏸️ 留言板自動輪播已停止");
    }
    
    updateAutoPlayIndicator(false);
}

/**
 * 暫停/恢復輪播
 */
function toggleRotation() {
    rotationPaused = !rotationPaused;
    
    if (rotationPaused) {
        console.log("⏸️ 輪播已暫停");
    } else {
        console.log("▶️ 輪播已恢復");
    }
    
    updateAutoPlayIndicator(!rotationPaused);
}

/**
 * 下一頁
 */
function nextPage() {
    const totalPages = Math.ceil(allMessages.length / messagesPerPage);
    
    if (totalPages <= 1) return;  // 只有一頁，不切換
    
    currentPage = (currentPage + 1) % totalPages;
    displayCurrentPage();
    
    console.log(`📄 切換到第 ${currentPage + 1} 頁`);
}

/**
 * 上一頁
 */
function prevPage() {
    const totalPages = Math.ceil(allMessages.length / messagesPerPage);
    
    if (totalPages <= 1) return;
    
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    displayCurrentPage();
    
    console.log(`📄 切換到第 ${currentPage + 1} 頁`);
}

/**
 * 跳到指定頁
 */
function goToPage(pageNum) {
    const totalPages = Math.ceil(allMessages.length / messagesPerPage);
    
    if (pageNum < 0 || pageNum >= totalPages) return;
    
    currentPage = pageNum;
    displayCurrentPage();
}

/**
 * 更新導航按鈕狀態
 */
function updateNavigationButtons() {
    const totalPages = Math.ceil(allMessages.length / messagesPerPage);
    
    // 更新頁碼指示器
    const pageIndicator = document.querySelector(".page-indicator");
    if (pageIndicator) {
        pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
    }
    
    // 更新按鈕狀態（如果只有一頁，可以禁用按鈕）
    const prevBtn = document.querySelector(".messages-nav-btn.prev");
    const nextBtn = document.querySelector(".messages-nav-btn.next");
    
    if (prevBtn && nextBtn) {
        if (totalPages <= 1) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }
    }
}

/**
 * 更新自動播放指示器
 */
function updateAutoPlayIndicator(isPlaying) {
    const indicator = document.querySelector(".auto-play-indicator");
    if (!indicator) return;
    
    if (isPlaying) {
        indicator.textContent = "▶️ 自動播放中";
        indicator.classList.add("active");
    } else {
        indicator.textContent = "⏸️ 已暫停";
        indicator.classList.remove("active");
    }
}
