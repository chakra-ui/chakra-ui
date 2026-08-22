"use client"

import {
  CodeBlock,
  HStack,
  Span,
  Splitter,
  Stack,
  createShikiAdapter,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { LuFile, LuFolder } from "react-icons/lu"
import type { HighlighterGeneric } from "shiki"

type FileNode = {
  name: string
  type: "file" | "folder"
  id?: string
  children?: FileNode[]
}

const fileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "App.tsx", type: "file", id: "app" },
      { name: "index.tsx", type: "file", id: "index" },
    ],
  },
  { name: "package.json", type: "file", id: "package" },
]

export const SplitterIdeLayout = () => {
  const [activeFileId, setActiveFileId] = useState<string>("app")
  const activeFile = fileContents[activeFileId] || fileContents.app

  return (
    <CodeBlockAdapter>
      <Splitter.Root
        defaultSize={[20, 80]}
        panels={[
          { id: "explorer", collapsible: true, collapsedSize: 0, minSize: 10 },
          { id: "editor-terminal", minSize: 50 },
        ]}
        borderWidth="1px"
        minH="600px"
        className="dark"
        colorPalette="gray"
      >
        {/* File Explorer */}
        <Splitter.Panel id="explorer" bg="bg" color="fg">
          <Stack
            gap="1"
            p="2"
            h="full"
            width="full"
            overflowY="auto"
            overflowX="hidden"
          >
            <FileTree
              nodes={fileTree}
              activeFileId={activeFileId}
              onFileClick={setActiveFileId}
            />
          </Stack>
        </Splitter.Panel>

        <Splitter.ResizeTrigger id="explorer:editor-terminal" />

        {/* Editor + Terminal Container */}
        <Splitter.Panel id="editor-terminal">
          <Splitter.Root
            defaultSize={[70, 30]}
            panels={[
              { id: "editor", minSize: 30 },
              {
                id: "terminal",
                collapsible: true,
                collapsedSize: 5,
                minSize: 15,
              },
            ]}
            orientation="vertical"
            h="full"
          >
            {/* Editor */}
            <Splitter.Panel id="editor">
              <Editor
                activeFileId={activeFileId}
                activeFile={activeFile}
                fileTree={fileTree}
              />
            </Splitter.Panel>

            <Splitter.ResizeTrigger id="editor:terminal" />

            {/* Terminal */}
            <Splitter.Panel id="terminal">
              <Terminal output={terminalOutput} />
            </Splitter.Panel>
          </Splitter.Root>
        </Splitter.Panel>
      </Splitter.Root>
    </CodeBlockAdapter>
  )
}

////////////////////////////////////////////////////////////////////////////////

type FileTreeProps = {
  nodes: FileNode[]
  activeFileId: string
  onFileClick: (fileId: string) => void
}

const FileTree = ({ nodes, activeFileId, onFileClick }: FileTreeProps) => {
  const renderFileTree = (fileNodes: FileNode[], level = 0) => {
    return fileNodes.map((node) => {
      if (node.type === "folder") {
        return (
          <Stack
            key={node.name}
            gap="0.5"
            ps={level > 0 ? "4" : "0"}
            width="full"
          >
            <HStack gap="2" px="2" py="1" textStyle="sm" flexShrink="0">
              <LuFolder style={{ flexShrink: 0 }} />
              <Span truncate>{node.name}</Span>
            </HStack>
            {node.children && (
              <Stack gap="0.5">
                {renderFileTree(node.children, level + 1)}
              </Stack>
            )}
          </Stack>
        )
      }

      const isActive = node.id === activeFileId
      return (
        <HStack
          width="full"
          key={node.id}
          gap="2"
          pe="2"
          ps={level * 4 + 2}
          py="1"
          rounded="l2"
          textStyle="sm"
          cursor="pointer"
          data-current={isActive || undefined}
          flexShrink="0"
          _current={{ bg: "bg.emphasized", color: "yellow.solid" }}
          onClick={() => node.id && onFileClick(node.id)}
        >
          <LuFile style={{ flexShrink: 0 }} />
          <Span truncate>{node.name}</Span>
        </HStack>
      )
    })
  }

  return (
    <Stack gap="0.5" width="full">
      {renderFileTree(nodes)}
    </Stack>
  )
}

////////////////////////////////////////////////////////////////////////////////

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "ts", "js", "json", "bash"],
      themes: ["github-dark"],
    })
  },
  theme: "github-dark",
})

const CodeBlockAdapter = (props: React.PropsWithChildren) => (
  <CodeBlock.AdapterProvider value={shikiAdapter}>
    {props.children}
  </CodeBlock.AdapterProvider>
)

type EditorProps = {
  activeFileId: string
  activeFile: { code: string; language: string }
  fileTree: FileNode[]
}

const Editor = ({ activeFileId, activeFile, fileTree }: EditorProps) => {
  const fileName =
    fileTree
      .flatMap((node) =>
        node.type === "folder" ? node.children || [] : [node],
      )
      .find((node) => node.id === activeFileId)?.name || "App.tsx"

  return (
    <CodeBlock.Root
      code={activeFile.code}
      language={activeFile.language}
      h="full"
      rounded="none"
      size="sm"
    >
      <CodeBlock.Header>
        <CodeBlock.Title>{fileName}</CodeBlock.Title>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}

////////////////////////////////////////////////////////////////////////////////

type TerminalProps = {
  output: string
}

const Terminal = ({ output }: TerminalProps) => {
  return (
    <CodeBlock.Root
      code={output}
      language="bash"
      h="full"
      rounded="none"
      size="sm"
    >
      <CodeBlock.Header>
        <CodeBlock.Title>Terminal</CodeBlock.Title>
      </CodeBlock.Header>
      <CodeBlock.Content>
        <CodeBlock.Code>
          <CodeBlock.CodeText />
        </CodeBlock.Code>
      </CodeBlock.Content>
    </CodeBlock.Root>
  )
}

////////////////////////////////////////////////////////////////////////////////

const fileContents: Record<string, { code: string; language: string }> = {
  app: {
    code: `import { useState } from "react"
  
  export const Counter = () => {
    const [count, setCount] = useState(0)
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    )
  }`,
    language: "tsx",
  },
  index: {
    code: `import React from "react"
  import ReactDOM from "react-dom/client"
  import App from "./App"
  
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )`,
    language: "tsx",
  },
  package: {
    code: `{
    "name": "my-app",
    "version": "1.0.0",
    "scripts": {
      "dev": "vite",
      "build": "vite build"
    },
    "dependencies": {
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    }
  }`,
    language: "json",
  },
}

const terminalOutput = `$ npm run dev
  
  > dev@1.0.0 dev
  > vite
  
    VITE v5.0.0  ready in 234 ms
  
    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h + enter to show help`
