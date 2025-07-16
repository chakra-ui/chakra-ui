import type { CodeBlockAdapter } from "./types"

export const plainTextAdapter: CodeBlockAdapter = {
  getHighlighter:
    () =>
    ({ code }) => ({ code, highlighted: false }),
}

////////////////////////////////////////////////////////////

interface ShikiHighlighterBase {
  codeToHtml: (code: string, options: any) => string
}

type ShikiHighlighterBaseOptions<T extends ShikiHighlighterBase> = Parameters<
  T["codeToHtml"]
>[1]

export interface ShikiAdapterOptions<T extends ShikiHighlighterBase> {
  loadShiki: () => Promise<T>
  highlightOptions?: ShikiHighlighterBaseOptions<T>
}

export function createShikiAdapter<T extends ShikiHighlighterBase>(
  opts: ShikiAdapterOptions<T>,
): CodeBlockAdapter {
  const { loadShiki, highlightOptions } = opts
  return {
    loadContext: loadShiki,
    getHighlighter: (ctx) => {
      return ({ code, language, meta }) => {
        if (!ctx) {
          return { code, highlighted: false }
        }

        return {
          highlighted: true,
          code: removeWrapperTags(
            ctx.codeToHtml(code, {
              theme:
                meta?.colorScheme === "dark" ? "github-dark" : "github-light",
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
}

interface HighlightJsHighlighterBaseOptions {
  language: string
  ignoreIllegals?: boolean
}

export interface HighlightJsAdapterOptions<
  T extends HighlightJsHighlighterBase,
> {
  hljs: T
  highlightOptions?: HighlightJsHighlighterBaseOptions
}

export function createHighlightJsAdapter<T extends HighlightJsHighlighterBase>(
  opts: HighlightJsAdapterOptions<T>,
): CodeBlockAdapter {
  const { hljs, highlightOptions } = opts
  return {
    getHighlighter() {
      return ({ code, language = "plaintext", meta }) => {
        const hasDiff =
          (meta?.addedLineNumbers?.length ?? 0) > 0 ||
          (meta?.removedLineNumbers?.length ?? 0) > 0

        const result = hljs.highlight(code.trim(), {
          language,
          ...highlightOptions,
        })

        const lines = result.value.split("\n")

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
                  `data-diff="${meta?.addedLineNumbers?.includes(lineNumber) ? "added" : meta?.removedLineNumbers?.includes(lineNumber) ? "removed" : undefined}"`,
              ]
              return `<span ${attrs.filter(Boolean).join(" ")}>${line || " "}</span>`
            })
            .join("\n"),
        }
      }
    },
  }
}
