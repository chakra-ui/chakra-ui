"use client"

import { CodeBlock, Icon, createShikiAdapter } from "@chakra-ui/react"
import { FaHtml5 } from "react-icons/fa"
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

export const CodeBlockWithTitle = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root code={file.code} language={file.language}>
        <CodeBlock.Header>
          <CodeBlock.Title>
            <Icon as={FaHtml5} color="orange.300" />
            {file.title}
          </CodeBlock.Title>
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

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark", "github-light"],
    })
  },
})
