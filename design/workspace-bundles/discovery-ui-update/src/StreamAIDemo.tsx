import * as React from "react"
import AIChapter from "./AIChapter"
import AISearchMVP from "./AISearchMVP"
import { readAssistantRegistry } from "./assistant-registry"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Clapperboard,
  CircleHelp,
  FileText,
  Heart,
  Home,
  LibraryBig,
  MoreHorizontal,
  Plus,
  Pencil,
  Play,
  RefreshCw,
  Search,
  Smile,
  Sparkles,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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

type Page = "home" | "video" | "library" | "search" | "detail"
const labels: Record<Page, string> = {
  home: "Home",
  video: "Video",
  library: "Library",
  search: "AI Chatbot",
  detail: "AI Metadata",
}
function DiscoveryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 1.5c.45 0 .72.3.83.78l1.65 7.24 7.24 1.65c.48.11.78.38.78.83s-.3.72-.78.83l-7.24 1.65-1.65 7.24c-.11.48-.38.78-.83.78s-.72-.3-.83-.78l-1.65-7.24-7.24-1.65c-.48-.11-.78-.38-.78-.83s.3-.72.78-.83l7.24-1.65 1.65-7.24c.11-.48.38-.78.83-.78Z" />
      <circle cx="3.5" cy="20.5" r="2" />
    </svg>
  )
}
const nav = [
  { page: "home" as const, icon: Home },
  { page: "video" as const, icon: Clapperboard },
  { page: "library" as const, icon: LibraryBig },
  { page: "search" as const, icon: DiscoveryIcon },
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
  "Completed",
  "Analyzing",
  "Queued",
  "Failed",
]

