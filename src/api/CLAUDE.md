# API 模块文档

[根目录](../../CLAUDE.md) > [src](../) > **api**

> 最后更新：2025-12-12 23:57:58

---

## 模块职责

API 模块负责封装所有与后端服务的 HTTP 通信，提供类型安全的接口函数。核心功能包括：

- 统一的 Axios 实例配置（请求/响应拦截器）
- 博客系统 API（文章、分类、标签的 CRUD）
- 音乐服务 API（搜索、播放、歌词、推荐等）
- TypeScript 类型定义集成

---

## 入口与启动

**主要文件**:
- `music.ts` - 音乐相关 API 接口
- `blog.ts` - 博客相关 API 接口
- `../utils/request.ts` - Axios 实例与拦截器配置（实际位于 utils 目录）

**API 基础配置**（在 `utils/request.ts`）:
```typescript
const request: AxiosInstance = axios.create({
  withCredentials: true,  // 跨域携带 Cookie
  timeout: 10 * 1000      // 10 秒超时
})
```

---

## 对外接口

### 音乐 API (`music.ts`)

**核心功能**:
- `loginAnonymous()` - 匿名登录
- `queryKeyWord<QueryData>(key: string)` - 搜索歌曲
- `querySrc(id: string)` - 获取歌曲播放链接
- `queryLyric(id: string)` - 获取歌词
- `queryNewSongs()` - 查询最新歌曲
- `queryPlaylistTags()` - 获取歌单标签
- `queryTopPlaylist(tagName?: string)` - 获取热门歌单
- `queryBanner()` - 查询 Banner 信息
- `queryPlaylistDetail(id: number)` - 获取歌单详情

**API 前缀**: `/music-api`（由 Vite 代理转发）

**返回值包装**: 所有接口返回格式为 `{ code: number, ...data }`，在 API 层自动解包。

### 博客 API (`blog.ts`)

**模块化设计**:
```typescript
export const TagApi = {
  findAll(),
  findOne(id),
  add(data),
  edit(id, data),
  delete(id)
}

export const CategoryApi = {
  findAll(),
  findOne(id),
  add(data),
  edit(id, data),
  delete(id)
}

export const ArticleApi = {
  findAll(),
  findByCategoryId(id),
  findOne(id),
  searchByKeyword(keyword),
  findRelativeById(id),
  add(data),
  edit(id, data),
  delete(id)
}
```

**API 前缀**: `/nest-api/blog/`（由 Vite 代理转发）

**返回值包装**: `{ code: number, message: string, success: boolean, data: T }`，API 层返回 `res.data`。

---

## 关键依赖与配置

### 依赖项
- `axios` 1.6.2 - HTTP 客户端
- `@/interface/music.ts` - 音乐相关类型定义
- `@/interface/blog.ts` - 博客相关类型定义
- `@/utils/request.ts` - 统一的 Axios 实例

### Axios 拦截器配置

**请求拦截器**（`request.ts`）:
- 确保 `config.url` 不为 `undefined`
- 预留添加时间戳参数的逻辑（已注释）

**响应拦截器**（`request.ts`）:
```typescript
response => {
  const res = response.data
  if (!res || res.code !== 200) {
    return Promise.reject(res)  // 非 200 状态码视为失败
  }
  return res
}
```

### Vite 代理配置（开发环境）

在 `vite.config.ts` 中：
```typescript
proxy: {
  '/music-api': {
    target: 'http://106.55.147.116',
    changeOrigin: true
  },
  '/nest-api': {
    target: 'http://106.55.147.116',
    changeOrigin: true
  }
}
```

---

## 数据模型

### 音乐相关类型（`interface/music.ts`）

**核心类型**:
- `QueryListData` - 搜索结果单曲信息
- `QueryNewSongReturnData` - 新歌推荐数据
- `PlaylistTag` - 歌单标签
- `PlaylistItem` - 歌单列表项
- `BannerInfo` - 轮播图信息
- `PlaylistTrack` - 歌单曲目详情
- `PlaylistDetailData` - 歌单详情（含曲目列表）

**示例**:
```typescript
export interface QueryListData {
  id: number
  name: string
  alias: string[]
  artists: { name: string; id: number }[]
  mvid: number
  album: { name: string }
  duration: number
}
```

### 博客相关类型（`interface/blog.ts`）

**核心类型**:
- `Tag` - 标签（id, text, color）
- `Category` - 分类（id, text, order, description, belongs, defaultPoster）
- `Article` - 文章（包含标题、内容、标签、分类、状态、时间戳等）
- `SubmitArticle` - 提交表单类型（标签与分类为字符串 ID）
- `ArticleState` - 枚举（UN_PUBLISHED, PUBLISHED）

**示例**:
```typescript
export interface Article {
  id: string
  title: string
  tags: Tag[]
  category: Category
  state: ArticleState
  content: string
  description: string
  poster?: string
  updateAt: string
  createAt: string
}
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 使用 Mock Service Worker (MSW) 模拟 API 响应
- 为每个 API 函数编写单元测试
- 测试异常情况（网络错误、超时、非 200 状态码）

---

## 常见问题 (FAQ)

### Q1: 如何添加新的 API 接口？
**A**:
1. 在 `src/interface/` 定义接口的 TypeScript 类型
2. 在 `src/api/` 对应模块（或新建文件）中添加函数
3. 使用 `request` 实例发起请求，并进行类型标注
4. 在响应处理中解包数据（如 `response.data`）

### Q2: 为什么请求失败但没有错误提示？
**A**: 检查响应拦截器逻辑，确保 `code !== 200` 时正确抛出 Promise.reject。前端需在调用处使用 `try-catch` 或 `.catch()` 捕获错误。

### Q3: 开发环境下如何修改代理目标？
**A**: 修改 `vite.config.ts` 中的 `server.proxy` 配置，重启开发服务器生效。

### Q4: 如何处理 CORS 跨域问题？
**A**:
- 开发环境：通过 Vite 代理解决（已配置）
- 生产环境：需后端配置 CORS 响应头，或使用反向代理（如 Nginx）

### Q5: 请求超时时间如何调整？
**A**: 修改 `utils/request.ts` 中 `axios.create()` 的 `timeout` 参数（当前 10 秒）。

---

## 相关文件清单

```
src/api/
├── music.ts           # 音乐 API 接口
└── blog.ts            # 博客 API 接口

src/interface/
├── music.ts           # 音乐类型定义
└── blog.ts            # 博客类型定义

src/utils/
└── request.ts         # Axios 实例配置
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 API 模块文档
- 整理音乐与博客 API 接口列表
- 补充类型定义说明
