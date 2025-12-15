# Management 模块文档

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **management**

> 最后更新：2025-12-16 00:00:00

---

## 模块职责

Management 模块实现博客系统的后台管理功能，包括：

- 文章管理（新增、编辑、删除）
- 分类管理（CRUD）
- 标签管理（CRUD）
- 侧边栏导航
- 面包屑导航

---

## 入口与启动

**主要文件**:
- `index.tsx` - 管理后台主入口（布局容器）
- `Sider.tsx` - 侧边栏导航
- `components/Breadcrumbs.tsx` - 面包屑导航
- `blog/articles/` - 文章管理
- `blog/categories/` - 分类管理
- `blog/tags/` - 标签管理

**路由配置**（在 `src/router/manage.tsx`）:
```typescript
{
  path: '/manage',
  element: ManageLayout,
  children: [
    { path: 'blog/articles', element: Articles },
    { path: 'blog/articles/add', element: ArticlesAdd },
    { path: 'blog/articles/edit/:id', element: ArticlesEdit },
    { path: 'blog/categories', element: Categories },
    { path: 'blog/tags', element: Tags }
  ]
}
```

---

## 对外接口

### 文章管理（`blog/articles/`）

**组件结构**:
- `index.tsx` - 文章列表（表格展示）
- `Add.tsx` - 新增文章
- `Edit.tsx` - 编辑文章
- `ArticlesForm.tsx` - 文章表单（新增与编辑共用）

**功能**:
- 列表展示：标题、分类、标签、状态、操作按钮
- 新增文章：填写标题、内容（Markdown）、分类、标签、封面图等
- 编辑文章：预填充数据，提交更新
- 删除文章：确认后调用 API

**API 调用**:
```typescript
import { ArticleApi } from '@/api/blog'

// 获取列表
const articles = await ArticleApi.findAll()

// 新增
await ArticleApi.add(data)

// 编辑
await ArticleApi.edit(id, data)

// 删除
await ArticleApi.delete(id)
```

---

### 分类管理（`blog/categories/`）

**功能**:
- 列表展示：分类名称、描述、排序、操作按钮
- 新增/编辑/删除分类
- 支持父子分类（`belongs` 字段）

**API 调用**:
```typescript
import { CategoryApi } from '@/api/blog'

const categories = await CategoryApi.findAll()
await CategoryApi.add({ text: '新分类', order: 1, ... })
await CategoryApi.edit(id, { text: '更新后的名称' })
await CategoryApi.delete(id)
```

---

### 标签管理（`blog/tags/`）

**功能**:
- 列表展示：标签名称、颜色、操作按钮
- 新增/编辑/删除标签
- 颜色选择器（用于前端展示）

**API 调用**:
```typescript
import { TagApi } from '@/api/blog'

const tags = await TagApi.findAll()
await TagApi.add({ text: '新标签', color: '#1890ff' })
await TagApi.edit(id, { text: '更新后的名称' })
await TagApi.delete(id)
```

---

## 关键依赖与配置

### 依赖项
- `@/api/blog` - 博客 API
- `primereact` - UI 组件（表格、表单、对话框等）
- `react-router-dom` - 路由导航
- `react-select` - 下拉选择器

### 表单组件
- **PrimeReact DataTable**: 数据表格展示
- **PrimeReact Dialog**: 模态对话框
- **PrimeReact Button**: 按钮组件
- **react-select**: 多选下拉（标签选择）

### 路由参数
- `/manage/blog/articles/edit/:id` - `id` 为文章 ID，通过 `useParams()` 获取

---

## 数据模型

### SubmitArticle 类型（表单提交）
```typescript
type SubmitArticle = Omit<Article, 'tags' | 'category'> & {
  tags: string[]      // 标签 ID 数组
  category: string    // 分类 ID
}
```

### Category 类型
```typescript
interface Category {
  id: string
  text: string
  order: number
  description: string
  belongs: Category | null  // 父分类
  defaultPoster: string
}
```

### Tag 类型
```typescript
interface Tag {
  id: string
  text: string
  color: string
}
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 测试表单验证逻辑
- 测试 CRUD 操作
- 测试文件上传功能（如封面图）
- 使用 Mock API 测试异步操作

---

## 常见问题 (FAQ)

### Q1: 如何添加新的管理页面？
**A**:
1. 在 `management/` 下创建新目录与组件
2. 在 `router/manage.tsx` 添加路由配置
3. 在 `Sider.tsx` 添加导航链接

### Q2: 文章内容如何编辑（Markdown）？
**A**: 建议集成 Markdown 编辑器：
- **react-markdown-editor-lite**: 轻量级编辑器
- **react-md-editor**: 支持预览与分屏
- **TinyMCE/Quill**: 所见即所得编辑器（需转换为 Markdown）

### Q3: 如何实现权限控制？
**A**:
- 后端 API 校验用户权限（Token 验证）
- 前端在路由守卫中检查权限（见 Router 模块文档）
- 按钮级权限：根据用户角色显示/隐藏操作按钮

### Q4: 如何上传封面图？
**A**:
```typescript
// 使用 FormData 上传文件
const formData = new FormData()
formData.append('file', file)

const response = await axios.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

// 获取图片 URL 后填充到表单
setPoster(response.data.url)
```

### Q5: 如何优化表格性能（大数据量）？
**A**:
- 使用虚拟滚动（PrimeReact 的 `virtualScroll` 属性）
- 后端分页（传递 `page` 与 `pageSize` 参数）
- 前端缓存与防抖搜索

---

## 相关文件清单

```
src/pages/management/
├── index.tsx                      # 管理后台主入口
├── Sider.tsx                      # 侧边栏导航
├── components/
│   └── Breadcrumbs.tsx            # 面包屑导航
└── blog/
    ├── articles/
    │   ├── index.tsx              # 文章列表
    │   ├── Add.tsx                # 新增文章
    │   ├── Edit.tsx               # 编辑文章
    │   └── ArticlesForm.tsx       # 表单组件
    ├── categories/
    │   └── index.tsx              # 分类管理
    └── tags/
        └── index.tsx              # 标签管理
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Management 模块文档
- 整理文章/分类/标签管理功能
- 补充表单与 API 调用说明
