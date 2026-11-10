import { useRef, useState } from "react"
import { ArrowLeft, Check, Cloud, Film, Info, Languages, Plus, ChevronDown, Sparkles, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Checkbox } from "@/components/ui/checkbox"
import { readTemplates } from "./template-settings"

type Item = { id: string; name: string; source: string; key: string }
function FocusTags({ defaults, disabled = false }: { defaults: string[]; disabled?: boolean }) {
  const [tags, setTags] = useState(defaults)
  const [draft, setDraft] = useState("")
  const [editing, setEditing] = useState(false)
  const add = () => { const value = draft.trim(); if (!value || tags.some(t => t.toLowerCase() === value.toLowerCase())) return; setTags([...tags, value]); setDraft(""); setEditing(false) }
  return <fieldset disabled={disabled} className="mt-5 space-y-3 disabled:opacity-40">
    <legend className="text-base font-medium text-slate-700">Tagging Focus</legend>
    <div className="flex flex-wrap gap-2">{tags.map(tag => <Badge key={tag} variant="outline" className="!h-auto min-h-8 gap-2 px-3 py-1.5 text-sm">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags(tags.filter(t => t !== tag))} className="rounded text-slate-400 hover:text-slate-900 focus-visible:outline-2"><X size={12} /></button></Badge>)}<Button type="button" size="icon" variant="outline" className="size-8" aria-label="Add focus tag" aria-expanded={editing} onClick={() => setEditing(true)}><Plus size={14} /></Button></div>
    {editing && <div className="flex gap-2"><Input aria-label={`Add ${defaults[0]} focus tag`} placeholder="Add a focus tag…" value={draft} maxLength={40} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add() } if (e.key === "Escape") { setDraft(""); setEditing(false) } }} className="h-9 text-base shadow-none" /><Button type="button" size="icon" variant="outline" className="size-8 shrink-0" aria-label={`Add ${defaults[0]} tag`} disabled={!draft.trim()} onClick={add}><Check size={14} /></Button><Button type="button" size="icon" variant="ghost" className="size-8 shrink-0" aria-label="Cancel adding tag" onClick={() => { setDraft(""); setEditing(false) }}><X size={14} /></Button></div>}
  </fieldset>
}
function Analysis() {
  const [templates] = useState(readTemplates)
  const [template, setTemplate] = useState(templates[0].name)
  const [categories, setCategories] = useState(() => structuredClone(templates[0].categories))
  const [expanded, setExpanded] = useState("")
  const [draft, setDraft] = useState("")
  const [adding, setAdding] = useState(false)
  const [saved, setSaved] = useState(false)
  return <Card className="gap-0 rounded-xl p-5 shadow-none">
    <div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700"><Sparkles size={16} /></span><h2 className="text-lg font-semibold">AI Analysis</h2></div>
    <p className="mt-2 text-sm leading-relaxed text-slate-500">Choose a template and refine the categories AI uses to analyze your videos.</p>
    <label id="analysis-template" className="mt-5 mb-2 text-sm font-medium">Template</label>
    <Select value={template} onValueChange={value => { setTemplate(value); setCategories(structuredClone(templates.find(item => item.name === value)?.categories ?? [])); setExpanded(""); setAdding(false); setSaved(false) }}><SelectTrigger aria-labelledby="analysis-template" className="!h-10 w-full px-3 text-sm [&>svg]:!size-4"><SelectValue /></SelectTrigger><SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">{templates.map(({ name }) => <SelectItem className="py-1.5 text-sm" key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select>
    <div className="mt-5 flex items-center justify-between border-t pt-4"><h3 className="text-base font-semibold">Tag Categories ({categories.length})</h3><Button size="sm" variant="outline" onClick={() => setAdding(!adding)}><Plus size={14} />Add Category</Button></div>
    {adding && <form className="mt-3 flex gap-2" onSubmit={e => { e.preventDefault(); const name = draft.trim(); if (!name || categories.some(c => c.name.toLowerCase() === name.toLowerCase())) return; setCategories([{ name, tags: [], enabled: true, prompt: "" }, ...categories]); setExpanded(name); setDraft(""); setAdding(false); setSaved(true) }}><Input aria-label="Category name" placeholder="Category name" value={draft} onChange={e => setDraft(e.target.value)} maxLength={40} /><Button type="submit" disabled={!draft.trim()}>Save</Button></form>}
    {saved && <p role="status" className="mt-2 text-sm text-green-700">Category saved.</p>}
    <div className="mt-4 space-y-2">{categories.map((category, index) => <div key={category.name} className="overflow-hidden rounded-lg border">
      <div className="flex items-center gap-2 bg-muted/40 px-3 py-3"><button type="button" aria-expanded={expanded === category.name} aria-controls={`category-${index}`} onClick={() => setExpanded(expanded === category.name ? "" : category.name)} className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-semibold">{category.name}<ChevronDown size={14} className={`ml-auto shrink-0 transition-transform ${expanded === category.name ? "rotate-180" : ""}`} /></button>{!templates.find(item => item.name === template)?.categories.some(item => item.name === category.name) && <Button type="button" size="icon" variant="ghost" className="size-7 text-slate-500" aria-label={`Remove ${category.name} category`} onClick={() => { setCategories(categories.filter(c => c.name !== category.name)); if (expanded === category.name) setExpanded(categories.find(c => c.name !== category.name)?.name ?? ""); setSaved(false) }}><X size={14} /></Button>}<button type="button" role="switch" aria-label={`Enable ${category.name}`} aria-checked={category.enabled} onClick={() => setCategories(categories.map((c, i) => i === index ? { ...c, enabled: !c.enabled } : c))} className={`inline-flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${category.enabled ? "bg-primary" : "bg-slate-300"}`}><span className={`size-3 rounded-full bg-white shadow-sm transition-transform ${category.enabled ? "translate-x-3" : "translate-x-0"}`} /></button></div>
      <div id={`category-${index}`} hidden={expanded !== category.name}><fieldset disabled={!category.enabled} className="space-y-3 border-t p-3 disabled:opacity-40"><div><div className="flex items-center gap-1.5"><label htmlFor={`prompt-${index}`} className="text-base font-medium">Prompt</label><TooltipProvider><Tooltip><TooltipTrigger asChild><button type="button" aria-label="About Prompt" className="inline-flex size-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 focus-visible:outline-2"><Info size={14} /></button></TooltipTrigger><TooltipContent className="max-w-80 text-sm leading-relaxed">A natural language instruction that tells the model what to analyze or generate about the video or images. Be specific about the format and content you need.</TooltipContent></Tooltip></TooltipProvider></div><Textarea id={`prompt-${index}`} key={`${template}-${category.name}`} rows={4} className="mt-2 min-h-28 resize-y text-base" defaultValue={category.prompt} placeholder="Describe what AI should identify…" /></div><FocusTags key={`${template}-${category.name}`} defaults={category.tags} /><label className="flex items-center gap-2 text-base"><Checkbox defaultChecked aria-label={`Allow new tags for ${category.name}`} />Allow new tags</label></fieldset></div>
    </div>)}</div>
  </Card>
}
export default function AddVideo({ onBack }: { onBack: () => void }) {
  const [source, setSource] = useState("local")
  const [items, setItems] = useState<Item[]>([])
  const [links, setLinks] = useState("")
  const [error, setError] = useState("")
  const [language, setLanguage] = useState("ja")
  const [outputLanguage, setOutputLanguage] = useState("ja")
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
    <button onClick={onBack} className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"><ArrowLeft size={14} />Back to Content</button>
    <div className="mb-7 flex flex-wrap items-start gap-3"><div><h1 className="text-3xl font-semibold tracking-tight">Add Content</h1><p className="mt-2 text-base text-slate-500">Bring your videos in. Let AI handle the details.</p></div></div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(400px,1.15fr)]">
      <div className="space-y-5 xl:sticky xl:top-6">
        <Card className="gap-0 rounded-xl p-6 shadow-none">
          <div className="flex items-center gap-2"><h2 className="text-lg font-semibold">Upload File</h2><TooltipProvider><Tooltip><TooltipTrigger asChild><button type="button" aria-label="Upload information" className="inline-flex size-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2"><Info size={14} /></button></TooltipTrigger><TooltipContent>Multiple videos supported</TooltipContent></Tooltip></TooltipProvider></div>
          <div role="tablist" aria-label="Upload source" className="mt-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1">{["local", "cloud"].map(value => <button key={value} role="tab" aria-selected={source === value} aria-controls="upload-source" onClick={() => { setSource(value); setError("") }} className={`flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium ${source === value ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{value === "local" ? <Upload size={15} /> : <Cloud size={16} />}From {value === "local" ? "Local" : "Cloud"}</button>)}</div>
          <div id="upload-source" role="tabpanel" aria-label={`From ${source}`} className="mt-5">
            {source === "local" ? <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); files(e.dataTransfer.files) }} className={`flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-dashed px-5 py-10 text-center transition-colors ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50/50"}`}>
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-white shadow-sm"><Upload size={23} strokeWidth={1.5} className="text-slate-600" /></div><h3 className="text-base font-medium">Drag & drop your videos here</h3><p className="mt-2 text-sm text-slate-500">Select one video or bring an entire batch.</p><Button variant="outline" className="mt-5 bg-white text-sm" onClick={() => input.current?.click()}><Plus size={14} />Browse files</Button><p className="mt-4 text-sm text-slate-400">MP4, MOV, M4V, WebM, MKV</p><input ref={input} type="file" accept="video/*,.mkv" multiple className="sr-only" aria-label="Choose video files" onChange={e => { if (e.target.files) files(e.target.files); e.target.value = "" }} />
            </div> : <div className="rounded-xl border bg-slate-50/50 p-5"><label htmlFor="s3-links" className="text-base font-medium">Amazon S3 links</label><p className="mt-2 text-sm leading-5 text-slate-500">Paste a link to each video, one per line.</p><textarea id="s3-links" rows={5} value={links} onChange={e => setLinks(e.target.value)} placeholder={"s3://your-bucket/video.mp4\nhttps://your-bucket.s3.amazonaws.com/video.mp4"} className="mt-4 w-full resize-y rounded-lg border bg-white p-3 text-sm leading-6 outline-blue-500" /><div className="mt-3 flex justify-end"><Button variant="outline" disabled={!links.trim()} onClick={cloud}><Plus size={14} />Add links</Button></div><p className="mt-4 text-sm leading-5 text-slate-500">Private files require authorized S3 access or a valid presigned link.</p></div>}
          </div>
          {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
          <div className="mt-6 flex items-center justify-between border-t pt-5"><h3 className="text-sm font-medium">Selected videos <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">{items.length}</span></h3></div>
          {items.length ? <ul className="mt-3 max-h-64 overflow-auto divide-y">{items.map(item => <li key={item.id} className="flex items-center gap-3 py-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Film size={18} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.name}</p><p className="mt-1 text-sm text-slate-400">{item.source}</p></div><button aria-label={`Remove ${item.name}`} onClick={() => { setItems(items.filter(v => v.id !== item.id)); setReview(false) }} className="p-2 text-slate-400 hover:text-slate-900"><X size={14} /></button></li>)}</ul> : <p className="py-7 text-center text-sm text-slate-400">Your selected videos will appear here.</p>}
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="gap-0 rounded-xl p-5 shadow-none"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700"><Languages size={16} /></span><h2 className="text-lg font-semibold">Subtitle</h2></div><p className="mt-2 text-sm text-slate-500">Generate subtitles in the video's spoken language.</p>{[{ label: "Input language", value: language, change: setLanguage }, { label: "Output language", value: outputLanguage, change: setOutputLanguage }].map(field => <div key={field.label} className="mt-4"><label className="mb-2 block text-sm font-medium">{field.label}</label><Select value={field.value} onValueChange={field.change}><SelectTrigger aria-label={field.label} className="!h-10 w-full px-3 text-sm shadow-none [&>svg]:!size-4"><SelectValue /></SelectTrigger><SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">{[["ja", "Japanese"], ["en", "English"], ["zh", "Chinese"], ["ko", "Korean"], ["es", "Spanish"]].map(([value, label]) => <SelectItem className="py-1.5 text-sm" key={value} value={value}>{label}</SelectItem>)}</SelectContent></Select></div>)}</Card>
        <Analysis />
      </div>
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white px-5 py-4"><div><p className="text-sm font-medium">{items.length} {items.length === 1 ? "video" : "videos"} selected</p><p className="mt-1 text-sm text-slate-400">Set up once, apply to every video. You can review and refine AI results after processing.</p></div><div className="flex gap-3"><Button variant="ghost" onClick={onBack}>Cancel</Button><Button disabled={!items.length} onClick={() => setReview(true)}><Sparkles size={16} />AI Generate</Button></div></div>
    {review && <div role="status" className="mt-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5 text-base text-blue-900"><Check size={18} className="shrink-0" /><div><p className="font-medium">Your batch is ready for review</p><p className="mt-1 text-sm">{items.length} videos selected. This preview stops before upload; no files or links have been sent for processing.</p></div></div>}
  </div>
}
