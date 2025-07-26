"use client"

import { CodeBlock, For, Stack, createShikiAdapter } from "@chakra-ui/react"
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

export const CodeBlockWithSizes = () => {
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

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark", "github-light"],
    })
  },
})
