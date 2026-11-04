import * as React from "react"
import { ArrowLeft, ChevronDown, ChevronRight, ExternalLink, Film, MonitorPlay, Pencil, Sparkles, Subtitles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIChapterLayout, ChapterColumns, ChapterHeader, ChapterListPanel, ChapterTopicFilter } from "./AIChapterLayout"
import ChapterVideoPreview from "./ChapterVideoPreview"
import ChapterTimelineView from "./ChapterTimelineView"
import PerformerAvatarFilter from "./PerformerAvatarFilter"
import { comedyChapters, comedyClips, comedyDuration, comedyTime } from "./ComedyHighlightData"
import type { ComedyClip } from "./ComedyHighlightData"

const videoId = "cCmLjsKjrlE"
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
const topicColors: Record<string, string> = {
  語言雙關: "#bfd8ec",
  越講越荒謬: "#b9ddd4",
  角色扮演: "#d8c3e8",
  意外反轉: "#e9d7b8",
  誤會連發: "#ebc5cf",
  一本正經亂講: "#c9d4e8",
  戀愛曖昧: "#ebc5cf",
  職場日常: "#b9ddd4",
  家庭與校園: "#e9d7b8",
  美食與餐廳: "#efd7c6",
  動漫與流行文化: "#d8c3e8",
  節慶活動: "#bfd8ec",
}
const topicOrder = ["意外反轉", "語言雙關", "角色扮演", "誤會連發", "越講越荒謬", "一本正經亂講", "戀愛曖昧", "職場日常", "家庭與校園", "美食與餐廳", "動漫與流行文化", "節慶活動"]
const rankedTopics = topicOrder.map((name, order) => ({ name, order, count: comedyClips.filter(clip => clip.tags.includes(name)).length, color: topicColors[name] })).sort((a, b) => b.count - a.count || a.order - b.order).slice(0, 10)
const featuredPerformers = [...new Set(comedyClips.map(clip => clip.performer))].map((name, order) => { const clips = comedyClips.filter(clip => clip.performer === name); return { name, order, count: clips.length } }).sort((a, b) => b.count - a.count || a.order - b.order).slice(0, 10).map((performer, index) => ({ ...performer, avatarSrc: `${import.meta.env.BASE_URL}performers/performer-${String(index + 1).padStart(2, "0")}.jpg` }))
const localVideoSrc = `${import.meta.env.BASE_URL}media/comedy-highlight-480p.mp4`

