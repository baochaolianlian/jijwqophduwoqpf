// =============================================================
// ========= 这是一个独立的激活系统，不影响您的任何原有代码 =========
// =============================================================

// 等待整个页面（包括您原来的所有脚本）都加载完毕后再执行
window.addEventListener('load', function() {

    // ================== 您的专属加密密钥 ==================
    const SECRET_KEY = "baochaolianlian-jhkaydwoqbdswoq-2025"; // 请务必修改成您自己的密钥
    // =======================================================

    // 获取页面元素
    const authOverlay = document.getElementById('auth-overlay');
    const phoneScreen = document.getElementById('phone-screen');
    const licenseInput = document.getElementById('license-input');
    const activateButton = document.getElementById('activate-button');
    const requestCodeDisplay = document.getElementById('request-code');

    // --- 生成或获取本机的“请求码” ---
    let requestCode = localStorage.getItem('deviceRequestCode');
    if (!requestCode) {
        requestCode = 'REQ-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        localStorage.setItem('deviceRequestCode', requestCode);
    }
    
    // 检查一下显示请求码的元素是否存在，避免报错
    if (requestCodeDisplay) {
      requestCodeDisplay.innerText = requestCode;
    }

    // --- 检查激活状态 ---
    const isActivated = localStorage.getItem('isAppActivated');

    // 同样，检查元素是否存在，让代码更健壮
    if (authOverlay && phoneScreen) {
        if (isActivated === 'true') {
            authOverlay.classList.add('hidden');
            phoneScreen.classList.remove('hidden');
        } else {
            authOverlay.classList.remove('hidden');
            phoneScreen.classList.add('hidden');
        }
    }

    // --- 激活按钮点击事件 ---
    if (activateButton) {
        activateButton.addEventListener('click', async function() {
            const inputKey = licenseInput.value.trim();
            if (!inputKey) {
                alert('请输入激活码！');
                return;
            }

            const correctKey = await simpleHash(requestCode + SECRET_KEY);

            if (inputKey === correctKey) {
                alert('激活成功！感谢您的支持！');
                localStorage.setItem('isAppActivated', 'true');
                authOverlay.classList.add('hidden');
                phoneScreen.classList.remove('hidden');
            } else {
                alert('激活码无效或与本机不匹配。');
            }
        });
    }

    // --- 一个简单的哈希函数（用于加密） ---
    async function simpleHash(str) {
        const buffer = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return 'KEY-' + hashHex.substring(0, 16).toUpperCase();
    }
});