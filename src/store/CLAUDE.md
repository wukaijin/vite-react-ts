# Store 模块文档

[根目录](../../CLAUDE.md) > [src](../) > **store**

> 最后更新：2025-12-12 23:57:58

---

## 模块职责

Store 模块基于 Redux Toolkit 管理全局应用状态，负责：

- 配置 Redux Store 并整合多个 slice
- 管理待办事项（Todos）状态与异步加载
- 管理音乐播放器状态（播放控制、当前歌曲、LocalStorage 持久化）
- 管理博客数据（分类、标签）与异步获取

---

## 入口与启动

**主要文件**:
- `index.ts` - Store 配置入口，导出 RootState 与 AppDispatch 类型
- `todos.ts` - 待办事项 slice
- `music.ts` - 音乐播放器 slice
- `blog.ts` - 博客数据 slice

**Store 初始化**（`index.ts`）:
```typescript
const store = configureStore({
  reducer: {
    todos,
    music,
    blog
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**集成到应用**（`App.tsx`）:
```typescript
import { Provider } from 'react-redux'
import store from './store'

<Provider store={store}>
  <RouterProvider router={router} />
</Provider>
```

---

## 对外接口

### Todos Slice (`todos.ts`)

**状态结构**:
```typescript
type Todo = {
  id: string
  text: string
  completed: boolean
  ref: any  // React Ref for scroll/animation
}
```

**同步 Actions**:
- `todoAdded(payload: Partial<Todo>)` - 添加待办项
- `todoToggled(payload: string)` - 切换完成状态（通过 id）
- `todoRemoved(payload: Todo)` - 删除待办项

**异步 Thunk**:
- `asyncFetchData()` - 从 JSONPlaceholder API 获取示例数据

**使用示例**:
```typescript
import { useDispatch, useSelector } from 'react-redux'
import { todoAdded, todoToggled, asyncFetchData } from '@/store/todos'

const dispatch = useDispatch()
const todos = useSelector((state: RootState) => state.todos)

dispatch(asyncFetchData())
dispatch(todoAdded({ id: '1', text: '新任务', completed: false }))
```

---

### Music Slice (`music.ts`)

**状态结构**:
```typescript
type Song = {
  artiest: string
  name: string
  alias: string
  album: string
  id: number
  url: string
  lyric: string
}

type State = {
  firstOpenPlayer: boolean  // 是否首次打开播放器
  current: Song             // 当前播放歌曲
  playing: boolean          // 播放状态
  showPlayer: boolean       // 播放器面板显示状态
}
```

**Actions**:
- `togglePlaying(payload?: boolean)` - 切换播放状态（可传入明确值）
- `togglePlayer()` - 切换播放器面板显示
- `updateCurrentSong(payload: Partial<Song>)` - 更新当前歌曲信息

**LocalStorage 持久化**:
- 初始化时从 `localStorage.getItem(STORE_KEYS.MUSIC_CURRENT)` 恢复状态
- 每次 `updateCurrentSong` 时自动保存到 LocalStorage

**使用示例**:
```typescript
import { togglePlaying, updateCurrentSong } from '@/store/music'

dispatch(togglePlaying(true))  // 开始播放
dispatch(updateCurrentSong({
  id: 123,
  name: '歌曲名',
  artiest: '歌手名',
  url: 'http://...',
  lyric: '歌词...'
}))
```

---

### Blog Slice (`blog.ts`)

**状态结构**:
```typescript
type serializedCategory = Category & {
  children?: Category[]
}

type State = {
  categories: Category[]               // 原始分类列表
  tags: Tag[]                          // 标签列表
  serializedCategories: serializedCategory[]  // 序列化后的树形分类
}
```

**异步 Thunk**:
- `asyncFetchCategories()` - 异步获取分类列表
- `asyncFetchTags()` - 异步获取标签列表

**自动序列化逻辑**:
```typescript
function serialize(categories: Category[]): serializedCategory[]
```
将扁平的分类列表转换为树形结构（根据 `belongs` 字段）。

**使用示例**:
```typescript
import { asyncFetchCategories, asyncFetchTags } from '@/store/blog'

dispatch(asyncFetchCategories())
dispatch(asyncFetchTags())

const { categories, tags, serializedCategories } = useSelector(
  (state: RootState) => state.blog
)
```

---

## 关键依赖与配置

### 依赖项
- `@reduxjs/toolkit` 1.9.7 - Redux 状态管理
- `react-redux` 8.1.3 - React 绑定
- `@/api/blog.ts` - 博客 API（用于异步 thunk）
- `@/const` - 常量定义（如 `STORE_KEYS`）

### Redux DevTools
开发环境自动启用 Redux DevTools 扩展，可在浏览器中查看 actions 与 state 变化。

### 性能优化建议
- 使用 `createSelector` (Reselect) 优化复杂的派生状态
- 对频繁更新的 state 使用 `useSelector` 的浅比较
- 考虑按需拆分更多 slice（如当前 music/todos/blog 已分离）

---

## 数据模型

### Todos 数据流
```
JSONPlaceholder API
  ↓ (asyncFetchData)
State: Todo[]
  ↓ (todoAdded/todoToggled/todoRemoved)
React Components
```

### Music 数据流
```
API (music.ts)
  ↓ (在组件中调用)
updateCurrentSong
  ↓ (Action)
State: { current: Song, playing: boolean, ... }
  ↓ (持久化)
LocalStorage
```

### Blog 数据流
```
API (blog.ts)
  ↓ (asyncFetchCategories / asyncFetchTags)
Thunk fulfilled
  ↓ (extraReducers)
State: { categories, tags, serializedCategories }
  ↓ (serialize 函数)
树形分类结构
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 为每个 slice 的 reducer 编写单元测试
- 测试 async thunk 的 pending/fulfilled/rejected 状态
- 使用 `@reduxjs/toolkit/query` 简化异步逻辑（可选升级方案）

---

## 常见问题 (FAQ)

### Q1: 如何添加新的状态 slice？
**A**:
1. 在 `src/store/` 创建新文件（如 `user.ts`）
2. 使用 `createSlice` 定义 slice
3. 在 `index.ts` 的 `configureStore` 中添加到 `reducer` 对象
4. 导出 actions 与 reducer

### Q2: 为什么音乐状态会持久化到 LocalStorage？
**A**: 这是为了用户刷新页面后保持播放状态。实现在 `music.ts` 的 `updateCurrentSong` reducer 中，通过 `window.localStorage.setItem()` 保存。

### Q3: 如何调试 Redux 状态？
**A**:
- 安装 Redux DevTools 浏览器扩展
- 在开发环境中自动启用，可查看每个 action 的 payload 与状态变化
- 使用 `console.log` 在 reducer 或 thunk 中打印调试信息

### Q4: Blog slice 中的 serialize 函数作用是什么？
**A**: 将后端返回的扁平分类列表（通过 `belongs` 字段表示父子关系）转换为嵌套的树形结构，便于前端渲染菜单/导航。

### Q5: 为什么 Todos 的 `ref` 字段类型是 `any`？
**A**: 用于存储 React Ref 对象，类型设为 `any` 是为了避免 Redux 序列化检查报错。建议在生产环境中将 ref 移出 Redux 状态，使用 React Context 或组件内部管理。

---

## 相关文件清单

```
src/store/
├── index.ts           # Store 配置与类型导出
├── todos.ts           # 待办事项 slice
├── music.ts           # 音乐播放器 slice
└── blog.ts            # 博客数据 slice

src/const/             # 常量定义（如 STORE_KEYS）
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Store 模块文档
- 梳理三个 slice 的职责与接口
- 补充数据流与使用示例
