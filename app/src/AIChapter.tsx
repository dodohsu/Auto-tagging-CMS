import { useEffect, useRef, useState } from "react"
import type { PointerEvent } from "react"
import {
  ChevronDown,
  ChevronRight,
  Film,
  Pause,
  Play,
  Search,
  Scissors,
  Sparkles,
  RotateCcw,
  Check,
  MoveDiagonal2,
  MonitorPlay,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Video } from "@/mock-data/videos"

type Clip = {
  id: string
  name: string
  tags: string[]
  start: number
  end: number
}
type Chapter = { id: string; name: string; clips: Clip[] }
const topicColors: Record<string, string> = {
  城市: "#bfd8ec",
  旅行: "#b9ddd4",
  在地文化: "#d8c3e8",
  探索: "#e9d7b8",
  美食: "#ebc5cf",
  料理: "#ebcdbb",
  療癒: "#c9e0c1",
  職人: "#c6cae9",
  人情味: "#e2c4d9",
}
const names = [
  "城市裡的出發",
  "巷弄美食探索",
  "料理與職人",
  "餐桌上的相遇",
  "旅途的餘味",
]
const clipNames = [
  ["城市街景", "走進巷弄", "尋找餐館"],
  ["閱讀菜單", "招牌料理", "第一口滋味"],
  ["備料時刻", "職人手藝", "料理上桌"],
  ["店主的故事", "分享美食", "溫暖對話"],
  ["飯後散步", "回味旅程", "新的出發"],
]
const tagSets = [
  ["城市", "旅行"],
  ["在地文化", "探索"],
  ["美食", "探索"],
  ["美食", "在地文化"],
  ["美食", "料理"],
  ["美食", "療癒"],
  ["料理", "職人"],
  ["職人", "在地文化"],
  ["料理", "美食"],
  ["人情味", "在地文化"],
  ["美食", "人情味"],
  ["人情味", "療癒"],
  ["城市", "旅行"],
  ["療癒", "旅行"],
  ["旅行", "探索"],
]
export const seconds = (value: string) =>
  value.split(":").reduce((a, b) => a * 60 + Number(b), 0)
