import { useEffect } from "react"
import { translate, translateTag, type Locale } from "@/i18n"

type TranslatorInstance = { translate: (text: string) => Promise<string> }
type TranslatorFactory = {
  availability: (options: { sourceLanguage: string; targetLanguage: string }) => Promise<string>
  create: (options: { sourceLanguage: string; targetLanguage: string }) => Promise<TranslatorInstance>
}

const originalText = new WeakMap<Text, string>()
const originalAttributes = new WeakMap<Element, Map<string, string>>()
const translatorCache = new Map<string, Promise<TranslatorInstance | null>>()
const translationCache = new Map<string, Promise<string>>()

function sourceLanguage(text: string) {
  if (/[぀-ヿ]/.test(text)) return "ja"
  if (/[㐀-鿿]/.test(text)) return "zh"
  return "en"
}

function shouldTranslate(text: string) {
  const value = text.trim()
  return value.length > 1 && !/^(?:[\d\W_]+|[A-Z]{2,8}-\d+|https?:\/\/\S+)$/u.test(value)
}

function browserTranslator(source: string, target: string) {
  const key = `${source}:${target}`
  if (!translatorCache.has(key)) translatorCache.set(key, (async () => {
    const factory = (globalThis as typeof globalThis & { Translator?: TranslatorFactory }).Translator
    if (!factory || source === target) return null
    const availability = await factory.availability({ sourceLanguage: source, targetLanguage: target })
    if (availability === "unavailable") return null
    try { return await factory.create({ sourceLanguage: source, targetLanguage: target }) } catch { return null }
  })())
  return translatorCache.get(key)!
}

async function machineTranslate(locale: Locale, value: string) {
  if (locale === "en") return value
  const direct = translate(locale, value)
  if (direct !== value) return direct
  const tag = translateTag(locale, value)
  if (tag !== value) return tag
  const source = sourceLanguage(value)
  if (source === locale) return value
  const key = `${source}:${locale}:${value}`
  if (!translationCache.has(key)) translationCache.set(key, (async () => {
    const translator = await browserTranslator(source, locale)
    if (!translator) return value
    try { return await translator.translate(value) } catch { return value }
  })())
  return translationCache.get(key)!
}

function skipped(element: Element | null) {
  return !element || Boolean(element.closest('[translate="no"], [data-no-translate], script, style, code, pre, video, audio'))
}

export function useSiteMachineTranslation(locale: Locale) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-TW" : locale
    let cancelled = false
    const translateNode = async (node: Text) => {
      const parent = node.parentElement
      if (skipped(parent)) return
      const current = node.nodeValue ?? ""
      if (!originalText.has(node)) originalText.set(node, current)
      const original = originalText.get(node) ?? current
      if (locale === "en") { if (node.nodeValue !== original) node.nodeValue = original; return }
      if (!shouldTranslate(original)) return
      const leading = original.match(/^\s*/)?.[0] ?? ""
      const trailing = original.match(/\s*$/)?.[0] ?? ""
      const value = original.trim()
      const result = await machineTranslate(locale, value)
      const next = `${leading}${result}${trailing}`
      if (!cancelled && node.isConnected && node.nodeValue !== next) node.nodeValue = next
    }
    const translateElement = async (element: Element) => {
      if (skipped(element)) return
      for (const name of ["placeholder", "title", "aria-label"]) {
        const current = element.getAttribute(name)
        if (!current) continue
        let originals = originalAttributes.get(element)
        if (!originals) { originals = new Map(); originalAttributes.set(element, originals) }
        if (!originals.has(name)) originals.set(name, current)
        const original = originals.get(name) ?? current
        if (locale === "en") { element.setAttribute(name, original); continue }
        if (!shouldTranslate(original)) continue
        const result = await machineTranslate(locale, original)
        if (!cancelled && element.isConnected) element.setAttribute(name, result)
      }
    }
    const process = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) void translateNode(root as Text)
      if (root.nodeType === Node.ELEMENT_NODE) {
        const element = root as Element
        void translateElement(element)
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT)
        let current: Node | null
        while ((current = walker.nextNode())) {
          if (current.nodeType === Node.TEXT_NODE) void translateNode(current as Text)
          else void translateElement(current as Element)
        }
      }
    }
    process(document.body)
    const observer = new MutationObserver(records => records.forEach(record => {
      if (record.type === "characterData") process(record.target)
      record.addedNodes.forEach(process)
    }))
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    return () => { cancelled = true; observer.disconnect() }
  }, [locale])
}
