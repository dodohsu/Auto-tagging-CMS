export type ConcertClip = {
  id: string
  category: "Mood" | "Topic" | "Title" | "Performance Type" | "Music Genre"
  title: string
  start: string
  end: string
  file: string
  tag?: string
  evidence: string
  needsReview?: boolean
}

// Clip boundaries follow the supplied Concert.srt. Music and performance labels
// are flagged when the transcript alone cannot confirm a configured tag.
export const concertClips: ConcertClip[] = [
  { id: "mood-tearful", category: "Mood", title: "Emotional rehearsal", start: "06:40", end: "07:13", file: "clips/concert/mood-tearful.mp4", tag: "Tearful", evidence: "Speakers repeatedly say they may cry during rehearsal." },
  { id: "mood-scary", category: "Mood", title: "Nerves before day two", start: "12:47", end: "13:18", file: "clips/concert/mood-scary.mp4", tag: "Scary", evidence: "A performer says she is nervous and afraid of making a mistake." },
  { id: "topic-fans", category: "Topic", title: "Surrounded by the audience", start: "11:24", end: "12:08", file: "clips/concert/topic-fans.mp4", tag: "Anime / Pop Culture", evidence: "The group discusses fans all around the venue and performing at Nippon Budokan." },
  { id: "title-group-name", category: "Title", title: "Group name mentioned", start: "12:32", end: "12:45", file: "clips/concert/title-group-name.mp4", tag: "Group Name", evidence: "The subtitle renders a group name as “フルーティーストリート”; verify the transcription before using it as metadata.", needsReview: true },
  { id: "performance-type", category: "Performance Type", title: "Onstage group performance", start: "18:04", end: "18:35", file: "clips/concert/stage-performance.mp4", evidence: "Singing begins in the subtitles. The configured performance tags do not clearly describe this group segment.", needsReview: true },
  { id: "music-genre", category: "Music Genre", title: "Song performance", start: "18:04", end: "18:35", file: "clips/concert/stage-performance.mp4", tag: "J-Pop", evidence: "The subtitle contains Japanese lyrics; confirm the music genre from the audio before applying this tag.", needsReview: true },
]
