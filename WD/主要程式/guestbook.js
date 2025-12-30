// ========== 留言板功能 ==========

// Supabase 配置
const SUPABASE_URL = 'https://hdqziwoqvzlezeyfwffm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkcXppd29xdnpsZXpleWZ3ZmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDA3OTAsImV4cCI6MjA4MjY3Njc5MH0.J8jnzsJjU4XE-ja-dkVbABXXJeqh-xoR_diZzXKUWw0';

// 初始化 Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// 載入留言
async function loadMessages() {
    try {
        const { data, error } = await supabaseClient
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);
        
        if (error) throw error;
        
        displayMessages(data);
    } catch (error) {
        console.error('載入留言失敗:', error);
        if (messagesList) {
            messagesList.innerHTML = '<div class="loading-spinner">載入失敗</div>';
        }
    }
}

// 顯示留言
function displayMessages(messages) {
    if (!messagesList) return;

    if (!messages || messages.length === 0) {
        messagesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💌</div>
                <p>還沒有留言，成為第一個留言的人吧！</p>
            </div>
        `;
        return;
    }

    messagesList.innerHTML = messages.map(msg => `
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