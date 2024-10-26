function addHoverDivs() {
    document.querySelectorAll('.news-item').forEach(element => {
        const hoverDiv = document.createElement('div');
        hoverDiv.classList.add('hover-div');
        element.appendChild(hoverDiv);
    });
}

// 检查设备类型或屏幕宽度
function isWeb() {
    return window.innerWidth > 600; // 600px 作为移动端和 Web 端的分界线，可以根据需要调整
}

// 如果是 Web 端，执行函数
if (isWeb()) {
    document.addEventListener('DOMContentLoaded', addHoverDivs);

    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('mouseover', (event) => {
            const hoveredItem = event.currentTarget;

            // 检查是否已经有 hover-div 存在
            let hoverDiv = hoveredItem.querySelector('.hover-div');
            if (!hoverDiv) {
                hoverDiv = document.createElement('div');
                hoverDiv.classList.add('hover-div');
                hoveredItem.appendChild(hoverDiv);
            }

            // 确保 hover-div 展开
            hoverDiv.style.height = '0.2rem';
            hoverDiv.style.opacity = '1';
        });

        item.addEventListener('mouseout', (event) => {
            const hoveredItem = event.currentTarget;
            const hoverDiv = hoveredItem.querySelector('.hover-div');

            if (hoverDiv) {
                // 使 hover-div 收缩
                hoverDiv.style.opacity = '0';
                hoverDiv.style.height = '0';
            }
        });

        item.addEventListener('click', (event) => {
            // 取消默认的链接跳转行为
            event.preventDefault();

            // 获取链接的地址
            const url = item.getAttribute('href');

            // 在新窗口中打开链接
            window.open(url, '_blank');
        });
    });
}

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
