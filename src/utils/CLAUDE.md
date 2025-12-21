# Utils 模块文档

[根目录](../../CLAUDE.md) > [src](../) > **utils**

> 最后更新：2025-12-16 00:00:00

---

## 模块职责

Utils 模块提供项目中使用的通用工具函数，封装常见的功能逻辑，提升代码复用性。主要功能包括：

- HTTP 请求封装（Axios 实例与拦截器）
- 事件总线（EventEmitter）
- 图片加载 Promise 封装
- Markdown 目录生成器
- 防抖函数
- 其他通用工具函数

---

## 入口与启动

**主要文件**:
- `request.ts` - Axios 实例配置与拦截器
- `eventemitter.ts` - 全局事件总线
- `ImagePromise.ts` - 图片加载 Promise 封装
- `generateDirectory.ts` - Markdown 目录生成器
- `debounce.ts` - 防抖函数
- `index.ts` - 工具函数统一导出

---

## 对外接口

### HTTP 请求工具 (`request.ts`)

**功能**: 统一的 Axios 实例配置，提供请求/响应拦截器

**配置**:
```typescript
const request: AxiosInstance = axios.create({
  withCredentials: true,  // 跨域携带 Cookie
  timeout: 10 * 1000      // 10 秒超时
})
```

**请求拦截器**:
- 确保 `config.url` 不为 `undefined`
- 预留添加时间戳参数的逻辑（已注释）

**响应拦截器**:
```typescript
response => {
  const res = response.data
  if (!res || res.code !== 200) {
    return Promise.reject(res)  // 非 200 状态码视为失败
  }
  return res
}
```

**使用示例**:
```typescript
import request from '@/utils/request'

// GET 请求
const data = await request.get('/api/users')

// POST 请求
const result = await request.post('/api/users', { name: 'John' })
```

**特点**:
- 统一的错误处理
- 自动携带 Cookie（跨域）
- 10 秒超时保护
- 响应数据自动解包

---

### 事件总线 (`eventemitter.ts`)

**功能**: 全局事件发布/订阅系统，用于跨组件通信

**实现**: 基于 `eventemitter3` 库

**使用示例**:
```typescript
import eventemitter from '@/utils/eventemitter'

// 订阅事件
eventemitter.on('user:login', (user) => {
  console.log('用户登录:', user)
})

// 发布事件
eventemitter.emit('user:login', { id: 1, name: 'John' })

// 取消订阅
eventemitter.off('user:login', handler)
```

**常见事件**:
- `music:play` - 音乐播放
- `music:pause` - 音乐暂停
- `modal:open` - 模态框打开
- `modal:close` - 模态框关闭

**注意事项**:
- 避免事件名冲突，建议使用命名空间（如 `module:action`）
- 及时取消订阅，避免内存泄漏
- 不要在事件处理函数中执行耗时操作

---

### 图片加载 Promise (`ImagePromise.ts`)

**功能**: 将图片加载封装为 Promise，便于异步处理

**函数签名**:
```typescript
const ImagePromise = (src: string) => Promise<Event>
```

**使用示例**:
```typescript
import ImagePromise from '@/utils/ImagePromise'

// 预加载图片
try {
  await ImagePromise('/path/to/image.jpg')
  console.log('图片加载成功')
} catch (error) {
  console.error('图片加载失败', error)
}

// 批量预加载
const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg']
await Promise.all(images.map(ImagePromise))
```

**应用场景**:
- 图片预加载（提升用户体验）
- 图片加载状态管理
- 图片懒加载实现

---

### Markdown 目录生成器 (`generateDirectory.ts`)

**功能**: 从 Markdown 文本中提取标题，生成树形目录结构

**函数签名**:
```typescript
function generateDirectory(text: string, level?: number): Title[]

type Title = {
  title: string
  index: number
  children?: Title[]
}
```

