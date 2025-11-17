# 代码优化总结

## 问题分析

### 发现的问题

1. **代码重复**：`ROUTE_TO_PRIMARY` 和 `DATA_BY_PRIMARY` 常量在两个文件中重复定义
2. **数据加载逻辑重复**：locale 和 messages 的初始化逻辑完全相同
3. **缺失导入**：`ArrowRight` 在 `all/page.tsx` 中使用但已正确导入
4. **语法错误**：`app/page.tsx` 中第 105 行有错误的转义字符 `\\n`

## 优化方案

### 1. 创建通用工具文件 (`lib/category.ts`)

**目的**：集中管理分类相关的常量和工具函数

**内容**：

- `ROUTE_TO_PRIMARY`：路由键到主分类的映射
- `DATA_BY_PRIMARY`：主分类到工具数据的映射
- `getToolsByPrimaryCategory()`：根据路由键获取工具的辅助函数

**优势**：

- 消除代码重复
- 便于维护和扩展
- 提高代码可读性

### 2. 更新导入语句

#### `app/categories/[key]/all/page.tsx`

```typescript
// 之前：30+ 行的重复常量定义
// 之后：
import { ROUTE_TO_PRIMARY, DATA_BY_PRIMARY } from '@/lib/category';
```

#### `app/categories/[key]/page.tsx`

```typescript
// 之前：30+ 行的重复常量定义
// 之后：
import { ROUTE_TO_PRIMARY, DATA_BY_PRIMARY } from '@/lib/category';
```

### 3. 修复语法错误

**文件**：`app/page.tsx`
**问题**：第 105 行末尾有错误的转义字符 `\\n`
**修复**：移除错误的转义字符

## 代码改进统计

| 指标         | 改进                          |
| ------------ | ----------------------------- |
| 重复代码行数 | 减少 ~60 行                   |
| 文件数量     | +1 新文件 (`lib/category.ts`) |
| 导入语句简化 | 每个文件减少 ~25 行           |
| 维护性       | 提高 ✓                        |

## 文件变更清单

### 新增

- `lib/category.ts` - 分类工具函数库

### 修改

- `app/categories/[key]/all/page.tsx` - 移除重复常量，导入通用工具
- `app/categories/[key]/page.tsx` - 移除重复常量，导入通用工具
- `app/page.tsx` - 修复语法错误

## 验证

✓ 代码编译成功
✓ 导入路径正确
✓ 类型检查通过
✓ 功能保持不变

## 后续建议

1. **进一步抽离**：考虑将 locale/messages 初始化逻辑提取为自定义 Hook
2. **类型安全**：为 `getToolsByPrimaryCategory()` 添加更详细的类型定义
3. **测试覆盖**：为新的工具函数添加单元测试
