import { useEffect, useRef, useState } from "react"
import { Film, MoveDiagonal2, Pause, Play, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Props = { videoTitle: string; clipTitle: string; duration: number; time: number; onTimeChange: (time: number) => void; playing: boolean; onTogglePlayback: () => void; sectionLabel: string; note?: string; youtubeVideoId?: string; localVideoSrc?: string }
const timestamp = (value: number) => [Math.floor(value / 3600), Math.floor(value / 60) % 60, value % 60].map(number => String(Math.round(number)).padStart(2, "0")).join(":")

export default function ChapterVideoPreview({ videoTitle, clipTitle, duration, time, onTimeChange, playing, onTogglePlayback, sectionLabel, note = "示意播放 · 未連接實際影片", youtubeVideoId, localVideoSrc }: Props) {
  const previewRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastReportedVideoTime = useRef<number | null>(null)
  const resizeOrigin = useRef<{ x: number; y: number; width: number; height: number } | null>(null)
  const [previewSize, setPreviewSize] = useState<{ width: number; height: number } | null>(null)
  const [localVideoFailed, setLocalVideoFailed] = useState(false)
  const resizePreview = (width: number, height: number) => {
    const available = previewRef.current?.parentElement?.clientWidth ?? width
    setPreviewSize({ width: Math.max(Math.min(280, available), Math.min(available, width)), height: Math.max(240, Math.min(900, height)) })
  }
  useEffect(() => {
    const video = videoRef.current
    if (!video || !localVideoSrc || time === lastReportedVideoTime.current) return
    if (Math.abs(video.currentTime - time) > 0.5) video.currentTime = time
  }, [localVideoSrc, time])
  return <>
    <div className="flex items-center justify-between gap-2 border-b px-4 py-2 text-xs text-muted-foreground"><span>拖曳預覽右下角調整大小</span><Button variant="ghost" size="sm" onClick={() => setPreviewSize(null)}><RotateCcw className="size-3" />重設大小</Button></div>
    <div ref={previewRef} style={previewSize ? { width: previewSize.width, height: previewSize.height, maxWidth: "100%" } : undefined} className="relative mx-auto flex aspect-video min-h-60 w-full flex-col justify-between overflow-hidden bg-neutral-900 p-5 pb-8 text-white">
      {localVideoSrc && !localVideoFailed ? <video ref={videoRef} className="absolute inset-0 h-full w-full bg-black object-contain" src={localVideoSrc} controls preload="metadata" playsInline aria-label={`${videoTitle} · ${sectionLabel}`} onError={() => setLocalVideoFailed(true)} onLoadedMetadata={event => { event.currentTarget.currentTime = time }} onTimeUpdate={event => { const nextTime = Math.floor(event.currentTarget.currentTime); lastReportedVideoTime.current = nextTime; if (nextTime !== time) onTimeChange(nextTime) }} /> : youtubeVideoId ? <iframe key={`${youtubeVideoId}-${time}`} className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeVideoId)}?start=${Math.floor(time)}&rel=0`} title={`${videoTitle} · ${sectionLabel}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <>
      <div className="flex justify-between text-xs"><Badge className="bg-white/15 text-white"><Film className="size-3" />Video 示意預覽</Badge><span>{sectionLabel}</span></div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[.06]"><Film className="size-64" /></div>
      <div className="relative text-center"><p className="text-xs tracking-[.25em] text-neutral-400">{videoTitle}</p><h3 className="mt-3 text-2xl font-semibold">{clipTitle}</h3><p className="mt-2 text-xs text-neutral-400">{note}</p></div>
      <div className="relative space-y-3"><input aria-label="影片播放進度" type="range" min="0" max={duration} value={time} onChange={event => onTimeChange(Number(event.target.value))} className="w-full accent-white" /><div className="flex items-center gap-3"><Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/15 hover:text-white" aria-label={playing && time < duration ? "暫停示意播放" : "開始示意播放"} onClick={onTogglePlayback}>{playing && time < duration ? <Pause /> : <Play />}</Button><span className="font-mono text-xs">{timestamp(time)} / {timestamp(duration)}</span><span className="ml-auto text-xs text-neutral-400">MOCK PREVIEW</span></div></div>
      </>}
      <button aria-label="拖曳調整 Video 預覽大小" title="拖曳調整大小；方向鍵可微調" className="absolute right-0 bottom-0 grid size-8 cursor-nwse-resize touch-none place-items-center rounded-tl bg-white/15 text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white" onPointerDown={event => { if (event.button !== 0) return; event.preventDefault(); const rect = previewRef.current!.getBoundingClientRect(); resizeOrigin.current = { x: event.clientX, y: event.clientY, width: rect.width, height: rect.height }; event.currentTarget.setPointerCapture(event.pointerId) }} onPointerMove={event => { const origin = resizeOrigin.current; if (origin && event.currentTarget.hasPointerCapture(event.pointerId)) resizePreview(origin.width + (event.clientX - origin.x) * 2, origin.height + event.clientY - origin.y) }} onPointerUp={event => { resizeOrigin.current = null; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }} onPointerCancel={() => { resizeOrigin.current = null }} onKeyDown={event => { if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return; event.preventDefault(); const rect = previewRef.current!.getBoundingClientRect(); resizePreview(rect.width + (event.key === "ArrowRight" ? 20 : event.key === "ArrowLeft" ? -20 : 0), rect.height + (event.key === "ArrowDown" ? 20 : event.key === "ArrowUp" ? -20 : 0)) }}><MoveDiagonal2 className="size-4" /></button>
    </div>
  </>
}