**参数**:
- `text` - Markdown 文本内容
- `level` - 提取的标题层级（默认 3，即 h1-h3）

**使用示例**:
```typescript
import generateDirectory from '@/utils/generateDirectory'

const markdown = `
# 第一章
## 1.1 节
## 1.2 节
# 第二章
## 2.1 节
`

const directory = generateDirectory(markdown, 2)
// 返回:
// [
//   { title: '第一章', index: 0, children: [
//     { title: '1.1 节', index: 10 },
//     { title: '1.2 节', index: 20 }
//   ]},
//   { title: '第二章', index: 30, children: [
//     { title: '2.1 节', index: 40 }
//   ]}
// ]
```

**应用场景**:
- 博客文章目录生成
- Markdown 编辑器目录导航
- 文档结构分析

---

### 防抖函数 (`debounce.ts`)

**功能**: 防抖函数，限制函数执行频率

**函数签名**:
```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void
```

**使用示例**:
```typescript
import debounce from '@/utils/debounce'

// 搜索输入防抖
const handleSearch = debounce((keyword: string) => {
  console.log('搜索:', keyword)
}, 300)

<input onChange={(e) => handleSearch(e.target.value)} />
```

**应用场景**:
- 搜索框输入
- 窗口 resize 事件
- 滚动事件处理

---

## 关键依赖与配置

### 依赖项
- `axios` 1.6.2 - HTTP 客户端
- `eventemitter3` 5.0.1 - 事件总线库

### Vite 代理配置
开发环境下，API 请求通过 Vite 代理转发：
```typescript
// vite.config.ts
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

### Title 类型 (generateDirectory)
```typescript
type Title = {
  title: string      // 标题文本
  index: number      // 标题在原文中的位置
  children?: Title[] // 子标题（嵌套结构）
}
```

### Axios 响应格式
```typescript
type ApiResponse<T> = {
  code: number
  message?: string
  data: T
}
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 为 `generateDirectory` 编写单元测试（测试不同层级的标题提取）
- 测试 `ImagePromise` 的成功/失败场景
- 测试 `debounce` 的防抖效果
- 使用 Mock Service Worker (MSW) 测试 `request` 拦截器

---

## 常见问题 (FAQ)

### Q1: 如何修改请求超时时间？
**A**: 修改 `request.ts` 中 `axios.create()` 的 `timeout` 参数（当前 10 秒）。

### Q2: 为什么响应拦截器只接受 code === 200？
**A**: 这是项目约定的 API 响应格式。如果后端返回其他状态码表示成功，需修改拦截器逻辑。

### Q3: eventemitter 如何避免内存泄漏？
**A**: 在组件卸载时使用 `eventemitter.off()` 取消订阅：
```typescript
useEffect(() => {
  const handler = () => { /* ... */ }
  eventemitter.on('event', handler)
  return () => eventemitter.off('event', handler)
}, [])
```

### Q4: generateDirectory 支持哪些 Markdown 标题格式？
**A**: 支持标准 Markdown 标题格式（`# 标题`），支持 1-6 级标题，默认提取 1-3 级。

### Q5: 如何添加新的工具函数？
**A**:
1. 在 `src/utils/` 创建新文件（如 `throttle.ts`）
2. 实现函数逻辑，确保类型安全
3. 在 `index.ts` 中导出（如需统一导出）
4. 编写 JSDoc 注释说明用途

---

## 相关文件清单

```
src/utils/
├── index.ts               # 工具函数统一导出
├── request.ts             # Axios 实例与拦截器
├── eventemitter.ts        # 全局事件总线
├── ImagePromise.ts        # 图片加载 Promise
├── generateDirectory.ts   # Markdown 目录生成器
└── debounce.ts            # 防抖函数
```

---

## 变更记录 (Changelog)

### 2025-12-13 21:54:40
- 初始化 Utils 模块文档
- 记录所有工具函数的接口与使用示例
- 补充类型定义与常见问题
