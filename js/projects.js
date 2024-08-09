document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseover', (event) => {
        const hoveredItem = event.currentTarget;

        // 检查是否已经有 hover-div 存在
        let hoverDiv = hoveredItem.querySelector('.hover-div-project');
        if (!hoverDiv) {
            hoverDiv = document.createElement('div');
            hoverDiv.classList.add('hover-div-project');
            hoveredItem.appendChild(hoverDiv);
        }
        
        // 确保 hover-div 展开
        hoverDiv.style.height = '0.4rem';
        hoverDiv.style.opacity = '1';       
    });

    item.addEventListener('mouseout', (event) => {
        const hoveredItem = event.currentTarget;
        const hoverDiv = hoveredItem.querySelector('.hover-div-project');
        
        if (hoverDiv) {
            // 使 hover-div 收缩
            hoverDiv.style.opacity = '0';
            hoverDiv.style.height = '0';
            /*
            // 等待动画完成后再删除 hover-div
            hoverDiv.addEventListener('transitionend', () => {
                hoverDiv.remove();
            }, { once: true }); // 确保事件处理器只执行一次*/
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
