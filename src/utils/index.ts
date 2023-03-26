/*
 * @Author: Carlos
 * @Date: 2022-12-28 13:05:11
 * @LastEditTime: 2023-02-16 16:32:21
 * @FilePath: /vite-react-swc/src/utils/index.ts
 * @Description:
 */
export const getUniqueId: () => string = () => Math.random().toString(36).substring(2, 10)

export function throttle<T extends Function>(func: T, wait: number) {
  let timer = 0
  let lastDate = 0
  return function (this: ThisType<T>, ...args: any) {
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    const now = +new Date()
    const remainDate = wait - (now - lastDate)
    if (remainDate <= 0) {
      lastDate = now
      if (typeof func === 'function') {
        func.apply(this, args)
      }
    } else {
      timer = window.setTimeout(() => {
        lastDate = +new Date()
        if (typeof func === 'function') {
          func.apply(this, args)
        }

        timer = 0
      }, remainDate)
    }
  }
}

type Key = 'ti' | 'ar' | 'al' | 'by'
type Time = {
  m: string
  s: string
  ms: string
}
type LrcItem = {
  time: Time
  lyric: string
}
export function parseLyric(lyric: string) {
  const lrcObj = {
    ti: '',
    ar: '',
    al: '',
    by: '',
    lrc: [] as LrcItem[]
  }

  /*
  [ar:艺人名]
  [ti:曲名]
  [al:专辑名]
  [by:编者（指编辑LRC歌词的人）]
  [offset:时间补偿值] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。
*/

  lyric
    .split('\n')
    .filter(value => {
      // 1.通过回车去分割歌词每一行,遍历数组，去除空行空格
      return value.trim() !== ''
    })
    .map(value => {
      // 2.解析歌词
      const line = parseLyricLine(value.trim())
      if (line) {
        if (line.type === 'lyric') {
          lrcObj.lrc.push(line.data)
        } else {
          lrcObj[line.type] = line.data
        }
      }
      return value.trim()
    })

  function parseLyricLine(line: string) {
    const tiArAlByExp = /^\[(ti|ar|al|by):(.*)\]$/
    const lyricExp = /^\[(\d{2}):(\d{2}).(\d{2,3})\](.*)/
    const result = line.match(tiArAlByExp)
    if (result !== null) {
      return {
        type: result[1] as Key,
        data: result[2] as string
      }
    }
    const result2 = line.match(lyricExp)
    if (result2 !== null) {
      return {
        type: 'lyric' as const,
        data: {
          time: {
            m: result2[1],
            s: result2[2],
            ms: result2[3]
          },
          lyric: result2[4].trim()
        }
      }
    }
    return null
  }

  return lrcObj
}

export function parseMusicTime(timeObject?: Time) {
  if (!timeObject) return 0
  const { m, s, ms } = timeObject
  return Number(m) * 60 + Number(s) + Number(ms) / (ms.length > 2 ? 1000 : 100)
}

export function musicDurationToString(duration: number): string {
  if (duration <= 0) return '00:00'
  const m = Math.floor(duration / 60)
  const s = (duration - m * 60).toFixed()
  return `${m.toString().padStart(2, '0')}:${s.padStart(2, '0')}`
}
export default {}
