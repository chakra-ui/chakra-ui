"use client"

import { CodeBlock, Float, IconButton, Span } from "@chakra-ui/react"

const file = {
  code: "npm install @chakra-ui/react",
  language: "bash",
  title: "npm install @chakra-ui/react",
}

export const CodeBlockPlainText = () => {
  return (
    <CodeBlock.Root
      code={file.code}
      language={file.language}
      display="inline-flex"
    >
      <CodeBlock.Content>
        <Float placement="middle-end" offsetX="6" zIndex="1">
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </Float>
        <CodeBlock.Code pe="10">
          <Span color="fg.muted" ms="4" userSelect="none">
            $
          </Span>
          <CodeBlock.CodeText display="inline-block" />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}
