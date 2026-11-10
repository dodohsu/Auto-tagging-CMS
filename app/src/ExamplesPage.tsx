import { ArrowUpRight, Clapperboard, Laugh, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { readTemplates } from "./template-settings"

export default function ExamplesPage({ onOpenDetail }: { onOpenDetail: (exampleId: string) => void }) {
  const templates = readTemplates()
  const examples = [
    { name: "Concert", description: "Explore concert clips with mood, topic, title, performance type, and music genre tags.", icon: Clapperboard, detail: null },
    { name: "Comedy Show", description: "Review comedy highlights and the moments that make each scene stand out.", icon: Laugh, detail: "chapter/02" },
  ]
  return <section className="space-y-7">
    <div className="max-w-3xl space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"><Sparkles className="size-3.5" /> Curated examples</div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Examples</h1>
      <p className="text-sm leading-7 text-muted-foreground sm:text-base">Explore example scenarios and their default tag categories.</p>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {examples.map(example => {
        const Icon = example.icon
        const categories = templates.find(template => template.name === example.name)?.categories.map(category => category.name) ?? []
        return <Card key={example.name} className="gap-0 overflow-hidden rounded-3xl border bg-background py-0 shadow-sm">
          <CardContent className="flex min-h-[260px] flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><Icon className="size-5" /></span>{example.detail && <ArrowUpRight className="size-5 text-muted-foreground" aria-hidden="true" />}</div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">{example.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{example.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{categories.map(category => <Badge key={category} variant="outline" className="!h-auto px-3 py-1.5 text-sm">{category}</Badge>)}</div>
            {example.detail && <button type="button" onClick={() => onOpenDetail(example.detail!)} className="mt-6 inline-flex items-center gap-1 self-start text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2">Open example <ArrowUpRight className="size-4" /></button>}
          </CardContent>
        </Card>
      })}
    </div>
  </section>
}
