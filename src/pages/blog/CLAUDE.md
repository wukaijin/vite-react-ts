# Blog 模块文档

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **blog**

> 最后更新：2025-12-16 00:00:00

---

## 模块职责

Blog 模块实现完整的博客系统，包括：

- 文章列表展示与分类/标签筛选
- 文章详情页（Markdown 渲染、目录导航、相关文章推荐）
- 搜索功能
- 分类与标签浏览
- 响应式布局与英雄区（Hero Banner）

---

## 入口与启动

**主要文件**:
- `index.tsx` - 博客主页/列表页（入口）
- `article/index.tsx` - 文章详情页
- `category/index.tsx` - 分类文章列表
- `tag/index.tsx` - 标签文章列表
- `blog-layout/index.tsx` - 博客布局容器（含侧边栏与搜索）
- `blog-hero/` - 英雄区组件

**路由配置**（在 `src/router/index.tsx`）:
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

---

## 对外接口

### 文章展示

**ArticleCard**（`ArticleCard.tsx`）:
- 文章卡片组件
- 显示标题、摘要、标签、封面图、发布时间
- 点击跳转到文章详情

**MdReader**（`article/MdReader.tsx`）:
- Markdown 内容渲染器
- 使用 `react-markdown` + `remark-gfm`（GitHub Flavored Markdown）
- 语法高亮（`react-syntax-highlighter`）

### 导航与筛选

**Menu**（`blog-layout/Menu.tsx`）:
- 分类菜单
- 支持树形结构（父子分类）
- 使用 Redux 中的 `serializedCategories`

**Search**（`blog-layout/Search.tsx`）:
- 关键词搜索
- 实时搜索结果展示

**OtherCategory**（`OtherCategory.tsx`）:
- 其他分类快速导航
- 显示分类列表与文章数量

### 文章详情页功能

**ArticleHeader**（`article/ArticleHeader.tsx`）:
- 文章标题、作者、发布时间、阅读时长
- 封面图展示

**Directory**（`article/Directory.tsx`）:
- 文章目录导航
- 自动提取标题（h2, h3）
- 点击滚动到对应位置

**Related**（`article/Related.tsx`）:
- 相关文章推荐
- 基于标签或分类匹配

---

## 关键依赖与配置

### 依赖项
- `react-markdown` 8.0.7 - Markdown 渲染
- `remark-gfm` 3.0.1 - GitHub Flavored Markdown 支持
- `react-syntax-highlighter` 15.5.0 - 代码高亮
- `react-router-dom` 6.20.1 - 路由导航
- `@/api/blog` - 博客 API
- `@/store/blog` - 博客状态管理

### 样式方案
- `blog.module.scss` - 博客主页样式
- `markdown.scss` - Markdown 内容样式
- `blog-hero.module.scss` - 英雄区样式
- Tailwind CSS 实用类

### API 接口调用

**文章相关**:
```typescript
import { ArticleApi } from '@/api/blog'

// 获取所有文章
const articles = await ArticleApi.findAll()

// 获取文章详情
const article = await ArticleApi.findOne(id)

// 按分类查询
const articles = await ArticleApi.findByCategoryId(categoryId)

// 搜索文章
const results = await ArticleApi.searchByKeyword(keyword)

// 获取相关文章
const related = await ArticleApi.findRelativeById(id)
```

**分类与标签**:
```typescript
import { CategoryApi, TagApi } from '@/api/blog'

const categories = await CategoryApi.findAll()
const tags = await TagApi.findAll()
```

---

## 数据模型

### Article 类型（`src/interface/blog.ts`）
```typescript
interface Article {
  id: string
  title: string
  tags: Tag[]
  category: Category
  state: ArticleState  // UN_PUBLISHED | PUBLISHED
  content: string      // Markdown 内容
  description: string  // 摘要
  poster?: string      // 封面图
  updateAt: string
  createAt: string
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
  color: string  // 标签颜色（用于前端展示）
}
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 测试 Markdown 渲染是否正确
- 测试搜索功能
- 测试文章列表分页与筛选
- 测试路由参数解析（`:id`）

---

## 常见问题 (FAQ)

### Q1: 如何添加新的 Markdown 插件？
**A**: 在 `MdReader.tsx` 中导入并配置 remark 或 rehype 插件：
```typescript
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

<ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]}>
  {content}
</ReactMarkdown>
```

### Q2: 代码高亮主题如何切换？
**A**: 修改 `react-syntax-highlighter` 的 `style` 属性：
```typescript
import { atomDark, github } from 'react-syntax-highlighter/dist/esm/styles/prism'

<SyntaxHighlighter style={atomDark}>
  {code}
</SyntaxHighlighter>
```

### Q3: 文章目录如何自动生成？
**A**: `Directory.tsx` 组件通过以下步骤实现：
1. 解析 Markdown 内容提取标题（正则或 DOM 解析）
2. 构建目录树结构
3. 为每个标题添加锚点（id）
4. 点击目录项时滚动到对应位置（`scrollIntoView`）

### Q4: 如何实现相关文章推荐？
**A**: `Related.tsx` 通过 API `findRelativeById` 获取，后端逻辑可能基于：
- 相同标签（交集计算相似度）
- 相同分类
- 文章发布时间相近

### Q5: 博客数据如何缓存？
**A**:
- Redux Store 缓存分类与标签（避免重复请求）
- 考虑使用 React Query 或 SWR 管理文章列表缓存
- LocalStorage 可用于缓存最近阅读的文章列表

---

## 相关文件清单

```
src/pages/blog/
├── index.tsx                      # 博客主页/列表
├── blog.module.scss               # 主页样式
├── ArticleCard.tsx                # 文章卡片
├── OtherCategory.tsx              # 其他分类
├── article/                       # 文章详情
│   ├── index.tsx                  # 详情页入口
│   ├── ArticleHeader.tsx          # 文章头部
│   ├── MdReader.tsx               # Markdown 渲染器
│   ├── Directory.tsx              # 目录导航
│   ├── Related.tsx                # 相关文章
│   └── markdown.scss              # Markdown 样式
├── category/                      # 分类页
│   └── index.tsx
├── tag/                           # 标签页
│   └── index.tsx
├── blog-layout/                   # 布局容器
│   ├── index.tsx
│   ├── Menu.tsx                   # 分类菜单
│   └── Search.tsx                 # 搜索组件
└── blog-hero/                     # 英雄区
    ├── ResentPost.tsx             # 最近文章
    └── blog-hero.module.scss
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Blog 模块文档
- 整理文章展示与导航功能
- 补充 Markdown 渲染与相关组件说明
