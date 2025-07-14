"use client"

import { CodeBlock, type CodeBlockAdapter } from "@chakra-ui/react"
import hljs from "highlight.js"

const file = {
  code: `
<div class="container">
  <h1>Hello, world!</h1>
</div>
`,
  language: "html",
  title: "index.html",
}

export const CodeBlockHighlightJs = () => {
  return (
    <CodeBlock.AdapterProvider value={highlightJsAdapter}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      />
      <CodeBlock.Root code={file.code} language={file.language}>
        <CodeBlock.Header>
          <CodeBlock.Title>{file.title}</CodeBlock.Title>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText
              rounded="sm"
              fontSize="xs"
              bg="bg.inverted"
              color="fg.inverted"
              p="2.5"
              display="block"
            />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const highlightJsAdapter: CodeBlockAdapter = {
  getHighlighter() {
    return ({ code, language = "plaintext", meta }) => {
      const hasDiff =
        (meta?.addedLineNumbers?.length ?? 0) > 0 ||
        (meta?.removedLineNumbers?.length ?? 0) > 0
      const result = hljs.highlight(code.trim(), { language })
      const lines = result.value.split("\n")
      return {
        highlighted: true,
        code: lines
          .map((line, index) => {
            const lineNumber = index + 1
            const attrs = [
              `data-line="${lineNumber}"`,
              meta?.highlightLines?.includes(lineNumber) && "data-highlight",
              meta?.wordWrap && "data-word-wrap",
              hasDiff &&
                `data-diff="${meta?.addedLineNumbers?.includes(lineNumber) ? "added" : meta?.removedLineNumbers?.includes(lineNumber) ? "removed" : undefined}"`,
            ]
            return `<span class="line" ${attrs.filter(Boolean).join(" ")}>${line || " "}</span>`
          })
          .join("\n"),
      }
    }
  },
}
