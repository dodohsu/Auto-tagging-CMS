import { useState } from "react"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"

type Performer = { name: string; count: number; avatarSrc: string }

export default function PerformerAvatarFilter({ performers, selected, onSelect }: { performers: Performer[]; selected: string; onSelect: (name: string) => void }) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  return <div className="space-y-2">
    <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">表演者／組合（字幕候選 · 前 10 組）</span><Button size="sm" variant={!selected ? "default" : "outline"} className="rounded-full" onClick={() => onSelect("")}>全部表演者</Button></div>
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">{performers.map(performer => <button key={performer.name} type="button" aria-label={`篩選 ${performer.name}`} aria-pressed={selected === performer.name} onClick={() => onSelect(selected === performer.name ? "" : performer.name)} className={`flex min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center hover:bg-muted ${selected === performer.name ? "bg-muted ring-2 ring-primary" : ""}`}><span className="grid size-12 overflow-hidden rounded-full bg-muted place-items-center">{failedImages[performer.name] ? <Film className="size-5 text-muted-foreground" /> : <img className="size-full object-cover" src={performer.avatarSrc} alt={`${performer.name} 的演出畫面`} onError={() => setFailedImages(current => ({ ...current, [performer.name]: true }))} />}</span><span className="w-full truncate text-[11px]" title={performer.name}>{performer.name}</span><span className="text-[10px] text-muted-foreground">{performer.count} Clips</span></button>)}</div>
  </div>
}
