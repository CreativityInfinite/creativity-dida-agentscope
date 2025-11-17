# Trending 页面快速参考

## 📍 页面路由

| 页面     | 路由                      | 描述         |
| -------- | ------------------------- | ------------ |
| 当前热门 | `/trending/now`           | 实时热度排行 |
| 评分最高 | `/trending/top-rated`     | 用户评分排行 |
| 新兴热门 | `/trending/rising`        | 快速增长工具 |
| 搜索最多 | `/trending/most-searched` | 搜索热度排行 |

## 🎯 每个页面的核心功能

### 当前热门 (`/trending/now`)

```
主要内容：
- 热度排行（前 12 个工具）
- 排名徽章（#1 金、#2 银、#3 铜）
- 统计卡片：工具数、平均评分、分类覆盖
- 热门标签展示
```

### 评分最高 (`/trending/top-rated`)

```
主要内容：
- 评分排行（前 12 个工具）
- 评分筛选：全部、4.5+、4.0+、3.5+
- 统计卡片：平均评分、优秀/优质/总工具数
- 评分说明卡片
```

### 新兴热门 (`/trending/rising`)

```
主要内容：
- 增长势头排行（前 12 个工具）
- 增长徽章（Top 1/2/3）
- 分类分布图表（进度条）
- 增长指标说明卡片
```

### 搜索最多 (`/trending/most-searched`)

```
主要内容：
- 搜索排行（前 12 个工具）
- 时间范围选择：本周、本月、全部
- 热门搜索词（6 个 + 趋势）
- 搜索统计卡片
```

## 🛠️ 技术栈

### 使用的库

- **React** - UI 框架
- **Next.js 14** - 框架
- **shadcn/ui** - UI 组件库
- **Tailwind CSS** - 样式
- **lucide-react** - 图标

### 使用的 shadcn 组件

```typescript
- Card (CardContent, CardHeader, CardTitle)
- Badge
- Breadcrumb (BreadcrumbItem, BreadcrumbLink, etc.)
- Progress
- Tabs (可选)
- Button (可选)
```

## 📊 数据流

```
ALL_TOOLS (聚合所有分类)
    ↓
排序/筛选逻辑 (useMemo)
    ↓
统计计算 (useMemo)
    ↓
UI 渲染
```

## 🎨 样式规范

### 颜色使用

- **Primary** - 主要操作、排名第一
- **Amber** - 评分、排名第二
- **Emerald** - 增长、统计
- **Orange** - 排名第三
- **Blue/Purple** - 其他统计

### 响应式断点

- **Mobile** - 单列网格
- **Tablet** - 2 列网格
- **Desktop** - 3 列网格

## 🔄 状态管理

### 当前热门

```typescript
const [locale, setLocale] = useState('zh-CN');
```

### 评分最高

```typescript
const [locale, setLocale] = useState('zh-CN');
const [ratingFilter, setRatingFilter] = useState<number>(0);
```

### 新兴热门

```typescript
const [locale, setLocale] = useState('zh-CN');
```

### 搜索最多

```typescript
const [locale, setLocale] = useState('zh-CN');
const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');
```

## 📈 排序算法

### 当前热门

```typescript
评分 × 0.6 + 随机热度 × 0.4
```

### 评分最高

```typescript
按评分降序排列
支持筛选：≥ 4.5、≥ 4.0、≥ 3.5
```

### 新兴热门

```typescript
评分 × 0.5 + 增长指数
```

### 搜索最多

```typescript
评分 × 100 × 时间倍数 + 随机因子
时间倍数：周 = 1, 月 = 2.5, 全部 = 5
```

## 🎯 UI 组件结构

### 通用结构

```
面包屑导航
    ↓
Hero 区（标题 + 描述）
    ↓
统计卡片
    ↓
筛选/选项区（可选）
    ↓
工具网格
    ↓
说明卡片
    ↓
返回顶部按钮
```

## 🚀 性能优化

### 已实现

- ✅ useMemo 缓存排序结果
- ✅ 条件渲染（避免不必要的 DOM）
- ✅ 图片懒加载（ToolCard 内部）

### 可优化

- [ ] 虚拟滚动（大数据集）
- [ ] 分页加载
- [ ] 数据预加载

## 📝 代码示例

### 添加新的筛选选项

```typescript
const [filter, setFilter] = useState<string>('all');

const filtered = React.useMemo(() => {
  return [...ALL_TOOLS]
    .filter(tool => {
      if (filter === 'all') return true;
      return tool.primaryCategory === filter;
    })
    .sort((a, b) => /* 排序逻辑 */);
}, [filter]);
```

### 添加新的统计卡片

```typescript
<Card className="border-primary/20 bg-primary/5">
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">标题</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl sm:text-3xl font-bold text-primary">{value}</div>
    <p className="text-xs text-muted-foreground mt-1">描述</p>
  </CardContent>
</Card>
```

## 🔗 相关文件

- `/app/trending/now/page.tsx` - 当前热门
- `/app/trending/top-rated/page.tsx` - 评分最高
- `/app/trending/rising/page.tsx` - 新兴热门
- `/app/trending/most-searched/page.tsx` - 搜索最多
- `/components/ToolCard.tsx` - 工具卡片组件
- `/src/data/tools/*.json` - 工具数据

## ✅ 检查清单

部署前检查：

- [ ] 编译通过 (`npm run build`)
- [ ] 无 TypeScript 错误
- [ ] 响应式设计正常
- [ ] 所有链接可用
- [ ] 图标正确显示
- [ ] 颜色方案一致
- [ ] 文本国际化正确