function pageFromHash(): Page {
  const hash = window.location.hash.slice(1)
  if (hash === "search" || hash.startsWith("search/")) return "search"
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

function StatusBadge({ status }: { status: AnalysisStatus }) {
  const color = {
    Completed: "bg-emerald-50 text-emerald-700",
    Analyzing: "bg-blue-50 text-blue-700",
    Queued: "bg-amber-50 text-amber-700",
    Failed: "bg-red-50 text-red-700",
  }[status]
  return (
    <Badge
      variant="secondary"
      className={`gap-1.5 rounded-md border-0 ${color}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
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
  choices: { label: string; confidence?: string; selected?: boolean }[]
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

function MetadataGroupCard({ group }: { group: MetadataGroup }) {
  const Icon = group.icon
  const selected = group.choices.filter((choice) => choice.selected).length
  return (
    <Card className="gap-0 py-0 shadow-sm">
      <CardContent className="grid gap-4 p-4 xl:grid-cols-[220px_1fr]">
        <div className="flex gap-3">
          <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-semibold">{group.label}</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {group.description}
            </p>
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">
            <span>
              Selected {selected}/{group.choices.length}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`More options for ${group.label}`}
            >
              <MoreHorizontal />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.choices.map((choice) => (
              <button
                key={choice.label}
                type="button"
                aria-pressed={choice.selected}
                className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs transition-colors ${choice.selected ? "bg-primary/10 font-medium text-primary" : "bg-muted text-muted-foreground hover:bg-accent"}`}
              >
                <span
                  className={`size-3 rounded-full border ${choice.selected ? "border-primary bg-primary shadow-[inset_0_0_0_3px_var(--background)]" : "border-muted-foreground/50 bg-background"}`}
                  aria-hidden="true"
                />
                {choice.label}
                {choice.confidence && (
                  <span className="ml-0.5 tabular-nums">
                    {choice.confidence}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailPage({ video, onBack }: { video: Video; onBack: () => void }) {
  const [activeTab, setActiveTab] = React.useState("AI Metadata")
  const tabs = ["AI Metadata", "Chapters & Clips"]
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Back to Library"
            onClick={onBack}
          >
            <ArrowLeft />
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={onBack}
                >
                  Video
                </button>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{video.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue="v1">
            <SelectTrigger aria-label="Select version" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">v1.0 (2025-03-10 10:30)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw />
            Re-analyze
          </Button>
          <Button>Save</Button>
          <Button variant="ghost" size="icon-sm" aria-label="More actions">
            <MoreHorizontal />
          </Button>
        </div>
      </div>
      <Card className="mb-3 overflow-hidden bg-card/90 shadow-sm">
        <CardContent className="flex flex-col gap-5 p-4 lg:flex-row lg:items-center">
          <div className="relative w-full shrink-0 lg:w-56">
            <VideoThumbnail video={video} large />
            <Button
              variant="secondary"
              size="icon"
              aria-label={`Play ${video.title}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/85"
            >
              <Play className="fill-current" />
            </Button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {video.title}
              </h1>
              <StatusBadge status={video.status} />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>ID&nbsp; {video.id}</span>
              <span>{video.type}</span>
              <span>Food</span>
              <span>{video.year}</span>
              <span>{video.duration}</span>
              <span>SP</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-5">
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
        <div className="grid gap-4 xl:grid-cols-[1.48fr_1fr]">
          <section className="space-y-3">
            <Card className="shadow-sm">
              <CardHeader className="flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    AI Metadata{" "}
                    <CircleHelp className="size-4 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription className="mt-1 max-w-2xl">
                    Extract and analyze key metadata from the video, including
                    genre, theme, mood, style, and more, using AI search,
                    recommendation, and content generation.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Sparkles />
                  AI Generate from Clip
                </Button>
              </CardHeader>
            </Card>
            {metadataGroups.map((group) => (
              <MetadataGroupCard key={group.label} group={group} />
            ))}
            <Card className="shadow-sm">
              <CardContent className="grid gap-4 p-4 md:grid-cols-[220px_1fr]">
                <div className="flex gap-3">
                  <FileText className="size-5" />
                  <h3 className="font-semibold">
                    Metadata Summary
                    <br />
                    (AI Generated)
                  </h3>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  《孤独のグルメ
                  SP》透過原作風格，主角井之頭五郎在不同城市品嚐當地美食，透過美食展現地域文化與人情味。影片以真實的飲食場景和內心獨白，呈現出療癒、溫暖且富有人情味的旅程。
                </p>
              </CardContent>
            </Card>
          </section>
          <aside className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Content Overview</CardTitle>
                <Button variant="outline" size="sm">
                  <Pencil />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_1.1fr]">
                  <VideoThumbnail video={video} large />
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      <Sparkles />
                      AI Generated
                    </Badge>
                    <h3 className="font-semibold">Synopsis</h3>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      Inogashira Goro visits various regions to enjoy their
                      unique local cuisine. Through a personal and detailed
                      dining journey, the show portrays the richness of local
                      culture and the heartfelt connection to food.
                    </p>
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Language</dt>
                    <dd className="mt-1 font-medium">Japanese</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Subtitles</dt>
                    <dd className="mt-1 font-medium">
                      Japanese · Traditional Chinese · English
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Duration</dt>
                    <dd className="mt-1 font-medium">{video.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Production Year
                    </dt>
                    <dd className="mt-1 font-medium">{video.year}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  AI Metadata Sources and Basis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex gap-1 rounded-lg bg-muted p-1">
                  <Button size="sm" className="flex-1">
                    Synopsis
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Scene Analysis
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Transcript
                  </Button>
                </div>
                <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                  <li>
                    Follows Inogashira Goro's journey to explore unique local
                    cuisine.
                  </li>
                  <li>
                    Reflects real dining environments and cooking processes.
                  </li>
                  <li>
                    Conveys the protagonist's inner thoughts and love for food.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Relevant Similar Content
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2">
                <div>
                  <VideoThumbnail video={video} />
                  <p className="mt-1 text-xs text-muted-foreground">Food</p>
                </div>
                <div>
                  <VideoThumbnail video={videos[1]} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Local Cuisine
                  </p>
                </div>
                <div>
                  <VideoThumbnail video={videos[2]} />
                  <p className="mt-1 text-xs text-muted-foreground">Travel</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      ) : (
        <AIChapter key={video.id} video={video} />
      )}
    </div>
  )
}

function Workspace() {
  const [page, setPage] = React.useState<Page>(pageFromHash)
  const [activeDemo, setActiveDemo] = React.useState<string | null>(demoFromHash)
  const [assistantRegistry, setAssistantRegistry] = React.useState(readAssistantRegistry)
  const [assistantSearch, setAssistantSearch] = React.useState("")
  const [lastAssistant, setLastAssistant] = React.useState(() => demoFromHash() || readAssistantRegistry().find(a => a.status !== "Archived")?.id || "")
  const [discoverySection, setDiscoverySection] = React.useState(sectionFromHash)
  const [query, setQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [selected, setSelected] = React.useState<Video | null>(() => {
    if (pageFromHash() !== "detail") return null
    const id = window.location.hash.slice(1).split("/")[1]
    return videos.find((video) => video.id === id) ?? videos[0]
  })
  const [addVideoOpen, setAddVideoOpen] = React.useState(false)
  const { isMobile, setOpenMobile } = useSidebar()

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

  const openDetail = (video: Video) => {
    setSelected(video)
    setPage("detail")
    window.history.pushState(null, "", `#detail/${video.id}`)
    if (isMobile) setOpenMobile(false)
  }

  const filtered = videos.filter((video) => {
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
                StreamAI
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
                    isActive={page === item}
                    onClick={() => item === "search" ? chooseDemo(null) : navigate(item)}
                    aria-current={page === item ? "page" : undefined}
                    className="h-10 rounded-lg px-3"
                  >
                    <Icon aria-hidden="true" />
                    <span>{labels[item]}</span>
                  </SidebarMenuButton>
                  {item === "search" && page === "search" && <div className="mt-2 space-y-3 border-l border-sidebar-border ml-4 pl-3">
                    <div className="space-y-1.5"><p className="px-1 text-[10px] text-muted-foreground">目前 Chatbot</p><Select value={activeDemo || lastAssistant} onOpenChange={open => { if (open) setAssistantSearch("") }} onValueChange={id => chooseDemo(id, discoverySection === "list" ? "settings" : discoverySection)}><SelectTrigger aria-label="切換目前 Chatbot" className="w-full min-w-0"><SelectValue placeholder="Select Chatbot" /></SelectTrigger><SelectContent><div className="p-2"><Input aria-label="搜尋 Chatbot" placeholder="Search chatbots…" value={assistantSearch} onChange={e => setAssistantSearch(e.target.value)} onKeyDown={e => { if(e.key!=="Escape")e.stopPropagation() }} /></div>{assistantRegistry.filter(a => a.status !== "Archived" || a.id === activeDemo).filter(a => a.name.toLowerCase().includes(assistantSearch.toLowerCase())).map(a => <SelectItem key={a.id} value={a.id}>{a.name}{a.status === "Archived" ? "（已封存）" : ""}</SelectItem>)}</SelectContent></Select></div>
                    <SidebarMenuSub aria-label="目前 Chatbot 的功能" className="mx-0 ml-3 mt-1 pr-0 pl-3">{discoverySections.filter(s => s.id !== "list").map(s => <SidebarMenuSubItem key={s.id}><SidebarMenuSubButton asChild isActive={discoverySection === s.id && !!activeDemo} className="h-9 text-sm"><button type="button" disabled={!activeDemo && !lastAssistant} onClick={() => navigateDiscovery(s.id)} aria-current={discoverySection === s.id && !!activeDemo ? "page" : undefined}><span>{s.label}</span></button></SidebarMenuSubButton></SidebarMenuSubItem>)}</SidebarMenuSub>
                  </div>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-5 pb-5 text-xs text-muted-foreground">
          <div className="border-t border-sidebar-border pt-4">
            Demo workspace
            <br />
            Local mock data
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-slate-50/80">
        <header className="flex h-16 items-center justify-between gap-3 border-b bg-background/80 px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {page === "detail" ? "Video" : labels[page]}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {page === "search" && <>{activeDemo && <><BreadcrumbSeparator /><BreadcrumbItem><span>{assistantRegistry.find(a => a.id === activeDemo)?.name || activeDemo}</span></BreadcrumbItem></>}<BreadcrumbSeparator /><BreadcrumbItem><span>{discoverySections.find(item => item.id === discoverySection)?.label}</span></BreadcrumbItem></>}
                {page === "video" && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <span>All videos</span>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="hidden sm:inline">Content team</span>
            <Avatar>
              <AvatarFallback>CT</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="mx-auto w-full max-w-[1520px] px-4 py-7 sm:px-7">
          {page === "detail" && selected ? (
            <DetailPage video={selected} onBack={() => navigate("video")} />
          ) : page === "video" ? (
            <>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-1 text-[11px] font-semibold tracking-widest text-primary uppercase">
                    Content workspace
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Video
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Browse, filter, and review AI analysis across your video
                    catalog.
                  </p>
                </div>
                <Button onClick={() => setAddVideoOpen((open) => !open)}>
                  <Plus />
                  Add Video
                </Button>
              </div>
              {addVideoOpen && (
                <Card className="mb-4 border-dashed shadow-none">
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-medium">Add Video</p>
                      <p className="text-sm text-muted-foreground">
                        上傳入口已建立，Demo 目前使用本地 Mock
                        data；接入後端後可在此選擇影片檔案並開始 AI 分析。
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setAddVideoOpen(false)}
                    >
                      Close
                    </Button>
                  </CardContent>
                </Card>
              )}
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
                      placeholder="Search by title or ID"
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
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
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
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span
                    className="ml-auto text-xs text-muted-foreground"
                    role="status"
                  >
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "video" : "videos"}
                  </span>
                </div>
                {filtered.length ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="pl-5 text-xs uppercase">
                          Video
                        </TableHead>
                        <TableHead className="text-xs uppercase">
                          Type
                        </TableHead>
                        <TableHead className="hidden text-xs uppercase md:table-cell">
                          Duration
                        </TableHead>
                        <TableHead className="hidden text-xs uppercase lg:table-cell">
                          Year
                        </TableHead>
                        <TableHead className="hidden text-xs uppercase sm:table-cell">
                          AI analysis
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
                                className="w-28 sm:w-32"
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
                            <StatusBadge status={video.status} />
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
            </>
          ) : page === "search" ? (
            <AISearchMVP key={activeDemo || "demo-list"} section={discoverySection} demoId={activeDemo} onDemoChange={chooseDemo} onSectionChange={navigateDiscovery} />
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="mb-1 text-[11px] font-semibold tracking-widest text-primary uppercase">
                    {page === "home" ? "Workspace" : "AI discovery"}
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {page === "home" ? "Welcome back" : "AI Search"}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {page === "home"
                      ? "Your StreamAI content intelligence overview."
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
                        ? "This section is a placeholder in the demo. Browse Video to explore the interactive video catalog."
                        : "這裡將集中管理已生成的 Highlight 影片、草稿、分享連結與使用統計。"}
                    </CardDescription>
                    <Button
                      className="mx-auto mt-4"
                      onClick={() => navigate("video")}
                    >
                      Open Video
                    </Button>
                  </CardHeader>
                </Card>

            </>
          )}
        </div>
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
