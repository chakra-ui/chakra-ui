import type { CodeBlockAdapter } from "./types"

export const plainTextAdapter: CodeBlockAdapter = {
  getHighlighter:
    () =>
    ({ code }) => ({ code, highlighted: false }),
}

////////////////////////////////////////////////////////////

interface ShikiHighlighterBase {
  codeToHtml: (code: string, options: any) => string
  dispose?: () => void
}

type ShikiHighlighterBaseOptions<T extends ShikiHighlighterBase> = Parameters<
  T["codeToHtml"]
>[1]

export interface ShikiAdapterOptions<T extends ShikiHighlighterBase> {
  load: () => Promise<T>
  loadSync?: () => T
  highlightOptions?: ShikiHighlighterBaseOptions<T>
  theme: string | Record<string, string>
}

export function createShikiAdapter<T extends ShikiHighlighterBase>(
  opts: ShikiAdapterOptions<T>,
): CodeBlockAdapter {
  const { load, loadSync, highlightOptions, theme } = opts
  return {
    loadContextSync: loadSync,
    loadContext: load,
    unloadContext(ctx) {
      ctx?.dispose?.()
    },
    getHighlighter: (ctx) => {
      return ({ code, language, meta }) => {
        if (!ctx) {
          return { code, highlighted: false }
        }

        const colorScheme = meta?.colorScheme || "dark"
        const resolvedTheme =
          typeof theme === "string" ? theme : theme[colorScheme]

        if (!resolvedTheme) {
          throw new Error(`Theme not found for color scheme: ${colorScheme}`)
        }

        return {
          highlighted: true,
          code: removeWrapperTags(
            ctx.codeToHtml(code, {
              theme: resolvedTheme,
              ...highlightOptions,
              lang: language,
              transformers: [
                {
                  line(hast: any, line: number) {
                    hast.properties ||= {}
                    Object.assign(hast.properties, {
                      "data-line": line,
                      "data-highlight": meta?.highlightLines?.includes(line)
                        ? ""
                        : undefined,
                      "data-word-wrap": meta?.wordWrap ? "" : undefined,
                      "data-diff": meta?.addedLineNumbers?.includes(line)
                        ? "added"
                        : meta?.removedLineNumbers?.includes(line)
                          ? "removed"
                          : undefined,
                      "data-focused": meta?.focusedLineNumbers?.includes(line)
                        ? ""
                        : undefined,
                    })
                  },
                },
                ...(highlightOptions?.transformers ?? []),
              ],
            }),
          ),
        }
      }
    },
  }
}

const removeWrapperTags = (html: string): string => {
  return html
    .replace(/<pre[^>]*>/, "")
    .replace(/<\/pre>$/, "")
    .replace(/<code[^>]*>/, "")
    .replace(/<\/code>$/, "")
}

////////////////////////////////////////////////////////////

interface HighlightJsHighlightResult {
  value: string
}

interface HighlightJsHighlighterBase {
  highlight: (...args: any[]) => HighlightJsHighlightResult
  listLanguages: () => string[]
  unregisterLanguage: (language: string) => void
}

interface HighlightJsHighlighterBaseOptions {
  language: string
  ignoreIllegals?: boolean
}

export interface HighlightJsAdapterOptions<
  T extends HighlightJsHighlighterBase,
> {
  load: () => Promise<T>
  loadSync?: () => T
  highlightOptions?: HighlightJsHighlighterBaseOptions
}

export function createHighlightJsAdapter<T extends HighlightJsHighlighterBase>(
  opts: HighlightJsAdapterOptions<T>,
): CodeBlockAdapter {
  const { load, loadSync, highlightOptions } = opts
  return {
    loadContextSync: loadSync,
    loadContext: load,
    unloadContext(ctx) {
      const langs = ctx?.listLanguages?.()
      langs?.forEach((lang: string) => {
        ctx?.unregisterLanguage?.(lang)
      })
    },
    getHighlighter: (ctx) => {
      return ({ code, language = "plaintext", meta }) => {
        if (!ctx) {
          return { code, highlighted: false }
        }

        const hasDiff =
          (meta?.addedLineNumbers?.length ?? 0) > 0 ||
          (meta?.removedLineNumbers?.length ?? 0) > 0

        const result = ctx.highlight(code.trim(), {
          language,
          ...highlightOptions,
        })

        const lines = splitHighlightJsLines(result.value)

        return {
          highlighted: true,
          code: lines
            .map((line: string, index: number) => {
              const lineNumber = index + 1
              const attrs = [
                `data-line="${lineNumber}"`,
                meta?.highlightLines?.includes(lineNumber) && "data-highlight",
                meta?.wordWrap && "data-word-wrap",
                hasDiff &&
                  meta?.addedLineNumbers?.includes(lineNumber) &&
                  `data-diff="added"`,
                hasDiff &&
                  meta?.removedLineNumbers?.includes(lineNumber) &&
                  `data-diff="removed"`,
                meta?.focusedLineNumbers?.includes(lineNumber) &&
                  "data-focused",
              ]
              return `<span ${attrs.filter(Boolean).join(" ")}>${line || " "}</span>`
            })
            .join("\n"),
        }
      }
    },
  }
}

// highlight.js keeps a multi-line token (block comment, template string) in
// one span, so each line closes the spans still open and the next reopens them
const splitHighlightJsLines = (html: string): string[] => {
  const open: string[] = []
  return html.split("\n").map((line) => {
    const prefix = open.join("")
    for (const [tag] of line.matchAll(/<span[^>]*>|<\/span>/g)) {
      if (tag === "</span>") open.pop()
      else open.push(tag)
    }
    return prefix + line + "</span>".repeat(open.length)
  })
}
