// 文章加载器 - 用于动态加载和展示解析后的docx文章内容

class ArticleLoader {
    constructor() {
        this.articles = [];
        this.currentArticleId = null;
    }

    async loadArticles() {
        // 加载文章数据
        try {
            const response = await fetch('articles_data.json');
            if (!response.ok) {
                throw new Error('Failed to load articles data');
            }
            this.articles = await response.json();
            return this.articles;
        } catch (error) {
            console.error('Error loading articles:', error);
            // 返回模拟数据作为备选
            return this.getMockArticles();
        }
    }

    getMockArticles() {
        // 获取模拟文章数据（当JSON文件加载失败时使用）
        return [
            {
                "id": "1",
                "title": "12.14雪夜",
                "date": "2023-12-14",
                "category": "文学创作",
                "description": "一场雪夜的思考与感悟",
                "filename": "12.14雪夜.docx",
                "content": "<p>雪，纷纷扬扬地落着。</p><p>这是一个宁静的夜晚，窗外的世界被白雪覆盖，一切都显得那么纯净。</p><p>我站在窗前，看着雪花缓缓飘落，思绪也随之飘向远方...</p><h2>雪中漫步</h2><p>穿上厚重的外套，我决定出门走走。踩在雪地上，发出咯吱咯吱的声音，打破了夜晚的宁静。</p><p>路灯下，雪花在空中翩翩起舞，宛如无数精灵在跳跃。</p><h2>思考</h2><p>雪夜总是能让人陷入深思。在这个洁白无瑕的世界里，仿佛一切烦恼都被净化了。</p><p>我们的生活就像这场雪，有时纷纷扬扬，有时静谧无声，但最终都会留下痕迹。</p>"
            },
            {
                "id": "2",
                "title": "mindcopy标准介绍及其示例",
                "date": "2023-11-20",
                "category": "技术标准",
                "description": "关于意识复制技术的标准与实践",
                "filename": "mindcopy标准介绍及其示例.docx",
                "content": "<h2>什么是Mindcopy标准？</h2><p>Mindcopy是一项前沿技术，旨在实现人类意识的数字化复制和转移。本标准定义了相关的技术规范和最佳实践。</p><h2>核心原则</h2><p>1. 安全性：确保复制过程中不损害原始意识</p><p>2. 完整性：保证复制的意识包含全部记忆和思维模式</p><p>3. 隐私保护：严格保护意识数据的隐私</p><h2>技术架构</h2><p>Mindcopy系统由以下几个核心组件构成：</p><p>- 神经扫描模块</p><p>- 数据处理引擎</p><p>- 意识模拟环境</p><p>- 接口适配层</p>"
            },
            {
                "id": "3",
                "title": "宇宙的意识",
                "date": "2023-10-05",
                "category": "哲学思考",
                "description": "探索宇宙与意识的关系",
                "filename": "宇宙的意识.docx",
                "content": "<h2>意识的本质</h2><p>意识是什么？是大脑的产物，还是某种超越物质的存在？这个问题困扰了人类数千年。</p><h2>宇宙作为一个整体</h2><p>如果我们把宇宙看作一个巨大的系统，那么它是否也拥有某种形式的意识？</p><p>从微观粒子到宏观星系，宇宙中的一切都在按照某种规律运行，这种秩序感是否暗示着某种潜在的意识？</p><h2>人类意识与宇宙的联系</h2><p>人类的意识可能是宇宙意识的一种表现形式。我们通过观察和思考宇宙，实际上是宇宙在通过我们认识自己。</p>"
            },
            {
                "id": "4",
                "title": "青春诗 2.0",
                "date": "2023-09-15",
                "category": "诗歌创作",
                "description": "关于青春的诗意表达",
                "filename": "青春诗 2.0.docx",
                "content": "<p>青春是一首未完成的诗</p><p>字里行间写满了梦想和迷茫</p><p>我们在诗中奔跑，跌倒，爬起</p><p>每一次呼吸都是新的韵脚</p><h3>春</h3><p>青春如早春的嫩芽</p><p>充满生机，却又脆弱</p><p>每一片新叶都承载着希望</p><h3>夏</h3><p>青春似盛夏的阳光</p><p>热烈，灿烂，无所畏惧</p><p>每一道光芒都照亮远方</p><h3>秋</h3><p>青春若金秋的果实</p><p>饱满，充实，韵味悠长</p><p>每一份收获都值得珍藏</p><h3>冬</h3><p>青春像冬日的雪花</p><p>纯净，美丽，稍纵即逝</p><p>每一片都有独特的模样</p>"
            }
        ];
    }

