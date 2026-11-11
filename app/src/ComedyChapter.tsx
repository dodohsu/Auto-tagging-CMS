import TaggedChapter from "./TaggedChapter"
import { comedyShowClips } from "./comedy-show-clips"
import type { Video } from "@/mock-data/videos"

export default function ComedyChapter({ video }: { video: Video }) {
  return <TaggedChapter video={video} clips={comedyShowClips} templateName="Comedy Show" />
}
