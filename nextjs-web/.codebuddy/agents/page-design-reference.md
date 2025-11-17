# 页面设计参考指南

## 设计理念

### 核心原则

1. **避免卡片滥用**：只在工具卡片和操作卡片中使用 Card 组件
2. **独特性设计**：每个页面都有自己的视觉特色和布局
3. **数据驱动**：使用 useMemo 优化性能
4. **响应式优先**：移动端优先的设计方法

### 容器替代方案

```tsx
// ❌ 不要这样做（过度使用卡片）
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>

// ✅ 应该这样做（简单容器）
<div className="p-3 sm:p-4 rounded-lg border border-muted/50 hover:border-primary/30 transition">
  <div className="text-xs text-muted-foreground mb-1">标题</div>
  <div className="text-2xl font-bold">内容</div>
</div>
```

## 页面设计模式

### 1. 数据展示卡片

```tsx
<div className="p-3 sm:p-4 rounded-lg border border-primary/20 bg-primary/5">
  <div className="text-xs text-muted-foreground mb-1">标签</div>
  <div className="text-2xl sm:text-3xl font-bold text-primary">数值</div>
  <div className="text-xs text-muted-foreground mt-1">描述</div>
</div>
```

### 2. 列表项

```tsx
<div className="flex items-start gap-3 p-3 rounded-lg border border-muted/50 hover:border-primary/30 transition">
  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
    <span className="text-sm font-bold text-primary">#{idx + 1}</span>
  </div>
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 mb-1">
      <h3 className="text-sm font-semibold truncate">标题</h3>
      <Badge variant="secondary" className="flex-shrink-0">
        标签
      </Badge>
    </div>
    <p className="text-xs text-muted-foreground line-clamp-1">描述</p>
  </div>
</div>
```

### 3. 进度条展示

```tsx
<div className="space-y-1">
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">标签</span>
    <Badge variant="secondary" className="text-xs">
      数值
    </Badge>
  </div>
  <Progress value={percentage} className="h-2" />
</div>
```

### 4. 排名徽章

```tsx
<div className="absolute -top-2 -left-2 z-10">
  <Badge className={`${idx === 0 ? 'bg-yellow-500 text-white' : idx === 1 ? 'bg-gray-400 text-white' : 'bg-orange-600 text-white'}`}>#{idx + 1}</Badge>
</div>
```

## Trending 页面特色

### Now - 热度指标

- 使用圆形排名徽章（w-10 h-10）
- 热度指标卡片（3 列网格）
- 完整排行列表

### Top Rated - 评分对比

- 评分分布图表（使用 Progress）
- 分类评分对比（横向进度条）
- 评分筛选按钮组

### Rising - 增长势头

- 增长势头统计（2 列）
- 分类分布进度条
- 增长指标说明

### Most Searched - 搜索热度

- 时间范围选择按钮
- 热门搜索词卡片（带趋势指标）
- 搜索排行列表

## Featured 页面特色

### Editors Picks - 推荐标准

- 4 个推荐标准卡片
- 按分类展示推荐工具
- 编辑寄语

### New Launches - 新品特性

- 4 个新品特性（带 emoji）
- 按分类展示最新工具
- 发布说明

### Community Favorites - 社区投票

- 社区统计数据（3 列）
- Top 5 工具（5 列网格）
- 其他推荐工具

### Weekly Highlights - 每周更新

- 本周亮点（2 列网格）
- 重要更新列表
- 本周推荐工具
- 编辑观点

## 响应式断点

```tsx
// 移动端
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

// 统计数据
grid-cols-3 gap-2 sm:gap-4

// 文本大小
text-xs sm:text-sm
text-sm sm:text-base
text-base sm:text-lg
text-xl sm:text-3xl lg:text-4xl

// 间距
px-4 sm:px-6 lg:px-8
py-4 sm:py-6
mb-3 sm:mb-4
gap-2 sm:gap-3
```

## 颜色使用

### 主色调

- `text-primary` - 主要文本
- `border-primary/20` - 主色边框
- `bg-primary/5` - 主色背景

### 辅助色

- `text-amber-500` - 评分、排名
- `text-emerald-500` - 增长、成功
- `text-blue-500` - 信息
- `text-orange-500` - 热度

### 中性色

- `text-muted-foreground` - 次要文本
- `border-muted/50` - 中性边框
- `bg-muted/30` - 中性背景

## 常用组件组合

### 标题 + 图标

```tsx
<div className="flex items-center gap-2 mb-2">
  <IconComponent className="h-5 w-5 text-primary" />
  <h1 className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">标题</h1>
</div>
```

### 标题 + 徽章

```tsx
<div className="mb-4 sm:mb-6 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <IconComponent className="h-4 w-4 text-primary" />
    <h2 className="text-base sm:text-lg font-semibold">标题</h2>
  </div>
  <Badge variant="secondary" className="text-xs">
    数值
  </Badge>
</div>
```

### 说明文本容器

```tsx
<div className="p-4 rounded-lg border border-muted/50 bg-muted/30">
  <h3 className="font-semibold text-sm mb-2">标题</h3>
  <ul className="space-y-1 text-xs text-muted-foreground">
    <li>
      • <span className="font-semibold">关键词</span>：说明文本
    </li>
  </ul>
</div>
```

## 性能优化

### 使用 useMemo

```tsx
const data = React.useMemo(() => {
  // 复杂计算
  return result;
}, [dependencies]);
```

### 使用 useEffect 处理参数

```tsx
React.useEffect(() => {
  const langFromUrl = searchParams.get('lang') || 'zh-CN';
  setLocale(langFromUrl);
}, [searchParams]);
```

## 国际化支持

所有页面都支持通过 `?lang=zh-CN` 或 `?lang=en` 参数切换语言。

```tsx
const locale = searchParams.get('lang') || 'zh-CN';
// 在链接中传递 locale
href={`/path?lang=${locale}`}
```

## 常见错误

❌ **不要**：

- 过度使用 Card 组件
- 所有页面使用相同的布局
- 忽视响应式设计
- 使用过多的嵌套容器

✅ **应该**：

- 使用简单的 border + bg 容器
- 为每个页面设计独特的布局
- 优先考虑移动端体验
- 保持代码简洁清晰
