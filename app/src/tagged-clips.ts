export type TaggedTag = { category: string; label: string }
export type TaggedClip = {
  id: string
  title: string
  start: string
  end: string
  thumbnail: string
  description: string
  tags: [TaggedTag] | [TaggedTag, TaggedTag] | [TaggedTag, TaggedTag, TaggedTag]
}
