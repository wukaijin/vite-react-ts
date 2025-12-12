# Music 模块文档

[根目录](../../../CLAUDE.md) > [src](../../) > [pages](../) > **music**

> 最后更新：2025-12-12 23:57:58

---

## 模块职责

Music 模块实现在线音乐播放器功能，包括：

- 音乐搜索与播放
- 歌单浏览与推荐
- 歌词显示与滚动
- 播放器控制（播放/暂停、进度条、音量）
- Banner 轮播与新歌推荐

---

## 入口与启动

**主要文件**:
- `index.tsx` - 音乐模块主入口（布局容器）
- `music-home/index.tsx` - 音乐首页
- `music-search/index.tsx` - 搜索页
- `playlist-detail/index.tsx` - 歌单详情页
- `MusicHeader.tsx` - 音乐模块头部
- `List.tsx` - 歌曲列表组件
- `util.ts` - 工具函数（时间格式化等）

**路由配置**（在 `src/router/index.tsx`）:
```typescript
{
  path: '/music',
  element: MusicPage,
  children: [
    { path: 'home', element: MusicHome },
    { path: 'search', element: MusicSearch },
    { path: 'playlist-detail', element: PlaylistDetail }
  ]
}
```

---

## 对外接口

### 首页模块（`music-home/`）

**组件结构**:
- `index.tsx` - 首页容器
- `home-banner/index.tsx` - 轮播 Banner
- `recommend-playlist/index.tsx` - 推荐歌单列表
- `PlaylistCard.tsx` - 歌单卡片
- `PlaylistTags.tsx` - 歌单标签筛选
- `NewSongs.tsx` - 最新歌曲

**功能**:
- 展示轮播 Banner（网易云音乐推荐）
- 推荐歌单列表（支持标签筛选）
- 最新歌曲推荐

### 搜索模块（`music-search/`）

**功能**:
- 关键词搜索歌曲
- 实时搜索结果展示
- 点击播放或添加到播放列表

**API 调用**:
```typescript
import { queryKeyWord } from '@/api/music'

const results = await queryKeyWord<QueryListData>(keyword)
```

### 歌单详情（`playlist-detail/`）

**功能**:
- 展示歌单封面、标题、创建者信息
- 歌单曲目列表
- 播放全部/收藏歌单

**API 调用**:
```typescript
import { queryPlaylistDetail } from '@/api/music'

const playlist = await queryPlaylistDetail(playlistId)
```

### 播放器控制

**状态管理**（Redux Store）:
```typescript
import { useSelector, useDispatch } from 'react-redux'
import { togglePlaying, updateCurrentSong } from '@/store/music'

const { current, playing, showPlayer } = useSelector(state => state.music)

// 播放歌曲
dispatch(updateCurrentSong({
  id: song.id,
  name: song.name,
  artiest: song.artists[0].name,
  url: await querySrc(song.id),
  lyric: await queryLyric(song.id)
}))
dispatch(togglePlaying(true))
```

**播放器组件**（`@/components/enhance/player`）:
- 进度条拖拽
- 播放/暂停控制
- 音量调节
- 歌词面板（`LyricPanel.tsx`）

---

## 关键依赖与配置

### 依赖项
- `@/api/music` - 音乐 API 接口
- `@/store/music` - 音乐状态管理
- `@/components/enhance/player` - 播放器组件
- `react-router-dom` - 路由导航

### 样式方案
- `music.scss` - 音乐模块全局样式
- `music-home/home-banner/index.scss` - Banner 样式
- `music-home/recommend-playlist/index.scss` - 歌单列表样式
- `playlist-detail/index.scss` - 歌单详情样式

### API 接口列表

**搜索与播放**:
- `queryKeyWord(key)` - 搜索歌曲
- `querySrc(id)` - 获取播放链接
- `queryLyric(id)` - 获取歌词

**推荐与发现**:
- `queryNewSongs()` - 最新歌曲
- `queryPlaylistTags()` - 歌单标签
- `queryTopPlaylist(tagName)` - 热门歌单
- `queryBanner()` - 轮播 Banner

