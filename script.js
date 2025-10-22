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
    
    // 检查按钮是否存在，避免在没有语言切换按钮的页面抛出错误
    if (btnZh && btnEn) {
        btnZh.addEventListener('click', () => {
            body.classList.remove('en');
            body.classList.add('zh');
            btnZh.classList.add('active');
            btnEn.classList.remove('active');
            updateLanguage();
        });
        
        btnEn.addEventListener('click', () => {
            body.classList.remove('zh');
            body.classList.add('en');
            btnEn.classList.add('active');
            btnZh.classList.remove('active');
            updateLanguage();
        });
    }
}

// 更新页面语言显示
function updateLanguage() {
    const isChinese = document.body.classList.contains('zh');
    
    // 隐藏所有语言元素
    document.querySelectorAll('[data-lang="zh"]').forEach(el => {
        el.style.display = isChinese ? 'block' : 'none';
    });
    
    document.querySelectorAll('[data-lang="en"]').forEach(el => {
        el.style.display = isChinese ? 'none' : 'block';
    });
    
    // 特别处理博客页面的元素
    const backToList = document.querySelector('.back-to-list');
    if (backToList) {
        backToList.textContent = isChinese ? '返回文章列表' : 'Back to List';
    }
    
    const viewComments = document.querySelectorAll('.view-comments');
    viewComments.forEach(btn => {
        btn.textContent = isChinese ? '查看评论' : 'View Comments';
    });
    
    const commentNameLabel = document.querySelector('label[for="comment-name"]');
    if (commentNameLabel) {
        commentNameLabel.textContent = isChinese ? '您的名字:' : 'Your Name:';
    }
    
    const commentContentLabel = document.querySelector('label[for="comment-content"]');
    if (commentContentLabel) {
        commentContentLabel.textContent = isChinese ? '留言内容:' : 'Comment:';
    }
    
    const submitCommentBtn = document.querySelector('.comment-form button[type="submit"]');
    if (submitCommentBtn) {
        submitCommentBtn.textContent = isChinese ? '发表留言' : 'Submit Comment';
    }
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
            
            const targetHref = this.getAttribute('href');
            
            // 如果是外部链接（指向其他页面），直接跳转
            if (targetHref.includes('.html')) {
                window.location.href = targetHref;
                return;
            }
            
            // 如果是内部锚点，执行平滑滚动
            const targetElement = document.querySelector(targetHref);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 博客页面留言系统
function setupBlogCommentSystem() {
    // 设置所有留言表单
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const articleId = this.dataset.articleId;
            const nameInput = this.querySelector('input[name="comment-name"]');
            const contentInput = this.querySelector('textarea[name="comment-content"]');
            
            const name = nameInput.value.trim();
            const content = contentInput.value.trim();
            
            if (name && content) {
                addComment(articleId, name, content);
                
                // 重置表单
                nameInput.value = '';
                contentInput.value = '';
                
                // 重新加载当前文章的留言
                loadCommentsForArticle(articleId);
            }
        });
    });
    
    // 加载所有文章的留言
    document.querySelectorAll('.comments-list').forEach(list => {
        const articleId = list.dataset.articleId;
        loadCommentsForArticle(articleId);
    });
    
    // 更新所有文章的留言计数
    updateAllCommentCounts();
}

// 加载指定文章的留言
function loadCommentsForArticle(articleId) {
    const comments = getComments(articleId);
    const commentsList = document.querySelector(`.comments-list[data-article-id="${articleId}"]`);
    
    if (!commentsList) return;
    
    // 清空现有留言
    commentsList.innerHTML = '';
    
    if (comments.length === 0) {
        commentsList.innerHTML = `
            <p class="no-comments" data-lang="zh">暂无留言，来发表第一条留言吧！</p>
            <p class="no-comments" data-lang="en">No comments yet, be the first to comment!</p>
        `;
        updateLanguage();
        return;
    }
    
    // 按时间排序（最新的在前）
    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // 添加留言
    comments.forEach(comment => {
        commentsList.appendChild(createCommentElement(comment));
    });
}

