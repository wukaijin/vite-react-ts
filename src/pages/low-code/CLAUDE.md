# Low-code 模块文档

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **low-code**

> 最后更新：2025-12-12 23:57:58

---

## 模块职责

Low-code 模块实现低代码/可视化编辑器功能，包括：

- 可视化组件拖拽与布局
- 画布编辑区
- 组件属性配置
- 代码预览与导出

**注**: 此模块功能尚在开发中，当前文档基于目录结构推测。

---

## 入口与启动

**主要文件**:
- `index.tsx` - 低代码编辑器主入口
- `editor/index.tsx` - 编辑器核心组件

**路由配置**（在 `src/router/low.tsx`）:
```typescript
{
  path: '/low-code',
  element: LowCodeEditor,
  children: [
    { path: 'editor', element: Editor }
  ]
}
```

---

## 对外接口

### 预期功能（基于常见低代码编辑器）

**组件面板**:
- 预置组件列表（按钮、输入框、容器等）
- 拖拽到画布区

**画布编辑区**:
- 可视化布局编辑
- 组件选中与拖动
- 层级管理（z-index）

**属性配置面板**:
- 选中组件后显示属性表单
- 实时更新组件样式与配置

**代码预览**:
- 查看生成的 JSX/JSON 配置
- 导出代码或配置文件

---

## 关键依赖与配置

### 可能的依赖项（需确认）
- `react-dnd` - 拖拽功能
- `react-grid-layout` - 网格布局
- `monaco-editor` - 代码编辑器（用于属性配置或代码预览）

### 数据结构（推测）

**组件配置**:
```typescript
type Component = {
  id: string
  type: 'button' | 'input' | 'container' | ...
  props: Record<string, any>
  style: CSSProperties
  children?: Component[]
}
```

**页面配置**:
```typescript
type Page = {
  id: string
  name: string
  components: Component[]
}
```

---

## 测试与质量

**当前状态**: 模块功能尚不明确，无测试文件。

**建议**:
- 测试拖拽功能
- 测试组件渲染与属性更新
- 测试代码生成逻辑

---

## 常见问题 (FAQ)

### Q1: 如何添加新的可拖拽组件？
**A**:
1. 在组件面板配置中定义新组件类型
2. 实现组件的渲染逻辑（根据 `type` 渲染不同组件）
3. 配置默认 props 与 style

### Q2: 如何实现拖拽功能？
**A**: 使用 `react-dnd`:
```typescript
import { useDrag, useDrop } from 'react-dnd'

function DraggableComponent({ component }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'COMPONENT',
    item: { id: component.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
    {/* 组件内容 */}
  </div>
}
```

### Q3: 如何导出生成的代码？
**A**:
- JSON 配置：直接序列化组件配置对象
- JSX 代码：遍历组件树生成对应 JSX 字符串
- 可使用模板引擎（如 `handlebars`）或 AST 工具（如 `babel`）

### Q4: 如何实现撤销/重做功能？
**A**:
- 维护操作历史栈（前进栈与后退栈）
- 每次修改组件配置时保存快照
- 撤销时回退到上一个快照

---

## 相关文件清单

```
src/pages/low-code/
├── index.tsx          # 低代码编辑器主入口
└── editor/
    └── index.tsx      # 编辑器核心组件
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Low-code 模块文档
- 基于常见低代码编辑器推测功能
- 补充开发建议与常见问题
