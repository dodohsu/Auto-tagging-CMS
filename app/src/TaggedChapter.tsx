import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AIChapterLayout, ChapterTopicFilter, ChapterColumns, ChapterListPanel } from "./AIChapterLayout"
import ChapterTimelineView from "./ChapterTimelineView"
import YouTubeChapterPlayer from "./YouTubeChapterPlayer"
import ResizableVideoStage from "./ResizableVideoStage"
import type { TaggedClip } from "./tagged-clips"
import { matchesTaggedClip, type TagFilter } from "./concert-clip-filters"
import { readTemplates } from "./template-settings"
import type { Video } from "@/mock-data/videos"

const toSeconds = (value: string) => value.split(":").reduce((total, part) => total * 60 + Number(part), 0)
const colors: Record<string, string> = { Mood: "#d9d2e9", Topic: "#d1dce9", Title: "#e6dccb", "Performance Type": "#d5e4db", "Music Genre": "#e4d5df", "Highlight Type": "#dce4cf" }


export default function TaggedChapter({ video, clips, templateName }: { video: Video; clips: TaggedClip[]; templateName: string }) {
  const categories = readTemplates().find(template => template.name === templateName)?.categories ?? []
  const [selected, setSelected] = useState<TaggedClip>(clips[0])
  const [filters, setFilters] = useState<string[]>([])
  const [tagFilters, setTagFilters] = useState<TagFilter[]>([])
  const [time, setTime] = useState(0)
  const [timelineMode, setTimelineMode] = useState<"chapters" | "scenes">("chapters")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [useLocalFallback, setUseLocalFallback] = useState(false)
  const localFullVideo = video.localVideo && (!video.youtubeVideoId || useLocalFallback) ? `${import.meta.env.BASE_URL}${video.localVideo}` : null
  useEffect(() => {
    const player = videoRef.current
    if (player && localFullVideo && Math.abs(player.currentTime - time) > 0.5) player.currentTime = time
  }, [time, localFullVideo])
  const visible = clips.filter(clip => matchesTaggedClip(clip, filters, tagFilters))
  const chronological = [...visible].sort((a, b) => toSeconds(a.start) - toSeconds(b.start) || toSeconds(a.end) - toSeconds(b.end))
  const allChronological = [...clips].sort((a, b) => toSeconds(a.start) - toSeconds(b.start) || toSeconds(a.end) - toSeconds(b.end))
  const toggleCategory = (name: string) => {
    setFilters(current => current.includes(name) ? current.filter(value => value !== name) : [...current, name])
    setTagFilters(current => current.filter(tag => tag.category !== name))
  }
  const toggleTag = (category: string, label: string) => {
    setFilters(current => current.includes(category) ? current : [...current, category])
    setTagFilters(current => current.some(tag => tag.category === category && tag.label === label)
      ? current.filter(tag => tag.category !== category || tag.label !== label)
      : [...current, { category, label }])
  }
  const choose = (clip: TaggedClip) => { setSelected(clip); setTime(toSeconds(clip.start)) }
  const duration = toSeconds(video.duration)
  const timelineClips = allChronological.map(clip => ({ id: clip.id, name: clip.title, start: toSeconds(clip.start), end: toSeconds(clip.end), tags: clip.tags.map(tag => tag.label), background: colors[clip.tags[0].category], visible: visible.includes(clip) }))
  const activeClip = allChronological.find(clip => time >= toSeconds(clip.start) && time < toSeconds(clip.end)) ?? (time >= duration ? allChronological.at(-1)! : selected)
  const seekTimeline = (next: number) => {
    setTime(next)
    if (localFullVideo && videoRef.current) videoRef.current.currentTime = next
    const nearest = [...clips].reverse().find(clip => toSeconds(clip.start) <= next)
    if (nearest) setSelected(nearest)
  }
  return <AIChapterLayout>
    <ChapterTopicFilter total={clips.length} visible={visible.length} topics={categories.map(category => ({ name: category.name, count: clips.filter(clip => clip.tags.some(tag => tag.category === category.name)).length, color: colors[category.name], tags: category.tags, tagCounts: Object.fromEntries(category.tags.map(label => [label, clips.filter(clip => clip.tags.some(tag => tag.category === category.name && tag.label === label)).length])) }))} selected={filters} onToggle={toggleCategory} selectedTags={tagFilters} onTagToggle={toggleTag} onClear={() => { setFilters([]); setTagFilters([]) }} title="Tag Categories" allLabel="All categories" description="" />
    <ChapterColumns left={<Card className="gap-0 overflow-hidden py-0 shadow-none">
      <ResizableVideoStage>{localFullVideo ? <video ref={videoRef} controls autoPlay muted onLoadedMetadata={event => { event.currentTarget.currentTime = time }} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} playsInline preload="metadata" poster={video.poster ? `${import.meta.env.BASE_URL}${video.poster}` : undefined} src={localFullVideo} className="absolute inset-0 h-full w-full bg-black object-contain" /> : video.youtubeVideoId ? <YouTubeChapterPlayer videoId={video.youtubeVideoId} time={time} onTimeChange={setTime} title={`Full ${templateName}`} autoPlay onUnavailable={() => { if (video.localVideo && ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname)) setUseLocalFallback(true) }} /> : <div className="absolute inset-0 grid place-items-center text-sm text-white">Full video unavailable</div>}</ResizableVideoStage>
      <div className="border-t"><ChapterTimelineView duration={duration} time={time} onTimeChange={seekTimeline} onPause={() => videoRef.current?.pause()} mode={timelineMode} onModeChange={setTimelineMode} chapters={[]} clips={timelineClips} scenes={timelineClips} selectedId={activeClip.id} onSelect={id => { const clip = clips.find(item => item.id === id); if (clip) choose(clip) }} description={`${clips.length} 個 Clip 首尾相接，涵蓋完整影片。點選色塊即可跳至對應片段。`} showModeToggle={false} showChapterTrack={false} /></div>
    </Card>} right={<ChapterListPanel count={`${visible.length} Clips`} title="AI Chapter" showControls={false}>
      <div className="space-y-2 p-4">{!chronological.length && <p className="py-8 text-center text-sm text-muted-foreground">No clips match the selected tags.</p>}{chronological.map(clip => <button key={clip.id} type="button" onClick={() => choose(clip)} aria-current={activeClip.id === clip.id ? "true" : undefined} className={`block w-full rounded-lg border p-3 text-left hover:bg-muted/60 focus-visible:outline-2 ${activeClip.id === clip.id ? "border-foreground/40 bg-muted/50" : ""}`}>
        <span className="flex items-start gap-3">
        <span className="relative mt-0.5 block aspect-video w-24 shrink-0 overflow-hidden rounded-md bg-muted">
          <img src={`${import.meta.env.BASE_URL}${clip.thumbnail}`} alt={`${clip.title} 片段縮圖`} loading="lazy" className="h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute right-1 bottom-1 grid size-5 place-items-center rounded-full bg-black/55 text-white"><Play className="size-2.5 fill-current" /></span>
        </span>
        <span className="block min-w-0 flex-1">
          <span className="block text-sm font-medium">{clip.title}</span>
          <span className="mt-1 block text-xs tabular-nums text-muted-foreground">{clip.start}–{clip.end}</span>
        </span>
        </span>
        <span title={clip.description} className="mt-2 block line-clamp-2 text-xs leading-relaxed text-muted-foreground">{clip.description}</span>
        <span className="mt-2 flex flex-wrap gap-1.5">{clip.tags.map(tag => <Badge key={`${tag.category}-${tag.label}`} variant={tagFilters.some(filter => filter.category === tag.category && filter.label === tag.label) ? "default" : "outline"}>{tag.label}</Badge>)}</span>
      </button>)}</div>
    </ChapterListPanel>} />
  </AIChapterLayout>
}
