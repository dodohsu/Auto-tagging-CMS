export type AnalysisStatus = "Uploading" | "Analyzing" | "Failed" | "Completed" | "Not analyzed"

export type Video = {
  id: string
  title: string
  type: "Drama" | "Documentary" | "Variety" | "Movie" | "Animation"
  duration: string
  year: number
  status: AnalysisStatus
  color: number
  hasAnalysis?: boolean
  poster?: string
  localVideo?: string
  externalShareUrl?: string
  youtubeVideoId?: string
}

export const videos: Video[] = [
  { id: "TELA-6825", title: "孤独のグルメ SP", type: "Drama", duration: "1:58:23", year: 2024, status: "Completed", hasAnalysis: true, color: 1 },
  { id: "DOC-2048", title: "Concert", type: "Documentary", duration: "20:37", year: 2025, status: "Analyzing", hasAnalysis: true, color: 2, poster: "media/concert.jpg", youtubeVideoId: "sl-9Craoxyo" },
  { id: "TRV-1129", title: "Variety Show", type: "Variety", duration: "52:41", year: 2025, status: "Completed", hasAnalysis: true, color: 3, poster: "media/reality-show.jpg", youtubeVideoId: "9di1lUnx-5U" },
  { id: "MOV-7310", title: "Comedy Show", type: "Variety", duration: "1:46:29", year: 2026, status: "Completed", hasAnalysis: true, color: 4, poster: "media/comedy-show.jpg", localVideo: "media/comedy-highlight-480p.mp4", youtubeVideoId: "qrdyfziYyHk" },
  { id: "ANI-0456", title: "Nostalgia Collection", type: "Animation", duration: "24:30", year: 2024, status: "Failed", hasAnalysis: true, color: 5 },
  { id: "DOC-8803", title: "Sports Event", type: "Documentary", duration: "38:15", year: 2022, status: "Completed", hasAnalysis: true, color: 6 },
  { id: "UPL-0001", title: "Unanalyzed Video", type: "Documentary", duration: "--:--", year: 2026, status: "Not analyzed", hasAnalysis: false, color: 2 },
]
