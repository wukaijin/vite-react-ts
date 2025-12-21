# Hooks 模块文档

[根目录](../../CLAUDE.md) > [src](../) > **hooks**

> 最后更新：2025-12-16 00:00:00

---

## 模块职责

Hooks 模块提供项目中使用的自定义 React Hooks，封装常见的状态逻辑与副作用，提升代码复用性。主要功能包括：

- 类型安全的 Redux Hooks（`useAppDispatch`, `useAppSelector`）
- 模态框管理 Hook（`useModal`）
- 页面滚动控制 Hook（`useTop`）
- 页面标题管理 Hook（`useTitle`）
- 图片加载管理 Hook（`useImage`）

---

## 入口与启动

**主要文件**:
- `index.ts` - 导出类型安全的 Redux Hooks
- `useModal.tsx` - 模态框管理 Hook
- `useTop.ts` - 页面滚动到顶部 Hook
- `useTitle.ts` - 页面标题管理 Hook
- `useImage.ts` - 图片加载管理 Hook

**模块导出**（`index.ts`）:
```typescript
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

---

## 对外接口

### 自定义 Hooks 导出 (`index.ts`)

**当前状态**: 该文件用于统一导出自定义 Hooks（如需要）

**使用方式**:
```typescript
// 在 index.ts 中导出
export { default as useModal } from './useModal'
export { default as useTop } from './useTop'

// 在组件中使用
import { useModal, useTop } from '@/hooks'
```

**注意**: 项目已从 Redux 迁移到 Zustand，不再需要 `useAppDispatch` 和 `useAppSelector`。状态管理直接使用 Zustand store hooks（如 `useBlogStore`）。

---

### useModal Hook (`useModal.tsx`)

**功能**: 管理模态框的显示、隐藏与内容

**返回值**:
```typescript
{
  open: (params: ConfirmParams) => void  // 打开模态框
  close: () => void                       // 关闭模态框
  jsx: ReactElement                       // 模态框 JSX 元素
}
```

**ConfirmParams 类型**:
```typescript
interface ConfirmParams {
  title?: React.ReactNode      // 模态框标题（默认 "Confirm"）
  content: React.ReactNode     // 模态框内容
  onConfirm?: () => void       // 确认回调
  onCancel?: () => void        // 取消回调
}
```

**使用示例**:
```typescript
import useModal from '@/hooks/useModal'

function MyComponent() {
  const modal = useModal()

  const handleDelete = () => {
    modal.open({
      title: '确认删除',
      content: <p>确定要删除这条记录吗？</p>,
      onConfirm: () => {
        // 执行删除操作
        console.log('已删除')
      },
      onCancel: () => {
        console.log('已取消')
      }
    })
  }

  return (
    <>
      <button onClick={handleDelete}>删除</button>
      {modal.jsx}
    </>
  )
}
```

**特点**:
- 使用 `useMemo` 优化 JSX 渲染性能
- 自动管理模态框显示状态
- 支持自定义标题与内容
- 提供确认/取消回调

---

### useTop Hook (`useTop.ts`)

**功能**: 组件挂载时自动滚动到页面顶部

**使用场景**: 页面切换时重置滚动位置

**使用示例**:
```typescript
import useTop from '@/hooks/useTop'

function ArticlePage() {
  useTop()  // 页面加载时自动滚动到顶部

  return <div>{/* 文章内容 */}</div>
}
```

**实现原理**:
```typescript
useEffect(() => window.scrollTo(0, 0), [])
```

---

### useTitle Hook (`useTitle.ts`)

**功能**: 动态设置页面标题（`document.title`）

**使用示例**:
```typescript
import useTitle from '@/hooks/useTitle'

function BlogPage() {
  useTitle('博客 - 我的网站')

  return <div>{/* 博客内容 */}</div>
}
```

**特点**:
- 组件挂载时设置标题
- 组件卸载时可选恢复原标题

---

### useImage Hook (`useImage.ts`)

**功能**: 管理图片加载状态与错误处理

**使用场景**: 图片懒加载、加载失败占位图

**使用示例**:
```typescript
import useImage from '@/hooks/useImage'

function Avatar({ src }) {
  const { loaded, error } = useImage(src)

  if (error) return <img src="/default-avatar.png" alt="默认头像" />
  if (!loaded) return <div>加载中...</div>

  return <img src={src} alt="用户头像" />
}
```

---

## 关键依赖与配置

### 依赖项
- `react` 19.2 - React Hooks 基础
- `@/components/base/Modal` - 模态框组件（用于 `useModal`）

**注意**: 项目已移除 Redux 相关依赖，状态管理使用 Zustand。

### 设计原则
- **单一职责**: 每个 Hook 专注一个功能
- **类型安全**: 完整的 TypeScript 类型定义
- **性能优化**: 使用 `useCallback`, `useMemo` 避免不必要的重渲染
- **可复用**: 封装通用逻辑，减少重复代码

---

## 数据模型

### ConfirmParams (useModal)
```typescript
interface ConfirmParams {
  title?: React.ReactNode
  content: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
}
```

### 状态管理
项目使用 Zustand 进行状态管理，无需额外的 hooks 封装。直接使用 store hooks：

```typescript
import { useBlogStore } from '@/stores/useBlogStore'

const { categories, fetchCategories } = useBlogStore()
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 使用 `@testing-library/react-hooks` 测试自定义 Hooks
- 测试 `useModal` 的打开/关闭逻辑
- 测试 `useTop` 的滚动行为
- 测试 `useImage` 的加载状态管理

---

## 常见问题 (FAQ)

### Q1: 如何使用状态管理？
**A**: 项目已从 Redux 迁移到 Zustand。直接使用 Zustand store hooks（如 `useBlogStore`），无需额外的 hooks 封装。

示例：
```typescript
import { useBlogStore } from '@/stores/useBlogStore'

function MyComponent() {
  const { categories, fetchCategories } = useBlogStore()
  // 使用状态和方法
}
```

### Q2: useModal 的 jsx 为什么要用 useMemo？
**A**: 使用 `useMemo` 可以避免每次组件重渲染时都创建新的 JSX 元素，提升性能。只有当依赖项（visible, content, title 等）变化时才重新创建。

### Q3: useTop 在什么场景下使用？
**A**: 适用于页面切换时需要重置滚动位置的场景，例如从文章列表进入文章详情页时，确保用户从页面顶部开始阅读。

### Q4: 如何添加新的自定义 Hook？
**A**:
1. 在 `src/hooks/` 目录创建新文件（如 `useDebounce.ts`）
2. 实现 Hook 逻辑，确保遵循 React Hooks 规则
3. 如需导出，在 `index.ts` 中添加导出语句
4. 编写 TypeScript 类型定义

### Q5: useModal 支持嵌套模态框吗？
**A**: 当前实现不支持嵌套模态框。如需嵌套，建议使用多个 `useModal` 实例，或考虑使用第三方模态框库（如 PrimeReact Dialog）。

---

## 相关文件清单

```
src/hooks/
├── index.ts           # Redux Hooks 导出
├── useModal.tsx       # 模态框管理 Hook
├── useTop.ts          # 页面滚动 Hook
├── useTitle.ts        # 页面标题 Hook
└── useImage.ts        # 图片加载 Hook
```

---

## 变更记录 (Changelog)

### 2025-12-13 21:54:40
- 初始化 Hooks 模块文档
- 记录所有自定义 Hooks 的接口与使用示例
- 补充类型定义与常见问题
