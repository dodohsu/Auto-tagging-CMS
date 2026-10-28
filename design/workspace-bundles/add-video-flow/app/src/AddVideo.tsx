import { useRef, useState } from "react"
import { ArrowLeft, Check, Cloud, Film, Info, Languages, Plus, Scissors, Sparkles, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Item = { id: string; name: string; source: string; key: string }
function FocusTags({ defaults, disabled = false }: { defaults: string[]; disabled?: boolean }) {
  const [tags, setTags] = useState(defaults)
  const [draft, setDraft] = useState("")
  const add = () => { const value = draft.trim(); if (value && !tags.some(t => t.toLowerCase() === value.toLowerCase())) setTags([...tags, value]); setDraft("") }
  return <fieldset disabled={disabled} className="mt-5 space-y-3 disabled:opacity-40">
    <legend className="text-xs font-medium text-slate-600">Tagging Focus</legend>
    <div className="flex flex-wrap gap-2">{tags.map(tag => <span key={tag} className="inline-flex items-center gap-2 rounded-md border bg-white px-2.5 py-1.5 text-xs">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags(tags.filter(t => t !== tag))} className="rounded text-slate-400 hover:text-slate-900 focus-visible:outline-2"><X size={12} /></button></span>)}</div>
    <div className="flex gap-2"><Input aria-label={`Add ${defaults[0]} focus tag`} placeholder="Add a focus tag…" value={draft} maxLength={40} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add() } }} className="h-8 text-xs shadow-none" /><Button type="button" size="icon" variant="outline" className="size-8 shrink-0" aria-label={`Add ${defaults[0]} tag`} disabled={!draft.trim()} onClick={add}><Plus size={14} /></Button></div>
  </fieldset>
}
function Generation({ title, number, description, tags }: { title: string; number: string; description: string; tags: string[] }) {
  const [enabled, setEnabled] = useState(true)
  const Icon = number === "02" ? Sparkles : Scissors
  return <Card className="gap-0 rounded-xl p-5 shadow-none">
    <div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700"><Icon size={16} /></span><h2 className="text-base font-semibold">{title}</h2></div>
    <p className="mt-2 text-xs leading-relaxed text-slate-500">{description}</p>
    <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-3"><span className="flex items-center gap-2 text-xs font-medium"><Sparkles size={14} className="text-blue-500" />Quick Generation by AI</span><button type="button" role="switch" aria-label={`${title} Quick Generation by AI`} aria-checked={enabled} onClick={() => setEnabled(!enabled)} className={`inline-flex h-5 w-9 items-center rounded-full p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${enabled ? "bg-blue-600" : "bg-slate-300"}`}><span className={`size-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-4" : "translate-x-0"}`} /></button></div>
    <FocusTags defaults={tags} disabled={!enabled} />
  </Card>
}
export default function AddVideo({ onBack }: { onBack: () => void }) {
  const [source, setSource] = useState("local")
  const [items, setItems] = useState<Item[]>([])
  const [links, setLinks] = useState("")
  const [error, setError] = useState("")
  const [language, setLanguage] = useState("auto")
  const [dragging, setDragging] = useState(false)
  const [review, setReview] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const append = (incoming: Item[]) => setItems(old => [...old, ...incoming.filter((item, index) => !old.some(v => v.key === item.key) && incoming.findIndex(v => v.key === item.key) === index)])
  const files = (list: FileList | File[]) => {
    const incoming = Array.from(list)
    const valid = incoming.filter(file => file.type.startsWith("video/") || /\.(mp4|mov|m4v|webm|mkv)$/i.test(file.name))
    setError(valid.length === incoming.length ? "" : "Some files were skipped. Please choose video files.")
    append(valid.map(file => ({ id: crypto.randomUUID(), name: file.name, source: `Local file · ${(file.size / 1024 / 1024).toFixed(1)} MB`, key: `${file.name}:${file.size}:${file.lastModified}` })))
    setReview(false)
  }
  const cloud = () => {
    const urls = links.split(/\n/).map(s => s.trim()).filter(Boolean)
    const valid = urls.every(value => { try { const u = new URL(value); return (u.protocol === "s3:" && !!u.hostname && u.pathname.length > 1) || (u.protocol === "https:" && /(^|\.)s3([.-][a-z0-9-]+)?\.amazonaws\.com$/i.test(u.hostname) && u.pathname.length > 1) } catch { return false } })
    if (!urls.length || !valid) { setError("Enter a valid s3://bucket/video.mp4 or Amazon S3 HTTPS URL, one per line."); return }
    append(urls.map(url => { const u = new URL(url); return { id: crypto.randomUUID(), name: u.pathname.split("/").pop() || "Cloud video", source: "Amazon S3 · Access checked on import", key: url } }))
    setLinks(""); setError(""); setReview(false)
  }
  return <div className="mx-auto max-w-[1200px] pb-5">
    <button onClick={onBack} className="mb-5 flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900"><ArrowLeft size={14} />Back to Content</button>
    <div className="mb-7 flex flex-wrap items-start gap-3"><div><h1 className="text-3xl font-semibold tracking-tight">Add Content</h1><p className="mt-2 text-sm text-slate-500">Bring your videos in. Let AI handle the details.</p></div></div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,1fr)]">
      <div className="space-y-5 xl:sticky xl:top-6">
        <Card className="gap-0 rounded-xl p-6 shadow-none">
          <div className="flex items-center gap-2"><h2 className="text-base font-semibold">Upload File</h2><TooltipProvider><Tooltip><TooltipTrigger asChild><button type="button" aria-label="Upload information" className="inline-flex size-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2"><Info size={14} /></button></TooltipTrigger><TooltipContent>Multiple videos supported</TooltipContent></Tooltip></TooltipProvider></div>
          <div role="tablist" aria-label="Upload source" className="mt-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1">{["local", "cloud"].map(value => <button key={value} role="tab" aria-selected={source === value} aria-controls="upload-source" onClick={() => { setSource(value); setError("") }} className={`flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-medium ${source === value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{value === "local" ? <Upload size={15} /> : <Cloud size={16} />}From {value === "local" ? "Local" : "Cloud"}</button>)}</div>
          <div id="upload-source" role="tabpanel" aria-label={`From ${source}`} className="mt-5">
            {source === "local" ? <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); files(e.dataTransfer.files) }} className={`flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-dashed px-5 py-10 text-center transition-colors ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50/50"}`}>
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-white shadow-sm"><Upload size={23} strokeWidth={1.5} className="text-slate-600" /></div><h3 className="text-sm font-medium">Drag & drop your videos here</h3><p className="mt-2 text-xs text-slate-500">Select one video or bring an entire batch.</p><Button variant="outline" className="mt-5 bg-white text-xs" onClick={() => input.current?.click()}><Plus size={14} />Browse files</Button><p className="mt-4 text-[10px] text-slate-400">MP4, MOV, M4V, WebM, MKV</p><input ref={input} type="file" accept="video/*,.mkv" multiple className="sr-only" aria-label="Choose video files" onChange={e => { if (e.target.files) files(e.target.files); e.target.value = "" }} />
            </div> : <div className="rounded-xl border bg-slate-50/50 p-5"><label htmlFor="s3-links" className="text-sm font-medium">Amazon S3 links</label><p className="mt-2 text-xs leading-5 text-slate-500">Paste a link to each video, one per line.</p><textarea id="s3-links" rows={5} value={links} onChange={e => setLinks(e.target.value)} placeholder={"s3://your-bucket/video.mp4\nhttps://your-bucket.s3.amazonaws.com/video.mp4"} className="mt-4 w-full resize-y rounded-lg border bg-white p-3 text-xs leading-6 outline-blue-500" /><div className="mt-3 flex justify-end"><Button variant="outline" disabled={!links.trim()} onClick={cloud}><Plus size={14} />Add links</Button></div><p className="mt-4 text-[11px] leading-5 text-slate-500">Private files require authorized S3 access or a valid presigned link.</p></div>}
          </div>
          {error && <p role="alert" className="mt-3 text-xs text-red-600">{error}</p>}
          <div className="mt-6 flex items-center justify-between border-t pt-5"><h3 className="text-xs font-medium">Selected videos <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">{items.length}</span></h3></div>
          {items.length ? <ul className="mt-3 max-h-64 overflow-auto divide-y">{items.map(item => <li key={item.id} className="flex items-center gap-3 py-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Film size={18} /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{item.name}</p><p className="mt-1 text-[10px] text-slate-400">{item.source}</p></div><button aria-label={`Remove ${item.name}`} onClick={() => { setItems(items.filter(v => v.id !== item.id)); setReview(false) }} className="p-2 text-slate-400 hover:text-slate-900"><X size={14} /></button></li>)}</ul> : <p className="py-7 text-center text-xs text-slate-400">Your selected videos will appear here.</p>}
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="gap-0 rounded-xl p-5 shadow-none"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700"><Languages size={16} /></span><h2 className="text-base font-semibold">Subtitle</h2></div><p className="mt-2 text-xs text-slate-500">Generate subtitles in the video's spoken language.</p><label className="mt-5 mb-2 block text-xs font-medium" id="subtitle-language">Video language</label><Select value={language} onValueChange={setLanguage}><SelectTrigger aria-labelledby="subtitle-language" className="w-full shadow-none"><SelectValue /></SelectTrigger><SelectContent>{[["auto", "Auto-detect per video"], ["en", "English"], ["ja", "Japanese"], ["zh", "Chinese"], ["ko", "Korean"], ["es", "Spanish"]].map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent></Select><p className="mt-2 text-[11px] leading-5 text-slate-400">{language === "auto" ? "Each video uses its detected language. English videos default to English." : "This language will be used for every video in this batch."}</p></Card>
        <Generation number="02" title="AI Metadata" description="Generate these tags to make your videos discoverable in AI Search." tags={["Genre", "Mood", "Style", "Audience"]} />
        <Generation number="03" title="AI Chapter" description="Tell us what you want the clipping/tags to focus on by specifying your preferences." tags={["Scenes", "Topics", "Highlights", "Key moments"]} />
      </div>
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white px-5 py-4"><div><p className="text-xs font-medium">{items.length} {items.length === 1 ? "video" : "videos"} selected</p><p className="mt-1 text-[11px] text-slate-400">Set up once, apply to every video. You can review and refine AI results after processing.</p></div><div className="flex gap-3"><Button variant="ghost" onClick={onBack}>Cancel</Button><Button disabled={!items.length} className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setReview(true)}><Sparkles size={16} />AI Generate</Button></div></div>
    {review && <div role="status" className="mt-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900"><Check size={18} className="shrink-0" /><div><p className="font-medium">Your batch is ready for review</p><p className="mt-1 text-xs">{items.length} videos selected. This preview stops before upload; no files or links have been sent for processing.</p></div></div>}
  </div>
}
