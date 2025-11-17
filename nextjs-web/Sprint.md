# Creativity-Box AI 工具导航网站开发迭代清单

这份迭代清单基于整个项目需求（包括系统功能清单、页面布局设计、NavigationMenu 优化、AI 工具分类、技术栈等），设计为分阶段、可执行的开发计划。目标是逐步构建 MVP（最小 viable 产品），然后迭代增强功能。每个阶段包括：

- **目标**：阶段性成果。
- **任务**：具体步骤、依赖文件/工具、预计时间（假设单人开发，单位：天）。
- **依赖**：前置条件。
- **验收标准**：测试点。
- **工具/命令**：实现提示。

总开发周期估计：4-6 周（视团队规模调整）。优先使用 TypeScript、shadcn UI，确保代码模块化（组件复用）、响应式（Mobile-First）和 i18n 支持。版本控制：Git 分支（e.g., `feature/navigation`）。测试：手动 + Jest 单元测试（核心组件）。部署：Vercel 预览分支。

---

## 阶段 0: 项目准备与初始化（1 天）

**目标**：设置开发环境，建立项目骨架，确保可运行。
**依赖**：Node.js 18+、Git、VS Code。
**任务**：

- [ ] 初始化 Next.js 项目：`npx create-next-app@14 creativity-box --typescript --tailwind --eslint --app`（App Router）。
- [ ] 配置 Tailwind：更新`tailwind.config.js`（科技主题：colors { cyan: '#00FFFF', purple: '#8B5CF6' }，dark mode 默认）。
- [ ] 安装核心依赖：`npm i framer-motion next-themes@0.2 next-intl@3 next-auth@4 lucide-react@0.3 lodash react-infinite-scroll-component @mdx-js/loader`。
- [ ] 安装 shadcn UI：`npx shadcn-ui@latest init`（主题：slate/dark），然后添加组件：`npx shadcn-ui@latest add navigation-menu card input badge accordion tabs button skeleton scroll-area drawer progress dropdown-menu tooltip carousel avatar form tooltip`。
- [ ] 创建数据文件：`src/data/tools.json`（填充 8 分类占位数据，50+条工具 JSON）；`src/data/navigation.json`（主/子模块结构）；`src/data/posts.json`（博客/新闻占位）。
- [ ] 设置 i18n：`src/i18n/locales/`下创建 zh-CN.json/en.json（翻译 Navigation、Hero 等键）；配置`next.config.js`和 middleware.ts 支持多语言路由。
- [ ] 添加根布局：`app/layout.tsx`（ThemeProvider、i18n Provider、NavigationMenu wrapper、AnimatePresence for 页面过渡）。
- [ ] 自定义 globals.css：添加粒子背景@keyframes（CSS Canvas，低 CPU）和霓虹 glow（box-shadow pulse）。
- [ ] 初始化 Git：`git init`，添加 README.md（项目概述、功能清单草稿）。
      **验收标准**：`npm run dev`启动，localhost:3000 显示空白页无错误；Tailwind/shadcn 样式生效。
      **工具/命令**：npm/yarn、npx shadcn。

---

## 阶段 1: 核心 UI 组件与 NavigationMenu（2-3 天）

**目标**：构建导航和基础 UI，确保响应式和主题支持，避免首页单调。
**依赖**：阶段 0 完成。
**任务**：

- [ ] 实现 NavigationMenu 组件（`components/NavigationMenu.tsx`）：使用 shadcn NavigationMenu + DropdownMenu（主模块下拉子模块：Explore/Blog/News/Account）；集成 i18n 键、ThemeToggle（Sun/Moon Button）、LangSwitcher（DropdownMenu，zh-CN/en 切换）；右上小搜索 Input（全局 debounce）。
  - 子模块：Explore (Categories/Trending/Featured)、Blog (Articles/Tutorials/Updates)、News (Trends/Releases/Events)、Account (Dashboard/Profile/Settings，NextAuth 保护)。
  - 动画：hover glow（shadow-cyan），展开 stagger fade-in；移动端 Drawer 折叠。