**歌单详情**:
- `queryPlaylistDetail(id)` - 歌单详情（含曲目列表）

---

## 数据模型

### Song 类型（Redux Store）
```typescript
type Song = {
  artiest: string  // 艺术家
  name: string     // 歌曲名
  alias: string    // 别名
  album: string    // 专辑
  id: number       // 歌曲 ID
  url: string      // 播放链接
  lyric: string    // 歌词（LRC 格式）
}
```

### PlaylistItem 类型（`interface/music.ts`）
```typescript
type PlaylistItem = {
  id: number
  name: string
  coverImgUrl: string
  playCount: number
  subscribedCount: number
  tags: string[]
  description: string
  // ...
}
```

### QueryListData 类型
```typescript
interface QueryListData {
  id: number
  name: string
  alias: string[]
  artists: { name: string; id: number }[]
  mvid: number
  album: { name: string }
  duration: number
}
```

---

## 测试与质量

**当前状态**: 无独立测试文件。

**建议**:
- 测试播放器状态切换（播放/暂停）
- 测试搜索功能与结果展示
- 测试歌词滚动与同步
- Mock 音乐 API 响应进行单元测试

---

## 常见问题 (FAQ)

### Q1: 如何播放一首歌曲？
**A**:
```typescript
import { useDispatch } from 'react-redux'
import { updateCurrentSong, togglePlaying } from '@/store/music'
import { querySrc, queryLyric } from '@/api/music'

const dispatch = useDispatch()

async function playSong(song) {
  const url = await querySrc(song.id)
  const lyric = await queryLyric(song.id)

  dispatch(updateCurrentSong({
    id: song.id,
    name: song.name,
    artiest: song.artists[0].name,
    album: song.album.name,
    url,
    lyric
  }))
  dispatch(togglePlaying(true))
}
```

### Q2: 歌词如何解析与滚动？
**A**: LRC 歌词格式示例：
```
[00:12.00]第一句歌词
[00:17.50]第二句歌词
```
解析步骤：
1. 正则提取时间戳与文本
2. 转换为对象数组 `{ time: 12000, text: '第一句歌词' }`
3. 播放时根据当前时间匹配显示行
4. 使用 `scrollIntoView` 或 `scrollTop` 滚动到当前行

### Q3: 播放器如何保存状态？
**A**: 当前歌曲通过 Redux Store 持久化到 LocalStorage（见 `store/music.ts` 的 `updateCurrentSong` reducer）。

### Q4: 如何切换歌单标签筛选？
**A**: `PlaylistTags.tsx` 组件：
1. 调用 `queryPlaylistTags()` 获取标签列表
2. 点击标签调用 `queryTopPlaylist(tagName)` 更新歌单列表
3. 使用 React 状态管理当前选中标签

### Q5: 音乐 API 有请求限制吗？
**A**: 网易云音乐 API 可能有频率限制，建议：
- 实现请求节流（throttle）
- 缓存常用数据（如热门歌单）
- 考虑自建后端代理层

---

## 相关文件清单

```
src/pages/music/
├── index.tsx                      # 音乐模块主入口
├── music.scss                     # 全局样式
├── MusicHeader.tsx                # 头部组件
├── List.tsx                       # 歌曲列表
├── util.ts                        # 工具函数
├── music-home/                    # 音乐首页
│   ├── index.tsx
│   ├── NewSongs.tsx               # 最新歌曲
│   ├── home-banner/               # Banner 轮播
│   │   ├── index.tsx
│   │   └── index.scss
│   └── recommend-playlist/        # 推荐歌单
│       ├── index.tsx
│       ├── index.scss
│       ├── PlaylistCard.tsx       # 歌单卡片
│       └── PlaylistTags.tsx       # 标签筛选
├── music-search/                  # 搜索页
│   └── index.tsx
└── playlist-detail/               # 歌单详情
    ├── index.tsx
    └── index.scss
```

---

## 变更记录 (Changelog)

### 2025-12-12 23:57:58
- 初始化 Music 模块文档
- 整理播放器功能与 API 接口
- 补充歌单与搜索功能说明
