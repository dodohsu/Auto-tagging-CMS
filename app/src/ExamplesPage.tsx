import { ArrowUpRight, Clapperboard, Drama, Search, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Example = {
  number: string
  title: string
  description: string
  technologies: string[]
  exploratory?: boolean
}

const groups: { id: string; label: string; intro: string; icon: typeof Clapperboard; examples: Example[] }[] = [
  {
    id: "chapter",
    label: "AI Chapter",
    intro: "從影片內容辨識人物、情境與重要時刻，快速定位可編輯的章節與片段。",
    icon: Clapperboard,
    examples: [
      { number: "01", title: "Actor Discovery", description: "人物辨識與影片定位：從角色出場與互動片段，快速找到相關時間點。", technologies: ["Video temporal localization", "video captioning"] },
      { number: "02", title: "Comedy Highlight", description: "語意理解與精彩片段切分：整理笑點、對話與情境轉折，供精華選段討論。", technologies: ["event detection", "dense video captioning", "video summarization"] },
      { number: "03", title: "Mood & Genre", description: "情緒理解與內容分類：辨識片段氛圍與類型，檢視章節標籤是否貼合內容。", technologies: ["video captioning", "video summarization", "video chapter generation"] },
      { number: "04", title: "AI Action & Skill Detection", description: "動畫戰鬥招式辨識的探索提案；運動賽事版本與辨識可行性仍待評估。", technologies: ["action recognition and localization", "event detection", "Video temporal localization"], exploratory: true },
    ],
  },
  {
    id: "genre",
    label: "AI Genre",
    intro: "以下是類型標籤的候選情境，供討論分類規則與人工校正流程。",
    icon: Drama,
    examples: [
      { number: "01", title: "Genre Mapping", description: "從影片內容提出主要類型建議，讓編輯確認分類依據。", technologies: ["video captioning", "video summarization"], exploratory: true },
      { number: "02", title: "Hybrid Genre", description: "檢視同時具有美食、旅行與劇情元素的內容，討論多類型標記方式。", technologies: ["dense video captioning", "video summarization"], exploratory: true },
    ],
  },
  {
    id: "search",
    label: "AI Search",
    intro: "以下是搜尋入口的候選情境，供討論觀眾問題與內容資料如何對應。",
    icon: Search,
    examples: [
      { number: "01", title: "Natural Language Discovery", description: "以自然語言描述想看的內容，檢查推薦結果與命中理由。", technologies: ["video captioning", "video summarization"], exploratory: true },
      { number: "02", title: "Scene Search", description: "用情境或記得的片段尋找內容，檢視搜尋結果能否定位到相關章節。", technologies: ["dense video captioning", "Video temporal localization"], exploratory: true },
    ],
  },
]

export default function ExamplesPage({ tab, onTabChange, onOpenDetail }: { tab: string; onTabChange: (tab: string) => void; onOpenDetail: (exampleId: string) => void }) {
  return <section className="space-y-7">
    <div className="max-w-3xl space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground"><Sparkles className="size-3.5" /> Curated examples</div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Examples</h1>
      <p className="text-sm leading-7 text-muted-foreground sm:text-base">挑選情境查看示意內頁。Actor Discovery 共用 Content detail 版型，Comedy Highlight 使用 M-1 影片專屬分析頁；其餘卡片暫連到《孤独のグルメ SP》。技術標籤代表規劃方向，並非已實作能力。</p>
    </div>
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList aria-label="Examples 類別" className="h-auto w-full justify-start overflow-x-auto bg-transparent p-0 sm:w-auto">
        {groups.map(group => <TabsTrigger key={group.id} value={group.id} className="h-10 flex-none rounded-none border-b-2 border-transparent px-4 shadow-none data-[state=active]:border-primary">{group.label}</TabsTrigger>)}
      </TabsList>
      {groups.map(group => <TabsContent key={group.id} value={group.id} className="pt-5">
        <div className="mb-5 flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><group.icon className="size-5" /></span><div><h2 className="text-lg font-semibold">{group.label}</h2><p className="mt-1 text-sm text-muted-foreground">{group.intro}</p></div></div>
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {group.examples.map(example => <Card key={example.number} className="group gap-0 overflow-hidden rounded-3xl border bg-background py-0 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.02]">
            <CardContent className="p-0"><button type="button" onClick={() => onOpenDetail(`${group.id}/${example.number}`)} className="flex min-h-[260px] w-full flex-col p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:p-7" aria-label={`${group.label} ${example.number} ${example.title}，${group.id === "chapter" && example.number === "01" ? "開啟 Actor Discovery 示意內頁" : group.id === "chapter" && example.number === "02" ? "開啟 Comedy Highlight 示意內頁" : "開啟孤独のグルメ SP 詳情頁"}`}>
              <div className="flex w-full items-start justify-between gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-sm font-semibold text-amber-900">{example.number}</span><ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" /></div>
              <div className="mt-7"><h3 className="text-xl font-semibold tracking-tight">{example.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{example.description}</p></div>
              <div className="mt-auto w-full pt-7"><p className="mb-2 text-[11px] font-medium text-muted-foreground">預計使用技術</p><div className="flex flex-wrap gap-2">{example.technologies.map(technology => <Badge key={technology} variant="outline" className="rounded-md border-primary/20 bg-primary/5 font-normal text-foreground">{technology}</Badge>)}{example.exploratory && <Badge variant="secondary" className="rounded-md font-normal">探索提案</Badge>}</div></div>
            </button></CardContent>
          </Card>)}
        </div>
      </TabsContent>)}
    </Tabs>
  </section>
}