export const timestamp = (value: number) => {
  const s = Math.round(value)
  return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60]
    .map((n) => String(n).padStart(2, "0"))
    .join(":")
}
function createChapters(duration: number): Chapter[] {
  return names.map((name, i) => ({
    id: `chapter-${i}`,
    name,
    clips: clipNames[i].map((name, j) => ({
      id: `clip-${i}-${j}`,
      name,
      tags: tagSets[i * 3 + j],
      start: Math.round((duration * (i * 3 + j)) / 15),
      end: Math.round((duration * (i * 3 + j + 1)) / 15),
    })),
  }))
}
export default function AIChapter({ video }: { video: Video }) {
  const duration = seconds(video.duration)
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(`KK lab-chapters-${video.id}`) || "null"
      )
      if (
        saved?.duration === duration &&
        Array.isArray(saved.chapters) &&
        saved.chapters.length === 5
      )
        return saved.chapters
    } catch {
      /* Use mock analysis if saved data is unavailable. */
    }
    return createChapters(duration)
  })
  const [mode, setMode] = useState<"chapters" | "scenes">("chapters")
  const [selected, setSelected] = useState("clip-0-0")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [highlightStatus, setHighlightStatus] = useState<
    "idle" | "configuring" | "generating" | "ready"
  >("idle")
  const [clipEditorOpen, setClipEditorOpen] = useState(false)
  const showLegacyHighlightStatus = false
  const toggleTopic = (topic: string) =>
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  const topicStyle = (topic: string) => ({
    backgroundColor: selectedTopics.includes(topic)
      ? topicColors[topic]
      : `${topicColors[topic]}30`,
    color: selectedTopics.includes(topic) ? "#333333" : "#626262",
    borderColor: selectedTopics.includes(topic)
      ? topicColors[topic]
      : "#e5e5e5",
  })
  const timelineColor = (tags: string[]) => {
    const colors = tags
      .filter((t) => !selectedTopics.length || selectedTopics.includes(t))
      .map((t) => topicColors[t])
    if (!colors.length) return "#e5e5e5"
    if (colors.length === 1) return colors[0]
    return `linear-gradient(110deg, ${colors.join(", ")})`
  }
  const [query, setQuery] = useState("")
  const [collapsed, setCollapsed] = useState<string[]>([])
  const [time, setTime] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const resizeOrigin = useRef<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const [previewSize, setPreviewSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const resizePreview = (width: number, height: number) => {
    const available = previewRef.current?.parentElement?.clientWidth ?? width
    setPreviewSize({
      width: Math.max(Math.min(280, available), Math.min(available, width)),
      height: Math.max(240, Math.min(900, height)),
    })
  }
  const timelineRef = useRef<HTMLDivElement>(null)
  const scrub = (event: PointerEvent<HTMLElement>) => {
    const bounds = timelineRef.current?.getBoundingClientRect()
    if (!bounds?.width) return
    setTime(
      Math.round(
        Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)) *
          duration
      )
    )
  }
  const startScrub = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    setPlaying(false)
    scrub(event)
  }
  const moveScrub = (event: PointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) scrub(event)
  }
  const stopScrub = (event: PointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      scrub(event)
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }
  const [playing, setPlaying] = useState(false)
  const [notice, setNotice] = useState("")
  const [draft, setDraft] = useState<{ start: string; end: string } | null>(
    null
  )
  const [chapterDraft, setChapterDraft] = useState<{
    id: string
    start: string
    end: string
  } | null>(null)
  const clips = chapters.flatMap((c) => c.clips)
  const clip = clips.find((c) => c.id === selected) ?? clips[0]
  const index = clips.findIndex((c) => c.id === clip.id)
  const chapterIndex = chapters.findIndex((c) =>
    c.clips.some((item) => item.id === clip.id)
  )
  const topics = [...new Set(clips.flatMap((c) => c.tags))]
  const chapter = chapters[chapterIndex]
  const firstClip = chapter.clips[0]
  const lastClip = chapter.clips.at(-1)!
  const currentChapterDraft =
    chapterDraft?.id === chapter.id ? chapterDraft : null
  const editChapter = (field: "start" | "end", value: string) =>
    setChapterDraft({
      id: chapter.id,
      start: timestamp(firstClip.start),
      end: timestamp(lastClip.end),
      ...currentChapterDraft,
      [field]: value,
    })
  const applyChapter = () => {
    if (!currentChapterDraft) return
    const values = [currentChapterDraft.start, currentChapterDraft.end]
    if (
      !values.every(
        (value) =>
          /^\d{2}:\d{2}:\d{2}$/.test(value) &&
          value
            .split(":")
            .slice(1)
            .every((n) => Number(n) < 60)
      )
    ) {
      setNotice("章節時間請輸入 HH:MM:SS，分鐘與秒數須小於 60。")
      return
    }
    const [start, end] = values.map(seconds)
    const previous = chapters[chapterIndex - 1]?.clips.at(-1)
    const next = chapters[chapterIndex + 1]?.clips[0]
    if (
      start >= firstClip.end ||
      end <= lastClip.start ||
      (previous ? start <= previous.start : start !== 0) ||
      (next ? end >= next.end : end !== duration)
    ) {
      setNotice(
        "章節時間無效：邊界兩側的 Clip 必須至少保留 1 秒，首章起點與末章終點固定。"
      )
      return
    }
    setChapters((prev) =>
      prev.map((ch) => ({
        ...ch,
        clips: ch.clips.map((c) =>
          c.id === firstClip.id
            ? { ...c, start }
            : c.id === lastClip.id
              ? { ...c, end }
              : c.id === previous?.id
                ? { ...c, end: start }
                : c.id === next?.id
                  ? { ...c, start: end }
                  : c
        ),
      }))
    )
    setChapterDraft(null)
    setDraft(null)
    setTime(start)
    setNotice("章節時間已套用，相鄰章節與邊界 Clip 已同步銜接。")
  }
  // Sparse detected moments are independent of the continuous chapter boundaries.
  const scenes = createChapters(duration)
    .flatMap((c) => c.clips)
    .map((c) => ({
      ...c,
      start: c.start + Math.round((c.end - c.start) * 0.22),
      end: c.start + Math.round((c.end - c.start) * 0.65),
    }))
  const matches = (c: Clip) =>
    (!selectedTopics.length ||
      c.tags.some((t) => selectedTopics.includes(t))) &&
    (!query.trim() || `${c.name} ${c.tags.join(" ")}`.includes(query.trim()))
  const highlightedClips = clips.filter(matches)
  const highlightLength = highlightedClips.reduce(
    (total, c) => total + c.end - c.start,
    0
  )
  const scene = scenes.find((c) => c.id === clip.id)!
  const choose = (c: Clip) => {
    setSelected(c.id)
    setTime(
      mode === "scenes" ? scenes.find((s) => s.id === c.id)!.start : c.start
    )
    setDraft(null)
    setChapterDraft(null)
    setNotice("")
    setCollapsed((prev) =>
      prev.filter(
        (id) =>
          id !==
          chapters.find((ch) => ch.clips.some((item) => item.id === c.id))!.id
      )
    )
  }
  useEffect(() => {
    if (!playing) return
    const playbackClips = selectedTopics.length ? highlightedClips : clips
    const timer = window.setInterval(
      () =>
        setTime((t) => {
          const next = t + 1
          if (!selectedTopics.length) return Math.min(duration, next)
          const current = playbackClips.find(
            (clip) => t >= clip.start && t < clip.end
          )
          if (current && next < current.end) return next
          const following = playbackClips.find(
            (clip) => clip.start >= (current?.end ?? t)
          )
          if (following) return following.start
          setPlaying(false)
          return duration
        }),
      1000
    )
    return () => window.clearInterval(timer)
  }, [playing, duration, selectedTopics, highlightedClips, clips])
  const togglePlayback = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (time >= duration) setTime(0)
    if (
      selectedTopics.length &&
      !highlightedClips.some((clip) => time >= clip.start && time < clip.end)
    )
      setTime(highlightedClips[0]?.start ?? 0)
    setPlaying(true)
  }
  const apply = () => {
    if (!draft) return
    const valid = /^\d{2}:\d{2}:\d{2}$/
    if (
      ![draft.start, draft.end].every(
        (t) =>
          valid.test(t) &&
          t
            .split(":")
            .slice(1)
            .every((n) => Number(n) < 60)
      )
    ) {
      setNotice("請輸入 HH:MM:SS 格式，分鐘與秒數須小於 60。")
      return
    }
    const start = seconds(draft.start),
      end = seconds(draft.end)
    if (
      start >= end ||
      start < (clips[index - 1]?.start ?? -1) + 1 ||
      end > (clips[index + 1]?.end ?? duration + 1) - 1 ||
      (index === 0 && start !== 0) ||
      (index === clips.length - 1 && end !== duration)
    ) {
      setNotice(
        "時間範圍無效：每個片段至少 1 秒，不能跨越相鄰片段；首尾須涵蓋整部影片。"
      )
      return
    }
    setChapters((prev) =>
      prev.map((ch) => ({
        ...ch,
        clips: ch.clips.map((c) =>
          c.id === clip.id
            ? { ...c, start, end }
            : c.id === clips[index - 1]?.id
              ? { ...c, end: start }
              : c.id === clips[index + 1]?.id
                ? { ...c, start: end }
                : c
        ),
      }))
    )
    setTime(start)
    setDraft(null)
    setNotice("時間已套用，相鄰片段已同步銜接。")
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="size-5" />
            AI Chapter
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            從故事段落到精彩瞬間，探索並調整 AI 章節。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-0.5 rounded-lg bg-muted p-0.5">
            <Button
              size="sm"
              variant="default"
              aria-pressed={true}
              className="h-8 gap-1.5 rounded-md px-2.5 text-xs"
            >
              <Pencil className="size-4" />
              編輯模式
            </Button>
            <div className="group relative">
              <Button
                size="sm"
                variant="ghost"
                title="查看可用應用"
                className="h-8 gap-1.5 rounded-md px-2.5 text-xs"
              >
                <MonitorPlay className="size-4" />
                應用模式
              </Button>
              <div className="invisible absolute top-full right-0 z-30 mt-2 w-72 translate-y-1 rounded-xl border bg-background p-2 opacity-0 shadow-xl transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  可用應用
                </p>
                <button
                  className="flex w-full gap-3 rounded-lg p-2 text-left hover:bg-muted"
                  onClick={() => {
                    const url = new URL(window.location.href)
                    url.hash = `preview/${encodeURIComponent(JSON.stringify({ title: video.title, id: video.id, chapters, duration, time }))}`
                    window.open(url.href, "_blank", "noopener,noreferrer")
                    setPlaying(false)
                  }}
                >
                  <span className="grid size-16 shrink-0 place-items-center rounded-md bg-neutral-900 text-white">
                    <MonitorPlay className="size-7" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <MonitorPlay className="size-3.5" />C 端 Player
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      以觀眾視角播放章節與 Highlight
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card className="py-4 shadow-none">
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">主題 Filter</span>
            <span className="text-xs text-muted-foreground">
              {highlightedClips.length} / {clips.length} Clips
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={!selectedTopics.length ? "default" : "outline"}
              aria-pressed={!selectedTopics.length}
              className="rounded-full"
              onClick={() => setSelectedTopics([])}
            >
              全部主題
            </Button>
            {topics.map((t) => (
              <Button
                key={t}
                size="sm"
                variant="outline"
                aria-pressed={selectedTopics.includes(t)}
                style={topicStyle(t)}
                className="rounded-full"
                onClick={() => toggleTopic(t)}
              >
                {selectedTopics.includes(t) && <Check className="size-3" />}
                {t}
                <span className="opacity-60">
                  {clips.filter((c) => c.tags.includes(t)).length}
                </span>
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            可多選 ·{" "}
            {selectedTopics.length
              ? `已選 ${selectedTopics.length} 個主題，顯示符合任一主題的片段`
              : "顯示全部主題"}
            。時間軸柔和漸層表示片段同時符合多個主題；點擊「全部主題」可清除選取。
          </p>
          {showLegacyHighlightStatus && highlightStatus !== "idle" && (
            <Card className="border-neutral-300 bg-neutral-50 py-3 shadow-none">
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Highlight 生成設定</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTopics.join("、")} · {highlightedClips.length}{" "}
                      Clips · 預估 {timestamp(highlightLength)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      highlightStatus === "ready" ? "default" : "secondary"
                    }
                  >
                    {highlightStatus === "configuring"
                      ? "待確認"
                      : highlightStatus === "generating"
                        ? "生成中"
                        : "已完成"}
                  </Badge>
                </div>
                {highlightStatus === "configuring" && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setHighlightStatus("generating")
                        window.setTimeout(
                          () => setHighlightStatus("ready"),
                          1200
                        )
                      }}
                    >
                      開始生成
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setHighlightStatus("idle")}
                    >
                      取消
                    </Button>
                  </div>
                )}
                {highlightStatus === "generating" && (
                  <p className="text-xs text-muted-foreground">
                    正在依時間順序整理 Clip、套用轉場並建立 Highlight…
                  </p>
                )}
                {highlightStatus === "ready" && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                      Mock Highlight 已建立，可在預覽模式查看剪輯順序。
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setHighlightStatus("idle")}
                    >
                      重新設定
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      <div className="grid items-start gap-4 min-[1200px]:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-4">
          <Card className="gap-0 overflow-hidden py-0 shadow-none">
            <div className="flex items-center justify-between gap-2 border-b px-4 py-2 text-xs text-muted-foreground">
              <span>拖曳預覽右下角調整大小</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewSize(null)}
              >
                <RotateCcw className="size-3" />
                重設大小
              </Button>
            </div>
            <div
              ref={previewRef}
              style={
                previewSize
                  ? {
                      width: previewSize.width,
                      height: previewSize.height,
                      maxWidth: "100%",
                    }
                  : undefined
              }
              className="relative mx-auto flex aspect-video min-h-60 w-full flex-col justify-between overflow-hidden bg-neutral-900 p-5 pb-8 text-white"
            >
              <div className="flex justify-between text-xs">
                <Badge className="bg-white/15 text-white">
                  <Film className="size-3" />
                  Video 示意預覽
                </Badge>
                <span>
                  {mode === "chapters" ? "CHAPTER" : "SCENE"} {chapterIndex + 1}
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[.06]">
                <Film className="size-64" />
              </div>
              <div className="relative text-center">
                <p className="text-xs tracking-[.25em] text-neutral-400">
                  {video.title}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{clip.name}</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  示意播放 · 未連接實際影片
                </p>
              </div>
              <div className="relative space-y-3">
                <input
                  aria-label="影片播放進度"
                  type="range"
                  min="0"
                  max={duration}
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full accent-white"
                />
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-white hover:bg-white/15 hover:text-white"
                    aria-label={
                      playing && time < duration
                        ? "暫停示意播放"
                        : "開始示意播放"
                    }
                    onClick={togglePlayback}
                  >
                    {playing && time < duration ? <Pause /> : <Play />}
                  </Button>
                  <span className="font-mono text-xs">
                    {timestamp(time)} / {video.duration}
                  </span>
                  <span className="ml-auto text-xs text-neutral-400">
                    MOCK PREVIEW
                  </span>
                </div>
              </div>
              <button
                aria-label="拖曳調整 Video 預覽大小"
                title="拖曳調整大小；方向鍵可微調"
                className="absolute right-0 bottom-0 grid size-8 cursor-nwse-resize touch-none place-items-center rounded-tl bg-white/15 text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white"
                onPointerDown={(event) => {
                  if (event.button !== 0) return
                  event.preventDefault()
                  const rect = previewRef.current!.getBoundingClientRect()
                  resizeOrigin.current = {
                    x: event.clientX,
                    y: event.clientY,
                    width: rect.width,
                    height: rect.height,
                  }
                  event.currentTarget.setPointerCapture(event.pointerId)
                }}
                onPointerMove={(event) => {
                  const origin = resizeOrigin.current
                  if (
                    origin &&
                    event.currentTarget.hasPointerCapture(event.pointerId)
                  )
                    resizePreview(
                      origin.width + (event.clientX - origin.x) * 2,
                      origin.height + event.clientY - origin.y
                    )
                }}
                onPointerUp={(event) => {
                  resizeOrigin.current = null
                  if (event.currentTarget.hasPointerCapture(event.pointerId))
                    event.currentTarget.releasePointerCapture(event.pointerId)
                }}
                onPointerCancel={() => {
                  resizeOrigin.current = null
                }}
                onKeyDown={(event) => {
                  if (
                    ![
                      "ArrowLeft",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowDown",
                    ].includes(event.key)
                  )
                    return
                  event.preventDefault()
                  const rect = previewRef.current!.getBoundingClientRect()
                  resizePreview(
                    rect.width +
                      (event.key === "ArrowRight"
                        ? 20
                        : event.key === "ArrowLeft"
                          ? -20
                          : 0),
                    rect.height +
                      (event.key === "ArrowDown"
                        ? 20
                        : event.key === "ArrowUp"
                          ? -20
                          : 0)
                  )
                }}
              >
                <MoveDiagonal2 className="size-4" />
              </button>
            </div>
            <CardContent className="space-y-4 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">時間軸視圖</h3>
                <div className="flex gap-1 rounded-lg bg-muted p-1">
                  {(
                    [
                      ["chapters", "章節模式"],
                      ["scenes", "場景模式"],
                    ] as const
                  ).map(([value, label]) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={mode === value ? "default" : "ghost"}
                      onClick={() => {
                        setMode(value)
                        setDraft(null)
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {mode === "chapters"
                  ? "章節連續涵蓋完整影片；調整片段邊界會同步銜接相鄰片段。"
                  : "場景為不連續的 AI 精選時段；點擊主題可快速突出相符場景。"}
              </p>
              <div ref={timelineRef} className="relative pt-1 pb-6">
                <div className="flex h-10 overflow-hidden rounded-md">
                  {chapters.map((ch, i) => (
                    <button
                      key={ch.id}
                      title={`${ch.name} ${timestamp(ch.clips[0].start)} – ${timestamp(ch.clips.at(-1)!.end)}`}
                      onClick={() => choose(ch.clips[0])}
                      className={`overflow-hidden border-r border-white/70 px-1 text-xs ${i === chapterIndex ? "bg-primary text-white" : "bg-neutral-200 text-neutral-700"}`}
                      style={{
                        width: `${((ch.clips.at(-1)!.end - ch.clips[0].start) / duration) * 100}%`,
                      }}
                    >
                      {i + 1}
                      <span className="ml-1 hidden 2xl:inline">{ch.name}</span>
                    </button>
                  ))}
                </div>
                <div className="relative mt-2 h-8 rounded bg-neutral-100">
                  {(mode === "chapters" ? clips : scenes).map((c) => (
                    <button
                      key={c.id}
                      aria-label={`${mode === "chapters" ? "Clip" : "場景"} ${c.name} ${timestamp(c.start)} 至 ${timestamp(c.end)}`}
                      title={`${c.name} · ${c.tags.join(" / ")}`}
                      onClick={() => choose(c)}
                      className={`absolute top-0 h-8 overflow-hidden rounded-sm border border-white text-[10px] text-neutral-700 transition-opacity ${c.id === selected ? "ring-2 ring-neutral-500 ring-offset-1" : ""} ${matches(c) ? "opacity-100" : "opacity-20"}`}
                      style={{
                        background: timelineColor(c.tags),
                        left: `${(c.start / duration) * 100}%`,
                        width: `${((c.end - c.start) / duration) * 100}%`,
                      }}
                    >
                      {c.id === selected ? (
                        <Scissors className="mx-auto size-3" />
                      ) : (
                        ""
                      )}
                    </button>
                  ))}
                </div>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="時間軸播放位置"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={time}
                  aria-valuetext={timestamp(time)}
                  aria-orientation="horizontal"
                  title={`拖曳播放位置 ${timestamp(time)}`}
                  onPointerDown={startScrub}
                  onPointerMove={moveScrub}
                  onPointerUp={stopScrub}
                  onKeyDown={(event) => {
                    const step = event.shiftKey ? 10 : 1
                    const next =
                      event.key === "ArrowRight"
                        ? time + step
                        : event.key === "ArrowLeft"
                          ? time - step
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? duration
                              : null
                    if (next !== null) {
                      event.preventDefault()
                      setPlaying(false)
                      setTime(Math.max(0, Math.min(duration, next)))
                    }
                  }}
                  className="absolute top-0 bottom-5 z-10 w-6 -translate-x-1/2 cursor-ew-resize touch-none rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
                  style={{ left: `${(time / duration) * 100}%` }}
                >
                  <span className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-red-400" />
                  <span className="pointer-events-none absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-sm bg-red-400 shadow-sm" />
                </div>
                <div
                  title="點擊或拖曳刻度以跳轉播放位置"
                  onPointerDown={startScrub}
                  onPointerMove={moveScrub}
                  onPointerUp={stopScrub}
                  className="mt-3 flex cursor-ew-resize touch-none justify-between py-2 font-mono text-[10px] text-muted-foreground"
                >
                  {[0, 0.25, 0.5, 0.75, 1].map((n) => (
                    <span key={n}>{timestamp(duration * n)}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-neutral-300 bg-neutral-50 py-4 shadow-none">
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="size-4" />
                    生成 Highlight 影片
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    將目前篩選出的 {highlightedClips.length} 個 Clip
                    組合成可分享的精華片。
                  </p>
                </div>
                <Button
                  size="sm"
                  disabled={!selectedTopics.length || !highlightedClips.length}
                  onClick={() => setHighlightStatus("configuring")}
                >
                  <Sparkles />
                  設定 Highlight
                </Button>
              </div>
              {highlightStatus !== "idle" && (
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Highlight 生成設定</p>
                    <Badge
                      variant={
                        highlightStatus === "ready" ? "default" : "secondary"
                      }
                    >
                      {highlightStatus === "configuring"
                        ? "待確認"
                        : highlightStatus === "generating"
                          ? "生成中"
                          : "已完成"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {selectedTopics.join("、")} · {highlightedClips.length}{" "}
                    Clips · 預估 {timestamp(highlightLength)}
                  </p>
                  {highlightStatus === "configuring" && (
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setHighlightStatus("generating")
                          window.setTimeout(
                            () => setHighlightStatus("ready"),
                            1200
                          )
                        }}
                      >
                        開始生成
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setHighlightStatus("idle")}
                      >
                        取消
                      </Button>
                    </div>
                  )}
                  {highlightStatus === "generating" && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      正在依時間順序整理 Clip、套用轉場並建立 Highlight…
                    </p>
                  )}
                  {highlightStatus === "ready" && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Mock Highlight 已建立，可在預覽模式查看剪輯順序。
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="shadow-none">
            <CardContent className="space-y-4">
              {mode === "chapters" && (
                <section className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Chapter {chapterIndex + 1} | {chapter.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-end gap-3">
                    {(["start", "end"] as const).map((field) => (
                      <label
                        key={field}
                        className="min-w-36 flex-1 text-xs text-muted-foreground"
                      >
                        {field === "start" ? "章節開始時間" : "章節結束時間"}
                        <Input
                          aria-label={
                            field === "start" ? "章節開始時間" : "章節結束時間"
                          }
                          className="mt-1 font-mono"
                          disabled={
                            field === "start"
                              ? chapterIndex === 0
                              : chapterIndex === chapters.length - 1
                          }
                          value={
                            currentChapterDraft?.[field] ??
                            timestamp(
                              field === "start" ? firstClip.start : lastClip.end
                            )
                          }
                          onChange={(e) => editChapter(field, e.target.value)}
                        />
                      </label>
                    ))}
                    <Button
                      disabled={!currentChapterDraft}
                      onClick={applyChapter}
                    >
                      套用章節時間
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="取消章節時間修改"
                      onClick={() => setChapterDraft(null)}
                    >
                      <RotateCcw />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    調整會同步更新相鄰章節與邊界
                    Clip；內部片段切點不變。第一章從 00:00:00
                    開始，最後一章結束於影片終點。
                  </p>
                </section>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="w-fit px-0 text-muted-foreground"
                aria-expanded={clipEditorOpen}
                onClick={() => setClipEditorOpen((open) => !open)}
              >
                {clipEditorOpen ? "收合 Clip 調整" : "進階調整 Clip"}
                <ChevronDown
                  className={`size-4 transition-transform ${clipEditorOpen ? "rotate-180" : ""}`}
                />
              </Button>
              <div
                className={
                  clipEditorOpen ? "space-y-4 border-t pt-4" : "hidden"
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      CHAPTER {chapterIndex + 1} / CLIP{" "}
                      {String.fromCharCode(65 + (index % 3))}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{clip.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={index === 0}
                      onClick={() => choose(clips[index - 1])}
                    >
                      上一片段
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={index === clips.length - 1}
                      onClick={() => choose(clips[index + 1])}
                    >
                      下一片段
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {clip.tags.map((t) => (
                    <Button
                      key={t}
                      size="sm"
                      variant="outline"
                      aria-pressed={selectedTopics.includes(t)}
                      style={topicStyle(t)}
                      className="rounded-full"
                      onClick={() => toggleTopic(t)}
                    >
                      {t}
                    </Button>
                  ))}
                  <Badge variant="outline">AI 信心度 {96 - (index % 5)}%</Badge>
                </div>
                {mode === "chapters" ? (
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Scissors className="size-4" />
                      微調片段時間
                    </div>
                    <div className="flex flex-wrap items-end gap-3">
                      {(["start", "end"] as const).map((field) => (
                        <label
                          key={field}
                          className="min-w-36 flex-1 space-y-1 text-xs text-muted-foreground"
                        >
                          {field === "start" ? "開始時間" : "結束時間"}
                          <Input
                            aria-label={
                              field === "start"
                                ? "片段開始時間"
                                : "片段結束時間"
                            }
                            className="mt-1 font-mono"
                            disabled={
                              field === "start"
                                ? index === 0
                                : index === clips.length - 1
                            }
                            value={draft?.[field] ?? timestamp(clip[field])}
                            onChange={(e) =>
                              setDraft({
                                start: timestamp(clip.start),
                                end: timestamp(clip.end),
                                ...draft,
                                [field]: e.target.value,
                              })
                            }
                          />
                        </label>
                      ))}
                      <Button onClick={apply} disabled={!draft}>
                        套用時間
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="取消時間修改"
                        onClick={() => setDraft(null)}
                      >
                        <RotateCcw />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(["start", "end"] as const).map((field) => (
                        <Button
                          key={field}
                          variant="outline"
                          size="sm"
                          disabled={
                            field === "start"
                              ? index === 0
                              : index === clips.length - 1
                          }
                          onClick={() =>
                            setDraft({
                              start: timestamp(clip.start),
                              end: timestamp(clip.end),
                              ...draft,
                              [field]: timestamp(time),
                            })
                          }
                        >
                          以播放位置設為{field === "start" ? "起點" : "終點"}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted p-3 text-sm">
                    <p className="font-medium">
                      AI 精選場景 · {timestamp(scene.start)} –{" "}
                      {timestamp(scene.end)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      此場景只標示精彩時段，與相鄰場景之間可留有空白。
                    </p>
                  </div>
                )}
                <p role="status" className="text-sm text-muted-foreground">
                  {notice}
                </p>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium">
                    場景描述{" "}
                    <span className="text-xs text-muted-foreground">
                      AI Generated
                    </span>
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    此片段以「{clip.name}」為重點，呈現{clip.tags.join("與")}
                    的情境。AI 依視覺與敘事線索辨識此段落，供編輯檢視及微調。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="gap-0 overflow-hidden py-0 shadow-none">
          <div className="space-y-3 border-b p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">章節與片段</h3>
              <Badge variant="secondary">5 Chapters</Badge>
            </div>
            <div className="relative">
              <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
              <Input
                aria-label="搜尋章節片段標題或標籤"
                placeholder="搜尋片段、標籤…"
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setCollapsed(
                  collapsed.length === chapters.length
                    ? []
                    : chapters.map((c) => c.id)
                )
              }
            >
              {collapsed.length === chapters.length ? "全部展開" : "全部收合"}
            </Button>
          </div>
          <div className="max-h-[920px] overflow-y-auto">
            {chapters.map((ch, i) => {
              const visible = ch.clips.filter(matches)
              return (
                <section
                  key={ch.id}
                  className={`border-b last:border-0 ${!visible.length ? "opacity-45" : ""}`}
                >
                  <button
                    className="flex w-full items-center gap-3 p-4 text-left hover:bg-muted"
                    aria-expanded={!collapsed.includes(ch.id)}
                    onClick={() => {
                      const first = ch.clips[0]
                      setSelected(first.id)
                      setTime(
                        mode === "scenes"
                          ? scenes.find((scene) => scene.id === first.id)!.start
                          : first.start
                      )
                      setDraft(null)
                      setChapterDraft(null)
                      setNotice("")
                      setCollapsed((prev) =>
                        prev.includes(ch.id)
                          ? prev.filter((id) => id !== ch.id)
                          : [...prev, ch.id]
                      )
                    }}
                  >
                    <span className="grid size-7 shrink-0 place-items-center rounded-md border text-xs">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold">{ch.name}</h4>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {timestamp(ch.clips[0].start)} –{" "}
                        {timestamp(ch.clips.at(-1)!.end)} · {visible.length}/3
                        Clips
                      </p>
                    </div>
                    {collapsed.includes(ch.id) ? (
                      <ChevronRight className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>
                  {!collapsed.includes(ch.id) && (
                    <div className="space-y-1 px-3 pb-3">
                      {visible.length ? (
                        visible.map((c) => (
                          <div
                            key={c.id}
                            className={`rounded-lg border p-3 ${selected === c.id ? "border-neutral-400 bg-neutral-100" : "border-transparent hover:bg-muted/60"}`}
                          >
                            <button
                              className="flex w-full gap-3 text-left"
                              onClick={() => choose(c)}
                            >
                              <div className="grid size-10 shrink-0 place-items-center rounded bg-neutral-200 text-neutral-500">
                                <Film className="size-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  Clip{" "}
                                  {String.fromCharCode(
                                    65 + ch.clips.indexOf(c)
                                  )}{" "}
                                  · {c.name}
                                </p>
                                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                                  {timestamp(
                                    mode === "scenes"
                                      ? scenes.find((s) => s.id === c.id)!.start
                                      : c.start
                                  )}{" "}
                                  –{" "}
                                  {timestamp(
                                    mode === "scenes"
                                      ? scenes.find((s) => s.id === c.id)!.end
                                      : c.end
                                  )}
                                </p>
                              </div>
                            </button>
                            <div className="mt-2 flex flex-wrap gap-1 pl-[52px]">
                              {c.tags.map((t) => (
                                <button
                                  key={t}
                                  className="rounded border px-1.5 py-0.5 text-[10px]"
                                  aria-pressed={selectedTopics.includes(t)}
                                  style={topicStyle(t)}
                                  onClick={() => toggleTopic(t)}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="px-4 pb-2 text-xs text-muted-foreground">
                          沒有符合的片段
                        </p>
                      )}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
