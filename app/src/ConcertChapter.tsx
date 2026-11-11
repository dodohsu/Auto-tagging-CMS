import TaggedChapter from "./TaggedChapter"
import { concertClips } from "./concert-clips"
import type { Video } from "@/mock-data/videos"

export default function ConcertChapter({ video }: { video: Video }) {
  return <TaggedChapter video={video} clips={concertClips} templateName="Concert" />
}
