import React, { useEffect, useRef } from 'react'

// ============================================================================
// 类型定义 (Type Definitions)
// ============================================================================

/**
 * 科幻可视化器组件的属性接口
 * @interface SciFiVisualizerProps
 */
interface SciFiVisualizerProps {
  /** 音频元素的引用 */
  audioRef: React.RefObject<HTMLAudioElement | null>
  /** 音频是否正在播放 */
  isPlaying: boolean
  /** 可选的配置项 */
  config?: Partial<VisualizerConfig>
}

/**
 * 可视化器配置接口
 * @interface VisualizerConfig
 */
interface VisualizerConfig {
  /** 球体上的点数量 (建议 80-200) */
  numPoints: number
  /** 球体半径 (像素) */
  sphereRadius: number
  /** 基础旋转速度 (弧度/秒) */
  baseRotationSpeed: number
  /** 音频驱动的额外旋转速度系数 */
  audioRotationBoost: number
  /** 低音脉冲缩放系数 (0-2) */
  bassPulseScale: number
  /** 点之间的最大连接距离 (像素) */
  maxConnectionDistance: number
  /** 每个点的最大连接数 (性能优化) */
  maxConnectionsPerPoint: number
  /** 透视视野 (FOV) 值 */
  perspectiveFOV: number
  /** 画布宽度 (像素) */
  canvasWidth: number
  /** 画布高度 (像素) */
  canvasHeight: number
  /** 可视化器整体不透明度 (0-1) */
  opacity: number
  /** FFT 大小 (必须是 2 的幂次方: 256, 512, 1024, 2048) */
  fftSize: number
  /** 音频平滑常数 (0-1, 越大越平滑) */
  smoothingTimeConstant: number
  /** 色相循环周期 (毫秒) */
  hueRotationPeriod: number
}

/**
 * 3D 空间中的点
 * @interface Point3D
 */
interface Point3D {
  /** 当前 X 坐标 */
  x: number
  /** 当前 Y 坐标 */
  y: number
  /** 当前 Z 坐标 */
  z: number
  /** 基础 X 坐标 (未变换) */
  baseX: number
  /** 基础 Y 坐标 (未变换) */
  baseY: number
  /** 基础 Z 坐标 (未变换) */
  baseZ: number
}

/**
 * 变换后的 2D 投影点
 * @interface TransformedPoint
 */
interface TransformedPoint {
  /** 投影后的 X 坐标 */
  px: number
  /** 投影后的 Y 坐标 */
  py: number
  /** 投影缩放比例 */
  scale: number
  /** Z 深度值 (用于排序和透明度) */
  z: number
}

// ============================================================================
// 默认配置 (Default Configuration)
// ============================================================================

/**
 * 可视化器的默认配置
 * 这些值经过调优，可以提供良好的视觉效果和性能平衡
 */
const DEFAULT_CONFIG: VisualizerConfig = {
  numPoints: 84,
  sphereRadius: 100,
  baseRotationSpeed: 0.05,
  audioRotationBoost: 0.05,
  bassPulseScale: 1.8,
  maxConnectionDistance: 2500,
  maxConnectionsPerPoint: 3,
  perspectiveFOV: 800,
  canvasWidth: 1000,
  canvasHeight: 1000,
  opacity: 0.5,
  fftSize: 1024,
  smoothingTimeConstant: 0.65,
  hueRotationPeriod: 5000 // 10 秒完成一次色相循环
}

// ============================================================================
// 工具函数 (Utility Functions)
// ============================================================================

/**
 * 使用 Fibonacci 球体算法生成均匀分布的 3D 点
 * 这是计算机图形学中生成球面均匀分布的经典算法
 *
 * @param numPoints - 要生成的点数量
 * @param radius - 球体半径
 * @returns 3D 点数组
 */
const generateFibonacciSphere = (numPoints: number, radius: number): Point3D[] => {
  const points: Point3D[] = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // 黄金角度 ≈ 137.5°

  for (let i = 0; i < numPoints; i++) {
    // y 坐标从 1 到 -1 线性分布
    const y = 1 - (i / (numPoints - 1)) * 2

    // 在当前 y 高度的圆的半径
    const radiusAtY = Math.sqrt(1 - y * y)

    // 使用黄金角度计算旋转角度
    const theta = phi * i

    // 计算 x 和 z 坐标
    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY

    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
      baseX: x * radius,
      baseY: y * radius,
      baseZ: z * radius
    })
  }

  return points
}

/**
 * 计算音频频率数据的低音和中音强度
 *
 * @param dataArray - 频率数据数组
 * @param bufferLength - 缓冲区长度
 * @returns 包含 bass 和 mid 强度的对象
 */
const calculateAudioIntensities = (
  dataArray: Uint8Array,
  bufferLength: number
): { bass: number; mid: number } => {
  let bass = 0
  let mid = 0

  // 低音频段: 0-20 bins (约 0-860 Hz @ 44.1kHz, FFT=512)
  // 中音频段: 20-100 bins (约 860-4300 Hz)
  for (let i = 0; i < bufferLength; i++) {
    if (i < 20) {
      bass += dataArray[i]
    } else if (i < 100) {
      mid += dataArray[i]
    }
  }

  // 归一化到 0-255 范围
  bass = bass / 20
  mid = mid / 80

  return { bass, mid }
}

