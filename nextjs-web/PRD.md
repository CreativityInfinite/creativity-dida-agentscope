你是一位资深 Next.js 全栈开发者。请基于以下需求，使用 Next.js 14（App Router）、Tailwind CSS、Tailwind animation、React、shadcn/ui 构建一个名为“Creativity Hunt”的 AI 工具导航网站。首页风格参考 linear.app（极简、黑色主题、微动效、强对比与留白），以 AI 搜索为核心，引导用户通过搜索找到工具。实现浅/深色切换、响应式、I18N（简体/繁体/英文），提供完整系统功能清单与页面布局设计，并附带部署文件支持多平台部署。

一、品牌与视觉规范

- 品牌名：Creativity Hunt
- 设计参考：linear.app（极简、黑色背景、精致网格、微妙渐变与发光、动效轻量、语义排版）
- 主题与配色：
  - 深色默认：背景 #0B0B0D、前景 #EDEDEF、强调色 Cyan/Purple 渐变（如 from-cyan-500 to-purple-600）
  - 浅色备用：背景 #FFFFFF、前景 #111827、强调色 #4F46E5（可调整）
- 字体与排版：极简、标题粗体、行高舒适、留白充足。Hero 采用大字号标题 + 次级说明文本。
- 动效风格：微动效（hover 轻微提升、光晕、淡入淡出、平滑过渡），Framer Motion + Tailwind animation；避免过于炫目。

二、首页（参考 linear.app）布局与文案

- Header（顶部导航，使用 shadcn NavigationMenu）：
  - 左侧 Logo（Creativity Hunt）
  - 主模块与子模块（下拉，避免单调）：
    - Explore（/explore）：Categories、Trending、Featured
    - Blog（/blog）：Articles、Tutorials、Updates
    - News（/news）：AI Trends、Releases、Events
    - Submit Tool（/submit）
    - Account（/account）：Dashboard、Profile、Settings
  - 右侧功能：全局搜索小输入框、ThemeToggle（浅/深色）、语言切换（zh-CN/zh-TW/en）
- Hero 区（居中，黑色主题，对比强烈）：
  - 标题文案（请直接生成吸引力强的简洁中文内容，支持 i18n，占位键 hero.title 与 hero.subtitle）：
    - 标题示例：用 AI，更快发现更好的工具
    - 副标题示例：一句话描述你的需求，Creativity Hunt 即刻为你匹配最合适的 AI 工具与方案
  - AI 搜索框（shadcn Input + Button，支持语义搜索占位）：
    - placeholder 示例：描述你的需求，如“生成产品海报的 AI”
    - 提交跳转 /search/[query]，debounce 与 loading 动效
  - 热门标签（Badge chips，点击触发搜索）：图像生成、文本写作、代码助手、语音视频、数据洞察、自动化
- 最近热门工具（Hero 下方，卡片网格）：
  - 使用 shadcn Card 展示 6-9 个热门工具（占位数据，来自 tools.json）
  - 卡片信息：名称、简述、分类、评分/标签、按钮“试用”
  - 动效：hover 轻微提升、边框发光、淡入序列动画
- 页面尾部 Footer：简洁版权与链接

三、系统功能清单（必须实现）

- 主题与响应式：
  - 浅/深色切换（next-themes + shadcn/ui ThemeProvider），默认深色
  - 响应式布局（Mobile-First），适配桌面与移动端，Header 在移动端折叠为 Drawer
- 搜索与发现：
  - 首页 AI 搜索框（自然语言输入，前端模糊匹配，未来可扩 AI NLP 占位）
  - 搜索结果页：卡片网格 + 过滤侧栏（分类、定价、评分、标签），支持分页或无限滚动
- 分类与推荐：
  - Explore：Categories（树状/Accordion）、Trending（评分排序）、Featured（人工精选）
  - 工具详情：Tabs（概述/用例/定价/评论）、相关推荐 Carousel
- 用户与提交：
  - NextAuth.js OAuth（GitHub/Discord），保护 Account 子页面
  - 收藏/点赞、搜索历史、提交新工具表单（管理员审核占位）
- 内容模块：
  - Blog（MDX 文章、教程、更新日志）
  - News（趋势新闻、发布动态、活动日历；首页热门工具联动 releases）
- I18N：
  - next-intl，默认 zh-CN、zh-TW、en，语言切换 Dropdown，文本通过 i18n 键管理
- 品质保障：
  - Skeleton 加载占位、Toast 通知、404 卡片
  - SEO 优化（meta、Open Graph）、性能优化（next/image、懒加载）

四、AI 工具与外部平台分类（作为占位数据）

- 图像生成与编辑：Midjourney、DALL·E 3、Stable Diffusion、Runway ML、Adobe Firefly
- 文本生成与写作：ChatGPT、Jasper、Grammarly、Claude、Notion AI
- 代码与开发：GitHub Copilot、Cursor、Replit Ghostwriter、Tabnine、CodeWhisperer
- 音频与视频：ElevenLabs、Descript、Synthesia、Adobe Podcast、Runway Gen-2
- 生产力与自动化：Zapier AI、Otter、ClickUp AI、Airtable AI、Notion AI
- 聊天与助手：Gemini（Bard）、Microsoft Copilot、Character.AI、Pi、Grok
- 数据分析与洞察：Tableau AI、Akkio、GA4、Hex、Databricks AI
- 创新平台：Hugging Face Spaces、Perplexity、Replicate、Vercel v0
- 数据格式：data/tools.json（name、description、link、category、rating、tags、releaseDate）

五、页面布局设计（线性风格实现细节）

