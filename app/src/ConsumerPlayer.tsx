import { useEffect, useRef, useState } from "react"
import {
  ArrowLeft,
  Film,
  ListVideo,
  Maximize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipForward,
  X,
} from "lucide-react"
import { timestamp } from "./AIChapter"

type Chapter = {
  id: string
  name: string
  clips: { id: string; name: string; start: number; end: number }[]
}
export default function ConsumerPlayer({
  title,
  chapters,
  duration,
  time,
  playing,
  seek,
  togglePlay,
  onClose,
}: {
  title: string
  chapters: Chapter[]
  duration: number
  time: number
  playing: boolean
  seek: (time: number) => void
  togglePlay: () => void
  onClose: () => void
}) {
  const [listOpen, setListOpen] = useState(true)
  const playerRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLButtonElement>(null)
  const current = chapters.findIndex(
    (ch) => time >= ch.clips[0].start && time < ch.clips.at(-1)!.end
  )
  const activeIndex = current < 0 ? chapters.length - 1 : current
  const chapter = chapters[activeIndex]
  const clip =
    chapter.clips.find((c) => time >= c.start && time < c.end) ??
    chapter.clips.at(-1)!
  const [fullscreenError, setFullscreenError] = useState("")
  useEffect(() => {
    const focused = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    backRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      focused?.focus()
    }
  }, [])
  return (
    <div
      ref={playerRef}
      role="dialog"
      aria-modal="true"
      aria-label="C 端 Player 預覽"
      className="fixed inset-0 z-50 overflow-auto bg-black text-neutral-200"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose()
        if (event.key === "Tab") {
          const elements = Array.from(
            playerRef.current!.querySelectorAll<HTMLElement>(
              "button:not(:disabled), input"
            )
          )
          const first = elements[0],
            last = elements.at(-1)
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        }
      }}
    >
      <div
        className={`grid min-h-dvh gap-5 p-4 md:p-6 ${listOpen ? "lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_390px]" : ""}`}
      >
        <main className="flex min-w-0 flex-col justify-center">
          <header className="mb-5 flex items-center gap-4">
            <button
              ref={backRef}
              aria-label="返回編輯模式"
              onClick={onClose}
              className="rounded p-2 hover:bg-white/10"
            >
              <ArrowLeft className="size-7" />
            </button>
            <h2 className="min-w-0 flex-1 truncate text-lg md:text-xl">
              {title}
            </h2>
            <span className="shrink-0 rounded border border-white/20 px-2 py-1 text-xs text-neutral-400">
              預覽模式
            </span>
          </header>
          <div className="relative flex aspect-video min-h-60 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_40%,#464a44_0%,#252b2d_40%,#101214_100%)]">
            <Film className="absolute size-64 text-white/[.04]" />
            <div className="relative px-5 text-center">
              <span className="text-xs tracking-[.35em] text-orange-200/70">
                CHAPTER {activeIndex + 1}
              </span>
              <h3 className="mt-4 text-3xl font-medium md:text-4xl">
                {chapter.name}
              </h3>
              <p className="mt-3 text-neutral-400">{clip.name}</p>
              <button
                aria-label={
                  playing && time < duration ? "暫停 C 端播放" : "開始 C 端播放"
                }
                onClick={togglePlay}
                className="mx-auto mt-8 grid size-16 place-items-center rounded-full border border-white/30 bg-black/20 hover:bg-white/10"
              >
                {playing && time < duration ? (
                  <Pause className="size-7" />
                ) : (
                  <Play className="size-7" />
                )}
              </button>
            </div>
            <span className="absolute bottom-4 left-4 text-xs text-white/40">
              影片示意 · 尚未連接實際影音
            </span>
          </div>
          <div className="space-y-5 px-2 py-6">
            <input
              type="range"
              aria-label="C 端播放進度"
              min={0}
              max={duration}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              className="h-1 w-full cursor-pointer accent-orange-500"
              style={{
                background: `linear-gradient(to right, #f97316 ${(time / duration) * 100}%, #666 ${(time / duration) * 100}%)`,
              }}
            />
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <button
                aria-label={playing && time < duration ? "暫停" : "播放"}
                onClick={togglePlay}
                className="rounded p-1 hover:bg-white/10"
              >
                {playing && time < duration ? (
                  <Pause className="size-7 fill-current" />
                ) : (
                  <Play className="size-7 fill-current" />
                )}
              </button>
              <button
                aria-label="倒退 10 秒"
                onClick={() => seek(Math.max(0, time - 10))}
                className="relative p-1"
              >
                <RotateCcw className="size-7" />
                <span className="absolute inset-0 grid place-items-center pt-1 text-[9px]">
                  10
                </span>
              </button>
              <button
                aria-label="前進 10 秒"
                onClick={() => seek(Math.min(duration, time + 10))}
                className="relative p-1"
              >
                <RotateCw className="size-7" />
                <span className="absolute inset-0 grid place-items-center pt-1 text-[9px]">
                  10
                </span>
              </button>
              <span className="font-mono text-sm">
                {timestamp(time)} / {timestamp(duration)}
              </span>
              <button
                disabled={activeIndex === chapters.length - 1}
                onClick={() => seek(chapters[activeIndex + 1].clips[0].start)}
                className="ml-auto flex items-center gap-2 text-sm disabled:opacity-30"
              >
                <SkipForward className="size-6" />
                <span className="hidden sm:inline">下一章節</span>
              </button>
              <button
                aria-label={listOpen ? "隱藏章節列表" : "顯示章節列表"}
                aria-pressed={listOpen}
                onClick={() => setListOpen(!listOpen)}
                className="p-1"
              >
                <ListVideo className="size-6" />
              </button>
              <button
                aria-label="全螢幕"
                onClick={async () => {
                  try {
                    if (document.fullscreenElement)
                      await document.exitFullscreen()
                    else await playerRef.current?.requestFullscreen()
                  } catch {
                    setFullscreenError("此瀏覽器不支援全螢幕，已保留視窗預覽。")
                  }
                }}
                className="p-1"
              >
                <Maximize className="size-6" />
              </button>
            </div>
            <p role="status" className="text-xs text-neutral-400">
              {fullscreenError}
            </p>
          </div>
        </main>
        {listOpen && (
          <aside className="flex max-h-[90dvh] flex-col overflow-hidden rounded-2xl border-2 border-neutral-600 bg-[#262524]">
            <header className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <h3 className="text-xl font-semibold">見どころ</h3>
              <button
                aria-label="關閉章節列表"
                onClick={() => setListOpen(false)}
                className="p-1"
              >
                <X />
              </button>
            </header>
            <div className="overflow-y-auto">
              {chapters.map((ch, i) => (
                <button
                  key={ch.id}
                  aria-current={i === activeIndex ? "true" : undefined}
                  onClick={() => seek(ch.clips[0].start)}
                  className={`flex w-full gap-4 p-4 text-left transition-colors ${i === activeIndex ? "bg-white/15" : "hover:bg-white/5"}`}
                >
                  <div
                    className={`relative flex aspect-video w-28 shrink-0 items-center justify-center overflow-hidden rounded bg-gradient-to-br ${i % 2 ? "from-stone-600 to-neutral-800" : "from-slate-600 to-stone-800"}`}
                  >
                    <Film className="size-8 text-white/20" />
                    <span className="absolute bottom-1 left-2 text-[10px] text-white/70">
                      CHAPTER {i + 1}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-5">{ch.name}</p>
                    <p className="mt-1 truncate text-xs text-neutral-400">
                      {ch.clips.map((c) => c.name).join(" / ")}
                    </p>
                    <span className="mt-2 inline-block rounded bg-orange-800 px-1.5 py-0.5 text-xs text-orange-100">
                      {timestamp(ch.clips[0].start)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-auto border-t border-white/10 p-4 text-center">
              <span className="rounded-full bg-neutral-300 px-4 py-1 text-sm text-neutral-800">
                與影片同步
              </span>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
