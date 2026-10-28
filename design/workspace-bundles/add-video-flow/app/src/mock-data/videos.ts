export type AnalysisStatus = "Completed" | "Analyzing" | "Queued" | "Failed"

export type Video = {
  id: string
  title: string
  type: "Drama" | "Documentary" | "Variety" | "Movie" | "Animation"
  duration: string
  year: number
  status: AnalysisStatus
  color: number
}

export const videos: Video[] = [
  { id: "TELA-6825", title: "孤独のグルメ SP", type: "Drama", duration: "1:58:23", year: 2024, status: "Completed", color: 1 },
  { id: "DOC-2048", title: "The Last Artisan", type: "Documentary", duration: "47:12", year: 2025, status: "Analyzing", color: 2 },
  { id: "TRV-1129", title: "Taiwan After Dark", type: "Variety", duration: "52:46", year: 2025, status: "Completed", color: 3 },
  { id: "MOV-7310", title: "山の記憶", type: "Movie", duration: "2:04:08", year: 2023, status: "Queued", color: 4 },
  { id: "ANI-0456", title: "Orbit Kids: Moon Camp", type: "Animation", duration: "24:30", year: 2024, status: "Failed", color: 5 },
  { id: "DOC-8803", title: "Signals from the Coast", type: "Documentary", duration: "38:15", year: 2022, status: "Completed", color: 6 },
]
