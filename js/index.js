
var hamburger = document.getElementById('hamburger-menu');
var sidebar = document.getElementById('sidebar');
var overlay = document.getElementById('overlay');

// 点击汉堡标时，显示侧边栏和覆盖层
hamburger.addEventListener('click', function() {
    var isSidebarVisible = sidebar.classList.toggle('show');
    overlay.style.display = isSidebarVisible ? 'block' : 'none';
    hamburger.classList.toggle('show', isSidebarVisible); // 更新汉堡图标的状态
});

// 点击覆盖层时，隐藏侧边栏和覆盖层
overlay.addEventListener('click', function() {
    sidebar.classList.remove('show');
    overlay.style.display = 'none';
    hamburger.classList.remove('show'); // 确保在隐藏侧边栏时汉堡图标恢复原样
});



document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('mainvideo');
    var img = document.getElementById('mainpicture');
    var frameCount = 10; // 只轮播10张图片
    var frameRate = 8000; // 每8秒切换一次图片
    var fadeDuration = 2000; // 交叉溶解时间为2秒
    var scaleDuration = 6000; // 图片缩放效果持续时间6秒
    var currentFrame = 0;
    var interval;
    var imagesLoaded = 0;

    // 预加载所有图片
    function preloadImages(callback) {
        for (let i = 0; i < frameCount; i++) {
            const imgElement = new Image();
            imgElement.src = `../pictures/mobilevideo/smaller_${10000 + i}.jpg`;
            imgElement.onload = function () {
                imagesLoaded++;
                if (imagesLoaded === frameCount) {
                    callback(); // 当所有图片加载完成时，调用回调函数
                }
            };
        }
    }

    function startAnimation() {
        interval = setInterval(function () {
            currentFrame = (currentFrame + 1) % frameCount;
            img.style.transition = `opacity ${fadeDuration / 1000}s, transform ${scaleDuration / 1000}s ease-in-out`; // 设置淡入淡出和缩放的时间
            img.style.opacity = 0; // 开始交叉溶解效果
            setTimeout(function () {
                img.src = `../pictures/mobilevideo/smaller_${10000 + currentFrame}.jpg`;
                img.style.opacity = 1; // 完成交叉溶解效果
            }, fadeDuration); // 2秒的溶解时间
        }, frameRate);
    }

    function stopAnimation() {
        clearInterval(interval);
    }

    function checkDevice() {
        if (window.innerWidth <= 600) {
            // 移动设备
            video.style.display = 'none';
            img.style.display = 'block';
            img.src = `../pictures/mobilevideo/smaller_10000.jpg`; // 初始图片
            preloadImages(startAnimation); // 预加载图片后开始动画
        } else {
            // 桌面设备
            video.style.display = 'block';
            img.style.display = 'none';
            stopAnimation(); // 停止图片切换动画
        }
    }

    checkDevice(); // 初始检查

    // 监听窗口调整大小的事件
    window.addEventListener('resize', checkDevice);
});
