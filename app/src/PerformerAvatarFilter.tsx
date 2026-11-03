import { useEffect, useState } from "react"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"

type Performer = { name: string; time: number; count: number }

export default function PerformerAvatarFilter({ performers, videoSrc, selected, onSelect }: { performers: Performer[]; videoSrc: string; selected: string; onSelect: (name: string) => void }) {
  const [frames, setFrames] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    const video = document.createElement("video")
    video.preload = "auto"
    video.muted = true
    video.src = videoSrc
    const waitFor = (event: string) => new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => { cleanup(); reject(new Error("Video frame timed out")) }, 10000)
      const done = () => { cleanup(); resolve() }
      const failed = () => { cleanup(); reject(new Error("Video frame unavailable")) }
      const cleanup = () => { window.clearTimeout(timeout); video.removeEventListener(event, done); video.removeEventListener("error", failed) }
      video.addEventListener(event, done, { once: true })
      video.addEventListener("error", failed, { once: true })
    })
    const capture = async () => {
      try {
        await waitFor("loadedmetadata")
        for (const performer of performers) {
          if (cancelled) break
          video.currentTime = performer.time
          await waitFor("seeked")
          const canvas = document.createElement("canvas")
          canvas.width = 96
          canvas.height = 96
          const side = Math.min(video.videoWidth, video.videoHeight)
          canvas.getContext("2d")?.drawImage(video, (video.videoWidth - side) / 2, (video.videoHeight - side) / 2, side, side, 0, 0, 96, 96)
          if (!cancelled) setFrames(current => ({ ...current, [performer.name]: canvas.toDataURL("image/jpeg", 0.75) }))
        }
      } catch {
        // Keep the named placeholder when this browser cannot decode the local video.
      }
    }
    void capture()
    return () => { cancelled = true; video.removeAttribute("src"); video.load() }
  }, [performers, videoSrc])

  return <div className="space-y-2">
    <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">表演者／組合（字幕候選 · 前 10 組）</span><Button size="sm" variant={!selected ? "default" : "outline"} className="rounded-full" onClick={() => onSelect("")}>全部表演者</Button></div>
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">{performers.map(performer => <button key={performer.name} type="button" aria-label={`篩選 ${performer.name}`} aria-pressed={selected === performer.name} onClick={() => onSelect(selected === performer.name ? "" : performer.name)} className={`flex min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center hover:bg-muted ${selected === performer.name ? "bg-muted ring-2 ring-primary" : ""}`}><span className="grid size-12 overflow-hidden rounded-full bg-muted place-items-center">{frames[performer.name] ? <img className="size-full object-cover" src={frames[performer.name]} alt={`${performer.name} 的演出畫面`} /> : <Film className="size-5 text-muted-foreground" />}</span><span className="w-full truncate text-[11px]" title={performer.name}>{performer.name}</span><span className="text-[10px] text-muted-foreground">{performer.count} Clips</span></button>)}</div>
  </div>
}
