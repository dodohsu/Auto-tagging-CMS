import { useEffect, useRef, useState } from "react"

type PlayerEvent = { target: YouTubePlayer }
type YouTubePlayer = {
  destroy: () => void
  getCurrentTime: () => number
  getPlayerState: () => number
  mute: () => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
}
type YouTubeApi = {
  Player: new (element: HTMLElement, options: {
    videoId: string
    width?: string
    height?: string
    host?: string
    playerVars?: Record<string, string | number>
    events: { onReady: (event: PlayerEvent) => void; onStateChange: (event: PlayerEvent) => void; onError: () => void }
  }) => YouTubePlayer
}
type YouTubeWindow = Window & { YT?: YouTubeApi; onYouTubeIframeAPIReady?: () => void }

let apiPromise: Promise<YouTubeApi> | undefined

function loadYouTubeApi() {
  const host = window as YouTubeWindow
  if (host.YT?.Player) return Promise.resolve(host.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const previousReady = host.onYouTubeIframeAPIReady
    host.onYouTubeIframeAPIReady = () => {
      previousReady?.()
      if (host.YT) resolve(host.YT)
      else reject(new Error("YouTube player API unavailable"))
    }
    let script = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]')
    if (!script) {
      script = document.createElement("script")
      script.src = "https://www.youtube.com/iframe_api"
      script.async = true
      script.onerror = () => reject(new Error("YouTube player API failed to load"))
      document.head.append(script)
    }
  }).catch(error => {
    apiPromise = undefined
    throw error
  })
  return apiPromise
}

export default function YouTubeChapterPlayer({ videoId, time, onTimeChange, title, autoPlay = false }: { videoId: string; time: number; onTimeChange: (seconds: number) => void; title: string; autoPlay?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YouTubePlayer | null>(null)
  const lastReportedTime = useRef<number | null>(null)
  const timeRef = useRef(time)
  const onTimeChangeRef = useRef(onTimeChange)
  const [error, setError] = useState(false)

  useEffect(() => {
    timeRef.current = time
    onTimeChangeRef.current = onTimeChange
  }, [time, onTimeChange])

  useEffect(() => {
    let cancelled = false
    let poll: number | undefined
    void loadYouTubeApi().then(YT => {
      if (cancelled || !containerRef.current) return
      // The API replaces its target with an iframe; keep React's container intact.
      const target = document.createElement("div")
      containerRef.current.replaceChildren(target)
      playerRef.current = new YT.Player(target, {
        videoId,
        width: "100%",
        height: "100%",
        host: "https://www.youtube.com",
        playerVars: { autoplay: autoPlay ? 1 : 0, controls: 1, playsinline: 1, rel: 0, start: Math.floor(timeRef.current), origin: window.location.origin },
        events: {
          onReady: event => {
            playerRef.current = event.target
            if (timeRef.current > 0) event.target.seekTo(timeRef.current, true)
            if (autoPlay) {
              event.target.mute()
              event.target.playVideo()
            }
          },
          onStateChange: event => {
            if (poll !== undefined) window.clearInterval(poll)
            poll = undefined
            if (event.target.getPlayerState() === 1) {
              poll = window.setInterval(() => {
                const player = playerRef.current
                if (!player) return
                const current = Math.floor(player.getCurrentTime())
                if (current !== lastReportedTime.current) {
                  lastReportedTime.current = current
                  onTimeChangeRef.current(current)
                }
              }, 500)
            }
          },
          onError: () => setError(true),
        },
      })
    }).catch(() => { if (!cancelled) setError(true) })
    return () => {
      cancelled = true
      if (poll !== undefined) window.clearInterval(poll)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [autoPlay, videoId])

  useEffect(() => {
    const player = playerRef.current
    if (!player || lastReportedTime.current === time) return
    if (Math.abs(player.getCurrentTime() - time) > 0.5) player.seekTo(time, true)
  }, [time])

  return <div className="absolute inset-0 bg-neutral-950">
    <div ref={containerRef} className="absolute inset-0 [&>iframe]:block [&>iframe]:h-full [&>iframe]:w-full" title={title} />
    {error && <div className="absolute inset-0 grid place-items-center bg-neutral-950 p-4 text-center text-sm text-white"><a className="underline" href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&t=${Math.floor(time)}s`} target="_blank" rel="noreferrer">播放器無法載入 · 在 YouTube 開啟影片</a></div>}
  </div>
}
