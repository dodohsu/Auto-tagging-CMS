import TaggedChapter from "./TaggedChapter"
import { realityClips } from "./reality-clips"
import type { Video } from "@/mock-data/videos"

export default function RealityChapter({ video }: { video: Video }) {
  return <TaggedChapter video={video} clips={realityClips} templateName="Reality Show" />
}
