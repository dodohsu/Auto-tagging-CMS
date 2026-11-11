import type { ConcertClip } from "./concert-clips"

export type ConcertTagFilter = { category: string; label: string }

export function matchesConcertClip(clip: ConcertClip, categories: string[], selectedTags: ConcertTagFilter[]) {
  if (!categories.length) return true
  return clip.tags.some(tag => {
    if (!categories.includes(tag.category)) return false
    const categoryTags = selectedTags.filter(selected => selected.category === tag.category)
    return !categoryTags.length || categoryTags.some(selected => selected.label === tag.label)
  })
}
