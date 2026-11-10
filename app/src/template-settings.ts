export type TagCategory = { name: string; tags: string[]; enabled: boolean; prompt: string }
export type AnalysisTemplate = { name: string; categories: TagCategory[] }
const mood = ["Laughter", "Romance", "Healing", "Tearful", "Scary", "Relaxed"]
const topic = ["Romance", "Family", "School", "Workplace", "Technology / AI", "Sports", "Food", "Anime / Pop Culture", "History"]
const title = ["Name", "Group Name", "Team Name", "Song Title"]
const tags: Record<string, string[]> = { Mood: mood, Topic: topic, Title: title, "Music Genre": ["J-Pop", "Rock", "古典", "Jazz"], "Highlight Type": [], "Event Type": [] }
const make = (name: string, categories: string[]): AnalysisTemplate => ({ name, categories: categories.map(category => ({ name: category, tags: category === "Performance Type" ? (name === "Sports Event" ? ["Aggressive", "Defensive", "Counterattack", "Possession-based", "Technical"] : ["Solo", "Duet", "Band", "Acoustic", "Medley"]) : [...(tags[category] ?? [])], enabled: true, prompt: name === "Concert" && category === "Mood" ? "Analyze the concert clip and identify relevant mood tags." : "" })) })
export const defaultTemplates: AnalysisTemplate[] = [
  make("Concert", ["Mood", "Topic", "Title", "Performance Type", "Music Genre"]),
  make("Reality Show", ["Mood", "Topic", "Title", "Highlight Type"]),
  make("Comedy Show", ["Mood", "Topic", "Highlight Type", "Title"]),
  make("Nostalgia Collection", ["Mood", "Topic", "Highlight Type"]),
  make("Sports Event", ["Mood", "Topic", "Title", "Highlight Type", "Performance Type", "Event Type"]),
]
const key = "kk-lab-analysis-templates-v1"
export function readTemplates(): AnalysisTemplate[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null")
    if (Array.isArray(value) && value.length && value.every(item => typeof item.name === "string" && Array.isArray(item.categories))) return value.map(item => ({ ...item, categories: item.categories.map((category: TagCategory) => ({ ...category, prompt: typeof category.prompt === "string" ? category.prompt : item.name === "Concert" && category.name === "Mood" ? "Analyze the concert clip and identify relevant mood tags." : "" })) }))
  } catch { /* Fall back to demo defaults. */ }
  return structuredClone(defaultTemplates)
}
export function saveTemplates(value: AnalysisTemplate[]) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event("analysis-templates-changed"))
}