    getArticleById(id) {
        // 根据ID获取文章
        return this.articles.find(article => article.id === id);
    }

    renderArticleList(container) {
        // 渲染文章列表
        container.innerHTML = '';
        
        if (this.articles.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <p data-lang="zh">暂无文章</p>
                <p data-lang="en">No articles available</p>
            `;
            container.appendChild(emptyState);
            return;
        }

        this.articles.forEach(article => {
            const articleItem = document.createElement('div');
            articleItem.className = 'blog-article-item';
            articleItem.dataset.articleId = article.id;
            
            // 格式化日期显示
            const date = new Date(article.date);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
            articleItem.innerHTML = `
                <h3 class="article-title">${article.title}</h3>
                <div class="article-meta">
                    <span class="article-date">${formattedDate}</span>
                    <span class="article-category">${article.category}</span>
                </div>
                <p class="article-excerpt" data-lang="zh">${article.description}</p>
                <p class="article-excerpt" data-lang="en">${article.description}</p>
                <div class="article-actions">
                    <button class="read-article-btn" data-lang="zh">阅读文章</button>
                    <button class="read-article-btn" data-lang="en">Read Article</button>
                    <a href="aricle/${article.filename}" download class="download-article-btn">
                        <span data-lang="zh">下载文档</span>
                        <span data-lang="en">Download</span>
                    </a>
                </div>
            `;
            
            // 添加点击事件
            const readBtn = articleItem.querySelector('.read-article-btn');
            readBtn.addEventListener('click', () => {
                this.renderArticleDetails(article.id);
            });
            
            container.appendChild(articleItem);
        });
    }

    renderArticleDetails(articleId) {
        // 渲染文章详情
        const article = this.getArticleById(articleId);
        if (!article) return;
        
        this.currentArticleId = articleId;
        
        // 隐藏列表，显示详情
        const articlesGrid = document.querySelector('.articles-grid');
        const articleDetails = document.querySelector('.article-details');
        
        if (articlesGrid && articleDetails) {
            articlesGrid.style.display = 'none';
            articleDetails.style.display = 'block';
        }
        
        // 设置文章详情内容
        const fullArticleTitle = document.querySelector('.full-article-title');
        const fullArticleMeta = document.querySelector('.full-article-meta');
        const fullArticleContent = document.querySelector('.full-article-content');
        const backToListBtn = document.querySelector('.back-to-list-btn');
        const articleDownloadLink = document.querySelector('.article-download-link');
        
        if (fullArticleTitle) {
            fullArticleTitle.textContent = article.title;
        }
        
        if (fullArticleMeta) {
            const date = new Date(article.date);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            fullArticleMeta.innerHTML = `
                <span class="article-date">${formattedDate}</span>
                <span class="article-category">${article.category}</span>
            `;
        }
        
        if (fullArticleContent) {
            fullArticleContent.innerHTML = article.content;
        }
        
        if (backToListBtn) {
            backToListBtn.addEventListener('click', () => {
                this.showArticleList();
            });
        }
        
        if (articleDownloadLink) {
            articleDownloadLink.href = `aricle/${article.filename}`;
            articleDownloadLink.download = article.filename;
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showArticleList() {
        // 显示文章列表
        const articlesGrid = document.querySelector('.articles-grid');
        const articleDetails = document.querySelector('.article-details');
        
        if (articlesGrid && articleDetails) {
            articlesGrid.style.display = 'grid';
            articleDetails.style.display = 'none';
        }
        
        this.currentArticleId = null;
    }

    initialize() {
        // 初始化文章加载器
        return this.loadArticles().then(() => {
            const articlesGrid = document.querySelector('.articles-grid');
            if (articlesGrid) {
                this.renderArticleList(articlesGrid);
            }
            
            // 处理URL参数，支持直接跳转到文章详情
            const urlParams = new URLSearchParams(window.location.search);
            const articleId = urlParams.get('article');
            if (articleId) {
                this.renderArticleDetails(articleId);
            }
        });
    }
}

// 导出单例实例
const articleLoader = new ArticleLoader();
export default articleLoader;