/**
 * 对 3D 点应用旋转变换
 *
 * @param point - 原始 3D 点
 * @param rotX - X 轴旋转角度 (弧度)
 * @param rotY - Y 轴旋转角度 (弧度)
 * @param scale - 缩放系数
 * @returns 旋转后的坐标
 */
const rotatePoint = (
  point: Point3D,
  rotX: number,
  rotY: number,
  scale: number
): { x: number; y: number; z: number } => {
  // 应用缩放
  let x = point.baseX * scale
  let y = point.baseY * scale
  let z = point.baseZ * scale

  // 绕 Y 轴旋转
  const cosY = Math.cos(rotY)
  const sinY = Math.sin(rotY)
  const x1 = x * cosY - z * sinY
  const z1 = z * cosY + x * sinY
  x = x1
  z = z1

  // 绕 X 轴旋转
  const cosX = Math.cos(rotX)
  const sinX = Math.sin(rotX)
  const y2 = y * cosX - z * sinX
  const z2 = z * cosX + y * sinX
  y = y2
  z = z2

  return { x, y, z }
}

/**
 * 将 3D 坐标投影到 2D 画布坐标
 * 使用透视投影模拟近大远小效果
 *
 * @param x - 3D X 坐标
 * @param y - 3D Y 坐标
 * @param z - 3D Z 坐标
 * @param fov - 视野 (Field of View)
 * @returns 投影后的 2D 坐标和缩放比例
 */
const projectTo2D = (x: number, y: number, z: number, fov: number): TransformedPoint => {
  const scaleProj = fov / (fov + z)
  return {
    px: x * scaleProj,
    py: y * scaleProj,
    scale: scaleProj,
    z
  }
}

/**
 * 生成动态 HSL 颜色字符串
 *
 * @param hue - 色相 (0-360)
 * @param lightness - 亮度 (0-100)
 * @param alpha - 透明度 (0-1)
 * @returns HSL 颜色字符串
 */
const generateColorString = (hue: number, lightness: number, alpha: number): string => {
  return `hsla(${hue}, 80%, ${lightness}%, ${alpha})`
}

// ============================================================================
// 主组件 (Main Component)
// ============================================================================

/**
 * 科幻风格的 3D 音频可视化器组件
 *
 * 功能特性:
 * - 使用 Fibonacci 球体算法生成均匀分布的 3D 点
 * - 基于音频频率数据的实时动画效果
 * - 低音驱动的脉冲缩放和旋转加速
 * - 中音驱动的颜色亮度和连接线透明度
 * - 动态色相循环和节拍闪光效果
 * - 透视投影和深度排序实现 3D 效果
 *
 * @component
 * @example
 * ```tsx
 * <SciFiVisualizer
 *   audioRef={audioRef}
 *   isPlaying={isPlaying}
 *   config={{
 *     numPoints: 150,
 *     bassPulseScale: 1.5,
 *     opacity: 0.7
 *   }}
 * />
 * ```
 */
