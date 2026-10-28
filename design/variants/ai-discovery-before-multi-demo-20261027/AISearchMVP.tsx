import { useEffect, useRef, useState } from "react"
import moduleScript from "./general-search/app.js?raw"
import moduleStyles from "./general-search/style.css?raw"

// Trusted local prototype assets; isolated styles preserve the surrounding CMS.
const documentSource = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${moduleStyles}</style></head><body><div class="shell"><span id="crumb" hidden></span><main id="app"></main></div><div id="toast" role="status"></div><script>${moduleScript.replace(/<\/script/gi, "<\\/script")}</script><script>new ResizeObserver(()=>parent.postMessage({type:'general-search-height',height:document.querySelector("main").getBoundingClientRect().height},'*')).observe(document.body)</script></body></html>`

export default function AISearchMVP({ section, onSectionChange }: { section: string; onSectionChange: (section: string) => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(1000)
  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== window.location.origin) return
      if (event.data?.type === "general-search-navigation") onSectionChange(event.data.section)
      if (event.data?.type === "general-search-height" && Number.isFinite(event.data.height)) {
        setHeight(Math.max(700, Math.ceil(event.data.height) + 24))
      }
    }
    window.addEventListener("message", resize)
    return () => window.removeEventListener("message", resize)
  }, [onSectionChange])
  useEffect(() => { frame.current?.contentWindow?.postMessage({ type: "general-search-section", section }, window.location.origin) }, [section])
  return <iframe ref={frame} title="General CMS AI Search：內容管理、分析與 conversational playground" srcDoc={documentSource} onLoad={() => frame.current?.contentWindow?.postMessage({ type: "general-search-section", section }, window.location.origin)} style={{ width: "100%", height, border: 0, display: "block" }} />
}
