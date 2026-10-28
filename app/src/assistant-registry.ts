export const assistantStorageKey = "general-assistants-v2"
export type AssistantRegistryItem = { id: string; name: string; status: string }
export const defaultAssistantRegistry: AssistantRegistryItem[] = [
  { id: "telasa-assistant", name: "General Chatbot", status: "Draft" },
  { id: "newcomer-assistant", name: "New User Chatbot", status: "Draft" },
  { id: "campaign-assistant", name: "Campaign Chatbot", status: "Draft" },
]
export function chatbotName(id: string, name: string): string {
  const legacy: Record<string, string> = { "telasa-assistant": "TELASA 推薦助手", "newcomer-assistant": "新用戶入門助手", "campaign-assistant": "活動專區助手" }
  return legacy[id] === name ? defaultAssistantRegistry.find(item => item.id === id)?.name || name : name
}
export function readAssistantRegistry(): AssistantRegistryItem[] {
  try { const saved = JSON.parse(localStorage.getItem(assistantStorageKey) || "null"); return Array.isArray(saved) ? saved.map(item => ({ ...item, name: chatbotName(item.id, item.name) })) : defaultAssistantRegistry } catch { return defaultAssistantRegistry }
}
