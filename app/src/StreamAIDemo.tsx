import * as React from "react"
import AddVideo, { type AnalyzeVideoItem } from "./AddVideo"
import VideoPickerDialog from "./VideoPickerDialog"
import TemplateSettings from "./TemplateSettings"
import { readTemplates } from "./template-settings"
import AIChapter from "./AIChapter"
import ConcertChapter from "./ConcertChapter"
import RealityChapter from "./RealityChapter"
import { realityClips } from "./reality-clips"
import AISearchMVP from "./AISearchMVP"
import ExamplesPage from "./ExamplesPage"
import ComedyHighlightDetail from "./ComedyHighlightDetail"
import ActorDiscoveryContent from "./ActorDiscoveryContent"
import { readAssistantRegistry } from "./assistant-registry"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CheckCircle2,
  Clapperboard,
  FileText,
  Heart,
  LayoutGrid,
  LoaderCircle,
  Plus,
  Pencil,
  RefreshCw,
  Search,
  Smile,
  Sparkles,
  Settings2,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { videos, type AnalysisStatus, type Video } from "@/mock-data/videos"
import gourmetThumbnail from "@/assets/gourmet-solitary-thumbnail.png"
import { translate, translateTag, type Locale } from "@/i18n"
import { useSiteMachineTranslation } from "@/use-site-machine-translation"

type Page = "home" | "video" | "library" | "search" | "examples" | "actor" | "comedy" | "detail" | "add-video" | "ai-analyze" | "template-settings"
const labels: Record<Page, string> = {
  "add-video": "Add Content",
  "ai-analyze": "AI Analyze",
  "template-settings": "Template Setting",
  home: "Home",
  video: "Video Assets",
  library: "Library",
  search: "AI Chatbot",
  examples: "Examples",
  actor: "Actor Discovery",
  comedy: "Comedy Highlight",
  detail: "AI Metadata",
}
const nav = [
  { page: "video" as const, icon: Clapperboard },
  { page: "ai-analyze" as const, icon: Sparkles },
  { page: "examples" as const, icon: LayoutGrid },
  { page: "template-settings" as const, icon: Settings2 },
]
const discoverySections = [
  { id: "list", label: "All Chatbot" },
  { id: "settings", label: "Settings" },
  { id: "personalization", label: "Personalization" },
  { id: "content", label: "Searchable Content" },
  { id: "playground", label: "Playground" },
  { id: "conversations", label: "Conversations" },
  { id: "analytics", label: "Analytics" },
] as const
function demoFromHash() {
  const parts = window.location.hash.slice(1).split("/")
  return parts.length >= 3 ? parts[1] : null
}
function sectionFromHash() {
  const parts = window.location.hash.slice(1).split("/")
  const section = parts.length >= 3 ? parts[2] : "list"
  return discoverySections.some(item => item.id === section) ? section : "list"
}
const types = [...new Set(videos.map((video) => video.type))]
const statuses: AnalysisStatus[] = [
  "Uploading",
  "Analyzing",
  "Failed",
  "Completed",
]

function pageFromHash(): Page {
  const hash = window.location.hash.slice(1)
  if (hash === "add-video") return "add-video"
  if (hash === "ai-analyze") return "ai-analyze"
  if (hash === "template-settings") return "template-settings"
  if (hash === "search" || hash.startsWith("search/")) return "search"
  if (hash === "examples") return "examples"
  if (hash === "example/actor-discovery") return "actor"
  if (hash === "example/comedy-highlight") return "comedy"
  if (hash.startsWith("detail")) return "detail"
  if (
    hash === "home" ||
    hash === "video" ||
    hash === "library" ||
    hash === "search"
  )
    return hash
  return "video"
}
function detailTabFromHash(): "AI Chapter" | "AI Metadata" {
  return window.location.hash.endsWith("/ai-metadata") ? "AI Metadata" : "AI Chapter"
}

