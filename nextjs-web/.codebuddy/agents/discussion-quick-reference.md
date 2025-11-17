# Discussion 页面快速参考

## 📑 页面导航

```
/discussion/general          - 综合讨论
/discussion/feedback         - 反馈建议
/discussion/tools            - 工具推荐
/discussion/showcase         - 作品展示
/discussion/tutorials        - 教程分享
/discussion/resources        - 资源分享
```

## 🎨 设计模式

### General - 话题列表模式

```
统计数据（4列）
├─ 话题列表（8列）
│  ├─ 分类筛选
│  ├─ 排序选项
│  └─ 话题卡片
└─ 侧边栏（4列）
   ├─ 活跃用户
   ├─ 讨论指南
   └─ 快速链接
```

### Feedback - 表单+列表模式

```
统计数据（4列）
├─ 反馈表单（5列）
│  ├─ 类型选择
│  ├─ 标题输入
│  ├─ 详细描述
│  └─ 提交按钮
└─ 反馈列表+路线图（7列）
   ├─ 类型筛选
   ├─ 反馈列表
   └─ 开发路线图
```

### Tools - 推荐展示模式

```
统计数据（4列）
├─ 推荐列表（8列）
│  ├─ 标签筛选
│  ├─ 排序选项
│  └─ 推荐卡片
│     ├─ 用户信息
│     ├─ 工具卡片
│     ├─ 推荐理由
│     └─ 互动数据
└─ 侧边栏（4列）
   ├─ 推荐按钮
   ├─ 热门推荐者
   ├─ 推荐指南
   └─ 热门标签
```

### Showcase - 画廊展示模式

```
统计数据（4列）
精选作品（2列大卡片）
作品网格（3列）
├─ 分类筛选
├─ 排序选项
└─ 作品卡片
   ├─ 作品图片
   ├─ 标题描述
   ├─ 作者信息
   ├─ 工具标签
   └─ 互动数据
```

### Tutorials - 学习路径模式

```
统计数据（4列）
学习路径（3列卡片）
├─ 教程列表（8列）
│  ├─ 难度筛选
│  ├─ 排序选项
│  └─ 教程卡片
│     ├─ 作者信息
│     ├─ 难度标识
│     ├─ 教程详情
│     └─ 工具标签
└─ 侧边栏（4列）
   ├─ 分享按钮
   ├─ 学习统计
   ├─ 学习建议
   └─ 热门分类
```

### Resources - 资源库模式

```
统计数据（4列）
├─ 筛选面板（3列）
│  ├─ 资源类型
│  ├─ 热门标签
│  └─ 上传指南
└─ 资源列表（9列）
   ├─ 排序选项
   └─ 资源卡片
      ├─ 类型图标
      ├─ 资源信息
      ├─ 作者信息
      ├─ 标签
      └─ 下载按钮
```

## 🎯 核心组件

### 统计卡片

```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
  <div className="px-4 py-3 rounded-lg border bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
      <Icon className="h-4 w-4" />
      <span className="text-xs font-medium">标题</span>
    </div>
    <div className="text-xl sm:text-2xl font-bold">数值</div>
  </div>
</div>
```

### 筛选按钮组

```tsx
<div className="flex flex-wrap gap-2">
  <button onClick={() => setFilter(value)} className={`px-3 py-1.5 text-xs rounded-lg transition ${filter === value ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/50 hover:bg-muted'}`}>
    标签
  </button>
</div>
```

### 列表项卡片

```tsx
<div className="p-5 rounded-xl border bg-card hover:bg-accent/50 transition group">
  <div className="flex gap-4">
    <Avatar />
    <div className="flex-1 min-w-0">
      <h3 className="group-hover:text-primary transition">标题</h3>
      <p className="text-muted-foreground">描述</p>
      <div className="flex items-center gap-4">{/* 互动数据 */}</div>
    </div>
  </div>
</div>
```

## 🔧 常用功能

### 筛选逻辑

```tsx
const filtered = React.useMemo(() => {
  let items = category === 'all' ? allItems : allItems.filter((item) => item.category === category);

  if (sortBy === 'popular') {
    items = [...items].sort((a, b) => b.votes - a.votes);
  }

  return items;
}, [category, sortBy]);
```

### 排序选项

```tsx
<button onClick={() => setSortBy('latest')} className={sortBy === 'latest' ? 'text-primary font-medium' : 'text-foreground/60'}>
  最新
</button>
```

### 标签筛选

```tsx
<button onClick={() => toggleTag(tag)} className={selectedTags.includes(tag) ? 'bg-primary text-primary-foreground' : 'border-muted-foreground/30 hover:bg-muted'}>
  {tag}
</button>
```

## 📱 响应式断点

```css
/* 移动端 */
grid-cols-1

/* 平板 */
sm:grid-cols-2
md:grid-cols-3

/* 桌面 */
lg:grid-cols-4
lg:col-span-8
```

## 🎨 颜色方案

```tsx
// 蓝色 - 主要数据
from-blue-500/10 to-blue-600/5 border-blue-500/20

// 绿色 - 成功/完成
from-green-500/10 to-green-600/5 border-green-500/20

// 紫色 - 特殊/高级
from-purple-500/10 to-purple-600/5 border-purple-500/20

// 橙色 - 趋势/新增
from-orange-500/10 to-orange-600/5 border-orange-500/20

// 粉色 - 互动/喜欢
from-pink-500/10 to-pink-600/5 border-pink-500/20
```

## 🚀 快速开发

### 添加新页面

1. 复制相似页面作为模板
2. 修改数据接口和类型
3. 调整布局和样式
4. 添加筛选和排序逻辑
5. 测试响应式布局

### 常见模式

- 统计卡片：4 列网格
- 主内容：8 列或 9 列
- 侧边栏：4 列或 3 列
- 网格布局：2-3 列
- 列表项：全宽卡片

## 💡 最佳实践

1. **避免卡片滥用** - 只在必要时使用 Card 组件
2. **保持独特性** - 每个页面有自己的特色
3. **丰富内容** - 使用多种展示方式
4. **响应式优先** - 移动端体验优先
5. **交互反馈** - Hover 和状态变化
6. **代码质量** - 无错误、无警告

## 🎉 完成！

所有 Discussion 页面已完成开发，代码质量优秀！
