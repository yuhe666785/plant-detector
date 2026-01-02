// 修复版：移除IntersectionObserver，立即执行
console.log('✅ Plant Guardian 脚本已加载');

// 粒子动画
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) {
        console.error('❌ 找不到粒子容器');
        return;
    }
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
    console.log('✅ 粒子创建完成');
}

// 数字动画（简化版）
function animateValue(element, start, end, duration) {
    if (!element) {
        console.error('❌ 动画元素不存在');
        return;
    }
    console.log(`🎯 开始动画: ${start} → ${end}`);
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + range * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end; // 确保最终值准确
            console.log(`✅ 动画完成: ${end}`);
        }
    }
    
    requestAnimationFrame(update);
}

// 模拟数据
function simulateSensorData() {
    const soilValue = Math.floor(Math.random() * 400) + 300;
    const tempValue = (Math.random() * 10 + 20).toFixed(1);
    const lightValue = Math.floor(Math.random() * 2000) + 500;
    
    document.getElementById('soil-value').textContent = soilValue;
    document.getElementById('soil-progress').style.width = (soilValue / 1024 * 100) + '%';
    document.getElementById('temp-value').textContent = tempValue;
    document.getElementById('light-value').textContent = lightValue;
}

// 立即执行（DOM加载完成后）
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM加载完成，开始执行动画');
    createParticles();
    
    // 立即动画所有数字
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateValue(el, 0, target, 2000);
    });
    
    // 初始化传感器数据
    simulateSensorData();
    setInterval(simulateSensorData, 5000);
});

console.log('📦 脚本加载完成，等待DOM...');
