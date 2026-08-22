"use client"

import { CodeBlock, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const file = {
  code: `// Example with very long lines that require horizontal scrolling
import { Button, Stack, Container, Text, Heading, Box, Flex, Grid, GridItem, VStack, HStack, Center, Circle, Square, Spacer, Wrap, WrapItem } from "@chakra-ui/react"

const veryLongConfigurationObject = { primaryColor: "#3182ce", secondaryColor: "#805ad5", tertiaryColor: "#38b2ac", backgroundColor: "#ffffff", textColor: "#1a202c", fontSize: "16px", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif" }

function ExampleComponent() {
  const extremelyLongVariableName = "This is an example of a very long string that will definitely cause horizontal scrolling in the code block component to demonstrate the right padding fix"

  return <div>Test</div>
}`,
  language: "tsx",
  title: "horizontal-overflow.tsx",
}

export const CodeBlockWithHorizontalOverflow = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
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

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "scss", "html", "bash", "json"],
      themes: ["github-dark"],
    })
  },
  theme: "github-dark",
})
