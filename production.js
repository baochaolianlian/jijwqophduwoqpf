// ===============================================================
// 🔥 发布前开关：将下方 true 改为 false 即可屏蔽所有调试信息
// ===============================================================
const isProduction = true;

if (isProduction) {
    console.log = function() {};    // 屏蔽 console.log
    console.info = function() {};   // 屏蔽 console.info
    console.warn = function() {};   // 屏蔽 console.warn
    // 注意：我们通常保留 console.error 以便追踪重要错误
}