// ========== 電子喜帖網站配置檔 ==========
// 修改此檔案中的內容,即可快速更新網站資訊
const CONFIG = {
    // ===== 新人資訊 =====
    couple: {
        groom: "TOM",           // 新郎名字
        bride: "JOY",           // 新娘名字
        separator: " & "        // 名字之間的分隔符號
    },

    // ===== 婚禮日期與時間 =====
    wedding: {
        date: "2026年2月8日",    // 婚禮日期
        dayOfWeek: "星期日",     // 星期
        time: "早上 10:00"       // 宴客時間
    },

    // ===== 幻燈片照片 =====
    slideshow: {
        images: [
            "圖片1.jpg",         // ✅ 修正：移除 ../圖片/ 路徑
            "圖片2.jpg"          // ✅ 修正：移除 ../圖片/ 路徑
            // 可以繼續添加更多照片，例如：
            // "圖片3.jpg",
            // "圖片4.jpg"
        ],
        interval: 3000  // 自動切換間隔時間(毫秒), 3000 = 3秒
    },

    // ===== 外部連結 =====
    links: {
        rsvpForm: "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__QMKapFUQVQ4Rk1FSVpCNUtZWjRFWFc3NVRaTzVMMC4u&route=shorturl",        // Microsoft 表單連結
        oldInvitation: "https://tom022905.wixsite.com/my-site-1"   // 舊版喜帖連結
    },

    // ===== 地點資訊 =====
    venues: {
        church: {
            name: "真耶穌教會板橋教會",
            icon: "⛪",
            // ✅ 修正：使用正確的 Google Maps 嵌入網址格式
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.889888845628!2d121.44418747690705!3d25.00385723950183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346802acd9719789%3A0x19bc37be4f26da2f!2z55yf6IC256mM5pWZ5pyD5p2_5qmL5pWZ5pyD!5e0!3m2!1szh-TW!2stw!4v1765560078710!5m2!1szh-TW!2stw" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        },
        restaurant: {
            name: "天賜良緣",
            icon: "🍽️",
            // ✅ 修正：使用正確的 Google Maps 嵌入網址格式
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.0580511461876!2d121.42758747690753!3d25.03210393836512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7e93204aeb5%3A0x4312ab64305a0582!2z5aSp6LOc6Imv57ej5aSn6aOv5bqX!5e0!3m2!1szh-TW!2stw!4v1765560179837!5m2!1szh-TW!2stw" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        }
    },

    // ===== 婚禮進程時間表 =====
    timeline: [
        {
            time: "10:00",
            title: "婚禮開始",
            description: "歡迎親友蒞臨"
        },
        {
            time: "11:00",
            title: "婚禮儀式",
            description: "證婚儀式開始"
        },
        {
            time: "12:00",
            title: "婚禮結束 ⇒ 前往婚宴會場",
            description: "準備前往宴客場地"
        },
        {
            time: "13:00",
            title: "婚宴開始",
            description: "享用美味佳餚，與賓客互動交流"
        },
        {
            time: "15:00",
            title: "婚宴結束",
            description: "感謝您的參與"
        }
    ],

    // ===== 音樂設定 =====
    music: {
        filename: "同心同行TJC黎明.mp3"  // ✅ 修正：移除 ../音樂/ 路徑
    },

    // ===== 開場彈窗文字 =====
    welcomePopup: {
        title: "哈利路亞",
        text: "一位真神，兩個人，無數的趣事。\n這不是終點，而是一段故事的起頭。\n謝謝你讀到這一頁，\n也希望你能到場，\n一起翻開我們的下一章。"
    }
};
