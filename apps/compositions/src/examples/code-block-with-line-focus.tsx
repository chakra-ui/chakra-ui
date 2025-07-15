"use client"

import { CodeBlock, type CodeBlockAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const file = {
  code: `
const greeting = "Hello, World!"

function sayHello() {
  console.log(greeting);
}

sayHello()
`,
  language: "tsx",
  title: "index.tsx",
}

export const CodeBlockWithLineFocus = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        code={file.code}
        language={file.language}
        meta={{ focusedLineNumbers: [3, 7] }}
      >
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter: CodeBlockAdapter = {
  async loadContext() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark"],
    })
  },
  getHighlighter: (ctx: HighlighterGeneric<any, any> | null) => {
    return ({ code, language, meta }) => {
      if (!ctx) {
        return { code, highlighted: false }
      }

      return {
        highlighted: true,
        code: removeWrapperTags(
          ctx.codeToHtml(code, {
            lang: language,
            theme: "github-dark",
            transformers: [
              {
                line(hast, line) {
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
            ],
          }),
        ),
      }
    }
  },
}

const removeWrapperTags = (html: string): string => {
  return html
    .replace(/<pre[^>]*>/, "")
    .replace(/<\/pre>$/, "")
    .replace(/<code[^>]*>/, "")
    .replace(/<\/code>$/, "")
}
