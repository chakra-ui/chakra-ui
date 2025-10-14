"use client"

import { CodeBlock, IconButton, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

export const CodeBlockWithMaxLines = () => {
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

const file = {
  code: `import * as React from 'react';
import { CodeBlock } from '@chakra-ui/react';

const Example = () => {
  const code = \`
{
  "name": "My App",
  "version": "1.0.0",
  "description": "A simple web application",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "react": "^18.2.0",
    "axios": "^1.4.0"
  },
  "author": "Developer",
  "license": "MIT"
}
  \`

  return (
    <CodeBlock.Root language="json" code={code}>
      <CodeBlock.Header>
        <CodeBlock.Title>{file.title}</CodeBlock.Title>
      </CodeBlock.Header>
    </CodeBlock.Root>
  );
};

export default Example;
`,
  language: "tsx",
  title: "index.tsx",
}
