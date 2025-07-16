"use client"

import { CodeBlock, createHighlightJsAdapter } from "@chakra-ui/react"
import hljs, { type HLJSApi } from "highlight.js"

const file = {
  code: `
<div class="container">
  <h1>Hello, world!</h1>
</div>
`,
  language: "html",
  title: "index.html",
}

export const CodeBlockWithHighlightJs = () => {
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
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const highlightJsAdapter = createHighlightJsAdapter<HLJSApi>({
  hljs,
})
