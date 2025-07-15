"use client"

import { CodeBlock, type CodeBlockAdapter, For, Stack } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const file = {
  code: `
<div class="container">
  <h1>Hello, world!</h1>
</div>
`,
  language: "html",
  title: "index.html",
}

export const CodeBlockShikiWithSizes = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <Stack gap="8">
        <For each={["sm", "md", "lg"]}>
          {(size) => (
            <CodeBlock.Root
              key={size}
              code={file.code}
              language={file.language}
              size={size}
            >
              <CodeBlock.Header>
                <CodeBlock.Title>(size={size})</CodeBlock.Title>
              </CodeBlock.Header>
              <CodeBlock.Content>
                <CodeBlock.Code>
                  <CodeBlock.CodeText />
                </CodeBlock.Code>
              </CodeBlock.Content>
            </CodeBlock.Root>
          )}
        </For>
      </Stack>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter: CodeBlockAdapter = {
  async loadContext() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark", "github-light"],
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
            theme:
              meta?.colorScheme === "dark" ? "github-dark" : "github-light",
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
