import { useRef, useState } from "react"
import { Upload, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"
import { translate, type Locale } from "@/i18n"

export default function VideoPickerDialog({ open, onOpenChange, locale = "en" }: { open: boolean; onOpenChange: (open: boolean) => void; locale?: Locale }) {
  const [dragging, setDragging] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const selectLocal = (files: FileList | null) => {
    if (!files?.length) return
    onOpenChange(false)
  }
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" />
      <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex w-[min(880px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl focus:outline-none">
        <div className="flex items-start justify-between border-b px-6 py-5"><div><Dialog.Title className="text-xl font-semibold">{translate(locale, "Upload Asset")}</Dialog.Title><Dialog.Description className="mt-1 text-sm text-slate-500">{translate(locale, "Choose one video from your computer.")}</Dialog.Description></div><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close upload"><X size={18} /></Button></Dialog.Close></div>
        <div className="p-6"><div role="button" tabIndex={0} aria-label={translate(locale, "From Local")} onClick={() => input.current?.click()} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); input.current?.click() } }} onDragOver={event => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); selectLocal(event.dataTransfer.files) }} className={`group flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-8 text-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50/40 hover:border-slate-400 hover:bg-slate-50"}`}><Upload size={24} strokeWidth={1.5} className="text-slate-400 transition-colors group-hover:text-slate-600" /><h3 className="mt-4 text-sm font-medium">{translate(locale, "Drop a video here or click to browse")}</h3><p className="mt-2 text-xs text-slate-400">MP4</p></div></div>
        <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4"><p className="text-sm text-slate-500">{translate(locale, "From Local")}</p><Dialog.Close asChild><Button variant="ghost">{translate(locale, "Cancel")}</Button></Dialog.Close></div>
        <input ref={input} type="file" accept="video/mp4,.mp4" className="sr-only" aria-label="Choose a local MP4 file" onChange={event => { selectLocal(event.target.files); event.target.value = "" }} />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
