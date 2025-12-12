# Router 模块文档

[根目录](../../CLAUDE.md) > [src](../) > **router**

> 最后更新：2025-12-12 23:57:58

---

## 模块职责

Router 模块负责应用的路由配置与导航管理，基于 React Router v6，提供：

- 声明式路由配置
- 懒加载与代码分割
- 嵌套路由支持（博客、音乐模块）
- 自定义 Suspense 包装器

---

## 入口与启动

**主要文件**:
- `index.tsx` - 主路由配置入口
- `manage.tsx` - 后台管理子路由
- `low.tsx` - 低代码编辑器子路由
- `utils.tsx` - 工具函数（withSuspense）

**路由初始化**:
```typescript
import { createBrowserRouter } from 'react-router-dom'

const config: RouteObject[] = [
  // 路由配置...
]

export default createBrowserRouter(config)
```

**应用集成**（`App.tsx`）:
```typescript
import { RouterProvider } from 'react-router-dom'
import router from './router'

<RouterProvider router={router} />
```

---

## 对外接口

### 主路由配置（`index.tsx`）

**路由结构**:

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | Hero | 首页/英雄页 |
| `/home` | Home | 主页 |
| `/introduction` | Introduction | 介绍页 |
| `/todos` | Todos | 待办事项 |
| `/hero` | Hero | 英雄页（与根路径相同） |
| `/blog` | Blog | 博客主页（嵌套路由） |
| `/blog/article/:id` | BlogArticle | 文章详情 |
| `/blog/category/:id` | BlogCategory | 分类文章列表 |
| `/blog/tag/:id` | BlogTag | 标签文章列表 |
| `/music` | MusicPage | 音乐主页（嵌套路由） |
| `/music/home` | MusicHome | 音乐首页 |
| `/music/search` | MusicSearch | 音乐搜索 |
| `/music/playlist-detail` | PlaylistDetail | 歌单详情 |
| `/manage/*` | ManageRoute | 后台管理（见 `manage.tsx`） |
| `/low-code/*` | LowCodeRoute | 低代码编辑器（见 `low.tsx`） |
| `*` | NotFound | 404 页面 |

**嵌套路由示例**:
```typescript
{
  path: '/blog',
  element: Blog,
  children: [
    { path: 'article/:id', element: BlogArticle },
    { path: 'category/:id', element: BlogCategory },
    { path: 'tag/:id', element: BlogTag }
  ]
}
```

### 懒加载配置

**工具函数**（`utils.tsx`）:
```typescript
export const withSuspense = (Comp: LazyExoticComponent<any>) => (
  <Suspense fallback={<Loading />}>
    <Comp />
  </Suspense>
)
```

**使用示例**:
```typescript
const Todos = withSuspense(lazy(() => import('@/pages/todos')))
const Blog = withSuspense(lazy(() => import('@/pages/blog')))
```

**优势**:
- 减小初始包体积
- 按需加载页面组件
- 统一的 Loading 状态

---

## 关键依赖与配置

### 依赖项
- `react-router-dom` 6.20.1 - 路由库
- `react` 18.2 - Suspense 与 lazy 支持

### 路由模式
使用 `createBrowserRouter`（基于 History API），需服务器配置支持 SPA fallback。

**Nginx 配置示例**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 路由钩子（可用但未在此模块中使用）
- `useNavigate()` - 编程式导航
- `useParams()` - 获取路径参数
- `useLocation()` - 获取当前位置
- `useSearchParams()` - 获取查询参数

---

## 数据模型

### 路由对象类型（React Router v6）
```typescript
type RouteObject = {
  path?: string
  element?: ReactNode
  children?: RouteObject[]
  index?: boolean
  caseSensitive?: boolean
  // ...
}
```

### 路径参数示例
- `/blog/article/:id` - `id` 为动态参数，通过 `useParams()` 获取
- `/blog/category/:id` - 同上

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 测试路由配置是否正确解析
- 测试懒加载组件是否正常加载
- 使用 `MemoryRouter` 模拟路由场景测试组件

---

## 常见问题 (FAQ)

### Q1: 如何添加新路由？
**A**:
1. 在 `src/pages/` 创建新页面组件
2. 在 `index.tsx` 中导入（使用懒加载或直接导入）
3. 添加到 `config` 数组中
4. 使用 `withSuspense` 包装懒加载组件

### Q2: 为什么部署后刷新页面出现 404？
**A**: 需服务器配置 SPA fallback，将所有路径重定向到 `index.html`。Vite 开发服务器已自动处理。

### Q3: 如何实现路由守卫（权限控制）？
**A**: React Router v6 建议使用高阶组件或在组件内部使用 `useEffect` 检查权限：
```typescript
function ProtectedRoute({ children }) {
  const isAuth = useAuth()
  if (!isAuth) return <Navigate to="/login" />
  return children
}
```

### Q4: 嵌套路由如何渲染子路由？
**A**: 在父组件中使用 `<Outlet />`:
```typescript
import { Outlet } from 'react-router-dom'

function BlogLayout() {
  return (
    <div>
      <Header />
      <Outlet />  {/* 子路由在此渲染 */}
    </div>
  )
}
```

### Q5: 如何实现路由过渡动画？
**A**: 结合 `react-transition-group` 或 `framer-motion`:
```typescript
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

<TransitionGroup>
  <CSSTransition key={location.key} timeout={300} classNames="fade">
    <Outlet />
  </CSSTransition>
</TransitionGroup>
```

---

## 相关文件清单

```
src/router/
├── index.tsx          # 主路由配置
├── manage.tsx         # 后台管理子路由
├── low.tsx            # 低代码编辑器子路由
└── utils.tsx          # withSuspense 工具函数

src/pages/             # 路由对应的页面组件
├── blog/
├── music/
├── todos/
├── management/
├── low-code/
├── hero/
├── introduction/
├── home/
└── not-found/
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Router 模块文档
- 梳理主路由与子路由配置
- 补充懒加载与嵌套路由说明
