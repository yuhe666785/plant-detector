// 粒子背景
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// 数字动画
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + range * progress);
        element.textContent = current;
        
        if (progress < 1) requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
}

// 初始化统计数字
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
});

// 平滑滚动
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 模拟实时数据
function simulateSensorData() {
    const soilValue = Math.floor(Math.random() * 400) + 300;
    const tempValue = (Math.random() * 10 + 20).toFixed(1);
    const lightValue = Math.floor(Math.random() * 2000) + 500;
    
    // 更新土壤湿度
    document.getElementById('soil-value').textContent = soilValue;
    document.getElementById('soil-progress').style.width = (soilValue / 1024 * 100) + '%';
    
    // 更新温度
    document.getElementById('temp-value').textContent = tempValue;
    
    // 更新光照
    document.getElementById('light-value').textContent = lightValue;
    
    // AI诊断
    const alerts = [];
    if (soilValue < 350) alerts.push("🚨 土壤极度干燥！建议立即浇水");
    else if (soilValue > 650) alerts.push("⚠️ 土壤过湿，暂停浇水并检查排水");
    
    if (tempValue > 30) alerts.push("🔥 温度过高，建议移至阴凉处");
    else if (tempValue < 10) alerts.push("❄️ 温度过低，注意防冻");
    
    if (lightValue < 1000) alerts.push("☀️ 光照不足，建议移至窗边");
    
    const alertBox = document.getElementById('alert-box');
    if (alerts.length > 0) {
        alertBox.innerHTML = `<h3>🤖 AI诊断结果</h3><ul>${alerts.map(a => `<li>${a}</li>`).join('')}</ul>`;
        alertBox.style.borderColor = alerts.includes(a => a.includes('🚨')) ? 'var(--danger)' : 'var(--warning)';
    } else {
        alertBox.innerHTML = '<h3>✅ 植物状态良好</h3><p>继续保持当前养护方式</p>';
        alertBox.style.borderColor = 'var(--primary)';
    }
}

// 每5秒更新一次数据
setInterval(simulateSensorData, 5000);
simulateSensorData(); // 初始调用

// 添加滚动视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});
