import { useRef, useState } from "react"
import type { ReactNode } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

export default function ResizableVideoStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ x: number; y: number; width: number; moved: boolean } | null>(null)
  const [widthPercent, setWidthPercent] = useState<number | null>(null)
  const expanded = widthPercent !== null && widthPercent > 72

  const resize = (width: number) => {
    const stage = stageRef.current
    if (!stage) return
    const style = getComputedStyle(stage)
    const available = stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    if (available <= 0) return
    setWidthPercent(Math.max(Math.min(280, available), Math.min(available, width)) / available * 100)
  }

  return <div ref={stageRef} className="relative bg-slate-950/5 p-4 pb-12 sm:px-6">
    <div ref={playerRef} style={widthPercent === null ? undefined : { width: `${widthPercent}%` }} className="relative mx-auto aspect-video w-full max-w-full overflow-hidden rounded-lg bg-black shadow-sm sm:w-[72%]">
      {children}
    </div>
    <button type="button" aria-label={expanded ? "縮小影片" : "放大影片"} aria-pressed={expanded} title="點擊放大或縮小；拖曳或使用方向鍵調整大小" className="absolute right-2 bottom-2 grid size-8 cursor-nwse-resize touch-none place-items-center rounded-md text-neutral-700 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
      onClick={event => {
        if (event.detail > 0 && dragRef.current?.moved) { dragRef.current = null; return }
        dragRef.current = null
        setWidthPercent(expanded ? null : 100)
      }}
      onPointerDown={event => {
        if (event.button !== 0 || !playerRef.current) return
        dragRef.current = { x: event.clientX, y: event.clientY, width: playerRef.current.getBoundingClientRect().width, moved: false }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={event => {
        const origin = dragRef.current
        if (!origin || !event.currentTarget.hasPointerCapture(event.pointerId)) return
        const dx = (event.clientX - origin.x) * 2
        const dy = (event.clientY - origin.y) * 16 / 9
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 6 && !origin.moved) return
        origin.moved = true
        resize(origin.width + (Math.abs(dx) >= Math.abs(dy) ? dx : dy))
      }}
      onPointerUp={event => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={() => { dragRef.current = null }}
      onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) || !playerRef.current) return
        event.preventDefault()
        const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1
        resize(playerRef.current.getBoundingClientRect().width + direction * (event.shiftKey ? 40 : 20))
      }}
    >{expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}</button>
  </div>
}
