import { useRef, useState, type ReactNode } from "react"
import { Popover } from "radix-ui"
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

type SelectedTag = { category: string; label: string }

function CategoryTagPopover({ name, tags, tagCounts, selectedTags, onTagToggle, children }: { name: string; tags: string[]; tagCounts?: Record<string, number>; selectedTags: SelectedTag[]; onTagToggle?: (category: string, tag: string) => void; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const keepOpen = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true) }
  const closeSoon = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(false), 180) }
  return <Popover.Root open={open} onOpenChange={setOpen}>
    <Popover.Anchor asChild><span className="inline-flex" onMouseEnter={keepOpen} onMouseLeave={closeSoon} onFocus={keepOpen} onBlur={closeSoon}>{children}</span></Popover.Anchor>
    <Popover.Portal><Popover.Content side="bottom" align="start" sideOffset={8} aria-label={name} onOpenAutoFocus={event => event.preventDefault()} onCloseAutoFocus={event => event.preventDefault()} onMouseEnter={keepOpen} onMouseLeave={closeSoon} onFocusCapture={keepOpen} onBlurCapture={closeSoon} className="z-50 w-72 max-w-[calc(100vw-32px)] rounded-xl border bg-background p-3 text-foreground shadow-lg">
      <div className="flex flex-wrap gap-1.5">{tags.map(tag => {
        const active = selectedTags.some(item => item.category === name && item.label === tag)
        return onTagToggle ? <button key={tag} type="button" aria-pressed={active} onClick={() => onTagToggle(name, tag)} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${active ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-muted"}`}>{active && <Check className="size-3" />}<span>{tag}</span>{tagCounts && <span data-no-translate className="opacity-60">({tagCounts[tag] ?? 0})</span>}</button> : <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
      })}</div>
    </Popover.Content></Popover.Portal>
  </Popover.Root>
}

export function ChapterTopicFilter({ total, visible, topics, selected, onToggle, onClear, selectedTags = [], onTagToggle, description, title = "主題 Filter", allLabel = "全部主題", children }: { total: number; visible: number; topics: { name: string; count: number; color?: string; tags?: string[]; tagCounts?: Record<string, number> }[]; selected: string[]; onToggle: (topic: string) => void; onClear: () => void; selectedTags?: SelectedTag[]; onTagToggle?: (category: string, tag: string) => void; description?: string; title?: string; allLabel?: string; children?: ReactNode }) {
  return <ChapterFilter>
    <div className="flex items-center justify-between"><span className="text-sm font-medium">{title}</span><span className="text-xs text-muted-foreground">{visible} / {total} Clips</span></div>
    <div className="flex flex-wrap gap-2"><Button size="sm" variant={!selected.length ? "default" : "outline"} aria-pressed={!selected.length} className="rounded-full" onClick={onClear}>{allLabel}</Button>{topics.map(topic => {
      const trigger = <Button size="sm" variant="outline" aria-pressed={selected.includes(topic.name)} style={topic.color ? { backgroundColor: selected.includes(topic.name) ? topic.color : `${topic.color}30`, color: selected.includes(topic.name) ? "#333333" : "#626262", borderColor: selected.includes(topic.name) ? topic.color : "#e5e5e5" } : undefined} className="rounded-full" onClick={() => onToggle(topic.name)}>{selected.includes(topic.name) && <Check className="size-3" />}{topic.name}<span className="opacity-60">{topic.count}</span></Button>
      return topic.tags?.length ? <CategoryTagPopover key={topic.name} name={topic.name} tags={topic.tags} tagCounts={topic.tagCounts} selectedTags={selectedTags} onTagToggle={onTagToggle}>{trigger}</CategoryTagPopover> : <span key={topic.name}>{trigger}</span>
    })}</div>
    {description !== "" && <p className="text-xs text-muted-foreground">{description ?? `可多選 · ${selected.length ? `已選 ${selected.length} 個主題，顯示符合任一主題的片段` : "顯示全部主題"}。時間軸柔和漸層表示片段同時符合多個主題；點擊「全部主題」可清除選取。`}</p>}
    {children}
  </ChapterFilter>
}

export function ChapterColumns({ left, right }: { left: ReactNode; right: ReactNode }) {
  return <div className={chapterColumnsClass}>
    <div className={chapterPrimaryClass}>{left}</div>
    {right}
  </div>
}

export function ChapterListPanel({ count, query = "", onQueryChange, collapsed = false, onToggle, children, title = "章節與片段", showControls = true }: { count: string; query?: string; onQueryChange?: (value: string) => void; collapsed?: boolean; onToggle?: () => void; children: ReactNode; title?: string; showControls?: boolean }) {
  return <Card className="gap-0 overflow-hidden py-0 shadow-none">
    <div className="space-y-3 border-b p-4">
      <div className="flex items-center justify-between"><h3 className="font-semibold">{title}</h3><Badge variant="secondary">{count}</Badge></div>
      {showControls && <><div className="relative"><Search className="absolute top-3 left-3 size-4 text-muted-foreground" /><Input aria-label="搜尋章節片段標題或標籤" placeholder="搜尋片段、標籤…" className="pl-9" value={query} onChange={event => onQueryChange?.(event.target.value)} /></div>
      <Button variant="ghost" size="sm" onClick={onToggle}>{collapsed ? "全部展開" : "全部收合"}</Button></>}
    </div>
    <div className="max-h-[920px] overflow-y-auto">{children}</div>
  </Card>
}