function StatusBadge({ status, locale = "en" }: { status: AnalysisStatus; locale?: Locale }) {
  const color = {
    Uploading: "bg-amber-50 text-amber-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Analyzing: "bg-blue-50 text-blue-700",
    Failed: "bg-red-50 text-red-700",
  }[status]
  return (
    <Badge
      variant="secondary"
      className={`gap-1.5 rounded-md border-0 ${color}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {translate(locale, status)}
    </Badge>
  )
}

function VideoThumbnail({
  video,
  large = false,
  className = "",
}: {
  video: Video
  large?: boolean
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`${video.title} thumbnail`}
      className={`video-thumb thumb-${video.color} relative shrink-0 overflow-hidden rounded-md ${large ? "w-full" : "w-20 sm:w-24"} ${className}`}
      style={video.poster ? { backgroundImage: `url(${import.meta.env.BASE_URL}${video.poster})`, backgroundSize: "cover", backgroundPosition: "center" } : video.id === "TELA-6825" ? { backgroundImage: `url(${gourmetThumbnail})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <span className="absolute right-1 bottom-1 rounded bg-slate-950/75 px-1 py-0.5 text-[10px] leading-none text-white tabular-nums">
        {video.duration}
      </span>
    </div>
  )
}

type MetadataGroup = {
  label: string
  description: string
  icon: typeof Heart
  choices: { label: string; confidence?: string; selected?: boolean; occurrences?: number }[]
}
const metadataGroups: MetadataGroup[] = [
  {
    label: "Genre",
    description: "Main genre and content category of the video.",
    icon: Heart,
    choices: [
      { label: "邦画", selected: true },
      { label: "国内ドラマ", selected: true },
      { label: "洋画" },
      { label: "海外・アジアドラマ" },
      { label: "アニメ" },
      { label: "キッズ・特撮" },
    ],
  },
  {
    label: "Theme",
    description: "Main themes and subject matters of the video.",
    icon: FileText,
    choices: [
      { label: "美食文化", confidence: "96%", selected: true },
      { label: "在地探索", confidence: "88%", selected: true },
      { label: "人情味", confidence: "58%" },
      { label: "單人旅程", confidence: "54%" },
      { label: "職人精神", confidence: "48%" },
      { label: "日常生活", confidence: "42%" },
    ],
  },
  {
    label: "Mood",
    description: "Emotional atmosphere conveyed in the video.",
    icon: Smile,
    choices: [
      { label: "療癒", confidence: "93%", selected: true },
      { label: "溫暖", confidence: "87%", selected: true },
      { label: "放鬆", confidence: "68%" },
      { label: "滿足", confidence: "66%" },
      { label: "懷舊", confidence: "40%" },
      { label: "感動", confidence: "36%" },
    ],
  },
  {
    label: "Style",
    description: "Visual style and filming techniques.",
    icon: Sparkles,
    choices: [
      { label: "寫實", confidence: "92%", selected: true },
      { label: "生活感", confidence: "86%", selected: true },
      { label: "公路旅行", confidence: "58%" },
      { label: "旁白敘述", confidence: "52%" },
      { label: "幽默", confidence: "36%" },
      { label: "美食特寫", confidence: "34%" },
    ],
  },
  {
    label: "Audience",
    description: "Target audience segments for the video.",
    icon: Users,
    choices: [
      { label: "美食愛好者", confidence: "96%", selected: true },
      { label: "一般大眾", confidence: "84%", selected: true },
      { label: "中高年齡", confidence: "56%" },
      { label: "男性", confidence: "52%" },
      { label: "海外觀眾", confidence: "45%" },
      { label: "家庭觀眾", confidence: "38%" },
    ],
  },
]

const templateCategoryIcons: Record<string, typeof Heart> = {
  Mood: Smile,
  Topic: FileText,
  Title: Clapperboard,
  "Highlight Type": Sparkles,
  "Performance Type": Sparkles,
  "Music Genre": Heart,
  "Event Type": Clapperboard,
}
function metadataGroupsFor(video: Video): MetadataGroup[] {
  if (video.id === "TELA-6825") return metadataGroups
  const template = readTemplates().find(item => item.name === video.title)
  return template?.categories.filter(category => category.enabled).map(category => ({
    label: category.name,
    description: `Default tags for ${category.name.toLowerCase()} in the ${template.name} template.`,
    icon: templateCategoryIcons[category.name] ?? Sparkles,
    choices: category.tags.map(label => ({ label, ...(video.id === "TRV-1129" ? { occurrences: realityClips.filter(clip => clip.tags.some(tag => tag.category === category.name && tag.label === label)).length } : {}) })),
  })) ?? []
}

function MetadataGroupCard({ group, locale = "en" }: { group: MetadataGroup; locale?: Locale }) {
  const Icon = group.icon
  const visibleTags = group.choices.map((choice, index) => ({ ...choice, occurrences: choice.occurrences ?? (choice.selected ? Math.max(3, 7 - index) : choice.confidence && Number.parseInt(choice.confidence) >= 60 ? 3 : index < 3 ? 5 - index : 2) })).filter(choice => choice.occurrences >= 3)
  return (
    <Card className="gap-0 py-0 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center gap-2"><Icon className="size-4 text-muted-foreground" aria-hidden="true" /><h3 className="text-sm font-semibold">{group.label}</h3><span className="ml-auto text-xs text-muted-foreground">{visibleTags.length} tags</span></div>
        <div className="mt-3 flex flex-wrap gap-2">{visibleTags.map(choice => <span key={choice.label} title={`Appears in ${choice.occurrences} AI Chapter clips`} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-foreground"><span>{translateTag(locale, choice.label)}</span><span className="text-[10px] text-muted-foreground">{choice.occurrences}</span></span>)}</div>
        {!visibleTags.length && <p className="mt-3 text-xs text-muted-foreground">No tags appear in three or more AI Chapter clips.</p>}
      </CardContent>
    </Card>
  )
}

function ContentDetailTemplate({ video, onBack, backLabel = "Video Assets", initialTab = "AI Chapter", chapterContent, locale = "en" }: { video: Video; onBack: () => void; backLabel?: string; initialTab?: "AI Metadata" | "AI Chapter"; chapterContent?: React.ReactNode; locale?: Locale }) {
  const [activeTab, setActiveTab] = React.useState<string>(initialTab)
  const [assetName, setAssetName] = React.useState(() => {
    const stored = localStorage.getItem(`kk-lab-asset-name-${video.id}`)
    return video.id === "TRV-1129" && stored === "Reality Show" ? "Variety Show" : stored || video.title
  })
  const [nameSaved, setNameSaved] = React.useState(false)
  const [analysisName] = React.useState(() => {
    const timestamp = new Intl.DateTimeFormat("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date())
    return `AI Analysis_V1 · ${timestamp}`
  })
  const tabs = ["AI Chapter", "AI Metadata"]
  const videoMetadataGroups = metadataGroupsFor(video)
  const [showStickyHeader, setShowStickyHeader] = React.useState(false)
  const detailHeader = React.useRef<HTMLDivElement>(null)
  const t = (text: string) => translate(locale, text)
  const changeTab = (tab: string) => {
    setActiveTab(tab)
    if (backLabel === "Video Assets") window.history.pushState(null, "", `#detail/${video.id}/${tab === "AI Chapter" ? "ai-chapter" : "ai-metadata"}`)
  }
  const saveAssetName = () => {
    const nextName = assetName.trim() || video.title
    setAssetName(nextName)
    localStorage.setItem(`kk-lab-asset-name-${video.id}`, nextName)
    setNameSaved(true)
    window.setTimeout(() => setNameSaved(false), 1500)
  }
  React.useEffect(() => {
    if (backLabel !== "Video Assets") return
    const syncTab = () => setActiveTab(window.location.hash.endsWith("/ai-metadata") ? "AI Metadata" : "AI Chapter")
    window.addEventListener("popstate", syncTab)
    window.addEventListener("hashchange", syncTab)
    return () => { window.removeEventListener("popstate", syncTab); window.removeEventListener("hashchange", syncTab) }
  }, [backLabel])
  React.useEffect(() => {
    const target = detailHeader.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setShowStickyHeader(!entry.isIntersecting))
    observer.observe(target)
    return () => observer.disconnect()
  }, [])
  return (
    <div>
      <section className="-mx-4 -mt-7 border-b bg-white px-4 pt-4 pb-4 sm:-mx-7 sm:px-7">
      <div ref={detailHeader} className="flex flex-wrap items-stretch gap-5 py-3 xl:flex-nowrap">
        <div className="flex min-w-0 shrink-0 items-center gap-4">
          <VideoThumbnail video={video} className="w-36 sm:w-40" />
          <div className="min-w-0 space-y-2"><div className="flex items-center gap-2"><Input value={assetName} onChange={event => { setAssetName(event.target.value); setNameSaved(false) }} onBlur={saveAssetName} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur() }} maxLength={120} aria-label="Video Asset name" className="h-9 w-56 bg-white px-3 text-sm font-semibold shadow-none transition-colors hover:border-slate-400 sm:text-base" />{nameSaved && <span role="status" className="text-xs text-emerald-600">Saved</span>}</div><p className="text-xs text-muted-foreground">ID {video.id} · {video.type} · {video.duration}</p></div>
        </div>
        <div className="ml-auto flex shrink-0 flex-col items-end justify-center gap-2">
          <StatusBadge status={video.status} locale={locale} />
          <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="v1">
            <SelectTrigger aria-label="Select version" className="w-72">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">{analysisName}</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <RefreshCw />
            Re-analyze
          </Button>
          </div>
        </div>
      </div>
      {showStickyHeader && <div className="fixed top-0 right-0 left-0 z-40 border-b border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-md md:left-[var(--sidebar-width)]"><div className="mx-auto flex h-16 max-w-[1520px] items-center justify-between gap-3 px-4 sm:px-7"><div className="flex min-w-0 items-center gap-2"><Button variant="ghost" size="icon-sm" aria-label={`Back to ${backLabel}`} onClick={onBack}><ArrowLeft /></Button><Breadcrumb><BreadcrumbList><BreadcrumbItem><button className="text-muted-foreground hover:text-foreground" onClick={onBack}>{backLabel}</button></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{assetName}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb></div><div className="flex shrink-0 items-center gap-2"><Select defaultValue="v1"><SelectTrigger aria-label="Select version" className="w-72 bg-white/50"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="v1">{analysisName}</SelectItem></SelectContent></Select><Button><RefreshCw />Re-analyze</Button></div></div></div>}
      </section>
      <Tabs value={activeTab} onValueChange={changeTab} className="mt-3 mb-5">
        <TabsList
          aria-label="Video detail sections"
          className="h-12 w-full justify-start gap-8 rounded-none bg-transparent p-0"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="h-12 flex-none rounded-none border-b-2 border-transparent px-1 text-sm text-muted-foreground shadow-none data-[state=active]:border-[#333333] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {activeTab === "AI Metadata" ? (
        <div className="grid items-start gap-4 xl:grid-cols-[1.05fr_1fr]">
          <section aria-labelledby="content-overview-title">
            <Card className="shadow-sm">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle id="content-overview-title">{t("Content Overview")}</CardTitle>
                <Button variant="outline" size="sm">
                  <Pencil />
                  {t("Edit")}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_1.1fr]">
                  <VideoThumbnail video={video} large />
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      <Sparkles />
                      {t((video.id === "DOC-2048" || video.id === "TRV-1129") ? "Subtitle-based" : "AI Generated")}
                    </Badge>
                    <h3 className="font-semibold">{t("Synopsis")}</h3>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      {t(video.id === "TRV-1129" ? "Travis Japan revisit viewer-selected memorable quotes, name a new mascot, attempt a drawing word chain, and share announcements. This summary follows the supplied Japanese subtitles." : video.title === "Concert" ? "Performers explore the venue, prepare backstage, reflect on the audience, and sing onstage. This summary follows the supplied Japanese subtitles." : "Inogashira Goro visits various regions to enjoy their unique local cuisine. Through a personal and detailed dining journey, the show portrays the richness of local culture and the heartfelt connection to food.")}
                    </p>
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
                  <div><dt className="text-xs text-muted-foreground">Language</dt><dd className="mt-1 font-medium">Japanese</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Subtitles</dt><dd className="mt-1 font-medium">{(video.id === "DOC-2048" || video.id === "TRV-1129") ? "Japanese" : "Japanese · Traditional Chinese · English"}</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Duration</dt><dd className="mt-1 font-medium">{video.duration}</dd></div>
                  <div><dt className="text-xs text-muted-foreground">Production Year</dt><dd className="mt-1 font-medium">{video.year}</dd></div>
                </dl>
              </CardContent>
            </Card>
          </section>
          <aside aria-labelledby="tag-categories-title" className="space-y-3">
            <div className="px-1">
              <h2 id="tag-categories-title" className="font-semibold">Tag Categories</h2>
              <p className="mt-1 text-sm text-muted-foreground">Only tags found in three or more AI Chapter clips are shown.</p>
            </div>
            {videoMetadataGroups.map(group => <MetadataGroupCard key={group.label} group={group} locale={locale} />)}
            {!videoMetadataGroups.length && <Card className="p-5 text-sm text-muted-foreground shadow-none">No Tag Categories are available for this video template.</Card>}
          </aside>
        </div>
      ) : (
        chapterContent ?? (video.id === "DOC-2048" ? <ConcertChapter video={video} /> : video.id === "TRV-1129" ? <RealityChapter video={video} /> : <AIChapter key={video.id} video={video} />)
      )}
    </div>
  )
}

