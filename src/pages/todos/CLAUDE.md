# Todos 模块文档

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **todos**

> 最后更新：2025-12-12 23:57:58

---

## 模块职责

Todos 模块实现待办事项管理功能，包括：

- 添加、删除、切换待办项状态
- 按状态筛选（全部/已完成/未完成）
- 从外部 API 加载示例数据
- 动画过渡效果（列表项的出现与消失）
- 本地状态管理（通过 Redux）

---

## 入口与启动

**主要文件**:
- `index.tsx` - 待办列表主页
- `TodoCard.tsx` - 单个待办项卡片
- `AddActionModel.tsx` - 添加待办项弹窗
- `FilterTabs.tsx` - 筛选标签（全部/已完成/未完成）
- `todos.module.scss` - 模块样式

**路由配置**（在 `src/router/index.tsx`）:
```typescript
{
  path: '/todos',
  element: Todos
}
```

---

## 对外接口

### 核心功能

**添加待办项**:
- 通过 `AddActionModel` 弹窗输入文本
- 提交后触发 Redux Action `todoAdded`

**切换完成状态**:
- 点击 `TodoCard` 的复选框
- 触发 Redux Action `todoToggled(id)`

**删除待办项**:
- 点击卡片上的删除按钮
- 触发 Redux Action `todoRemoved(todo)`

**筛选显示**:
- 使用 `FilterTabs` 切换视图（全部/已完成/未完成）
- 前端过滤数据（不发送 API 请求）

**加载示例数据**:
- 点击"加载示例"按钮
- 触发异步 Thunk `asyncFetchData()`
- 从 JSONPlaceholder API 获取 100 条待办项

---

## 关键依赖与配置

### 依赖项
- `@/store/todos` - Redux Slice（状态管理）
- `react-redux` - React 绑定
- `react-transition-group` - 列表动画过渡

### 状态管理（Redux）

**State 结构**:
```typescript
type Todo = {
  id: string
  text: string
  completed: boolean
  ref: any  // React Ref for animation
}

state.todos: Todo[]
```

**Actions**:
- `todoAdded(payload: Partial<Todo>)`
- `todoToggled(payload: string)`  // id
- `todoRemoved(payload: Todo)`
- `asyncFetchData()` - 异步 Thunk

**使用示例**:
```typescript
import { useDispatch, useSelector } from 'react-redux'
import { todoAdded, todoToggled, asyncFetchData } from '@/store/todos'

const dispatch = useDispatch()
const todos = useSelector((state: RootState) => state.todos)

// 添加
dispatch(todoAdded({ id: Date.now().toString(), text: '新任务', completed: false }))

// 切换状态
dispatch(todoToggled(todoId))

// 加载示例
dispatch(asyncFetchData())
```

---

## 数据模型

### Todo 类型
```typescript
type Todo = {
  id: string         // 唯一标识（使用时间戳或 UUID）
  text: string       // 待办内容
  completed: boolean // 完成状态
  ref: any           // React Ref（用于动画，不推荐放在 Redux 中）
}
```

### 筛选状态（组件内部）
```typescript
type FilterType = 'all' | 'active' | 'completed'
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 测试 Redux Actions 与 Reducers
- 测试组件交互（添加、删除、切换状态）
- 测试筛选逻辑
- 测试异步数据加载

---

## 常见问题 (FAQ)

### Q1: 如何添加新的待办项？
**A**:
```typescript
import { useDispatch } from 'react-redux'
import { todoAdded } from '@/store/todos'

const dispatch = useDispatch()

dispatch(todoAdded({
  id: Date.now().toString(),  // 生成唯一 ID
  text: '新任务内容',
  completed: false
}))
```

### Q2: 待办数据如何持久化？
**A**: 当前未实现持久化。建议方案：
- **LocalStorage**: 在 Redux Store 的 `subscribe` 中监听变化并保存
- **后端 API**: 将 CRUD 操作对接到后端接口
- **IndexedDB**: 使用浏览器本地数据库

### Q3: 如何实现列表动画？
**A**: 使用 `react-transition-group`:
```typescript
import { TransitionGroup, CSSTransition } from 'react-transition-group'

<TransitionGroup>
  {todos.map(todo => (
    <CSSTransition key={todo.id} timeout={300} classNames="todo">
      <TodoCard todo={todo} />
    </CSSTransition>
  ))}
</TransitionGroup>
```

### Q4: 为什么 `ref` 字段存在 Redux 中？
**A**: 这是不推荐的做法（Redux 要求可序列化）。建议：
- 移除 `ref` 字段，使用组件内部 `useRef`
- 或使用 `React Context` 管理动画相关状态

### Q5: 如何实现拖拽排序？
**A**: 可集成第三方库如 `react-beautiful-dnd` 或 `dnd-kit`：
```typescript
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="todos">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {todos.map((todo, index) => (
          <Draggable key={todo.id} draggableId={todo.id} index={index}>
            {/* TodoCard */}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```

---

## 相关文件清单

```
src/pages/todos/
├── index.tsx              # 待办列表主页
├── todos.module.scss      # 样式
├── TodoCard.tsx           # 待办项卡片
├── AddActionModel.tsx     # 添加待办弹窗
└── FilterTabs.tsx         # 筛选标签
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Todos 模块文档
- 整理核心功能与状态管理
- 补充使用示例与常见问题
