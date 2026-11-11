import type { TaggedClip } from "./tagged-clips"

export type TagFilter = { category: string; label: string }

export function matchesTaggedClip(clip: TaggedClip, categories: string[], selectedTags: TagFilter[]) {
  if (!categories.length) return true
  return clip.tags.some(tag => {
    if (!categories.includes(tag.category)) return false
    const categoryTags = selectedTags.filter(selected => selected.category === tag.category)
    return !categoryTags.length || categoryTags.some(selected => selected.label === tag.label)
  })
}

// Preserve existing Concert imports while sharing the filter with other templates.
export { matchesTaggedClip as matchesConcertClip }
export type ConcertTagFilter = TagFilter