- 全局 layout.tsx：
  - 顶部固定 NavigationMenu（透明黑背景 + blur +细边框），下拉子项动画
  - ThemeProvider、I18N Provider、全局渐变/网格背景（黑色主题下低对比粒子或网格）
- 首页 /：
  - Header：NavigationMenu（主项+子项），右侧小搜索、主题切换、语言切换
  - Hero：
    - H1 文案（i18n：hero.title）
    - Sub 文案（i18n：hero.subtitle）
    - Input 搜索框 + Button（发光边框，键盘回车触发）
    - 热门标签 Badge chips
  - 热门工具卡片：
    - Grid 3×2 或 3×3，Card 标题/描述/分类/按钮
    - Framer Motion stagger 淡入，hover 提升与发光
  - Footer：极简版权
- 搜索结果页 /search/[query]：
  - 左侧 Accordion 过滤，右侧 Card 网格
  - 顶部显示查询与结果数量，支持清除筛选
- 工具详情页 /tools/[id]：
  - Hero Card（工具名、标签、试用/收藏）
  - Tabs（概述/用例/定价/评论），相关推荐 Carousel
- Explore（/explore + 子路由）：
  - Tabs 或子导航切换 Categories/Trending/Featured
  - Categories：左侧树状分类，右侧工具网格
- Blog、News：
  - 文章/新闻列表 Card，MDX 支持，News Releases 与首页热门工具联动
- Account（Dashboard、Profile、Settings）：
  - Dashboard：收藏、历史、提交记录
  - Profile：表单
  - Settings：主题/语言切换选项
- Submit Tool：
  - 表单：名称、链接、描述、分类、标签、截图占位、提交按钮（loading）

六、技术栈与实现要求

- Next.js 14（App Router）、React 18、TypeScript
- Tailwind CSS + Tailwind animation（自定义 keyframes：glow、fade-in、lift）
- shadcn/ui 组件：navigation-menu、dropdown-menu、drawer、input、button、badge、card、accordion、tabs、skeleton、scroll-area、tooltip、pagination、carousel（若无原生，使用社区实现或占位）
- Framer Motion：页面与组件动画（stagger、fade、scale），轻量不喧宾夺主
- next-themes：主题切换；lucide-react 图标（Sun/Moon、Search、Globe）
- next-intl：I18N（zh-CN、zh-TW、en）
- NextAuth.js：OAuth（GitHub/Discord）
- 状态：Zustand 或 Context（搜索状态、收藏）
- 数据：data/tools.json（占位），posts.json/news.json（占位）
- 路由：/, /search/[query], /tools/[id], /explore (sub: /categories, /trending, /featured), /blog (sub: /articles, /tutorials, /updates), /news (sub: /trends, /releases, /events), /submit, /dashboard, /profile, /settings, /about

七、项目结构与文件

- app/：layout.tsx、globals.css、页面目录；error.tsx（404）
- components/：NavigationMenu.tsx、SearchBar.tsx、ToolCard.tsx、CategoryAccordion.tsx、ThemeToggle.tsx、LangSwitcher.tsx、ArticleCard.tsx
- lib/：i18n.ts、theme.ts、search.ts（模糊匹配）、navigation.ts（主/子模块数据）
- data/：tools.json、posts.json、news.json
- public/：logo、icons、背景资源
- 配置：
  - tailwind.config.js（暗黑主题、动画）
  - shadcn 初始化与组件添加脚本
  - next-intl 配置与语言包：src/i18n/locales/zh-CN.json、zh-TW.json、en.json（包含 hero.title/hero.subtitle/navigation 等键）

八、文案占位（支持 i18n）

- hero.title：
  - zh-CN：用 AI，更快发现更好的工具
  - zh-TW：用 AI，更快發現更好的工具
  - en：Find better AI tools, faster
- hero.subtitle：
  - zh-CN：一句话描述你的需求，Creativity Hunt 即刻为你匹配最合适的 AI 工具与方案
  - zh-TW：一句話描述你的需求，Creativity Hunt 立即為你匹配最合適的 AI 工具與方案
  - en：Describe your need in one sentence and Creativity Hunt will match the best AI tools instantly
- search.placeholder：
  - zh-CN：描述你的需求，如“生成产品海报的 AI”
  - zh-TW：描述你的需求，如「生成產品海報的 AI」
  - en：Describe your need, e.g. “AI to generate product posters”

九、部署与文档

- README.md：项目概述（双语）、功能清单、页面布局、安装与运行、贡献指南、MIT 许可证、截图占位
- 部署文件：
  - Vercel：vercel.json（i18n 与路由配置）
  - Netlify：netlify.toml
  - Docker：Dockerfile（node:18-alpine 多阶段）
  - GitHub Pages：gh-pages 脚本
- package.json 脚本：dev、build、start、lint、format、test、deploy:vercel
- .env.example：NEXTAUTH_SECRET、OPENAI_API_KEY（未来 NLP 占位）、SUPABASE_URL/KEY（可选）

十、实现要点与验收标准

- 首页符合 linear.app 的极简黑色风格：对比强烈、留白合理、动效克制
- NavigationMenu 子模块完整，移动端使用 Drawer，交互顺畅
- Hero 文案与搜索框显眼，输入体验顺滑，搜索跳转与加载反馈明确
- 热门工具卡片美观且有动效，点击可进入详情
- 浅/深色切换、I18N、响应式均正常工作
- 代码干净（ESLint、Prettier），可运行（npm install && npm run dev），Lighthouse 分数优秀

——

请基于以上提示词，一次性生成完整项目代码与结构，确保首页风格接近 linear.app 的极简黑色主题，同时提供必要的占位数据与文案，以便快速预览与迭代。