- [ ] 创建 ToolCard 组件（`components/ToolCard.tsx`）：shadcn Card（name/desc/badge category/link/rating/tags），hover lift（Framer Motion translateY(-4px) + shadow）。
- [ ] 实现 CategoryAccordion（`components/CategoryAccordion.tsx`）：shadcn Accordion 树状（8 分类，点击过滤数据）。
- [ ] 添加粒子背景组件（`components/Particles.tsx`）：CSS Canvas 或 react-particles 轻量实现（蓝紫粒子，背景 wrapper）。
- [ ] 配置主题切换：`lib/theme.tsx`（next-themes，localStorage 持久化；浅色：bg-white accent-blue）。
- [ ] 测试响应式：移动汉堡 Drawer 展开子模块垂直列表。
      **验收标准**：NavigationMenu 在所有页面复用，hover/点击子模块路由正确（e.g., /explore/categories）；主题/Lang 切换生效，无 JS 错误；Lighthouse 移动得分>80。
      **工具/命令**：Framer Motion docs、shadcn UI playground。

---

## 阶段 2: 首页布局实现（2 天）

**目标**：构建英雄搜索页，集成 shadcn UI，占屏布局科技感强。
**依赖**：阶段 1 完成（NavigationMenu/ToolCard）。
**任务**：

- [ ] 实现首页页面（`app/page.tsx`）：遵循提供的 ASCII Wireframe 和组件伪码。
  - Hero Section：motion.section（60-70vh，Card 包装 H1/Badge/Input+Button）；i18n placeholder；Badge chips 点击预填充搜索或路由 Explore 过滤。
  - 底部 Section：H2 + ScrollArea（网格 Card，5-6 recentTools 从 tools.json/random 或 news/releases 排序）；motion stagger 动画 + hover lift。
  - Footer：简单 div，i18n 版权。
- [ ] 集成搜索逻辑：`lib/search.ts`（lodash debounce 模糊匹配 tools.json，路由到/search/[query]）。
- [ ] 添加加载状态：Suspense + shadcn Skeleton（Hero/Input/Bottom Cards）。
- [ ] 优化交互：Enter 键搜索；Button loading Spinner（Loader2 icon）；SEO meta（next/head，i18n title/desc）。
- [ ] 响应式调整：移动 Hero 全宽、底部单列 grid-cols-1。
      **验收标准**：首页加载<2s，搜索输入"AI 图像"跳转结果页显示相关 Card（e.g., Midjourney）；动画流畅（无卡顿）；粒子背景不影响性能（CPU<10%）。
      **工具/命令**：Framer Motion variants、next/router。

---

## 阶段 3: 核心页面与功能模块（4-5 天）

**目标**：实现搜索、工具浏览、提交等 MVP 功能，覆盖系统功能清单。
**依赖**：阶段 2 完成（首页搜索、数据文件）。
**任务**：

- [ ] 搜索结果页（`app/search/[query]/page.tsx`）：左侧 Accordion 过滤（分类/定价/评分，从 CategoryAccordion 复用）；右侧 Card 网格（无限滚动 react-infinite-scroll，过滤 tools.json）；Breadcrumb + H1 i18n。
- [ ] 工具详情页（`app/tools/[id]/page.tsx`）：Hero Card 预览；shadcn Tabs（概述/用例 Accordion/定价 Table/评论 Form 列表）；底部 Carousel 相关推荐（类似工具基于 category/tags）。
  - 收藏/点赞：Zustand store（localStorage 持久化，NextAuth 用户 ID）。
- [ ] Explore 子模块页：`/explore/page.tsx`（Tabs 切换 Categories/Trending/Featured）；Categories 用 Accordion + 右侧 Grid；Trending 排序 by rating；Featured 手动 5 个精选（e.g., Midjourney）。
- [ ] Blog/News 子模块页：`/blog/page.tsx`和`/news/page.tsx`（子 Tabs/Dropdown；文章 Card 列表从 posts.json MDX 渲染；News/Releases 联动首页底部数据）。
- [ ] 提交页（`/submit/page.tsx`）：shadcn Form（Input/Select/Textarea/Checkbox，Zod 验证；类别 Select 从分类数据；mock 提交到 console/localStorage）。
- [ ] 用户子模块（保护路由）：`/dashboard/page.tsx`（Tabs：收藏/历史/提交，Card 列表）；`/profile/page.tsx`（Form 编辑，shadcn Input/Avatar）；`/settings/page.tsx`（Toggle 主题/语言/通知）。
- [ ] 关于页（`/about/page.tsx`）：静态 Card 网格（使命/分类概览/联系 Form）。
- [ ] 404 页（`app/[...not-found]/page.tsx`）：科技 Card（错误消息 + Button 回首页）。
      **验收标准**：所有路由工作（e.g., /explore/trending 显示高 rating 工具）；过滤/搜索准确（>80%匹配率）；表单提交无错误，数据持久化；i18n 全覆盖（切换语言文本更新）。
      **工具/命令**：Zod schema、Zustand store、MDX loader。

