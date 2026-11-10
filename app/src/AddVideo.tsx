import { useRef, useState } from "react"
import { ArrowLeft, Check, FileText, Film, Info, Languages, Plus, ChevronDown, ChevronRight, ChevronUp, Search, Sparkles, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog } from "radix-ui"

import { Checkbox } from "@/components/ui/checkbox"
import { readTemplates } from "./template-settings"
import { videos } from "./mock-data/videos"
import gourmetThumbnail from "@/assets/gourmet-solitary-thumbnail.png"

type Item = { id: string; name: string; source: string; key: string }
function FocusTags({ defaults, disabled = false }: { defaults: string[]; disabled?: boolean }) {
  const [tags, setTags] = useState(defaults)
  const [draft, setDraft] = useState("")
  const [editing, setEditing] = useState(false)
  const add = () => { const value = draft.trim(); if (!value || tags.some(t => t.toLowerCase() === value.toLowerCase())) return; setTags([...tags, value]); setDraft(""); setEditing(false) }
  return <fieldset disabled={disabled} className="mt-5 space-y-3 disabled:opacity-40">
    <legend className="text-sm font-medium text-slate-700">Tagging Focus</legend>
    <div className="flex flex-wrap gap-2">{tags.map(tag => <Badge key={tag} variant="outline" className="!h-auto min-h-8 gap-2 px-3 py-1.5 text-sm">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags(tags.filter(t => t !== tag))} className="rounded text-slate-400 hover:text-slate-900 focus-visible:outline-2"><X size={12} /></button></Badge>)}<Button type="button" size="icon" variant="outline" className="size-8" aria-label="Add focus tag" aria-expanded={editing} onClick={() => setEditing(true)}><Plus size={14} /></Button></div>
    {editing && <div className="flex gap-2"><Input aria-label={`Add ${defaults[0]} focus tag`} placeholder="Add a focus tag…" value={draft} maxLength={40} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add() } if (e.key === "Escape") { setDraft(""); setEditing(false) } }} className="h-9 text-base shadow-none" /><Button type="button" size="icon" variant="outline" className="size-8 shrink-0" aria-label={`Add ${defaults[0]} tag`} disabled={!draft.trim()} onClick={add}><Check size={14} /></Button><Button type="button" size="icon" variant="ghost" className="size-8 shrink-0" aria-label="Cancel adding tag" onClick={() => { setDraft(""); setEditing(false) }}><X size={14} /></Button></div>}
  </fieldset>
}
function Analysis() {
  const [templates] = useState(readTemplates)
  const [template, setTemplate] = useState(templates[0].name)
  const [categories, setCategories] = useState(() => structuredClone(templates[0].categories))
  const [metadataCategories, setMetadataCategories] = useState(() => templates[0].categories.map(category => category.name))
  const [descriptionMode, setDescriptionMode] = useState<"manual" | "ai">("manual")
  const [expanded, setExpanded] = useState("")
  const [draft, setDraft] = useState("")
  const [adding, setAdding] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showAllTypes, setShowAllTypes] = useState(false)
  const [typeSearch, setTypeSearch] = useState("")
  const typeScroller = useRef<HTMLDivElement>(null)
  const changeTemplate = (value: string) => {
    const nextCategories = structuredClone(templates.find(item => item.name === value)?.categories ?? [])
    setTemplate(value)
    setCategories(nextCategories)
    setMetadataCategories(nextCategories.map(category => category.name))
    setExpanded("")
    setAdding(false)
    setSaved(false)
  }
  const removeCategory = (name: string) => {
    setCategories(categories.filter(category => category.name !== name))
    setMetadataCategories(current => current.filter(category => category !== name))
    if (expanded === name) setExpanded(categories.find(category => category.name !== name)?.name ?? "")
    setSaved(false)
  }
  const visibleTypes = templates.slice(0, 5)
  const filteredTypes = templates.filter(item => item.name.toLowerCase().includes(typeSearch.trim().toLowerCase()))
  const typeCard = (item: (typeof templates)[number]) => { const selected = template === item.name; return <button key={item.name} type="button" role="radio" aria-checked={selected} onClick={() => changeTemplate(item.name)} className={`min-w-40 rounded-xl border bg-white px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${selected ? "border-slate-600" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"}`}><span className="block text-sm font-semibold">{item.name}</span></button> }
  return <div className="space-y-4">
    <Card className="gap-0 rounded-xl p-5 shadow-none" aria-labelledby="ai-chapter-title">
      <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700"><Film size={20} /></span><div><h3 id="ai-chapter-title" className="text-lg font-semibold">AI Chapter</h3><p className="mt-1 text-sm leading-5 text-slate-500">Choose a template and refine the categories AI uses to analyze your videos.</p></div></div>
      <label id="analysis-template" className="mt-5 mb-2 block text-sm font-medium">Video Template</label>
      {!showAllTypes ? <div className="relative"><div ref={typeScroller} className="-mx-2 flex gap-2 overflow-x-auto px-2 pt-2 pr-16 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div role="radiogroup" aria-labelledby="analysis-template" className="flex gap-2">{visibleTypes.map(typeCard)}</div>{templates.length > 5 && <button type="button" onClick={() => setShowAllTypes(true)} className="flex min-w-32 items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-400 hover:bg-slate-50">View all ({templates.length})<ChevronDown size={14} /></button>}</div><button type="button" aria-label="Scroll video templates right" onClick={() => typeScroller.current?.scrollBy({ left: 240, behavior: "smooth" })} className="absolute top-0 right-0 bottom-2 flex w-16 items-center justify-end bg-gradient-to-r from-white/0 via-white/90 to-white pr-2 text-slate-800"><ChevronRight size={28} strokeWidth={2.25} /></button></div> : <div className="rounded-xl border bg-slate-50/50 p-3"><div className="flex items-center gap-2"><div className="relative flex-1"><Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" /><Input aria-label="Search video templates" value={typeSearch} onChange={event => setTypeSearch(event.target.value)} placeholder="Search video templates…" className="h-9 bg-white pl-9 text-sm shadow-none" /></div><Button type="button" variant="ghost" size="sm" onClick={() => { setShowAllTypes(false); setTypeSearch("") }}>Show less<ChevronUp size={14} /></Button></div><div role="radiogroup" aria-labelledby="analysis-template" className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{filteredTypes.map(typeCard)}</div>{filteredTypes.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No video templates found.</p>}</div>}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-3"><div><h4 className="text-sm font-semibold">Tag Categories ({categories.length})</h4><p className="mt-1 text-sm text-slate-500">Used to generate clip-level tags for this video template.</p></div><Button size="sm" variant="outline" onClick={() => setAdding(!adding)}><Plus size={14} />Add</Button></div>
        {adding && <form className="mt-3 flex gap-2" onSubmit={event => { event.preventDefault(); const name = draft.trim(); if (!name || categories.some(category => category.name.toLowerCase() === name.toLowerCase())) return; setCategories([{ name, tags: [], enabled: true, prompt: "" }, ...categories]); setMetadataCategories(current => [name, ...current]); setExpanded(name); setDraft(""); setAdding(false); setSaved(true) }}><Input aria-label="Category name" placeholder="Category name" value={draft} onChange={event => setDraft(event.target.value)} maxLength={40} /><Button type="submit" disabled={!draft.trim()}>Save</Button></form>}
        {saved && <p role="status" className="mt-2 text-sm text-green-700">Category saved.</p>}
        <div className="mt-4 space-y-2">{categories.map((category, index) => <div key={category.name} className={`overflow-hidden rounded-lg border transition-shadow ${expanded === category.name ? "shadow-md" : "shadow-none"}`}>
          <div className="flex items-center gap-2 bg-muted/40 px-3 py-3"><button type="button" aria-expanded={expanded === category.name} aria-controls={`category-${index}`} onClick={() => setExpanded(expanded === category.name ? "" : category.name)} className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-semibold">{category.name}<ChevronDown size={14} className={`ml-auto shrink-0 transition-transform ${expanded === category.name ? "rotate-180" : ""}`} /></button>{!templates.find(item => item.name === template)?.categories.some(item => item.name === category.name) && <Button type="button" size="icon" variant="ghost" className="size-7 text-slate-500" aria-label={`Remove ${category.name} category`} onClick={() => removeCategory(category.name)}><X size={14} /></Button>}<Checkbox checked={category.enabled} onCheckedChange={value => setCategories(categories.map((item, itemIndex) => itemIndex === index ? { ...item, enabled: value === true } : item))} aria-label={`Enable ${category.name}`} className="shrink-0" /></div>
          <div id={`category-${index}`} hidden={expanded !== category.name}><fieldset disabled={!category.enabled} className="space-y-3 border-t bg-[radial-gradient(circle_at_top_right,rgba(226,232,240,0.42)_0%,rgba(248,250,252,0.3)_22%,rgba(255,255,255,0.98)_48%)] p-3 disabled:opacity-40"><div><div className="flex items-center gap-1.5"><label htmlFor={`prompt-${index}`} className="text-sm font-medium">Prompt</label><TooltipProvider><Tooltip><TooltipTrigger asChild><button type="button" aria-label="About Prompt" className="inline-flex size-5 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 focus-visible:outline-2"><Info size={14} /></button></TooltipTrigger><TooltipContent className="max-w-80 text-sm leading-relaxed">A natural language instruction that tells the model what to analyze or generate about the video or images. Be specific about the format and content you need.</TooltipContent></Tooltip></TooltipProvider></div><Textarea id={`prompt-${index}`} key={`${template}-${category.name}`} rows={4} className="mt-2 min-h-28 resize-y text-sm" defaultValue={category.prompt} placeholder="Describe what AI should identify…" /></div><FocusTags key={`${template}-${category.name}`} defaults={category.tags} /><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked aria-label={`Allow new tags for ${category.name}`} />Allow new tags</label></fieldset></div>
        </div>)}</div>
      </div>
    </Card>

    <Card className="gap-0 rounded-xl p-5 shadow-none" aria-labelledby="metadata-title">
      <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700"><FileText size={20} /></span><div><h3 id="metadata-title" className="text-lg font-semibold">AI Metadata</h3><p className="mt-1 text-sm leading-5 text-slate-500">Generate tags and a description for the full video.</p></div></div>
      <div className="mt-5 border-t pt-4"><div className="flex items-center justify-between gap-3"><div><h4 className="text-sm font-semibold">Description</h4><p className="mt-1 text-sm text-slate-500">Enter a description or let AI generate one.</p></div><div className="flex rounded-lg bg-slate-100 p-1"><button type="button" aria-pressed={descriptionMode === "manual"} onClick={() => setDescriptionMode("manual")} className={`rounded-md px-3 py-1.5 text-xs font-medium ${descriptionMode === "manual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Enter manually</button><button type="button" aria-pressed={descriptionMode === "ai"} onClick={() => setDescriptionMode("ai")} className={`rounded-md px-3 py-1.5 text-xs font-medium ${descriptionMode === "ai" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Generate with AI</button></div></div>{descriptionMode === "manual" ? <Textarea rows={4} className="mt-3 min-h-24 resize-y text-sm" placeholder="Enter a description for this video…" /> : <div className="mt-3 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600"><Sparkles size={16} className="mt-0.5 shrink-0" /><p>AI will generate a description from the video and selected Tag Categories.</p></div>}</div>
      <div className="mt-5 border-t pt-4"><h4 className="text-sm font-semibold">Video-level tags</h4><p className="mt-1 text-sm text-slate-500">Select the Tag Categories AI should use for the full video.</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{categories.map(category => { const checked = metadataCategories.includes(category.name); return <label key={category.name} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${!category.enabled ? "opacity-40" : ""}`}>{category.name}<Checkbox checked={checked} disabled={!category.enabled} onCheckedChange={value => setMetadataCategories(current => value ? [...current, category.name] : current.filter(name => name !== category.name))} aria-label={`Use ${category.name} for video-level tags`} className="ml-auto" /></label> })}</div></div>
    </Card>
  </div>
}
export default function AddVideo({ onBack, title = "Add Content" }: { onBack: () => void; title?: string }) {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState("")
  const [language, setLanguage] = useState("auto")
  const [dragging, setDragging] = useState(false)
  const [review, setReview] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [uploadSource, setUploadSource] = useState<"local" | "assets">("local")
  const [selectedAsset, setSelectedAsset] = useState("")
  const input = useRef<HTMLInputElement>(null)
  const files = (list: FileList | File[]) => {
    const incoming = Array.from(list)
    const valid = incoming.filter(file => file.type.startsWith("video/") || /\.(mp4|mov|m4v|webm|mkv)$/i.test(file.name))
    if (!valid.length) { setError("Choose a supported video file."); return }
    const file = valid[0]
    setError(incoming.length > 1 ? "Only one video can be selected at a time. The first supported file was added." : "")
    setItems([{ id: crypto.randomUUID(), name: file.name, source: `Local file · ${(file.size / 1024 / 1024).toFixed(1)} MB`, key: `${file.name}:${file.size}:${file.lastModified}` }])
    setPickerOpen(false)
    setReview(false)
  }
  const addAssets = () => {
    const video = videos.find(item => item.id === selectedAsset)
    if (!video) return
    setItems([{ id: crypto.randomUUID(), name: video.title, source: `Video Assets · ${video.id} · ${video.duration}`, key: `asset:${video.id}` }])
    setSelectedAsset("")
    setPickerOpen(false)
    setReview(false)
  }
  return <div className="mx-auto max-w-[1200px] pb-5">
    {title !== "AI Analyze" && <button onClick={onBack} className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"><ArrowLeft size={14} />Back to Video Assets</button>}
    <div className="mb-7 flex flex-wrap items-start gap-3"><div><h1 className="text-3xl font-semibold tracking-tight">{title}</h1><p className="mt-2 text-base text-slate-500">Bring your videos in. Let AI handle the details.</p></div></div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(400px,1.15fr)]">
      <div className="space-y-5 xl:sticky xl:top-6">
        <Card className="gap-0 rounded-xl p-6 shadow-none">
          <h2 className="text-lg font-semibold">Upload File</h2>
          <div role="button" tabIndex={0} aria-label="Choose a video" onClick={() => { setUploadSource("local"); setPickerOpen(true) }} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setUploadSource("local"); setPickerOpen(true) } }} onDragOver={event => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); files(event.dataTransfer.files) }} className={`group mt-5 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-8 text-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50/40 hover:border-slate-400 hover:bg-slate-50"}`}>
            <Upload size={24} strokeWidth={1.5} className="text-slate-400 transition-colors group-hover:text-slate-600" />
            <h3 className="mt-4 text-sm font-medium">Drop a video here or click to browse</h3>
            <p className="mt-2 text-xs text-slate-400">Local file or Video Assets · MP4, MOV, M4V, WebM, MKV</p>
          </div>
          <input ref={input} type="file" accept="video/*,.mkv" className="sr-only" aria-label="Choose a local video file" onChange={event => { if (event.target.files) files(event.target.files); event.target.value = "" }} />
          <Dialog.Root open={pickerOpen} onOpenChange={setPickerOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" />
              <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[86vh] w-[min(960px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl focus:outline-none">
                <div className="flex items-start justify-between border-b px-6 py-5"><div><Dialog.Title className="text-xl font-semibold">Choose a video</Dialog.Title><Dialog.Description className="mt-1 text-sm text-slate-500">Upload from your computer or select an existing Video Asset.</Dialog.Description></div><Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close video picker"><X size={18} /></Button></Dialog.Close></div>
                <div role="tablist" aria-label="Video source" className="mx-6 mt-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1"><button type="button" role="tab" aria-selected={uploadSource === "local"} onClick={() => setUploadSource("local")} className={`flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${uploadSource === "local" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}><Upload size={15} />From Local</button><button type="button" role="tab" aria-selected={uploadSource === "assets"} onClick={() => setUploadSource("assets")} className={`flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${uploadSource === "assets" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}><Film size={15} />From Assets</button></div>
                <div className="min-h-0 flex-1 overflow-y-auto p-6">{uploadSource === "local" ? <div role="tabpanel" aria-label="From Local" onDragOver={event => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); files(event.dataTransfer.files) }} className={`flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-colors ${dragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50/50"}`}><div className="mb-4 flex size-14 items-center justify-center rounded-2xl border bg-white shadow-sm"><Upload size={23} strokeWidth={1.5} className="text-slate-600" /></div><h3 className="font-medium">Drag & drop a video here</h3><p className="mt-2 text-sm text-slate-500">Choose one video from your computer.</p><Button type="button" variant="outline" className="mt-5 bg-white" onClick={() => input.current?.click()}><Plus size={14} />Browse files</Button><p className="mt-4 text-xs text-slate-400">MP4, MOV, M4V, WebM, MKV · One video at a time</p></div> : <div role="tabpanel" aria-label="From Assets" className="grid gap-3 sm:grid-cols-2">{videos.map(video => { const selected = selectedAsset === video.id; return <label key={video.id} className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${selected ? "border-slate-900 bg-slate-50" : "hover:bg-slate-50"}`}><input type="radio" name="video-asset" checked={selected} onChange={() => setSelectedAsset(video.id)} className="size-4 shrink-0 accent-slate-900" aria-label={`Select ${video.title}`} /><span role="img" aria-label={`${video.title} thumbnail`} className={`video-thumb thumb-${video.color} relative aspect-video w-28 shrink-0 overflow-hidden rounded-md`} style={video.poster ? { backgroundImage: `url(${import.meta.env.BASE_URL}${video.poster})`, backgroundSize: "cover", backgroundPosition: "center" } : video.id === "TELA-6825" ? { backgroundImage: `url(${gourmetThumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}><span className="absolute right-1 bottom-1 rounded bg-slate-950/75 px-1 py-0.5 text-[10px] leading-none text-white">{video.duration}</span></span><span className="min-w-0"><span className="block truncate text-sm font-medium">{video.title}</span><span className="mt-1 block text-xs text-slate-500">{video.id} · {video.type}</span></span></label> })}</div>}</div>
                <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4"><p className="text-sm text-slate-500">{uploadSource === "assets" ? selectedAsset ? "1 video selected" : "Select one video" : "Choose one local video"}</p><div className="flex gap-2"><Dialog.Close asChild><Button variant="ghost">Cancel</Button></Dialog.Close>{uploadSource === "assets" && <Button disabled={!selectedAsset} onClick={addAssets}>Add video</Button>}</div></div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
          <div className="mt-6 flex items-center justify-between border-t pt-5"><h3 className="text-sm font-medium">Selected video <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-slate-500">{items.length}</span></h3></div>
          {items.length ? <ul className="mt-3 max-h-64 overflow-auto divide-y">{items.map(item => <li key={item.id} className="flex items-center gap-3 py-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Film size={18} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.name}</p><p className="mt-1 text-sm text-slate-400">{item.source}</p></div><button aria-label={`Remove ${item.name}`} onClick={() => { setItems(items.filter(v => v.id !== item.id)); setReview(false) }} className="p-2 text-slate-400 hover:text-slate-900"><X size={14} /></button></li>)}</ul> : <p className="py-7 text-center text-sm text-slate-400">Your selected videos will appear here.</p>}
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="gap-0 rounded-xl p-5 shadow-none"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700"><Languages size={20} /></span><div><h2 className="text-lg font-semibold">Subtitle</h2><p className="mt-1 text-sm leading-5 text-slate-500">Choose the video's spoken language to improve AI analysis accuracy.</p></div></div><div className="mt-4"><label className="mb-2 block text-sm font-medium">Input language</label><Select value={language} onValueChange={setLanguage}><SelectTrigger aria-label="Input language" className="!h-10 w-full px-3 text-sm shadow-none [&>svg]:!size-4"><SelectValue /></SelectTrigger><SelectContent position="popper" align="start" className="min-w-[var(--radix-select-trigger-width)]">{[["auto", "Auto"], ["ja", "Japanese"], ["en", "English"], ["zh", "Chinese"], ["ko", "Korean"], ["es", "Spanish"]].map(([value, label]) => <SelectItem className="py-1.5 text-sm" key={value} value={value}>{label}</SelectItem>)}</SelectContent></Select></div></Card>
        <Analysis />
      </div>
    </div>
    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white px-5 py-4"><div><p className="text-sm font-medium">{items.length} {items.length === 1 ? "video" : "videos"} selected</p><p className="mt-1 text-sm text-slate-400">Set up once, apply to every video. You can review and refine AI results after processing.</p></div><div className="flex gap-3"><Button variant="ghost" onClick={onBack}>Cancel</Button><Button disabled={!items.length} onClick={() => setReview(true)}><Sparkles size={16} />AI Generate</Button></div></div>
    {review && <div role="status" className="mt-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-5 text-base text-blue-900"><Check size={18} className="shrink-0" /><div><p className="font-medium">Your batch is ready for review</p><p className="mt-1 text-sm">{items.length} videos selected. This preview stops before upload; no files or links have been sent for processing.</p></div></div>}
  </div>
}
