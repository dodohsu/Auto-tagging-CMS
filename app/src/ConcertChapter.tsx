import { useRef, useState } from "react"
import { Film, Play, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AIChapterLayout, ChapterHeader, ChapterTopicFilter, ChapterColumns, ChapterListPanel } from "./AIChapterLayout"
import ChapterTimelineView from "./ChapterTimelineView"
import { concertClips, type ConcertClip } from "./concert-clips"
import { readTemplates } from "./template-settings"
import type { Video } from "@/mock-data/videos"

const toSeconds = (value: string) => value.split(":").reduce((total, part) => total * 60 + Number(part), 0)
const colors: Record<string, string> = { Mood: "#d9d2e9", Topic: "#d1dce9", Title: "#e6dccb", "Performance Type": "#d5e4db", "Music Genre": "#e4d5df" }

export default function ConcertChapter({ video }: { video: Video }) {
  const categories = readTemplates().find(template => template.name === "Concert")?.categories.map(category => category.name) ?? ["Mood", "Topic", "Title", "Performance Type", "Music Genre"]
  const [selected, setSelected] = useState<ConcertClip>(concertClips[0])
  const [filters, setFilters] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const [collapsed, setCollapsed] = useState(false)
  const [play, setPlay] = useState(false)
  const [time, setTime] = useState(toSeconds(concertClips[0].start))
  const [timelineMode, setTimelineMode] = useState<"chapters" | "scenes">("chapters")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showFullVideo, setShowFullVideo] = useState(false)
  const localFullVideo = video.localVideo && (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") ? `${import.meta.env.BASE_URL}${video.localVideo}` : null
  const visible = concertClips.filter(clip => (!filters.length || filters.includes(clip.category)) && `${clip.title} ${clip.tag ?? ""} ${clip.evidence}`.toLowerCase().includes(query.toLowerCase()))
  const chronological = [...visible].sort((a, b) => toSeconds(a.start) - toSeconds(b.start) || toSeconds(a.end) - toSeconds(b.end))
  const allChronological = [...concertClips].sort((a, b) => toSeconds(a.start) - toSeconds(b.start) || toSeconds(a.end) - toSeconds(b.end))
  const choose = (clip: ConcertClip) => { setSelected(clip); setTime(toSeconds(clip.start)); setShowFullVideo(false); setPlay(true) }
  const duration = toSeconds(video.duration)
  const timelineClips = allChronological.map(clip => ({ id: clip.id, name: clip.title, start: toSeconds(clip.start), end: toSeconds(clip.end), tags: [clip.category, ...(clip.tag ? [clip.tag] : [])], background: colors[clip.category], visible: visible.includes(clip) }))
  const chapterBounds = [0, 684, 767, 1084, duration]
  const chapters = chapterBounds.slice(0, -1).map((start, index) => {
    const end = chapterBounds[index + 1]
    const members = allChronological.filter(clip => toSeconds(clip.start) >= start && toSeconds(clip.start) < end)
    return { id: `concert-chapter-${index + 1}`, name: `Chapter ${index + 1}`, start, end, firstClipId: members[0]?.id ?? concertClips[0].id, clipIds: members.map(clip => clip.id) }
  })
  const seekTimeline = (next: number) => {
    setTime(next)
    if (showFullVideo && localFullVideo && videoRef.current) videoRef.current.currentTime = next
    else { const nearest = [...concertClips].reverse().find(clip => toSeconds(clip.start) <= next) ?? concertClips[0]; setSelected(nearest); setShowFullVideo(false); setPlay(false) }
  }
  return <AIChapterLayout>
    <ChapterHeader><div><h2 className="flex items-center gap-2 text-xl font-semibold"><Sparkles className="size-5" />AI Chapter</h2><p className="mt-1 text-sm text-muted-foreground">Clips cut from the supplied Concert subtitles, listed in original video order.</p></div><Badge variant="outline">Concert.srt · {concertClips.length} clips</Badge></ChapterHeader>
    <ChapterTopicFilter total={concertClips.length} visible={visible.length} topics={categories.map(name => ({ name, count: concertClips.filter(clip => clip.category === name).length, color: colors[name] }))} selected={filters} onToggle={name => setFilters(current => current.includes(name) ? current.filter(value => value !== name) : [...current, name])} onClear={() => setFilters([])} title="Tag Category Filter" allLabel="All categories" description="Filter clips by category. Timecodes refer to the original concert video; review labels identify tags that the subtitles cannot confirm on their own." />
    <ChapterColumns left={<>
      <Card className="gap-0 overflow-hidden py-0 shadow-none"><div className="flex flex-wrap items-center justify-between gap-2 border-b p-3"><span className="text-sm font-medium">{showFullVideo ? `Full Concert · ${video.duration}` : `Clip preview · ${selected.start}–${selected.end}`}</span><div className="flex gap-2"><Button size="sm" variant={!showFullVideo ? "default" : "outline"} onClick={() => setShowFullVideo(false)}>Selected clip</Button>{localFullVideo ? <Button size="sm" variant={showFullVideo ? "default" : "outline"} onClick={() => { setShowFullVideo(true); setPlay(false) }}>Full video · {video.duration}</Button> : video.externalShareUrl && <Button size="sm" variant="outline" asChild><a href={video.externalShareUrl} target="_blank" rel="noopener noreferrer">Full video on NAS · {video.duration}</a></Button>}</div></div><video ref={videoRef} key={showFullVideo ? "full-concert" : selected.file} controls autoPlay={play && !showFullVideo} onTimeUpdate={event => setTime(showFullVideo ? event.currentTarget.currentTime : toSeconds(selected.start) + event.currentTarget.currentTime)} playsInline preload="metadata" poster={video.poster ? `${import.meta.env.BASE_URL}${video.poster}` : undefined} src={showFullVideo && localFullVideo ? localFullVideo : `${import.meta.env.BASE_URL}${selected.file}`} className="aspect-video w-full bg-black" /><CardContent className="space-y-3 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-muted-foreground">{showFullVideo ? "Original Concert video" : `${selected.category} · Original video ${selected.start}–${selected.end}`}</p><h3 className="mt-1 text-lg font-semibold">{showFullVideo ? "Full Concert" : selected.title}</h3></div>{!showFullVideo && <div className="flex gap-2">{selected.tag && <Badge variant="outline">{selected.tag}</Badge>}{selected.needsReview && <Badge variant="secondary">Review tag</Badge>}</div>}</div><p className="text-sm leading-6 text-muted-foreground">{showFullVideo ? "Select a clip from the timeline or list to return to its short preview." : selected.evidence}</p></CardContent></Card>
      <Card className="gap-0 py-0 shadow-none"><ChapterTimelineView duration={duration} time={time} onTimeChange={seekTimeline} onPause={() => videoRef.current?.pause()} mode={timelineMode} onModeChange={setTimelineMode} chapters={chapters} clips={timelineClips} scenes={timelineClips} selectedId={selected.id} onSelect={id => { const clip = concertClips.find(item => item.id === id); if (clip) choose(clip) }} description="章節涵蓋完整影片；下排標出從字幕切出的 Clip。點選色塊即可播放對應片段。" /></Card>
    </>} right={<ChapterListPanel count={`${visible.length} Clips`} query={query} onQueryChange={setQuery} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}>{!collapsed && <div className="space-y-2 p-4">{chronological.map(clip => <button key={clip.id} type="button" onClick={() => choose(clip)} aria-current={selected.id === clip.id ? "true" : undefined} className={`w-full rounded-lg border p-3 text-left hover:bg-muted/60 focus-visible:outline-2 ${selected.id === clip.id ? "border-foreground/40 bg-muted/50" : ""}`}><span className="flex items-center justify-between gap-2 text-sm font-medium"><span className="flex items-center gap-2"><Film className="size-4" />{clip.title}</span><Play className="size-3.5" /></span><span className="mt-1 block text-xs tabular-nums text-muted-foreground">{clip.start}–{clip.end}</span><span className="mt-2 flex flex-wrap gap-2"><Badge variant="secondary">{clip.category}</Badge>{clip.tag && <Badge variant="outline">{clip.tag}</Badge>}{clip.needsReview && <Badge variant="secondary">Review tag</Badge>}</span></button>)}</div>}</ChapterListPanel>} />
  </AIChapterLayout>
}