---

## 阶段 4: 用户认证与高级功能（2-3 天）

**目标**：添加登录、后台支持，确保内容/用户互动完整。
**依赖**：阶段 3 完成（保护页）。
**任务**：

- [ ] 配置 NextAuth：`app/api/auth/[...nextauth]/route.ts`（GitHub/Discord providers）；middleware.ts 保护 Account 子模块（/dashboard 等）。
  - 会话管理：useSession hook 在 Dashboard/Tabs 使用。
- [ ] 用户功能扩展：收藏持久化到 localStorage（未来 Supabase）；评论 Form 在工具详情需登录；提交工具管理员审核占位（console log）。
- [ ] 集成 CMS 占位：`lib/api.ts` mock CRUD（tools.json 读写）；未来 Supabase URL 在.env。
- [ ] 动画全局：Layout AnimatePresence（页面过渡 fade/scale 0.3s）；Card/Dropdown 懒加载。
- [ ] PWA 支持：next-pwa 插件（离线首页 Cache tools.json）。
      **验收标准**：OAuth 登录/登出成功，保护页重定向登录；收藏跨会话持久；无认证错误（e.g., 非登录用户见 Toast 提示）。
      **工具/命令**：NextAuth docs、Supabase dashboard（占位）。

---

## 阶段 5: 测试、优化与部署（2 天）

**目标**：确保质量高、性能优，准备生产。
**依赖**：全阶段完成。
**任务**：

- [ ] 单元测试：Jest for NavigationMenu/ToolCard/Search 逻辑（覆盖 i18n/主题）。
- [ ] 端到端测试：手动 Chrome DevTools（响应式、Lighthouse 性能>90、SEO、可访问性 ARIA）。
- [ ] 错误处理：全局 ErrorBoundary；Toast（shadcn Alert）for 提交/登录失败。
- [ ] 优化：Image next/image 懒加载；Bundle 分析`next build`；移除 console.log。
- [ ] 更新 README.md：完整功能清单、页面布局 ASCII/截图描述、安装/运行指南、贡献（e.g., 添加子模块）。
- [ ] 部署配置：vercel.json（i18n rewrites）；.env.example（NEXTAUTH_SECRET 等）；Dockerfile；package.json scripts（lint/deploy）。
- [ ] 部署：Vercel/Netlify push，测试生产 URL（多语言路由、主题持久）。
      **验收标准**：全站无崩溃，搜索/导航流畅；部署后访问/en/explore/categories 正常；Lighthouse 总分>85。
      **工具/命令**：Jest、Vercel CLI、Lighthouse。

---

## 总体注意事项

- **优先级**：MVP = 阶段 0-3（基本浏览/搜索）；迭代 1 = 阶段 4（用户功能）；迭代 2 = 性能/扩展（e.g., 真实 Supabase、OpenAI NLP 搜索）。
- **风险**：i18n 路由冲突（测试多语言）；动画性能（throttle Framer Motion）；数据规模（tools.json>100 条时分页）。
- **追踪**：用 Trello/Jira 板，每任务 checkbox；每日 commit（semantic: feat: add navigation）。
- **扩展**：未来迭代：真实 RSS for News、AI 搜索 API（OpenAI）、移动 App（Capacitor）。
- **资源**：参考 shadcn docs、Next.js examples；如果卡住，用 GitHub issues 求助社区。

这个清单便于开发跟踪，按序执行可快速迭代 MVP。如果需要调整任务细节、添加时间表 Gantt 或特定工具集成（如 Supabase 脚本），请告知！
