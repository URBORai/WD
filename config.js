// ========== 電子喜帖網站配置檔 ==========
// 修改此檔案中的內容,即可快速更新網站資訊

const CONFIG = {
    // ===== 新人資訊 =====
    couple: {
        groom: "立誠",           // 新郎名字
        bride: "珈恩",           // 新娘名字
        separator: " & ",       // 名字之間的分隔符號

        // 新郎個人介紹
        groomProfile: {
            name: "黃立誠(TOM)",
            title: "新郎",
            photo: "./圖片/新郎獨照.webp",  // 新郎照片路徑
            description: "高高瘦瘦、內向低調、獨立堅強、細心負責、事事放心裡、愛吃辣",
            hobbies: ["彰化伸港", "新北板橋", "基隆中正"],
            quote: "愛是恆久忍耐，又有恩慈"
        },

        // 新娘個人介紹
        brideProfile: {
            name: "劉珈恩(JOY)",
            title: "新娘",
            photo: "./圖片/新娘接花照.webp",  // 新娘照片路徑
            description: "矮矮胖胖(她說她結婚那天會變得矮矮瘦瘦，請大家敬請期待)、外向大方、喜愛聊天、粗心ㄎㄧㄤ、事事分享、超怕辣",
            hobbies: ["臺南官田", "花蓮壽豐", "雲林西螺"],
            quote: "愛是永不止息"
        }
    },

    // ===== 婚禮日期與時間 =====
    wedding: {
        date: "2026年2月8日",    // 婚禮日期
        dayOfWeek: "星期日",     // 星期
        time: "早上 10:00 "      // 宴客時間
    },

    // ===== 幻燈片照片 =====
    slideshow: {
        images: [
            "./圖片/新人拉手照.webp",
            "./圖片/新人捧花照.webp",
            "./圖片/DSC06906.webp",
            "./圖片/DSC06928.webp",
            "./圖片/DSC06877.webp",
            "./圖片/DSC07655.webp",
            "./圖片/DSC07649.webp",
            "./圖片/DSC07029.webp",
            "./圖片/DSC07158.webp",
            "./圖片/DSC07177.webp",
            // 可以繼續添加更多照片
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
            icon: "📍",
            mapUrl: "https://www.google.com/maps?q=新北市板橋區大觀路2段2號&output=embed"
        },
        restaurant: {
            name: "天賜良緣",
            icon: "📍",
            mapUrl: "https://www.google.com/maps?q=天賜良緣大飯店+新北市新莊區中正路542號&output=embed"
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
            time: "11:30",
            title: "婚禮結束",
            description: "結束"
        },
        {
            time: "12:00",
            title: "前往婚宴會場",
            description: "享用美味佳餚"
        },
        {
            time: "12:30",
            title: "婚宴開始",
            description: "與賓客互動交流"
        },
        {
            time: "15:00",
            title: "婚宴結束",
            description: "感謝您的參與"
        }
    ],

    // ===== 音樂設定 =====
    music: {
        filename: "./音樂/背景音樂.mp3"  // 背景音樂檔案路徑
    },

    // ===== 開場彈窗文字 =====
    welcomePopup: {
        title: "哈利路亞",
        text: "一位真神，兩個人，無數的趣事。\n這不是終點，而是一段故事的起頭。\n謝謝你讀到這一頁，\n也希望你能到場，\n一起翻開我們的下一章。"
    },

    // ===== 紙本喜帖 =====
    paperInvitation: {
        images: [
            './圖片/紙本喜帖_第1頁.webp',
            './圖片/紙本喜帖_第2頁.webp'
        ]
    },

    // ===== 婚禮儀節表 =====
    ceremonySchedule: {
        images: [
            './圖片/主頁.webp',
            './圖片/背面.webp'
        ],
        // 特殊期間：2026/2/7 12:00 ~ 2026/2/8 12:00
        startTime: new Date('2026-02-07T12:00:00'),
        endTime: new Date('2026-02-08T12:00:00')
    }
};