import { useState } from "react"
import { CircleHelp, ChevronDown, ChevronRight, Film, ScanFace, Sparkles, UserRound, Pencil, MonitorPlay, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AIChapterLayout, ChapterHeader, ChapterFilter, ChapterColumns, ChapterListPanel } from "./AIChapterLayout"

export default function ActorDiscoveryContent() {
  const [query, setQuery] = useState("")
  const [collapsed, setCollapsed] = useState(false)
  return <AIChapterLayout>
    <ChapterHeader>
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Sparkles className="size-5" /> AI Chapter</h2>
        <p className="mt-1 text-sm text-muted-foreground">Actor Discovery · 人物辨識與影片定位</p>
      </div>
      <div className="flex gap-0.5 rounded-lg bg-muted p-0.5">
        <Button size="sm" className="h-8 gap-1.5 rounded-md px-2.5 text-xs"><Pencil className="size-4" />編輯模式</Button>
        <Button size="sm" variant="ghost" disabled className="h-8 gap-1.5 rounded-md px-2.5 text-xs"><MonitorPlay className="size-4" />應用模式</Button>
      </div>
    </ChapterHeader>
    <ChapterFilter>
      <div className="flex items-center justify-between"><span className="text-sm font-medium">人物 Filter</span><span className="text-xs text-muted-foreground">0 / 0 Clips</span></div>
      <div className="flex flex-wrap gap-2"><Button size="sm" className="rounded-full">全部人物</Button><Badge variant="outline" className="rounded-full px-3">井之頭五郎 · 待驗證</Badge></div>
      <p className="text-xs text-muted-foreground">人物名稱來自現有 Content Overview；畫面辨識與出場片段尚待驗證。</p>
    </ChapterFilter>
    <ChapterColumns
      left={<>
        <Card className="gap-0 overflow-hidden py-0 shadow-none">
          <div className="border-b px-4 py-3 text-xs text-muted-foreground">Video 示意預覽 · 尚未連接可定位的人物片段</div>
          <div className="relative flex aspect-video min-h-60 items-center justify-center bg-neutral-900 text-white">
            <div className="text-center"><Film className="mx-auto mb-3 size-14 opacity-30" /><p className="font-medium">孤独のグルメ SP</p><p className="mt-2 text-sm text-neutral-400">取得可核對的畫面與時間碼後，在此預覽人物出場</p></div>
            <Play className="absolute bottom-5 left-5 size-5 opacity-60" />
          </div>
          <CardContent className="space-y-4 py-5">
            <div className="flex items-center justify-between"><h3 className="text-sm font-semibold">時間軸視圖</h3><Badge variant="secondary">人物模式</Badge></div>
            <p className="text-sm text-muted-foreground">尚無可核對的出場時間碼。人物片段確認後，將依影片位置顯示於此時間軸。</p>
            <div className="h-10 rounded-lg border border-dashed bg-muted/20" aria-label="尚無人物出場片段" />
            <div className="flex justify-between font-mono text-xs text-muted-foreground"><span>00:00:00</span><span>01:58:23</span></div>
          </CardContent>
        </Card>
        <Card className="shadow-none"><CardContent className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="flex items-center gap-2 font-semibold"><ScanFace className="size-4" />人物出場定位</h3><p className="mt-1 text-sm text-muted-foreground">核對人物畫面、出場邊界與來源後，才能建立可用片段。</p></div><Button disabled>新增人物片段</Button></CardContent></Card>
        <Card className="shadow-none"><CardContent><h3 className="font-semibold">人物片段編輯</h3><div className="mt-4 rounded-lg border border-dashed p-6 text-sm text-muted-foreground">選取右側人物片段後，可在此檢查畫面證據並調整起訖時間。目前沒有已驗證片段。</div></CardContent></Card>
      </>}
      right={<ChapterListPanel count="0 Clips" query={query} onQueryChange={setQuery} collapsed={collapsed} onToggle={() => setCollapsed(value => !value)}>
        <section>
          <button type="button" className="flex w-full items-center gap-3 p-4 text-left hover:bg-muted" aria-expanded={!collapsed} onClick={() => setCollapsed(value => !value)}>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg border">1</span>
            <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">人物出場章節 · 待確認</span><span className="mt-1 block text-xs text-muted-foreground">起訖時間待確認 · 0 Clips</span></span>
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {!collapsed && <div className="space-y-3 border-t px-3 py-4">
            {(!query || "井之頭五郎".includes(query)) && <div className="flex items-start gap-3 rounded-lg border p-3"><div className="grid size-10 shrink-0 place-items-center rounded bg-neutral-100"><UserRound className="size-5" /></div><div><p className="text-sm font-medium">井之頭五郎 <Badge variant="outline">待驗證</Badge></p><p className="mt-1 text-xs leading-5 text-muted-foreground">角色名稱來自 Content Overview，尚未與影片畫面比對。</p></div></div>}
            <div className="rounded-lg border border-dashed p-5 text-center"><CircleHelp className="mx-auto size-5 text-muted-foreground" /><p className="mt-2 text-sm font-medium">尚無人物 Clip</p><p className="mt-1 text-xs text-muted-foreground">辨識結果與出場時間碼待接入實際分析資料。</p></div>
          </div>}
        </section>
      </ChapterListPanel>}
    />
  </AIChapterLayout>
}