function Workspace() {
  const [page, setPage] = React.useState<Page>(pageFromHash)
  const [activeDemo, setActiveDemo] = React.useState<string | null>(demoFromHash)
  const [assistantRegistry, setAssistantRegistry] = React.useState(readAssistantRegistry)
  const [lastAssistant, setLastAssistant] = React.useState(() => demoFromHash() || readAssistantRegistry().find(a => a.status !== "Archived")?.id || "")
  const [discoverySection, setDiscoverySection] = React.useState(sectionFromHash)
  const [query, setQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [locale, setLocale] = React.useState<Locale>("en")
  const [assetPickerOpen, setAssetPickerOpen] = React.useState(false)
  const [createdAssets, setCreatedAssets] = React.useState<Video[]>([])
  const [analysisJob, setAnalysisJob] = React.useState<{ video: Video; progress: number; status: "processing" | "completed" } | null>(null)
  const [selected, setSelected] = React.useState<Video | null>(() => {
    if (pageFromHash() !== "detail") return null
    const id = window.location.hash.slice(1).split("/")[1]
    return videos.find((video) => video.id === id) ?? videos[0]
  })
  const [detailOrigin, setDetailOrigin] = React.useState<"video" | "examples">(() => window.location.hash.endsWith("/examples") ? "examples" : "video")
  const { isMobile, setOpenMobile } = useSidebar()
  const t = (text: string) => translate(locale, text)
  useSiteMachineTranslation(locale)

  React.useEffect(() => { window.scrollTo(0, 0) }, [page])

  React.useEffect(() => {
    if (!analysisJob || analysisJob.status !== "processing") return
    const timer = window.setInterval(() => setAnalysisJob(current => {
      if (!current || current.status !== "processing") return current
      const progress = Math.min(100, current.progress + 10)
      return { ...current, progress, status: progress === 100 ? "completed" : "processing" }
    }), 500)
    return () => window.clearInterval(timer)
  }, [analysisJob])

  React.useEffect(() => {
    const sync = () => { const items = readAssistantRegistry(); setAssistantRegistry(items); setLastAssistant(previous => items.some(item => item.id === previous && item.status !== "Archived") ? previous : items.find(item => item.status !== "Archived")?.id || "") }
    window.addEventListener("general-assistants-changed", sync)
    window.addEventListener("storage", sync)
    return () => { window.removeEventListener("general-assistants-changed", sync); window.removeEventListener("storage", sync) }
  }, [])

  React.useEffect(() => {
    const onHashChange = () => {
      const next = pageFromHash()
      setPage(next)
      if (next === "search") { setDiscoverySection(sectionFromHash()); setActiveDemo(demoFromHash()); if (demoFromHash()) setLastAssistant(demoFromHash()!); }
      if (next === "detail") {
        const id = window.location.hash.slice(1).split("/")[1]
        setSelected(videos.find((video) => video.id === id) ?? videos[0])
        setDetailOrigin(window.location.hash.endsWith("/examples") ? "examples" : "video")
      }
    }
    window.addEventListener("popstate", onHashChange)
    window.addEventListener("hashchange", onHashChange)
    return () => { window.removeEventListener("popstate", onHashChange); window.removeEventListener("hashchange", onHashChange) }
  }, [])

  const navigate = (next: Exclude<Page, "detail">) => {
    setPage(next)
    window.history.pushState(null, "", `#${next}`)
    if (isMobile) setOpenMobile(false)
  }
  const allVideos = [...createdAssets, ...videos].map(video => analysisJob?.video.id === video.id ? { ...video, status: analysisJob.status === "completed" ? "Completed" as const : "Analyzing" as const } : video)

  const navigateDiscovery = (section: string) => {
    if (!discoverySections.some(item => item.id === section)) return
    const target = activeDemo || lastAssistant
    const next = section !== "list" && target ? section : "list"
    if (next !== "list") setActiveDemo(target)
    setPage("search")
   
    setDiscoverySection(next)
    if (next === "list") setActiveDemo(null)
    const hash = next === "list" ? "#search" : `#search/${target}/${next}`
    if (window.location.hash !== hash) window.history.pushState(null, "", hash)
    if (isMobile) setOpenMobile(false)
  }
  const chooseDemo = (id: string | null, section = "settings") => {
    setActiveDemo(id)
    if (id) setLastAssistant(id)
    setPage("search")
   
    setDiscoverySection(id ? section : "list")
    window.history.pushState(null, "", id ? `#search/${id}/${section}` : "#search")
    if (isMobile) setOpenMobile(false)
  }

  const openDetail = (video: Video, origin: "video" | "examples" = "video") => {
    setSelected(video)
    setDetailOrigin(origin)
    setPage("detail")
    window.history.pushState(null, "", origin === "examples" ? `#detail/${video.id}/examples` : `#detail/${video.id}/ai-chapter`)
    if (isMobile) setOpenMobile(false)
  }
  const startAnalysis = (item: AnalyzeVideoItem) => {
    const assetId = item.key.startsWith("asset:") ? item.key.slice(6) : `UPL-${Date.now().toString().slice(-6)}`
    const existing = allVideos.find(video => video.id === assetId)
    const video: Video = existing ?? {
      id: assetId,
      title: item.name.replace(/\.[^.]+$/, ""),
      type: "Documentary",
      duration: "--:--",
      year: new Date().getFullYear(),
      status: "Analyzing",
      color: 2,
    }
    if (!existing) setCreatedAssets(current => [video, ...current])
    setAnalysisJob({ video, progress: 8, status: "processing" })
    navigate("video")
  }
  const openAnalyzedAsset = () => {
    if (!analysisJob) return
    const video = allVideos.find(item => item.id === analysisJob.video.id) ?? { ...analysisJob.video, status: "Completed" as const }
    setAnalysisJob(null)
    openDetail(video)
  }
  const openExample = (exampleId: string) => {
    if (exampleId === "chapter/01") {
      setPage("actor")
      window.history.pushState(null, "", "#example/actor-discovery")
      if (isMobile) setOpenMobile(false)
      return
    }
    if (exampleId === "chapter/02") {
      setPage("comedy")
      window.history.pushState(null, "", "#example/comedy-highlight")
      if (isMobile) setOpenMobile(false)
      return
    }
    openDetail(videos[0], "examples")
  }

  const filtered = allVideos.filter((video) => {
    const text = query.trim().toLocaleLowerCase()
    return (
      (!text ||
        `${video.title} ${video.id}`.toLocaleLowerCase().includes(text)) &&
      (typeFilter === "all" || typeFilter === video.type) &&
      (statusFilter === "all" || statusFilter === video.status)
    )
  })
  return (
    <>
      <Sidebar
        collapsible="offcanvas"
        className="border-r border-sidebar-border"
      >
        <SidebarHeader className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div
              className="size-9 rounded-xl bg-gradient-to-br from-neutral-500 to-neutral-800 shadow-sm"
              aria-hidden="true"
            />
            <div>
              <div className="text-base leading-tight font-semibold tracking-tight">
                KK Lab
              </div>
              <div className="text-[10px] text-muted-foreground">
                OTT Content Intelligence
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {nav.map(({ page: item, icon: Icon }) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton
                    isActive={page === item || (page === "add-video" && item === "video") || ((page === "actor" || page === "comedy") && item === "examples")}
                    onClick={() => navigate(item)}
                    aria-current={page === item ? "page" : undefined}
                    className="h-10 rounded-lg px-3"
                  >
                    <Icon aria-hidden="true" />
                    <span>{t(labels[item])}</span>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-5 pb-5 text-xs text-muted-foreground">
          <div className="border-t border-sidebar-border pt-4">
            {t("Preview mode")}
            <br />
            {t("Local mock data")}
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-slate-50/80">
        <header className="flex h-16 items-center justify-between gap-3 border-b bg-background/80 px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            {page === "detail" && selected && <><Button variant="ghost" size="icon-sm" aria-label={`Back to ${detailOrigin === "examples" ? "Examples" : "Video Assets"}`} onClick={() => navigate(detailOrigin)}><ArrowLeft /></Button><Breadcrumb><BreadcrumbList><BreadcrumbItem><button className="text-muted-foreground hover:text-foreground" onClick={() => navigate(detailOrigin)}>{t(detailOrigin === "examples" ? "Examples" : "Video Assets")}</button></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>{selected.title}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb></>}
            {page !== "detail" && <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {t((page === "actor" || page === "comedy") ? "Examples" : labels[page])}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {page === "search" && <>{activeDemo && <><BreadcrumbSeparator /><BreadcrumbItem><span>{assistantRegistry.find(a => a.id === activeDemo)?.name || activeDemo}</span></BreadcrumbItem></>}<BreadcrumbSeparator /><BreadcrumbItem><span>{discoverySections.find(item => item.id === discoverySection)?.label}</span></BreadcrumbItem></>}
                {(page === "actor" || page === "comedy") && <><BreadcrumbSeparator /><BreadcrumbItem><span>{labels[page]}</span></BreadcrumbItem></>}
                {page === "video" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <span>{t("All content")}</span>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3" aria-label="Machine translation language" data-no-translate><button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")} className={`py-1 text-xs transition-colors ${locale === "en" ? "font-semibold text-slate-900" : "text-slate-400 hover:text-slate-700"}`}>EN</button><button type="button" aria-pressed={locale === "zh"} onClick={() => setLocale("zh")} className={`py-1 text-xs transition-colors ${locale === "zh" ? "font-semibold text-slate-900" : "text-slate-400 hover:text-slate-700"}`}>中</button><button type="button" aria-pressed={locale === "ja"} onClick={() => setLocale("ja")} className={`py-1 text-xs transition-colors ${locale === "ja" ? "font-semibold text-slate-900" : "text-slate-400 hover:text-slate-700"}`}>日</button></div>
            <span className="hidden sm:inline">{t("Content team")}</span>
            <Avatar>
              <AvatarFallback>CT</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[1520px] px-4 py-7 sm:px-7">
          {page === "add-video" ? <AddVideo initialPickerOpen onBack={() => navigate("video")} locale={locale} /> : page === "ai-analyze" ? <AddVideo title="AI Analyze" onBack={() => navigate("video")} onGenerate={startAnalysis} locale={locale} /> : page === "template-settings" ? <TemplateSettings /> : page === "detail" && selected ? (
            <ContentDetailTemplate key={`content-detail-${selected.id}`} video={selected} onBack={() => navigate(detailOrigin)} backLabel={detailOrigin === "examples" ? "Examples" : "Video Assets"} initialTab={detailOrigin === "examples" ? "AI Chapter" : detailTabFromHash()} locale={locale} />
          ) : page === "actor" ? (
            <ContentDetailTemplate key="actor-discovery" video={videos[0]} onBack={() => navigate("examples")} backLabel="Examples" initialTab="AI Chapter" chapterContent={<ActorDiscoveryContent />} locale={locale} />
          ) : page === "comedy" ? (
            <ComedyHighlightDetail onBack={() => navigate("examples")} />
          ) : page === "video" ? (
            <>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {t("Video Assets")}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("Browse, filter, and review AI analysis across your video catalog.")}
                  </p>
                </div>
                <Button onClick={() => setAssetPickerOpen(true)}>
                  <Plus />
                  {t("Add Asset")}
                </Button>
              </div>
              <Card className="gap-0 overflow-hidden py-0 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 border-b p-4">
                  <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      aria-label="Search videos by title or ID"
                      type="search"
                      placeholder={t("Search by title or ID")}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger
                      aria-label="Filter by content type"
                      className="min-w-32"
                    >
                      <SelectValue placeholder={t("All types")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All types")}</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger
                      aria-label="Filter by AI analysis status"
                      className="min-w-36"
                    >
                      <SelectValue placeholder={t("All statuses")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("All statuses")}</SelectItem>
                      {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {t(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span
                    className="ml-auto text-xs text-muted-foreground"
                    role="status"
                  >
                    {filtered.length}{" "}
                    {t(filtered.length === 1 ? "video" : "videos")}
                  </span>
                </div>
                {filtered.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="pl-5 text-xs uppercase">
                          {t("Video Assets")}
                        </TableHead>
                        <TableHead className="text-xs uppercase">
                          {t("Type")}
                        </TableHead>
                        <TableHead className="hidden text-xs uppercase md:table-cell">
                          {t("Duration")}
                        </TableHead>
                        <TableHead className="hidden text-xs uppercase lg:table-cell">
                          {t("Year")}
                        </TableHead>
                        <TableHead className="hidden text-xs uppercase sm:table-cell">
                          {t("Status")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((video) => (
                        <TableRow
                          key={video.id}
                          tabIndex={0}
                          aria-label={`View ${video.title}`}
                          className="cursor-pointer focus-visible:bg-accent focus-visible:outline-2 focus-visible:outline-ring"
                          onClick={() => openDetail(video)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault()
                              openDetail(video)
                            }
                          }}
                        >
                          <TableCell className="py-5 pl-5">
                            <div className="flex min-w-40 items-center gap-3">
                              <VideoThumbnail
                                video={video}
                                className="video-list-thumb w-28 sm:w-32"
                              />
                              <div className="min-w-0">
                                <div className="max-w-48 truncate font-medium text-foreground sm:max-w-none">
                                  {video.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  ID {video.id}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{video.type}</TableCell>
                          <TableCell className="hidden tabular-nums md:table-cell">
                            {video.duration}
                          </TableCell>
                          <TableCell className="hidden tabular-nums lg:table-cell">
                            {video.year}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <StatusBadge status={video.status} locale={locale} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="px-6 py-16 text-center">
                    <h2 className="font-medium">No videos found</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try a different keyword or filter.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setQuery("")
                        setTypeFilter("all")
                        setStatusFilter("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </Card>
              <VideoPickerDialog open={assetPickerOpen} onOpenChange={setAssetPickerOpen} locale={locale} />
            </>
          ) : page === "examples" ? (
            <ExamplesPage onOpenDetail={openExample} />
          ) : page === "search" ? (
            <AISearchMVP key={activeDemo || "demo-list"} section={discoverySection} demoId={activeDemo} onDemoChange={chooseDemo} onSectionChange={navigateDiscovery} />
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {page === "home" ? "Welcome back" : "AI Search"}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {page === "home"
                      ? "Your KK lab content intelligence overview."
                      : "Find content by meaning, mood, visual style, or audience."}
                  </p>
                </div>
              </div>
                <Card className="flex min-h-[440px] items-center justify-center text-center">
                  <CardHeader className="max-w-md">
                    <CardTitle>
                      {page === "home" ? "Home dashboard" : "Highlight Library"}
                    </CardTitle>
                    <CardDescription>
                      {page === "home"
                        ? "This section is a placeholder in the demo. Browse Video Assets to explore the interactive video catalog."
                        : "這裡將集中管理已生成的 Highlight 影片、草稿、分享連結與使用統計。"}
                    </CardDescription>
                    <Button
                      className="mx-auto mt-4"
                      onClick={() => navigate("video")}
                    >
                      Open Video Assets
                    </Button>
                  </CardHeader>
                </Card>

            </>
          )}
        </div>
        {analysisJob && <aside role="status" aria-live="polite" className="fixed right-5 bottom-5 z-40 w-[min(340px,calc(100vw-40px))] rounded-xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md"><div className="flex items-start gap-2.5">{analysisJob.status === "processing" ? <LoaderCircle className="mt-0.5 size-4 shrink-0 animate-spin text-slate-500" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />}<div className="min-w-0 flex-1"><h2 className="text-sm font-medium">{analysisJob.status === "processing" ? "AI Generate in progress" : "AI analysis completed"}</h2><p className="mt-1 truncate text-xs text-muted-foreground">{analysisJob.video.title}</p>{analysisJob.status === "processing" ? <div className="mt-3"><div className="mb-1.5 flex justify-between text-xs text-muted-foreground"><span>Analyzing</span><span>{analysisJob.progress}%</span></div><div className="h-1 overflow-hidden rounded-full bg-slate-200/70"><span className="block h-full rounded-full bg-slate-600 transition-[width] duration-500" style={{ width: `${analysisJob.progress}%` }} /></div></div> : <button type="button" onClick={openAnalyzedAsset} className="mt-3 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950">View Asset →</button>}</div></div></aside>}
      </SidebarInset>
    </>
  )
}

export default function StreamAIDemo() {
  return (
    <SidebarProvider>
      <Workspace />
    </SidebarProvider>
  )
}
