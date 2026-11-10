import { useState } from "react"
import { Info, Plus, Save, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { readTemplates, saveTemplates, type AnalysisTemplate } from "./template-settings"

export default function TemplateSettings() {
  const [templates, setTemplates] = useState<AnalysisTemplate[]>(readTemplates)
  const [selected, setSelected] = useState(0)
  const [templateDraft, setTemplateDraft] = useState("")
  const [categoryDraft, setCategoryDraft] = useState("")
  const [tagDrafts, setTagDrafts] = useState<Record<number, string>>({})
  const [saved, setSaved] = useState(false)
  const update = (next: AnalysisTemplate[]) => { setTemplates(next); setSaved(false) }
  const current = templates[selected]
  const changeCurrent = (next: AnalysisTemplate) => update(templates.map((item, index) => index === selected ? next : item))
  const addTemplate = () => {
    const name = templateDraft.trim()
    if (!name || templates.some(item => item.name.toLowerCase() === name.toLowerCase())) return
    update([...templates, { name, categories: [] }]); setSelected(templates.length); setTemplateDraft("")
  }
  const addCategory = () => {
    const name = categoryDraft.trim()
    if (!name || current.categories.some(item => item.name.toLowerCase() === name.toLowerCase())) return
    changeCurrent({ ...current, categories: [...current.categories, { name, tags: [], enabled: true, prompt: "" }] }); setCategoryDraft("")
  }
  return <div className="mx-auto max-w-[1100px] space-y-6 pb-8">
    <div><h1 className="text-3xl font-semibold tracking-tight">Template Setting</h1><p className="mt-2 text-sm text-muted-foreground">Manage templates and the default tag categories used on Add Content.</p></div>
    <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <Card className="gap-3 p-4"><h2 className="font-semibold">Templates</h2><div className="space-y-1">{templates.map((item, index) => <Button key={index} variant={selected === index ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setSelected(index)}>{item.name}</Button>)}</div><form className="flex gap-2" onSubmit={event => { event.preventDefault(); addTemplate() }}><Input aria-label="New template name" placeholder="New template" value={templateDraft} onChange={event => setTemplateDraft(event.target.value)} /><Button type="submit" size="icon" aria-label="Add template" disabled={!templateDraft.trim()}><Plus size={16} /></Button></form></Card>
      <Card className="gap-5 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-semibold">{current.name}</h2><p className="mt-1 text-sm text-muted-foreground">Default tag categories ({current.categories.length})</p></div><Button onClick={() => { saveTemplates(templates); setSaved(true) }}><Save size={16} />Save</Button></div>
        <form className="flex gap-2" onSubmit={event => { event.preventDefault(); addCategory() }}><Input aria-label="New category name" placeholder="New tag category" value={categoryDraft} onChange={event => setCategoryDraft(event.target.value)} /><Button type="submit" variant="outline" disabled={!categoryDraft.trim()}><Plus size={16} />Add Category</Button></form>
        <div className="space-y-4">{current.categories.map((category, index) => <div key={index} className="rounded-lg border p-4"><div className="flex items-center gap-2"><Input aria-label={`Category ${index + 1} name`} value={category.name} onChange={event => changeCurrent({ ...current, categories: current.categories.map((item, i) => i === index ? { ...item, name: event.target.value } : item) })} /><Button size="icon" variant="ghost" aria-label={`Remove ${category.name} category`} onClick={() => changeCurrent({ ...current, categories: current.categories.filter((_, i) => i !== index) })}><Trash2 size={16} /></Button></div><div className="mt-4"><div className="flex items-center gap-1.5"><label htmlFor={`template-prompt-${index}`} className="text-sm font-medium">Prompt</label><TooltipProvider><Tooltip><TooltipTrigger asChild><button type="button" aria-label="About Prompt" className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground focus-visible:outline-2"><Info size={14} /></button></TooltipTrigger><TooltipContent className="max-w-80 text-sm leading-relaxed">A natural language instruction that tells the model what to analyze or generate about the video or images. Be specific about the format and content you need.</TooltipContent></Tooltip></TooltipProvider></div><Textarea id={`template-prompt-${index}`} rows={4} className="mt-2 min-h-28 resize-y" placeholder="Describe what AI should identify…" value={category.prompt} onChange={event => changeCurrent({ ...current, categories: current.categories.map((item, i) => i === index ? { ...item, prompt: event.target.value } : item) })} /></div><div className="mt-3 flex flex-wrap gap-2">{category.tags.map(tag => <Badge key={tag} variant="outline" className="!h-auto min-h-8 gap-2 px-3 py-1.5 text-sm">{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => changeCurrent({ ...current, categories: current.categories.map((item, i) => i === index ? { ...item, tags: item.tags.filter(value => value !== tag) } : item) })}><X size={12} /></button></Badge>)}</div><form className="mt-3 flex gap-2" onSubmit={event => { event.preventDefault(); const tag = (tagDrafts[index] || "").trim(); if (!tag || category.tags.some(item => item.toLowerCase() === tag.toLowerCase())) return; changeCurrent({ ...current, categories: current.categories.map((item, i) => i === index ? { ...item, tags: [...item.tags, tag] } : item) }); setTagDrafts({ ...tagDrafts, [index]: "" }) }}><Input aria-label={`Add tag to ${category.name}`} placeholder="Add default tag" value={tagDrafts[index] || ""} onChange={event => setTagDrafts({ ...tagDrafts, [index]: event.target.value })} /><Button type="submit" size="sm" variant="outline" disabled={!tagDrafts[index]?.trim()}>Add Tag</Button></form></div>)}</div>
        {saved && <p role="status" className="text-sm text-green-700">Template settings saved.</p>}
      </Card>
    </div>
  </div>
}
