import StreamAIDemo from "./StreamAIDemo"
import { useEffect, useState } from "react"
import ConsumerPlayer from "./ConsumerPlayer"
import type { ComponentProps } from "react"

type PreviewData = Pick<
  ComponentProps<typeof ConsumerPlayer>,
  "title" | "chapters" | "duration" | "time"
> & { id: string }
function PreviewPage({ data }: { data: PreviewData }) {
  const [time, setTime] = useState(data.time)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setTime((t) => Math.min(data.duration, t + 1)),
      1000
    )
    return () => window.clearInterval(timer)
  }, [playing, data.duration])
  return (
    <ConsumerPlayer
      {...data}
      time={time}
      playing={playing}
      seek={setTime}
      togglePlay={() => {
        if (time >= data.duration) setTime(0)
        setPlaying(!playing || time >= data.duration)
      }}
      onClose={() => {
        window.location.hash = `detail/${data.id}`
        window.location.reload()
      }}
    />
  )
}

export function App() {
  if (window.location.hash.startsWith("#preview/")) {
    let data: PreviewData | null
    try {
      data = JSON.parse(
        decodeURIComponent(window.location.hash.slice(9))
      ) as PreviewData
      if (
        !data.chapters?.length ||
        !Number.isFinite(data.duration) ||
        data.duration <= 0 ||
        !Number.isFinite(data.time)
      )
        throw new Error("Invalid preview")
    } catch {
      data = null
    }
    return data ? <PreviewPage data={data} /> : <div className="p-8">預覽資料無法讀取，請回到編輯頁重新開啟預覽。</div>
  }
  return <StreamAIDemo />
}

export default App
