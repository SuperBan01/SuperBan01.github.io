// 计算生命的第几天
function calculateDayCount() {
    const birthDate = new Date('2000-10-14');
    const today = new Date();
    
    // 计算两个日期之间的差值（毫秒）
    const timeDiff = today - birthDate;
    
    // 转换为天数
    const dayCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return dayCount;
}

// 更新生命计数
function updateDayCount() {
    const dayCount = calculateDayCount();
    const dayCountElements = document.querySelectorAll('#day-count');
    dayCountElements.forEach(element => {
        element.textContent = dayCount;
    });
}

// 语言切换功能
function setupLanguageSwitch() {
    const btnZh = document.getElementById('btn-zh');
    const btnEn = document.getElementById('btn-en');
    const body = document.body;
    
    // 初始设置为中文
    body.classList.add('zh');
    
    btnZh.addEventListener('click', () => {
        body.classList.remove('en');
        body.classList.add('zh');
        btnZh.classList.add('active');
        btnEn.classList.remove('active');
    });
    
    btnEn.addEventListener('click', () => {
        body.classList.remove('zh');
        body.classList.add('en');
        btnEn.classList.add('active');
        btnZh.classList.remove('active');
    });
}

// 添加简约的滚动动画效果
function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.dimension-header, .dimension-bio, .project-item, .work-item, .timeline-item, .quote, .dimension, .timeline, .philosophy, .module-item');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
        
        if (isVisible) {
            // 添加淡入和轻微上移动画
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 为元素设置初始样式，准备动画
function setInitialAnimationStyles() {
    const fadeElements = document.querySelectorAll('.dimension-header, .dimension-bio, .project-item, .work-item, .timeline-item, .quote, .dimension, .timeline, .philosophy, .module-item');
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// 为项目和作品卡片添加悬停效果
function setupHoverEffects() {
    const hoverElements = document.querySelectorAll('.project-item, .work-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s ease';
            element.style.transform = 'translateY(-5px)';
            element.style.boxShadow = '0 10px 30px rgba(156, 39, 176, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = 'none';
        });
    });
    
    // 为轮播图占位符添加简单的悬停效果
    const carousel = document.querySelector('.carousel-placeholder');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            carousel.style.transform = 'scale(1.02)';
            carousel.style.transition = 'transform 0.3s ease';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.transform = 'scale(1)';
        });
    }
}

// GitHub Pages 兼容性处理
function setupGitHubPagesCompatibility() {
    if (window.location.hostname.includes('github.io')) {
        // 确保相对路径正确
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
            const repoName = window.location.pathname.split('/')[1];
            link.href = `/${repoName}${link.getAttribute('href')}`;
        });
    }
}

// 导航栏平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 文章模态框功能
function setupArticleModal() {
    const modal = document.getElementById('article-modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-article-title');
    const modalDownloadLink = document.getElementById('modal-download-link');
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    
    let currentArticleId = null;
    
    // 打开模态框
    document.querySelectorAll('.article-comment-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const articleItem = this.closest('.article-item');
            currentArticleId = articleItem.dataset.articleId;
            const articleName = articleItem.querySelector('.article-name').textContent;
            const downloadLink = articleItem.querySelector('.article-download').href;
            
            // 设置模态框内容
            modalTitle.textContent = articleName;
            modalDownloadLink.href = downloadLink;
            
            // 显示模态框
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
            
            // 加载留言
            loadComments(currentArticleId);
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', function() {
        closeArticleModal();
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArticleModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeArticleModal();
        }
    });
    
    // 提交留言
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('comment-name').value;
        const content = document.getElementById('comment-content').value;
        
        if (name && content && currentArticleId) {
            addComment(currentArticleId, name, content);
            
            // 清空表单
            commentForm.reset();
            
            // 更新留言数量
            updateCommentCount(currentArticleId);
        }
    });
    
    function closeArticleModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentArticleId = null;
    }
}

// 加载留言
function loadComments(articleId) {
    const commentsList = document.getElementById('comments-list');
    const comments = getComments(articleId);
    
    // 清空留言列表
    commentsList.innerHTML = '';
    
    if (comments.length === 0) {
        // 显示无留言提示
        const noCommentsZh = document.createElement('p');
        noCommentsZh.className = 'no-comments';
        noCommentsZh.dataset.lang = 'zh';
        noCommentsZh.textContent = '暂无留言，来发表第一条留言吧！';
        
        const noCommentsEn = document.createElement('p');
        noCommentsEn.className = 'no-comments';
        noCommentsEn.dataset.lang = 'en';
        noCommentsEn.textContent = 'No comments yet, be the first to comment!';
        
        commentsList.appendChild(noCommentsZh);
        commentsList.appendChild(noCommentsEn);
    } else {
        // 显示留言列表
        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsList.appendChild(commentElement);
        });
    }
}

// 创建留言元素
function createCommentElement(comment) {
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    
    const formattedDate = new Date(comment.date).toLocaleString();
    
    commentItem.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHtml(comment.name)}</span>
            <span class="comment-date">${formattedDate}</span>
        </div>
        <div class="comment-content">${escapeHtml(comment.content)}</div>
    `;
    
    return commentItem;
}

// 添加留言
function addComment(articleId, name, content) {
    const comments = getComments(articleId);
    
    const newComment = {
        id: Date.now().toString(),
        name: name,
        content: content,
        date: new Date().toISOString()
    };
    
    comments.push(newComment);
    localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(comments));
    
    // 重新加载留言
    loadComments(articleId);
}

// 获取留言
function getComments(articleId) {
    const commentsJson = localStorage.getItem(`article_${articleId}_comments`);
    return commentsJson ? JSON.parse(commentsJson) : [];
}

// 更新留言数量
function updateCommentCount(articleId) {
    const comments = getComments(articleId);
    const countElement = document.querySelector(`.article-item[data-article-id="${articleId}"] .comment-count`);
    
    if (countElement) {
        countElement.textContent = comments.length;
        countElement.dataset.count = comments.length;
    }
}

// HTML转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    let slideInterval;
    
    // 创建指示器
    slides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.classList.add('carousel-indicator');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        indicators[currentIndex].classList.remove('active');
        
        currentIndex = index;
        
        slides[currentIndex].classList.add('active');
        indicators[currentIndex].classList.add('active');
        
        // 重置自动播放
        resetAutoPlay();
    }
    
    // 下一张
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    }
    
    // 上一张
    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        goToSlide(prevIndex);
    }
    
    // 自动播放
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // 5秒切换一次
    }
    
    // 重置自动播放
    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }
    
    // 暂停自动播放
    function pauseAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 鼠标悬停时暂停自动播放
    carousel.addEventListener('mouseenter', pauseAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 初始化自动播放
    startAutoPlay();
}

// 页面加载完成后初始化所有功能
window.addEventListener('DOMContentLoaded', () => {
    // 初始化生命计时器
    updateDayCount();
    // 每小时更新一次（3600000毫秒 = 1小时）
    setInterval(updateDayCount, 3600000);
    
    // 设置语言切换
    setupLanguageSwitch();
    
    // 设置滚动动画
    setInitialAnimationStyles();
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // 设置悬停效果
    setupHoverEffects();
    
    // 设置GitHub Pages兼容性
    setupGitHubPagesCompatibility();
    
    // 初始化轮播图
    initCarousel();
    
    // 初始化导航栏平滑滚动
    setupSmoothScroll();
    
    // 初始化文章模态框和留言系统
    setupArticleModal();
    
    // 初始化文章留言计数
    document.querySelectorAll('.article-item').forEach(item => {
        const articleId = item.dataset.articleId;
        updateCommentCount(articleId);
    });
});