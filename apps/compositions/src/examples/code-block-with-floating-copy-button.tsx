"use client"

import {
  CodeBlock,
  Float,
  IconButton,
  createShikiAdapter,
} from "@chakra-ui/react"
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

export const CodeBlockWithFloatingCopyButton = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root code={file.code} language={file.language}>
        <CodeBlock.Content>
          <Float placement="top-end" offset="5" zIndex="1">
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </Float>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async loadShiki() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark", "github-light"],
    })
  },
})
