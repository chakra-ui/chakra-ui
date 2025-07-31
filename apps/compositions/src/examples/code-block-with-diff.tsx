"use client"

import { CodeBlock, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const file = {
  code: `
const greeting = "Hello, World!"; 
function sayHello() {
  console.log("Hello, World!"); 
  console.log(greeting); 
}
sayHello();
`,
  language: "tsx",
  title: "index.tsx",
}

export const CodeBlockWithDiff = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        code={file.code}
        language={file.language}
        meta={{
          showLineNumbers: true,
          addedLineNumbers: [1, 4],
          removedLineNumbers: [3],
        }}
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

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark", "github-light"],
    })
  },
})