export const SciFiVisualizer: React.FC<SciFiVisualizerProps> = ({
  audioRef,
  isPlaying,
  config: userConfig = {}
}) => {
  // 合并用户配置和默认配置
  const config: VisualizerConfig = { ...DEFAULT_CONFIG, ...userConfig }

  // ============================================================================
  // Refs (引用)
  // ============================================================================

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const pointsRef = useRef<Point3D[]>([])

  // ============================================================================
  // Effect: 初始化球体点 (Initialize Sphere Points)
  // ============================================================================

  useEffect(() => {
    // 使用 Fibonacci 球体算法生成均匀分布的 3D 点
    pointsRef.current = generateFibonacciSphere(config.numPoints, config.sphereRadius)
  }, [config.numPoints, config.sphereRadius])

  // ============================================================================
  // Effect: 音频可视化主逻辑 (Main Audio Visualization Logic)
  // ============================================================================

  useEffect(() => {
    if (!audioRef.current) return

    /**
     * 初始化 Web Audio API
     * 创建 AudioContext、AnalyserNode 并连接音频源
     */
    const initAudio = () => {
      if (!audioContextRef.current) {
        // 兼容不同浏览器的 AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (!AudioContextClass) {
          console.warn('Web Audio API 不支持')
          return
        }

        // 创建音频上下文和分析器节点
        audioContextRef.current = new AudioContextClass()
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = config.fftSize
        analyserRef.current.smoothingTimeConstant = config.smoothingTimeConstant

        // 连接音频源到分析器
        if (!sourceRef.current && audioRef.current) {
          try {
            sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
            sourceRef.current.connect(analyserRef.current)
            analyserRef.current.connect(audioContextRef.current.destination)
          } catch (e) {
            console.warn('MediaElementSource 已连接', e)
          }
        }
      }

      // 恢复被暂停的音频上下文
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
    }

    /**
     * 绘制函数 - 每帧调用
     * 负责读取音频数据、变换 3D 点、绘制可视化效果
     */
    const draw = () => {
      const canvas = canvasRef.current
      const analyser = analyserRef.current
      if (!canvas || !analyser) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // ========================================================================
      // 1. 获取音频频率数据
      // ========================================================================
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyser.getByteFrequencyData(dataArray)

      // ========================================================================
      // 2. 计算音频强度
      // ========================================================================
      const { bass, mid } = calculateAudioIntensities(dataArray, bufferLength)
      const energy = (bass + mid) / 2

      // ========================================================================
      // 3. 计算动态参数
      // ========================================================================

      // 低音驱动的脉冲缩放效果 (球体膨胀/收缩)
      const scale = 1 + (bass / 255) * config.bassPulseScale

      // 动态旋转速度 (音乐能量越大，旋转越快)
      const time = Date.now() * 0.001
      const rotSpeed = config.baseRotationSpeed + (energy / 255) * config.audioRotationBoost
      const rotX = time * rotSpeed
      const rotY = time * (rotSpeed + 0.2)

      // 动态颜色 (色相循环 + 低音闪光)
      const baseHue = ((Date.now() * 360) / config.hueRotationPeriod) % 360
      const hue = baseHue - (bass / 255) * 20 // 低音峰值时色相偏移
      const lightness = 50 + (mid / 255) * 50 // 中音驱动亮度 (脉冲到白色)

      // ========================================================================
      // 4. 清空画布
      // ========================================================================
      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.translate(centerX, centerY)

      // ========================================================================
      // 5. 变换 3D 点到 2D 投影
      // ========================================================================
      const transformedPoints = pointsRef.current.map(p => {
        // 应用旋转和缩放
        const rotated = rotatePoint(p, rotX, rotY, scale)

        // 透视投影到 2D
        return projectTo2D(rotated.x, rotated.y, rotated.z, config.perspectiveFOV)
      })

      // 按 Z 深度排序 (画家算法 - 先画远处的点)
      // 虽然对于加法混合的线框效果影响较小，但对点的绘制顺序很重要
      transformedPoints.sort((a, b) => b.z - a.z)

      // ========================================================================
      // 6. 绘制连接线 (网格结构)
      // ========================================================================
      ctx.strokeStyle = generateColorString(hue, lightness, 0.15 + (mid / 255) * 0.5)
      ctx.lineWidth = 1 + (bass / 255) * 3

      ctx.beginPath()
      for (let i = 0; i < transformedPoints.length; i++) {
        const p1 = transformedPoints[i]

        // 查找最近的邻居点进行连接
        // 时间复杂度 O(N²)，但 N=120 时约 14400 次操作，对 JS 来说可接受
        let connections = 0
        for (let j = i + 1; j < transformedPoints.length; j++) {
          const p2 = transformedPoints[j]
          const dx = p1.px - p2.px
          const dy = p1.py - p2.py
          const distSquared = dx * dx + dy * dy

          // 动态连接距离 (随缩放调整)
          if (distSquared < config.maxConnectionDistance * (scale * scale)) {
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            connections++

            // 限制每个点的连接数 (性能优化 + 视觉风格)
            if (connections >= config.maxConnectionsPerPoint) break
          }
        }
      }
      ctx.stroke()

      // ========================================================================
      // 7. 绘制节点 (球体上的点)
      // ========================================================================
      for (let i = 0; i < transformedPoints.length; i++) {
        const p = transformedPoints[i]

        // 基于 Z 深度的透明度 (远处的点更透明)
        const opacity = (p.z + 200) / 400

        ctx.beginPath()
        ctx.arc(p.px, p.py, 3 * p.scale, 0, Math.PI * 2)
        ctx.fillStyle = generateColorString(
          hue,
          lightness,
          Math.max(0.3, Math.min(1, opacity + mid / 255))
        )
        ctx.fill()
      }

      ctx.restore()
    }

    /**
     * 启动动画循环
     * 使用 requestAnimationFrame 实现流畅的 60fps 动画
     */
    const startAnimation = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)

      const render = () => {
        draw()
        animationRef.current = requestAnimationFrame(render)
      }
      render()
    }

    /**
     * 处理音频播放事件
     */
    const handlePlay = () => {
      initAudio()
      if (isPlaying) startAnimation()
    }

    // ========================================================================
    // 事件监听和生命周期管理
    // ========================================================================
    const audioEl = audioRef.current
    audioEl.addEventListener('play', handlePlay)

    if (isPlaying) {
      initAudio()
      startAnimation()
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }

    // 清理函数
    return () => {
      audioEl.removeEventListener('play', handlePlay)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [audioRef, isPlaying, config])

  // ============================================================================
  // 渲染 (Render)
  // ============================================================================

  return (
    <canvas
      ref={canvasRef}
      width={config.canvasWidth}
      height={config.canvasHeight}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: config.opacity
      }}
    />
  )
}
