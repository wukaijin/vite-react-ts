import React, { useEffect, useRef } from 'react'

interface SciFiVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>
  isPlaying: boolean
}

interface Point3D {
  x: number
  y: number
  z: number
  baseX: number
  baseY: number
  baseZ: number
}

export const SciFiVisualizer: React.FC<SciFiVisualizerProps> = ({ audioRef, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(undefined)
  const analyserRef = useRef<AnalyserNode>(undefined)
  const audioContextRef = useRef<AudioContext>(undefined)
  const sourceRef = useRef<MediaElementAudioSourceNode>(undefined)

  // 3D Sphere Points State
  const pointsRef = useRef<Point3D[]>([])

  // Initialize Sphere Points
  useEffect(() => {
    const points: Point3D[] = []
    const numPoints = 120 // Enough for a good shape
    const radius = 150

    // Fibonacci Sphere Algorithm for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2 // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) // Radius at y

      const theta = phi * i

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
    pointsRef.current = points
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    const initAudio = () => {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (!AudioContextClass) return

        audioContextRef.current = new AudioContextClass()
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 512
        analyserRef.current.smoothingTimeConstant = 0.85

        if (!sourceRef.current && audioRef.current) {
          try {
            sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
            sourceRef.current.connect(analyserRef.current)
            analyserRef.current.connect(audioContextRef.current.destination)
          } catch (e) {
            console.warn('MediaElementSource attached', e)
          }
        }
      }
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume()
      }
    }

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

      // Audio Data
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyser.getByteFrequencyData(dataArray)

      // Calculate Intensities
      let bass = 0
      let mid = 0
      for (let i = 0; i < bufferLength; i++) {
        if (i < 20) bass += dataArray[i]
        else if (i < 100) mid += dataArray[i]
      }
      bass = bass / 20
      mid = mid / 80

      // Dynamic Parameters based on Music
      const scale = 1 + (bass / 255) * 1.2 // Increased pulse amplitude
      const energy = (bass + mid) / 2

      // Dynamic Rotation Speed
      const time = Date.now() * 0.001
      const rotSpeed = 0.05 + (energy / 255) * 0.05 // Spin faster on beat
      const rotX = time * rotSpeed
      const rotY = time * (rotSpeed + 0.2)

      // Dynamic Color (Cycling Spectrum + Beat Flash)
      // Cycle hue over time (10s period)
      const baseHue = (Date.now() * 0.05) % 360
      // Shift hue slightly on bass for impact
      const hue = baseHue - (bass / 255) * 20
      const lightness = 50 + (mid / 255) * 50 // Pulse to white
      const colorString = (alpha: number) => `hsla(${hue}, 80%, ${lightness}%, ${alpha})`

      // Clear
      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.translate(centerX, centerY)

      // Draw Connections
      ctx.strokeStyle = colorString(0.15 + (mid / 255) * 0.5)
      ctx.lineWidth = 1 + (bass / 255) * 3

      // Transform Points
      const transformedPoints = pointsRef.current.map(p => {
        // Apply Audio Scale to Radius (Explode effect)
        let x = p.baseX * scale
        let y = p.baseY * scale
        let z = p.baseZ * scale

        // Rotate Y
        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const x1 = x * cosY - z * sinY
        const z1 = z * cosY + x * sinY
        x = x1
        z = z1

        // Rotate X
        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)
        const y2 = y * cosX - z * sinX
        const z2 = z * cosX + y * sinX
        y = y2
        z = z2

        // Perspective Project
        const fov = 800
        const scaleProj = fov / (fov + z)
        return {
          px: x * scaleProj,
          py: y * scaleProj,
          scale: scaleProj,
          z
        }
      })

      // Sort by Z for somewhat correct occlusion (Painter's algo)
      // Though for additive wireframe, order matters less, but good for dots
      transformedPoints.sort((a, b) => b.z - a.z)

      // Draw Lines
      ctx.beginPath()
      for (let i = 0; i < transformedPoints.length; i++) {
        const p1 = transformedPoints[i]

        // Find nearest neighbors to connect
        // This is O(N^2), but N is small (120) so it's ~14400 ops, fine for JS
        let connections = 0
        for (let j = i + 1; j < transformedPoints.length; j++) {
          const p2 = transformedPoints[j]
          const dx = p1.px - p2.px
          const dy = p1.py - p2.py
          const dist = dx * dx + dy * dy

          if (dist < 2500 * (scale * scale)) {
            // Dynamic connection distance
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            connections++
            if (connections > 2) break // Limit connections per point for performance/style
          }
        }
      }
      ctx.stroke()

      // Draw Points (Nodes)
      for (let i = 0; i < transformedPoints.length; i++) {
        const p = transformedPoints[i]
        const opacity = (p.z + 200) / 400 // Fade back points

        ctx.beginPath()
        ctx.arc(p.px, p.py, 3 * p.scale, 0, Math.PI * 2)
        ctx.fillStyle = colorString(Math.max(0.3, Math.min(1, opacity + mid / 255)))
        ctx.fill()
      }

      ctx.restore()
    }

    const startAnimation = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      const render = () => {
        draw()
        animationRef.current = requestAnimationFrame(render)
      }
      render()
    }

    const handlePlay = () => {
      initAudio()
      if (isPlaying) startAnimation()
    }

    const audioEl = audioRef.current
    audioEl.addEventListener('play', handlePlay)

    if (isPlaying) {
      initAudio()
      startAnimation()
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }

    return () => {
      audioEl.removeEventListener('play', handlePlay)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [audioRef, isPlaying])

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5
      }}
    />
  )
}
