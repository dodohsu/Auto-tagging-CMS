export type AnalysisStatus = "Uploading" | "Analyzing" | "Failed" | "Completed"

export type Video = {
  id: string
  title: string
  type: "Drama" | "Documentary" | "Variety" | "Movie" | "Animation"
  duration: string
  year: number
  status: AnalysisStatus
  color: number
  poster?: string
  localVideo?: string
  externalShareUrl?: string
}

export const videos: Video[] = [
  { id: "TELA-6825", title: "孤独のグルメ SP", type: "Drama", duration: "1:58:23", year: 2024, status: "Completed", color: 1 },
  { id: "DOC-2048", title: "Concert", type: "Documentary", duration: "20:36", year: 2025, status: "Analyzing", color: 2, poster: "media/concert.jpg", localVideo: "media/concert.mp4", externalShareUrl: "https://gofile.me/4Su2y/ZxSUztzmf" },
  { id: "TRV-1129", title: "Reality Show", type: "Variety", duration: "52:41", year: 2025, status: "Completed", color: 3, poster: "media/reality-show.jpg", localVideo: "media/reality-show.mp4" },
  { id: "MOV-7310", title: "Comedy Show", type: "Movie", duration: "2:04:08", year: 2023, status: "Uploading", color: 4 },
  { id: "ANI-0456", title: "Nostalgia Collection", type: "Animation", duration: "24:30", year: 2024, status: "Failed", color: 5 },
  { id: "DOC-8803", title: "Sports Event", type: "Documentary", duration: "38:15", year: 2022, status: "Completed", color: 6 },
]
