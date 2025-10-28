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
    { id: '12.14雪夜', title: '12.14雪夜', file: 'aricle/青春诗.md', date: '2023-12-14', type: 'md' },
    { id: 'mindcopy', title: 'mindcopy标准介绍及其示例', file: 'aricle/mindcopy.md', date: '2023-11-20', type: 'md' },
    { id: 'universe-consciousness', title: '宇宙的意识', file: 'aricle/宇宙的意识.md', date: '2023-10-15', type: 'md' },
    { id: 'youth-poem', title: '青春诗 2.0', file: 'aricle/少年传.md', date: '2023-09-01', type: 'md' },
    { id: 'youth-poem-pdf', title: '《青春诗》导演阐释及影像风格参考', file: 'aricle/《青春诗》导演阐释及影像风格参考.pdf', date: '2023-08-10', type: 'pdf' }
];

// 设置博客文章查看器
function setupBlogArticleViewer() {
    // 处理URL参数，检查是否要直接显示某篇文章
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');
    const articleFile = urlParams.get('file');
    const articleType = urlParams.get('type');
    
    if (articleId && articleFile) {
        showArticle(articleId, articleFile, articleType);
    }

    // 文章列表项点击事件
    document.querySelectorAll('.blog-article-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const id = this.getAttribute('data-article-id');
            const file = this.getAttribute('data-file');
            const type = this.getAttribute('data-type') || 'md';
            
            showArticle(id, file, type);
        });
    });

    // 返回列表按钮事件
    document.getElementById('back-to-list')?.addEventListener('click', function() {
        document.getElementById('article-detail-view').style.display = 'none';
        document.getElementById('articles-list-view').style.display = 'block';
        // 更新URL，移除article参数
        const url = new URL(window.location);
        url.searchParams.delete('article');
        url.searchParams.delete('file');
        url.searchParams.delete('type');
        window.history.pushState({}, '', url);
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 显示文章详情
        function showArticle(articleId, articleFile, articleType) {
            console.log('显示文章详情:', { articleId, articleFile, articleType });
            
            // 更新URL
            const url = new URL(window.location);
            url.searchParams.set('article', articleId);
            url.searchParams.set('file', articleFile);
            url.searchParams.set('type', articleType);
            window.history.pushState({}, '', url);

            const container = document.getElementById('article-content-container');
            
            // 显示加载中状态
            container.innerHTML = '<div class="loading">加载中...</div>';
            
            // 显示详情视图，隐藏列表视图
            document.getElementById('articles-list-view').style.display = 'none';
            document.getElementById('article-detail-view').style.display = 'block';
            
            // 根据文件类型加载内容
            const fileType = articleType || (articleFile ? articleFile.toLowerCase().split('.').pop() : '');
            console.log('文件类型:', fileType);
            
            if (fileType === 'pdf') {
                // PDF文件，显示预览
                showPdfPreview(articleId, articleFile);
            } else {
                // 所有非PDF文件都尝试作为文本文件渲染
                console.log('尝试渲染文件:', articleFile);
                loadAndRenderMarkdown(articleId, articleFile);
            }
            
            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

    // 显示PDF预览
    function showPdfPreview(articleId, articleFile) {
        const container = document.getElementById('article-content-container');
        const articleTitle = document.querySelector(`.blog-article-item[data-article-id="${articleId}"] .article-title`)?.textContent || '文章标题';
        
        console.log('尝试加载PDF:', articleFile);
        // 直接使用相对路径，不做任何修改
        container.innerHTML = `
            <div class="pdf-viewer">
                <h1 class="full-article-title">${articleTitle}</h1>
                <div class="pdf-container">
                    <iframe src="${articleFile}" type="application/pdf" width="100%" height="800px"></iframe>
                </div>
                <div class="pdf-actions">
                    <a href="${articleFile}" target="_blank" class="open-pdf-btn">
                        <span class="pdf-icon">📄</span>
                        <span data-lang="zh">在新标签页打开</span>
                        <span data-lang="en">Open in New Tab</span>
                    </a>
                    <a href="${articleFile}" download class="download-pdf-btn">
                        <span class="download-icon">📥</span>
                        <span data-lang="zh">下载PDF文件</span>
                        <span data-lang="en">Download PDF</span>
                    </a>
                </div>
            </div>
        `;
    }

    // 初始化marked配置（支持代码高亮）
    function initMarked() {
        console.log('初始化marked配置...');
        
        // 检查marked库是否加载
        if (typeof marked === 'undefined') {
            console.error('❌ marked库未加载，使用备用方案');
            return false;
        }
        
        try {
            console.log('✅ marked库可用，配置中...');
            // 先使用基本配置，确保能正常解析
            marked.setOptions({
                breaks: true, // 支持换行符转换为<br>
                gfm: true, // 支持GitHub Flavored Markdown语法
                silent: false,
                // 简化配置，移除可能有问题的部分
                highlight: function(code) {
                    // 暂时移除highlight.js依赖，先确保基本功能
                    return code;
                }
            });
            
            console.log('✅ marked配置完成');
            return true;
        } catch (e) {
            console.error('❌ marked配置失败:', e);
            return false;
        }
    }

    // 加载并渲染Markdown文件
    function loadAndRenderMarkdown(articleId, articleFile) {
        console.log('🔄 开始加载Markdown文件:', articleId, articleFile);
        const container = document.getElementById('article-content-container');
        
        // 获取文章标题
        let articleTitle = '';
        if (document.querySelector(`.blog-article-item[data-article-id="${articleId}"]`)) {
            articleTitle = document.querySelector(`.blog-article-item[data-article-id="${articleId}"] .article-title`)?.textContent || '文章标题';
        } else {
            // 如果DOM中找不到，尝试从URL参数获取
            const urlParams = new URLSearchParams(window.location.search);
            articleTitle = urlParams.get('title') || '文章标题';
        }
        
        // 显示加载状态
        container.innerHTML = `<div class="loading">正在加载 ${articleFile} ...</div>`;
        
        // 远程加载Markdown文件
        console.log('📁 尝试加载文件:', articleFile);
        
        // 构建正确的文件路径
        let fileUrl;
        
        // 检查是否通过HTTP服务器访问
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            const basePath = window.location.origin;
            fileUrl = articleFile.startsWith('/') ? basePath + articleFile : basePath + '/' + articleFile;
            console.log('🌐 HTTP请求URL:', fileUrl);
        } else {
            // 如果是直接打开本地文件，提供友好的错误提示
            console.warn('⚠️ 检测到直接打开本地文件，由于浏览器安全限制，无法加载本地Markdown文件。请使用HTTP服务器访问。');
            container.innerHTML = `
                <div class="error" style="padding: 20px; border: 1px solid #ff4d4f; border-radius: 8px; background: #fff5f5;">
                    <h3 style="color: #ff4d4f;">安全限制</h3>
                    <p>浏览器安全限制不允许直接从本地文件系统加载其他文件。</p>
                    <p><strong>解决方案：</strong></p>
                    <ul>
                        <li>使用HTTP服务器访问此页面（如已启动的python -m http.server）</li>
                        <li>访问地址：<a href="http://localhost:8000/blog.html" target="_blank">http://localhost:8000/blog.html</a></li>
                        <li>或安装VSCode Live Server插件</li>
                    </ul>
                </div>
            `;
            return;
        }
        
        fetch(fileUrl)
            .then(response => {
                console.log('📥 响应状态:', response.status, response.statusText);
                if (!response.ok) {
                    throw new Error(`文件加载失败: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(markdownContent => {
                console.log('✅ 文件加载成功，内容长度:', markdownContent.length);
                
                try {
                    // 显示原始内容（用于调试）
                    console.log('📝 原始Markdown内容前100字符:', markdownContent.substring(0, 100));
                    
                    // 首先尝试最简单的方式显示
                    const safeContent = markdownContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    
                    // 初始化marked配置
                    if (initMarked()) {
                        console.log('🔧 使用marked库解析Markdown');
                        // 使用marked库将内容转换为HTML
                        try {
                            const htmlContent = marked.parse(markdownContent);
                            console.log('✅ Markdown解析成功');
                            
                            // 构建文章HTML
                            const articleHtml = `
                                <article class="full-article">
                                    <div class="article-header">
                                        <h1 class="full-article-title">${articleTitle}</h1>
                                    </div>
                                    <div class="article-content">
                                        ${htmlContent}
                                    </div>
                                    <div class="article-footer">
                                        <a href="${articleFile}" download class="download-original">
                                            <span class="download-icon">📥</span>
                                            <span data-lang="zh">下载原文</span>
                                            <span data-lang="en">Download Original</span>
                                        </a>
                                    </div>
                                </article>
                            `;

                            container.innerHTML = articleHtml;
                        } catch (parseError) {
                            console.error('❌ Markdown解析失败:', parseError);
                            // 解析失败时回退到显示原始内容
                            container.innerHTML = `
                                <article class="full-article">
                                    <div class="article-header">
                                        <h1 class="full-article-title">${articleTitle}</h1>
                                        <p style="color: #faad14;">⚠️ 使用原始文本显示（解析失败）</p>
                                    </div>
                                    <div class="article-content">
                                        <pre style="white-space: pre-wrap;">${safeContent}</pre>
                                    </div>
                                    <div class="article-footer">
                                        <a href="${articleFile}" download class="download-original">
                                            <span class="download-icon">📥</span>
                                            <span data-lang="zh">下载原文</span>
                                            <span data-lang="en">Download Original</span>
                                        </a>
                                    </div>
                                </article>
                            `;
                        }
                    } else {
                        // 使用备用方案：直接显示原始文本
                        console.warn('⚠️ 使用备用显示方式 - 原始文本');
                        container.innerHTML = `
                            <article class="full-article">
                                <div class="article-header">
                                    <h1 class="full-article-title">${articleTitle}</h1>
                                    <p style="color: #faad14;">⚠️ 使用原始文本显示（marked库不可用）</p>
                                </div>
                                <div class="article-content">
                                    <pre style="white-space: pre-wrap;">${safeContent}</pre>
                                </div>
                                <div class="article-footer">
                                    <a href="${articleFile}" download class="download-original">
                                        <span class="download-icon">📥</span>
                                        <span data-lang="zh">下载原文</span>
                                        <span data-lang="en">Download Original</span>
                                    </a>
                                </div>
                            </article>
                        `;
                    }
                    
                } catch (e) {
                    console.error('❌ 显示过程发生错误:', e);
                    // 最终的错误处理
                    container.innerHTML = `
                        <div class="error" style="padding: 20px; border: 1px solid #ff4d4f; border-radius: 8px; background: #fff5f5;">
                            <h3 style="color: #ff4d4f;">内容处理失败</h3>
                            <p><strong>错误信息:</strong> ${e.message}</p>
                            <p><strong>文件路径:</strong> ${articleFile}</p>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error('❌ 加载文章失败:', error, { articleId, articleFile });
                // 更详细的错误提示
                container.innerHTML = `
                    <div class="error" style="padding: 20px; border: 1px solid #ff4d4f; border-radius: 8px; background: #fff5f5;">
                        <h3 style="color: #ff4d4f;">加载文章失败</h3>
                        <p><strong>错误信息:</strong> ${error.message}</p>
                        <p><strong>文件路径:</strong> ${articleFile}</p>
                        <p><strong>请求URL:</strong> ${fileUrl}</p>
                        <p><strong>可能原因:</strong></p>
                        <ul>
                            <li>文件不存在或路径错误</li>
                            <li>服务器返回404错误</li>
                            <li>网络连接问题</li>
                            <li>跨域安全限制</li>
                        </ul>
                    </div>
                `;
            });
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