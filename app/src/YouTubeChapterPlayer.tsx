import { useEffect, useRef, useState } from "react"

type PlayerEvent = { target: YouTubePlayer }
type YouTubePlayer = {
  destroy: () => void
  getCurrentTime: () => number
  getPlayerState: () => number
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
}
type YouTubeApi = {
  Player: new (element: HTMLElement, options: {
    videoId: string
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

export default function YouTubeChapterPlayer({ videoId, time, onTimeChange, title }: { videoId: string; time: number; onTimeChange: (seconds: number) => void; title: string }) {
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
      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { controls: 1, playsinline: 1, rel: 0, start: Math.floor(timeRef.current) },
        events: {
          onReady: event => {
            playerRef.current = event.target
            if (timeRef.current > 0) event.target.seekTo(timeRef.current, true)
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
  }, [videoId])

  useEffect(() => {
    const player = playerRef.current
    if (!player || lastReportedTime.current === time) return
    if (Math.abs(player.getCurrentTime() - time) > 0.5) player.seekTo(time, true)
  }, [time])

  if (error) return <div className="absolute inset-0 grid place-items-center bg-neutral-950 p-4 text-center text-sm text-white"><a className="underline" href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&t=${Math.floor(time)}s`} target="_blank" rel="noreferrer">播放器無法載入 · 在 YouTube 開啟影片</a></div>
  return <div ref={containerRef} className="absolute inset-0 bg-neutral-950" title={title} />
}