// 创建留言元素
function createCommentElement(comment) {
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    
    const formattedDate = new Date(comment.timestamp).toLocaleString();
    
    commentItem.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHtml(comment.name)}</span>
            <span class="comment-time">${formattedDate}</span>
        </div>
        <div class="comment-body">${escapeHtml(comment.content)}</div>
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
        timestamp: new Date().toISOString()
    };
    
    comments.push(newComment);
    localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(comments));
    updateLanguage();
    
    // 更新留言计数
    updateCommentCount(articleId);
}

// 获取留言
function getComments(articleId) {
    const commentsJson = localStorage.getItem(`article_${articleId}_comments`);
    return commentsJson ? JSON.parse(commentsJson) : [];
}

// 更新所有文章的留言计数
function updateAllCommentCounts() {
    document.querySelectorAll('.blog-article-item').forEach(article => {
        const articleId = article.dataset.articleId;
        updateCommentCount(articleId);
    });
}

// 更新单个文章的留言计数
function updateCommentCount(articleId) {
    const comments = getComments(articleId);
    
    // 更新文章列表中的计数
    const listCountElements = document.querySelectorAll(`.blog-article-item[data-article-id="${articleId}"] .comment-number`);
    listCountElements.forEach(element => {
        element.textContent = comments.length;
        element.dataset.count = comments.length;
    });
    
    // 兼容原有的计数元素
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

// 文章模态框功能
function setupArticleModal() {
    const modal = document.getElementById('article-modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-article-title');
    const modalDownloadLink = document.getElementById('modal-download-link');
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    
    let currentArticleId = null;
    
    if (!modal) return; // 如果模态框不存在，则不执行初始化
    
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

// 加载模态框中的留言
function loadComments(articleId) {
    const commentsList = document.getElementById('comments-list');
    const comments = getComments(articleId);
    
    if (!commentsList) return;
    
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

// 博客文章数据
const blogArticles = [
    { id: '12.14雪夜', title: '12.14雪夜', file: 'aricle/青春诗.txt', date: '2023-12-14', type: 'txt' },
    { id: 'mindcopy', title: 'mindcopy标准介绍及其示例', file: 'aricle/mindcopy.txt', date: '2023-11-20', type: 'txt' },
    { id: 'universe-consciousness', title: '宇宙的意识', file: 'aricle/宇宙的意识.txt', date: '2023-10-15', type: 'txt' },
    { id: 'youth-poem', title: '青春诗 2.0', file: 'aricle/少年传.txt', date: '2023-09-01', type: 'txt' },
    { id: 'youth-poem-pdf', title: '《青春诗》导演阐释及影像风格参考', file: 'aricle/《青春诗》导演阐释及影像风格参考.pdf', date: '2023-08-10', type: 'pdf' }
];

// 博客页面文章查看功能
function setupBlogArticleViewer() {
    const articleList = document.querySelector('.blog-article-list');
    const articleDetail = document.querySelector('.blog-article-detail');
    const backToListBtn = document.querySelector('.back-to-list');
    const articleTitle = document.querySelector('.blog-article-detail h2');
    const articleDate = document.querySelector('.article-meta .date');
    const articleContent = document.querySelector('.article-content');
    const downloadBtn = document.querySelector('.download-article');
    const commentSection = document.querySelector('.blog-article-detail .comment-section');
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.querySelector('.comments-list');
    const currentArticleId = new URLSearchParams(window.location.search).get('id');
    let currentViewingArticle = null;
    
    if (!articleList || !articleDetail) return;
    
    // 如果URL中有文章ID参数，直接显示对应文章
    if (currentArticleId) {
        const article = blogArticles.find(a => a.id === currentArticleId);
        if (article) {
            showArticleDetail(article);
        }
    }
    
    // 点击文章列表项
    document.querySelectorAll('.blog-article-item').forEach(item => {
        item.addEventListener('click', () => {
            const articleId = item.dataset.articleId;
            const article = blogArticles.find(a => a.id === articleId);
            if (article) {
                showArticleDetail(article);
                // 更新URL参数
                history.pushState(null, null, `?id=${articleId}`);
            }
        });
    });
    
    // 返回文章列表
    if (backToListBtn) {
        backToListBtn.addEventListener('click', () => {
            articleList.style.display = 'grid';
            articleDetail.style.display = 'none';
            // 移除URL参数
            history.pushState(null, null, window.location.pathname);
            updateLanguage();
        });
    }
    
    // 显示文章详情
    function showArticleDetail(article) {
        currentViewingArticle = article;
        
        // 更新标题和元信息
        if (articleTitle) articleTitle.textContent = article.title;
        if (articleDate) articleDate.textContent = article.date;
        
        // 设置下载链接
        if (downloadBtn) {
            downloadBtn.href = article.file;
            downloadBtn.textContent = article.type === 'pdf' ? '下载PDF' : '下载原文';
        }
        
        // 加载文章内容（仅TXT文件）
        if (articleContent) {
            if (article.type === 'txt') {
                fetch(article.file)
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.text();
                    })
                    .then(text => {
                        // 格式化文本为HTML，保留换行和基本格式
                        const formattedContent = text
                            .replace(/\n\n/g, '</p><p>')
                            .replace(/\n/g, '<br>')
                            .replace(/^/g, '<p>')
                            .replace(/$/g, '</p>');
                        articleContent.innerHTML = formattedContent;
                    })
                    .catch(error => {
                        articleContent.innerHTML = `<p>加载文章内容失败: ${error.message}</p>`;
                    });
            } else {
                articleContent.innerHTML = `<p>这是一个PDF文件，请点击上方下载按钮查看完整内容。</p>`;
            }
        }
        
        // 加载评论
        if (commentSection && commentsList) {
            loadArticleComments(article.id);
        }
        
        // 切换视图
        articleList.style.display = 'none';
        articleDetail.style.display = 'block';
        updateLanguage();
    }
    
    // 提交评论
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!currentViewingArticle) return;
            
            const nameInput = document.getElementById('comment-name');
            const contentInput = document.getElementById('comment-content');
            
            const name = nameInput.value.trim();
            const content = contentInput.value.trim();
            
            if (name && content) {
                addComment(currentViewingArticle.id, name, content);
                loadArticleComments(currentViewingArticle.id);
                
                // 清空表单
                nameInput.value = '';
                contentInput.value = '';
            }
        });
    }
    
    // 加载文章评论
    function loadArticleComments(articleId) {
        if (!commentsList) return;
        
        const comments = getComments(articleId);
        
        // 清空评论列表
        commentsList.innerHTML = '';
        
        if (comments.length === 0) {
            // 显示无评论提示
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
            // 按时间排序（最新的在前）
            comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // 添加评论
            comments.forEach(comment => {
                commentsList.appendChild(createCommentElement(comment));
            });
        }
    }
}

// 更新博客评论系统以支持新的博客页面设计
function setupBlogCommentSystem() {
    // 初始化博客文章查看器
    setupBlogArticleViewer();
    
    // 更新语言显示
    updateLanguage();
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
    
    // 初始化博客评论系统（如果在博客页面）
    if (window.location.pathname.includes('blog.html')) {
        setupBlogCommentSystem();
    } else {
        // 在其他页面初始化文章模态框和留言系统
        setupArticleModal();
    }
    
    // 初始化文章留言计数
    document.querySelectorAll('.article-item, .blog-article-item').forEach(item => {
        const articleId = item.dataset.articleId;
        if (articleId) {
            updateCommentCount(articleId);
        }
    });
});