export default function ComedyHighlightDetail({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = React.useState("AI Chapter")
  const [selectedId, setSelectedId] = React.useState(comedyClips[0].id)
  const [query, setQuery] = React.useState("")
  const [collapsedChapters, setCollapsedChapters] = React.useState<string[]>([])
  const [selectedPerformer, setSelectedPerformer] = React.useState("")
  const [selectedPunchline, setSelectedPunchline] = React.useState("")
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([])
  const [time, setTime] = React.useState(comedyClips[0].start)
  const [timelineMode, setTimelineMode] = React.useState<"chapters" | "scenes">("chapters")
  const selected = comedyClips.find(clip => clip.id === selectedId) || comedyClips[0]
  const selectedChapter = comedyChapters.find(chapter => chapter.id === selected.chapterId)!
  const performers = [...new Set(comedyClips.map(clip => clip.performer))]
  const matchesContext = (clip: ComedyClip) => (!selectedPerformer || clip.performer === selectedPerformer) && (!selectedPunchline || clip.title === selectedPunchline) && `${clip.performer} ${clip.title} ${clip.summary} ${clip.cue} ${clip.tags.join(" ")} ${comedyChapters.find(chapter => chapter.id === clip.chapterId)?.name ?? ""}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  const matches = (clip: ComedyClip) => matchesContext(clip) && (!selectedTopics.length || clip.tags.some(tag => selectedTopics.includes(tag)))
  const contextClips = comedyClips.filter(matchesContext)
  const filterTopics = rankedTopics.map(topic => ({ ...topic, count: contextClips.filter(clip => clip.tags.includes(topic.name)).length }))
  const visibleClips = comedyClips.filter(matches)
  if (visibleClips.length && !visibleClips.some(clip => clip.id === selectedId)) {
    setSelectedId(visibleClips[0].id)
    setTime(visibleClips[0].start)
  }
  const visibleChapters = comedyChapters.filter(chapter => chapter.clips.some(matches))
  const playerUrl = `${videoUrl}&t=${Math.floor(time)}s`
  const chooseClip = (id: string) => { const clip = comedyClips.find(item => item.id === id); if (!clip) return; setSelectedId(id); setTime(clip.start) }
  const timelineColor = (clip: ComedyClip) => topicColors[clip.tags[0]] ?? "#e5e5e5"
  const timelineClips = comedyClips.map(clip => ({ id: clip.id, name: clip.title, start: clip.start, end: clip.end, tags: clip.tags, background: timelineColor(clip), visible: matches(clip) }))

  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-3"><Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft /> Examples</Button><Badge variant="outline">Comedy Highlight · 字幕分析提案</Badge></div>
    <Card className="shadow-sm"><CardContent className="flex flex-col gap-5 p-4 lg:flex-row lg:items-center"><img className="aspect-video w-full rounded-lg object-cover lg:w-56" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="M-1 グランプリ 2026 影片封面" /><div className="min-w-0"><h1 className="text-xl font-semibold tracking-tight sm:text-2xl">【M-1グランプリ2026】1回戦・TOP1ネタまとめ【後半】</h1><p className="mt-3 text-sm text-muted-foreground">多組漫才合集 · 1:46:29 · 日文自動字幕</p><div className="mt-3 flex flex-wrap gap-2"><Badge variant="outline">YouTube ID {videoId}</Badge><Badge variant="outline">{comedyChapters.length} 大章節</Badge><Badge variant="outline">{comedyClips.length} Punchline Clips</Badge><Badge variant="secondary">待人工複核</Badge></div></div></CardContent></Card>
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList aria-label="Comedy Highlight 內容分頁" className="h-12 w-full justify-start gap-8 rounded-none bg-transparent p-0"><TabsTrigger value="AI Metadata" className="h-12 flex-none rounded-none border-b-2 border-transparent px-1 text-sm shadow-none data-[state=active]:border-[#333333] data-[state=active]:bg-transparent data-[state=active]:shadow-none">AI Metadata</TabsTrigger><TabsTrigger value="AI Chapter" className="h-12 flex-none rounded-none border-b-2 border-transparent px-1 text-sm shadow-none data-[state=active]:border-[#333333] data-[state=active]:bg-transparent data-[state=active]:shadow-none">AI Chapter</TabsTrigger></TabsList>
      <TabsContent value="AI Metadata" className="pt-5"><div className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle>Content Overview</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6"><p>這是一支多組演出接續的漫才合集。10 個大章節依字幕中的登場、收尾與語意轉換分組，各章保留 Punchline 候選 Clip。</p><p className="text-muted-foreground">自動字幕可能誤聽人名、方言與雙關語；章節交界、笑點切點及摘要仍需搭配畫面與音訊核對。</p></CardContent></Card><Card><CardHeader><CardTitle>Analysis Basis</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><p className="flex items-start gap-2"><Subtitles className="mt-0.5 size-4 shrink-0" />使用你提供的日文自動產生 SRT，依時間與對話內容整理。</p><p>笑聲與掌聲標記只表示 SRT 中出現 <code>[笑い]</code> 或 <code>[拍手]</code>，不代表已聽辨原始音訊。</p><p className="text-xs leading-5 text-muted-foreground">片尾字幕在約 1:44:50 結束；最後一章延伸至影片總長，以保持章節時間連續。</p></CardContent></Card></div></TabsContent>
      <TabsContent value="AI Chapter" className="pt-5"><AIChapterLayout>
        <ChapterHeader><div><h2 className="flex items-center gap-2 text-xl font-semibold"><Sparkles className="size-5" /> AI Chapter</h2><p className="mt-1 text-sm text-muted-foreground">10 個連續大章節，並定位各章內的 Punchline 候選。</p></div><div className="flex gap-0.5 rounded-lg bg-muted p-0.5"><Button size="sm" className="h-8 gap-1.5 rounded-md px-2.5 text-xs"><Pencil className="size-4" />編輯模式</Button><Button size="sm" variant="ghost" disabled className="h-8 gap-1.5 rounded-md px-2.5 text-xs"><MonitorPlay className="size-4" />應用模式</Button></div></ChapterHeader>
        <ChapterTopicFilter total={comedyClips.length} visible={visibleClips.length} topics={filterTopics} selected={selectedTopics} onToggle={tag => setSelectedTopics(current => current.includes(tag) ? current.filter(item => item !== tag) : [...current, tag])} onClear={() => setSelectedTopics([])} description="笑點類型＋段子題材 · 顯示全片排名前 10 個主題；數字依表演者、Punchline 與搜尋條件更新；可多選，符合任一主題即可顯示。分類依字幕與摘要暫定，待對照影片複核。">
          <PerformerAvatarFilter performers={featuredPerformers} selected={selectedPerformer} onSelect={name => { setSelectedPerformer(name); setSelectedPunchline("") }} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-xs text-muted-foreground"><span>表演者／組合（字幕候選）</span><select aria-label="篩選表演者或組合" className="h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground" value={selectedPerformer} onChange={event => { setSelectedPerformer(event.target.value); setSelectedPunchline("") }}><option value="">全部表演者</option>{performers.map(name => <option key={name} value={name}>{name}</option>)}</select></label>
            <label className="space-y-1 text-xs text-muted-foreground"><span>笑話 Punchline</span><select aria-label="篩選笑話 Punchline" className="h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground" value={selectedPunchline} onChange={event => setSelectedPunchline(event.target.value)}><option value="">全部 Punchline</option>{comedyClips.filter(clip => !selectedPerformer || clip.performer === selectedPerformer).map(clip => <option key={clip.id} value={clip.title}>{clip.title}</option>)}</select></label>
          </div>
        </ChapterTopicFilter>
        <ChapterColumns left={visibleClips.length ? <>
          <Card className="gap-0 overflow-hidden py-0 shadow-none">
            <ChapterVideoPreview videoTitle="M-1グランプリ2026" clipTitle={selected.title} duration={comedyDuration} time={time} onTimeChange={setTime} playing={false} onTogglePlayback={() => {}} sectionLabel={`CHAPTER ${comedyChapters.indexOf(selectedChapter) + 1}`} localVideoSrc={localVideoSrc} youtubeVideoId={videoId} />
            <ChapterTimelineView duration={comedyDuration} time={time} onTimeChange={setTime} onPause={() => {}} mode={timelineMode} onModeChange={setTimelineMode} chapters={comedyChapters.map(chapter => ({ id: chapter.id, name: chapter.name, start: chapter.start, end: chapter.end, firstClipId: chapter.clips[0].id, clipIds: chapter.clips.map(clip => clip.id) }))} clips={timelineClips} scenes={timelineClips} selectedId={selectedId} onSelect={chooseClip} description="章節從片頭連續涵蓋至片尾；下排僅標出 Punchline 候選，空白處不是漏掉的章節。" />
            <CardContent className="px-4 pb-4"><a className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline" href={playerUrl} target="_blank" rel="noopener noreferrer">在 YouTube 開啟此時間點 <ExternalLink className="size-3" /></a></CardContent>
          </Card>
          <Card className="shadow-none"><CardContent className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4" />生成 Highlight 影片</h3><p className="mt-1 text-sm text-muted-foreground">Punchline 候選待人工複核，尚未提供合成輸出。</p></div><Button disabled>設定 Highlight</Button></CardContent></Card>
          <Card className="shadow-none"><CardContent className="space-y-3"><div className="flex flex-wrap items-center gap-2"><Badge variant="secondary">{comedyTime(selected.start)}–{comedyTime(selected.end)}</Badge>{selected.tags.map(tag => <span key={tag} className="rounded border px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: selectedTopics.includes(tag) ? topicColors[tag] : `${topicColors[tag]}30`, color: selectedTopics.includes(tag) ? "#333333" : "#626262", borderColor: selectedTopics.includes(tag) ? topicColors[tag] : "#e5e5e5" }}>{tag}</span>)}</div><h3 className="font-semibold">Punchline Clip · {selected.title}</h3><p className="text-sm leading-6 text-muted-foreground">{selected.summary}</p><p className="text-xs text-muted-foreground">日文自動字幕提供對話與時間；請核對鋪陳、笑點、收尾及實際聲音後再發布。</p><a className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline" href={playerUrl} target="_blank" rel="noopener noreferrer">在 YouTube 開啟此時間點 <ExternalLink className="size-3" /></a></CardContent></Card>
        </> : <Card><CardContent className="py-8 text-sm text-muted-foreground">沒有符合條件的 Clip，請調整篩選。</CardContent></Card>} right={<ChapterListPanel count={`${comedyChapters.length} Chapters · ${comedyClips.length} Clips`} query={query} onQueryChange={setQuery} collapsed={collapsedChapters.length === comedyChapters.length} onToggle={() => setCollapsedChapters(collapsedChapters.length === comedyChapters.length ? [] : comedyChapters.map(chapter => chapter.id))}>
          <p className="border-b px-4 py-3 text-xs leading-5 text-muted-foreground">依日文自動字幕推定段子邊界；章節連續，Punchline Clip 保留獨立的鋪陳與笑點時段。</p>
          {visibleChapters.map(chapter => {
            const chapterIndex = comedyChapters.indexOf(chapter)
            const visible = chapter.clips.filter(matches)
            const collapsed = collapsedChapters.includes(chapter.id)
            return <section key={chapter.id} className="border-b last:border-0">
              <button type="button" className="flex w-full items-center gap-3 p-4 text-left hover:bg-muted" aria-expanded={!collapsed} onClick={() => setCollapsedChapters(current => collapsed ? current.filter(id => id !== chapter.id) : [...current, chapter.id])}>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border">{chapterIndex + 1}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{chapter.name}</span><span className="mt-1 block text-xs text-muted-foreground">{comedyTime(chapter.start)} – {comedyTime(chapter.end)} · {visible.length}/{chapter.clips.length} Clips{chapter.laughter && " · 字幕 [笑い]"}{chapter.applause && " · 字幕 [拍手]"}</span></span>{collapsed ? <ChevronRight className="size-4" /> : <ChevronDown className="size-4" />}
              </button>
              {!collapsed && <div className="space-y-1 px-3 pb-3">{visible.map((clip, clipIndex) => <button key={clip.id} type="button" onClick={() => chooseClip(clip.id)} aria-pressed={selectedId === clip.id} className={`flex w-full gap-3 rounded-lg border p-3 text-left hover:bg-muted/60 ${selectedId === clip.id ? "border-neutral-400 bg-neutral-100" : "border-transparent"}`}><span className="grid size-10 shrink-0 place-items-center rounded bg-neutral-100 text-neutral-500"><Film className="size-5" /></span><span className="min-w-0"><span className="block text-sm font-medium">Clip {String.fromCharCode(65 + clipIndex)} · {clip.title}</span><span className="mt-1 block font-mono text-xs text-muted-foreground">{comedyTime(clip.start)} – {comedyTime(clip.end)}</span><span className="mt-2 block text-xs leading-5 text-muted-foreground">{clip.summary}</span><span className="mt-2 flex flex-wrap gap-1">{clip.tags.map(tag => <span key={tag} className="rounded border px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: selectedTopics.includes(tag) ? topicColors[tag] : `${topicColors[tag]}30`, color: selectedTopics.includes(tag) ? "#333333" : "#626262", borderColor: selectedTopics.includes(tag) ? topicColors[tag] : "#e5e5e5" }}>{tag}</span>)}</span></span></button>)}</div>}
            </section>
          })}
          {!visibleChapters.length && <p className="p-4 text-sm text-muted-foreground">沒有符合的片段</p>}
        </ChapterListPanel>} />
      </AIChapterLayout></TabsContent>
    </Tabs>
  </div>
}
