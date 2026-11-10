import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const chapterColumnsClass = "grid items-start gap-4 min-[1200px]:grid-cols-[minmax(0,1fr)_340px]"
export const chapterPrimaryClass = "min-w-0 space-y-4"

export function AIChapterLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

export function ChapterHeader({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-3">{children}</div>
}

export function ChapterFilter({ children }: { children: ReactNode }) {
  return <Card className="py-4 shadow-none"><CardContent className="space-y-3">{children}</CardContent></Card>
}

export function ChapterTopicFilter({ total, visible, topics, selected, onToggle, onClear, description, title = "主題 Filter", allLabel = "全部主題", children }: { total: number; visible: number; topics: { name: string; count: number; color?: string }[]; selected: string[]; onToggle: (topic: string) => void; onClear: () => void; description?: string; title?: string; allLabel?: string; children?: ReactNode }) {
  return <ChapterFilter>
    <div className="flex items-center justify-between"><span className="text-sm font-medium">{title}</span><span className="text-xs text-muted-foreground">{visible} / {total} Clips</span></div>
    <div className="flex flex-wrap gap-2"><Button size="sm" variant={!selected.length ? "default" : "outline"} aria-pressed={!selected.length} className="rounded-full" onClick={onClear}>{allLabel}</Button>{topics.map(topic => <Button key={topic.name} size="sm" variant="outline" aria-pressed={selected.includes(topic.name)} style={topic.color ? { backgroundColor: selected.includes(topic.name) ? topic.color : `${topic.color}30`, color: selected.includes(topic.name) ? "#333333" : "#626262", borderColor: selected.includes(topic.name) ? topic.color : "#e5e5e5" } : undefined} className="rounded-full" onClick={() => onToggle(topic.name)}>{selected.includes(topic.name) && <Check className="size-3" />}{topic.name}<span className="opacity-60">{topic.count}</span></Button>)}</div>
    <p className="text-xs text-muted-foreground">{description ?? `可多選 · ${selected.length ? `已選 ${selected.length} 個主題，顯示符合任一主題的片段` : "顯示全部主題"}。時間軸柔和漸層表示片段同時符合多個主題；點擊「全部主題」可清除選取。`}</p>
    {children}
  </ChapterFilter>
}

export function ChapterColumns({ left, right }: { left: ReactNode; right: ReactNode }) {
  return <div className={chapterColumnsClass}>
    <div className={chapterPrimaryClass}>{left}</div>
    {right}
  </div>
}

export function ChapterListPanel({ count, query, onQueryChange, collapsed, onToggle, children }: { count: string; query: string; onQueryChange: (value: string) => void; collapsed: boolean; onToggle: () => void; children: ReactNode }) {
  return <Card className="gap-0 overflow-hidden py-0 shadow-none">
    <div className="space-y-3 border-b p-4">
      <div className="flex items-center justify-between"><h3 className="font-semibold">章節與片段</h3><Badge variant="secondary">{count}</Badge></div>
      <div className="relative"><Search className="absolute top-3 left-3 size-4 text-muted-foreground" /><Input aria-label="搜尋章節片段標題或標籤" placeholder="搜尋片段、標籤…" className="pl-9" value={query} onChange={event => onQueryChange(event.target.value)} /></div>
      <Button variant="ghost" size="sm" onClick={onToggle}>{collapsed ? "全部展開" : "全部收合"}</Button>
    </div>
    <div className="max-h-[920px] overflow-y-auto">{children}</div>
  </Card>
}
