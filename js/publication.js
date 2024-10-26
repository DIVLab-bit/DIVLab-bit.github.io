


document.addEventListener("DOMContentLoaded", function() {
    // 获取所有的 publication-item 元素
    var publicationItems = document.querySelectorAll('.publication-item');

    // 遍历每个 publication-item 并添加 hover-div-publication
    publicationItems.forEach(function(item) {
        // 创建一个新的 div 元素
        var hoverDiv = document.createElement('div');
        
        // 为新元素添加类名
        hoverDiv.className = 'hover-div-publication';
        
        // 将新元素添加到 publication-item 中
        item.appendChild(hoverDiv);
    });
});

// 监听单选按钮变化
document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        moveDiv();
        showPage();
    });
});

        document.querySelectorAll('.publication-item').forEach(item => {
            item.addEventListener('mouseover', (event) => {
                const hoveredItem = event.currentTarget;
        
                // 检查是否已经有 hover-div 存在
                let hoverDiv = hoveredItem.querySelector('.hover-div-publication');
                if (!hoverDiv) {
                    hoverDiv = document.createElement('div');
                    hoverDiv.classList.add('hover-div-publication');
                    hoveredItem.appendChild(hoverDiv);
                }
                
                // 确保 hover-div 展开
                hoverDiv.style.height = '0.4rem';
                hoverDiv.style.opacity = '1';       
            });
        
            item.addEventListener('mouseout', (event) => {
                const hoveredItem = event.currentTarget;
                const hoverDiv = hoveredItem.querySelector('.hover-div-publication');
                
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
                console.log("被点击");
            
                // 获取链接的地址
                const url = item.getAttribute('href');
            
                if (window.innerWidth <= 600) {
                    // 如果是移动端，直接跳转到链接
                    window.location.href = url;
                } else {
                    // 如果是网页端，阻止默认的链接跳转行为并在新窗口中打开链接
                    event.preventDefault();
                    window.open(url, '_blank');
                }
            });
        });

        document.addEventListener('change', function(e) {
            if (e.target.name === 'year') {
                const selectedYear = e.target.value;
                const targetElement = document.getElementById(selectedYear);
                
                if (targetElement) {
                    const offsetPosition = targetElement.offsetTop - 16; // 根据需要调整偏移量
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
        let lastScrollTop = 0;

        document.addEventListener('scroll', function() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const yearSections = ['2024', '2023', '2022', '2021'];
        
            // 获取当前选中的项
            let selectedYearIndex = yearSections.findIndex(year => {
                return document.querySelector(`input[value="${year}"]`).checked;
            });
        
            if (currentScrollTop > lastScrollTop) {
                // 向下滚动，检测下一项
                if (selectedYearIndex < yearSections.length - 1) {
                    const nextYear = yearSections[selectedYearIndex + 1];
                    const nextSection = document.getElementById(nextYear);
                    const rect = nextSection.getBoundingClientRect();
        
                    // 当下一项进入屏幕的上半部分时，切换选中项
                    if (rect.top <= window.innerHeight / 2) {
                        document.querySelector(`input[value="${nextYear}"]`).checked = true;
                        handleRadioChange(nextYear); // 调用选中项变化的处理函数
                    }
                }
            } else {
                // 向上滚动，检测当前选中的项
                if (selectedYearIndex > 0) {
                    const currentYear = yearSections[selectedYearIndex];
                    const currentSection = document.getElementById(currentYear);
                    const rect = currentSection.getBoundingClientRect();
        
                    // 当当前选中项离开视窗时，切换到上一项
                    if (rect.bottom > window.innerHeight) {
                        const previousYear = yearSections[selectedYearIndex - 1];
                        document.querySelector(`input[value="${previousYear}"]`).checked = true;
                        handleRadioChange(previousYear); // 调用选中项变化的处理函数
                    }
                }
            }
        
            // 更新上次滚动位置
            lastScrollTop = currentScrollTop;
        });
        
        // 页面加载时执行
        window.addEventListener('DOMContentLoaded', function() {
            // 选中已被默认选中的radio
            const selectedRadio = document.querySelector('input[name="year"]:checked');
            
            if (selectedRadio) {
                handleRadioChange(selectedRadio.value);
            }
        });
        
        // 处理选中项变化的函数
        function handleRadioChange(selectedYear) {
            // 找到对应的 .hover-div-year 并设置宽度为 0.35rem
            const selectedHoverDiv = document.querySelector(`input[value="${selectedYear}"]`)
                                              .closest('.year-item').querySelector('.hover-div-year');
            if(window.innerWidth <= 600){
            selectedHoverDiv.style.width = '0.95rem';
        }else{
            selectedHoverDiv.style.width = '0.33rem';
        }
            // 重置其他 .hover-div-year 的宽度为 0
            document.querySelectorAll('.hover-div-year').forEach(div => {
                if (div !== selectedHoverDiv) {
                    div.style.width = '0';
                }
            });
        }
        
        // 监听radio的改变事件
        document.querySelectorAll('.year-item input[type="radio"]').forEach((radio) => {
            radio.addEventListener('change', function() {
                handleRadioChange(this.value);
            });
        });



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


        function isMobileDevice() {
            return window.innerWidth <= 600;
        }
        
        if (isMobileDevice()) {
            let lastScrollTop = 0;
            let initialYearNavBottom; // 用于存储 year-navigation 的初始 bottom 位置
        
            // 在 DOM 加载完成后，获取 year-navigation 的初始 bottom 位置
            window.addEventListener('DOMContentLoaded', () => {
                const yearNav = document.querySelector('.year-navigation');
                if (yearNav) {
                    const yearNavRect = yearNav.getBoundingClientRect();
                    initialYearNavBottom = yearNavRect.bottom; // 计算初始 bottom
                    console.log("Initial yearNav bottom:", initialYearNavBottom);
                } else {
                    console.error("year-navigation element not found.");
                }
            });
        
           
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbarbg');
                const yearNav = document.querySelector('.year-navigation');
                const container = document.querySelector('#publicationcontainer');
        
                if (!navbar || !yearNav || !container) {
                    console.error("One or more required elements are not found.");
                    return;
                }
        
                const navbarBottom = navbar.getBoundingClientRect().bottom;
                const yearNavTop = yearNav.getBoundingClientRect().top;
                const yearNavBottom = yearNav.getBoundingClientRect().bottom;
                const containerTop = container.getBoundingClientRect().top;

                const tag2024=document.getElementById('2024');
                const tag2024top=tag2024.getBoundingClientRect().top;
                // 计算 1rem 的像素值
                const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);

                // 创建新的变量，存储 tag2024top 减去 1rem 的值
                const tag2024topMinus1rem = tag2024top - remInPixels/2;
        
                // 使用当前 yearNav 的 top 值来计算初始位置
                const initialTop = parseFloat(window.getComputedStyle(yearNav).top);
        
                // 检测当前滚动方向
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let isScrollingDown = scrollTop > lastScrollTop;
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止在 iOS 上负值的情况
        
                if (isScrollingDown) {
                    // 向下滑动时，检测 year-navigation 的上边缘是否到达 navbar 的下边缘
                    console.log("down");
                    if (yearNavTop <= navbarBottom) {
                        console.log("XIAO");
                        yearNav.style.position = 'fixed';
                        yearNav.style.top = `${navbarBottom}px`;
                    } 
                } else {
                    // 向上滑动时，检测 year-navigation 的下边缘是否到达初始位置
                    console.log("up");
                    if (yearNavBottom < tag2024topMinus1rem) {

                        yearNav.style.position = 'absolute';
                        yearNav.style.top='2.6rem';
                        console.log("aaa");
                    } 
                }
            });
        }