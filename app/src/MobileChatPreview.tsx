import { useState } from "react"
import { ArrowUp, MessageCircle, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type PreviewConfig = {
  greeting: string
  questions: string[]
  fallback: string
  spoilers: boolean
}

type Props = {
  name: string
  draft: PreviewConfig
  published?: PreviewConfig
  version: number
  onQuestion: (question: string, published: boolean) => void
}

export default function MobileChatPreview({ name, draft, published, version, onQuestion }: Props) {
  const [versionView, setVersionView] = useState<"draft" | "published">("draft")
  const [screen, setScreen] = useState<"welcome" | "empty">("welcome")
  const viewingPublished = versionView === "published" && !!published
  const config = viewingPublished ? published : draft
  const questions = config.questions.filter(question => question.trim())

  return <Card className="gap-0 py-0 shadow-none">
    <CardContent className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold">手機即時預覽</h2>
          <p className="mt-1 text-xs text-muted-foreground">模擬觀眾開啟 Chatbot 時看到的內容。</p>
        </div>
        <Badge variant="outline">示意畫面</Badge>
      </div>
      <div className="mt-4 flex gap-2" aria-label="預覽設定版本">
        <Button size="sm" variant={versionView === "draft" ? "default" : "outline"} onClick={() => setVersionView("draft")}>設定草稿</Button>
        <Button size="sm" variant={viewingPublished ? "default" : "outline"} disabled={!published} onClick={() => setVersionView("published")}>已發布{published ? ` v${version}` : ""}</Button>
      </div>
      <div className="mx-auto mt-5 w-full max-w-[350px] rounded-[2.4rem] border-[7px] border-slate-900 bg-slate-900 p-1 shadow-xl">
        <div className="flex min-h-[570px] flex-col overflow-hidden rounded-[1.8rem] bg-background">
          <div className="flex justify-center pt-2"><div className="h-1.5 w-20 rounded-full bg-slate-900" /></div>
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2.5"><span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary"><MessageCircle className="size-4" /></span><div><p className="max-w-[200px] truncate text-sm font-semibold">{name.trim() || "Chatbot"}</p><p className="text-[10px] text-muted-foreground">探索內容</p></div></div>
            <MoreHorizontal className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-4 px-4 py-5">
            <p className="text-center text-[10px] text-muted-foreground">今天</p>
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-muted p-3 text-sm leading-6">{screen === "empty" ? config.fallback || "尚未設定無結果引導" : config.greeting || "尚未設定開場文案"}</div>
            {screen === "welcome" && <div className="space-y-2 pt-1"><p className="text-xs text-muted-foreground">試試這樣問</p>{questions.length ? questions.map((question, index) => <Button key={`${index}-${question}`} variant="outline" className="h-auto w-full justify-start whitespace-normal rounded-xl px-3 py-2 text-left text-xs leading-5" onClick={() => onQuestion(question, viewingPublished)}>{question}</Button>) : <p className="text-xs text-muted-foreground">尚未設定推薦問題</p>}</div>}
            {screen === "empty" && <Button variant="outline" size="sm" onClick={() => setScreen("welcome")}>返回開場畫面</Button>}
          </div>
          <div className="border-t p-3"><div className="flex items-center justify-between rounded-full border bg-muted/40 px-4 py-2 text-xs text-muted-foreground"><span>描述想看的內容…</span><ArrowUp className="size-4" aria-hidden="true" /></div></div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2"><div className="flex gap-2"><Button size="sm" variant={screen === "welcome" ? "secondary" : "ghost"} onClick={() => setScreen("welcome")}>開場</Button><Button size="sm" variant={screen === "empty" ? "secondary" : "ghost"} onClick={() => setScreen("empty")}>無結果</Button></div><span className="text-xs text-muted-foreground">{config.spoilers ? "防劇透開啟" : "防劇透關閉"}</span></div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">預覽文案與推薦問題會隨左側設定更新；搜尋結果請到 Playground 測試。</p>
    </CardContent>
  </Card>
}
