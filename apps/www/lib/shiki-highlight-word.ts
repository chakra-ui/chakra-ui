// From: https://github.com/shikijs/shiki/blob/main/packages/transformers/src/transformers/meta-highlight-word.ts
// MIT License
import type { ShikiTransformer } from "shiki"

function parseMetaHighlightWords(meta: string): string[] {
  if (!meta) return []

  // Remove any title="..." or title='...' content first
  const metaWithoutTitle = meta.replace(/title=(["'])(.*?)\1/g, "")

  // https://regex101.com/r/BHS5fd/1
  const match = Array.from(metaWithoutTitle.matchAll(/\/((?:\\.|[^/])+)\//g))

  return (
    match
      // Escape backslashes
      .map((v) => v[1].replace(/\\(.)/g, "$1"))
  )
}

export interface TransformerMetaWordHighlightOptions {
  /**
   * Class for highlighted words
   *
   * @default 'highlighted-word'
   */
  className?: string
}

/**
 * Allow using `/word/` in the code snippet meta to mark highlighted words.
 */
export function transformerMetaWordHighlight(
  options: TransformerMetaWordHighlightOptions = {},
): ShikiTransformer {
  const { className = "highlighted-word" } = options

  return {
    name: "@shikijs/transformers:meta-word-highlight",
    preprocess(code, options) {
      if (!this.options.meta?.__raw) return

      const words = parseMetaHighlightWords(this.options.meta.__raw)
      options.decorations ||= []
      for (const word of words) {
        const indexes = findAllSubstringIndexes(code, word)
        for (const index of indexes) {
          options.decorations.push({
            start: index,
            end: index + word.length,
            properties: {
              class: className,
            },
          })
        }
      }
    },
  }
}

function findAllSubstringIndexes(str: string, substr: string): number[] {
  const indexes = []
  let i = -1
  // eslint-disable-next-line no-cond-assign
  while ((i = str.indexOf(substr, i + 1)) !== -1) indexes.push(i)
  return indexes
}
