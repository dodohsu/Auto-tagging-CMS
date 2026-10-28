import { Fragment, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Item = { id: string; title: string; kind: string; tags: string; summary: string; status: string; version: number; indexed: number }
export function indexState(t: Item) { return t.status === "Failed" ? "failed" : t.status === "Indexed" && t.version === t.indexed ? "ready" : "pending" }
export default function SearchableContent({ titles, included, editable, onScopeChange, renderDetail }: { titles: Item[]; included: string[]; editable: boolean; onScopeChange: (ids: string[]) => void; renderDetail: (id: string) => ReactNode }) {
  const [query, setQuery] = useState("")
  const [scope, setScope] = useState("all")
  const [kind, setKind] = useState("all")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("title")
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(25)
  const [selected, setSelected] = useState<string[]>([])
  const [detail, setDetail] = useState<string | null>(null)
  const [confirmRemove, setConfirmRemove] = useState(false)
  const scopeIds = useMemo(() => new Set(included), [included])
  const rows = useMemo(() => titles.filter(t => (!query.trim() || `${t.id} ${t.title} ${t.tags} ${t.summary}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) && (scope === "all" || scopeIds.has(t.id) === (scope === "included")) && (kind === "all" || kind === t.kind) && (status === "all" || indexState(t) === status)).sort((a, b) => sort === "id" ? a.id.localeCompare(b.id) : sort === "health" ? ({ failed: 0, pending: 1, ready: 2 }[indexState(a)] - { failed: 0, pending: 1, ready: 2 }[indexState(b)] || a.id.localeCompare(b.id)) : a.title.localeCompare(b.title, "zh-TW") || a.id.localeCompare(b.id)), [titles, query, scope, scopeIds, kind, status, sort])
  const pages = Math.max(1, Math.ceil(rows.length / size)), current = Math.min(page, pages)
  const visible = rows.slice((current - 1) * size, current * size)
  const selectedIds = new Set(selected)
  const allPage = visible.length > 0 && visible.every(t => selectedIds.has(t.id))
  const ready = titles.filter(t => scopeIds.has(t.id) && indexState(t) === "ready").length
  function reset() { setPage(1); setSelected([]); setConfirmRemove(false); setDetail(null) }
  function changeScope(add: boolean) { const ids = new Set(included); selected.forEach(id => add ? ids.add(id) : ids.delete(id)); onScopeChange([...ids]); setSelected([]); setConfirmRemove(false) }
  const selectClass = "h-9 rounded-md border bg-background px-3 text-sm"
  return <div className="space-y-4">
    <div><h2 className="font-semibold">Searchable Content</h2><p className="mt-2 text-xs text-muted-foreground">管理此 Chatbot 的搜尋範圍。納入後仍需索引完成才可搜尋；Metadata 與索引由所有 Chatbot 共用。</p></div>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["候選片庫", titles.length], ["已納入", titles.filter(t => scopeIds.has(t.id)).length], ["可搜尋", ready], ["已納入但需處理", titles.filter(t => scopeIds.has(t.id)).length - ready]].map(([label, count]) => <div key={label} className="rounded-lg border bg-background p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{Number(count).toLocaleString()}</p></div>)}</div>
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-wrap gap-3 border-b p-4">
        <Input className="min-w-60 flex-1" aria-label="搜尋內容" placeholder="搜尋名稱、Content ID、Tags 或摘要…" value={query} onChange={e => { setQuery(e.target.value); reset() }} />
        <select aria-label="搜尋範圍篩選" className={selectClass} value={scope} onChange={e => { setScope(e.target.value); reset() }}><option value="all">全部範圍</option><option value="included">已納入</option><option value="excluded">未納入</option></select>
        <select aria-label="內容類型篩選" className={selectClass} value={kind} onChange={e => { setKind(e.target.value); reset() }}><option value="all">全部類型</option>{[...new Set(titles.map(t => t.kind))].sort().map(k => <option key={k}>{k}</option>)}</select>
        <select aria-label="索引狀態篩選" className={selectClass} value={status} onChange={e => { setStatus(e.target.value); reset() }}><option value="all">全部索引狀態</option><option value="ready">可搜尋</option><option value="pending">待索引／版本不同步</option><option value="failed">索引失敗</option></select>
        <select aria-label="內容排序" className={selectClass} value={sort} onChange={e => { setSort(e.target.value); reset() }}><option value="title">名稱排序</option><option value="id">Content ID 排序</option><option value="health">需處理優先</option></select>
        <Button variant="ghost" onClick={() => { setQuery(""); setScope("all"); setKind("all"); setStatus("all"); setSort("title"); reset() }}>清除篩選</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-b bg-muted/30 px-4 py-3">
        <span className="text-xs" role="status">符合 {rows.length.toLocaleString()} 筆 · 已選 {selected.length} 筆（跨頁保留）</span>
        <Button size="sm" variant="outline" disabled={!editable || !rows.length} onClick={() => { setSelected(rows.map(t => t.id)); setConfirmRemove(false) }}>選取全部符合結果（{rows.length}）</Button>
        <Button size="sm" variant="ghost" disabled={!selected.length} onClick={() => { setSelected([]); setConfirmRemove(false) }}>取消選取</Button>
        <div className="ml-auto flex gap-2"><Button size="sm" disabled={!editable || !selected.length} onClick={() => changeScope(true)}>批次納入</Button><Button size="sm" variant="outline" disabled={!editable || !selected.length} onClick={() => setConfirmRemove(true)}>批次移除</Button></div>
      </div>
      {confirmRemove && <div className="flex flex-wrap items-center gap-3 border-b bg-muted p-4"><p className="text-sm">將 {selected.length} 筆選取內容移出此 Chatbot 草稿搜尋範圍，是否繼續？</p><Button size="sm" disabled={!editable} onClick={() => changeScope(false)}>確認移除</Button><Button size="sm" variant="ghost" onClick={() => setConfirmRemove(false)}>取消</Button></div>}
      <Table><TableHeader><TableRow className="bg-muted/40"><TableHead className="w-12 pl-4"><Checkbox aria-label="選取本頁" disabled={!editable || !visible.length} checked={allPage ? true : visible.some(t => selectedIds.has(t.id)) ? "indeterminate" : false} onCheckedChange={checked => { setSelected(checked === true ? [...new Set([...selected, ...visible.map(t => t.id)])] : selected.filter(id => !visible.some(t => t.id === id))); setConfirmRemove(false) }} /></TableHead><TableHead>內容／Content ID</TableHead><TableHead>類型</TableHead><TableHead>搜尋範圍</TableHead><TableHead>索引狀態</TableHead><TableHead className="text-right pr-4">操作</TableHead></TableRow></TableHeader><TableBody>
        {visible.map(t => <Fragment key={t.id}><TableRow><TableCell className="pl-4"><Checkbox aria-label={`選取 ${t.title}`} checked={selectedIds.has(t.id)} disabled={!editable} onCheckedChange={checked => { setSelected(checked === true ? [...selected, t.id] : selected.filter(id => id !== t.id)); setConfirmRemove(false) }} /></TableCell><TableCell className="max-w-80 py-4"><p className="font-medium">{t.title}</p><p className="mt-1 text-xs text-muted-foreground">{t.id}</p><p className="mt-1 truncate text-xs text-muted-foreground" title={t.tags}>{t.tags}</p></TableCell><TableCell>{t.kind}</TableCell><TableCell><Badge variant={scopeIds.has(t.id) ? "secondary" : "outline"}>{scopeIds.has(t.id) ? "已納入" : "未納入"}</Badge></TableCell><TableCell><Badge variant={indexState(t) === "failed" ? "destructive" : "secondary"}>{indexState(t) === "ready" ? "可搜尋" : indexState(t) === "failed" ? "索引失敗" : "待索引"}</Badge><p className="mt-1 text-xs text-muted-foreground">Metadata v{t.version} / Index v{t.indexed}</p></TableCell><TableCell className="pr-4 text-right"><Button size="sm" variant="outline" aria-expanded={detail === t.id} onClick={() => setDetail(detail === t.id ? null : t.id)}>{detail === t.id ? "收合" : "管理內容"}</Button></TableCell></TableRow>{detail === t.id && <TableRow><TableCell colSpan={6} className="bg-muted/20 p-4">{renderDetail(t.id)}</TableCell></TableRow>}</Fragment>)}
        {!visible.length && <TableRow><TableCell colSpan={6} className="py-14 text-center text-muted-foreground">沒有符合條件的內容，請調整搜尋或清除篩選。</TableCell></TableRow>}
      </TableBody></Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4"><span className="text-xs text-muted-foreground">{rows.length ? (current - 1) * size + 1 : 0}–{Math.min(current * size, rows.length)} / {rows.length.toLocaleString()} 筆</span><div className="flex items-center gap-3"><select aria-label="每頁筆數" className={selectClass} value={size} onChange={e => { setSize(Number(e.target.value)); setPage(1) }}>{[25, 50, 100].map(n => <option key={n} value={n}>{n} 筆／頁</option>)}</select><Button size="sm" variant="outline" disabled={current === 1} onClick={() => { setPage(current - 1); setDetail(null) }}>上一頁</Button><span className="text-xs">{current} / {pages}</span><Button size="sm" variant="outline" disabled={current === pages} onClick={() => { setPage(current + 1); setDetail(null) }}>下一頁</Button></div></div>
    </div><p className="text-xs text-muted-foreground">範圍異動儲存於草稿，請至 Playground 驗證後由 Settings 發布。調整篩選會清除選取；換頁保留選取。</p>
  </div>
}
