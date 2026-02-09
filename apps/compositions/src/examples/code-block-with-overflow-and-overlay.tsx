"use client"

import {
  CodeBlock,
  Float,
  IconButton,
  createShikiAdapter,
} from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const file = {
  code: `// Example with very long lines and maxLines to test overlay positioning
import { Button, Stack, Container, Text, Heading, Box, Flex, Grid, GridItem, VStack, HStack, Center, Circle, Square, Spacer, Wrap, WrapItem } from "@chakra-ui/react"

const veryLongConfigurationObject = { primaryColor: "#3182ce", secondaryColor: "#805ad5", tertiaryColor: "#38b2ac", backgroundColor: "#ffffff", textColor: "#1a202c", fontSize: "16px", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif" }

function ExampleComponent() {
  const extremelyLongVariableName = "This is an example of a very long string that will definitely cause horizontal scrolling in the code block component"
  const anotherLongLine = "This line is also very long to ensure we have enough content that requires both vertical scrolling (maxLines) and horizontal scrolling"
  const yetAnotherLine = "More content here to exceed the maxLines limit and show the Expand code overlay at the bottom of the code block"

  return (
    <div>
      <span>Hello world</span>
    </div>
  )
}

export default ExampleComponent`,
  language: "tsx",
  title: "overflow-overlay-test.tsx",
}

export const CodeBlockWithOverflowAndOverlay = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root code={file.code} language={file.language} maxLines={10}>
        <CodeBlock.Header>
          <CodeBlock.Title>{file.title}</CodeBlock.Title>
          <CodeBlock.Control>
            <CodeBlock.CollapseTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CollapseIndicator />
              </IconButton>
            </CodeBlock.CollapseTrigger>
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </CodeBlock.Control>
        </CodeBlock.Header>
        <CodeBlock.Content>
          <Float placement="top-end" offset="5" zIndex="2">
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </Float>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>

          <CodeBlock.Overlay>
            <CodeBlock.CollapseTrigger>
              <CodeBlock.CollapseText textStyle="sm" />
            </CodeBlock.CollapseTrigger>
          </CodeBlock.Overlay>
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
