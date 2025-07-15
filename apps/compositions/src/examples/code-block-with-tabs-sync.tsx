"use client"

import {
  CodeBlock,
  type CodeBlockAdapter,
  IconButton,
  Stack,
  Tabs,
  useTabs,
} from "@chakra-ui/react"
import { useEffect } from "react"
import type { HighlighterGeneric } from "shiki"

const files = [
  { title: "npm", language: "bash", code: "npm install @chakra-ui/react" },
  {
    title: "yarn",
    language: "bash",
    code: "yarn add @chakra-ui/react",
  },
  {
    title: "bun",
    language: "bash",
    code: "bun install @chakra-ui/react",
  },
]

function useTabsSync(props: { defaultValue: string; storageKey: string }) {
  const { defaultValue, storageKey } = props

  const tabs = useTabs({
    defaultValue,
    onValueChange(details) {
      if (details.value) {
        localStorage.setItem(storageKey, details.value)
        dispatchEvent(
          new StorageEvent("storage", {
            key: storageKey,
            newValue: details.value,
          }),
        )
      }
    },
  })

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      requestAnimationFrame(() => {
        if (e.key === storageKey && e.newValue) {
          tabs.setValue(e.newValue)
        }
      })
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [storageKey, tabs])

  return tabs
}

const CodeTabs = () => {
  const tabs = useTabsSync({
    defaultValue: files[0].title,
    storageKey: "code-tabs-sync",
  })

  const activeTab = files.find((file) => file.title === tabs.value) || files[0]
  const otherTabs = files.filter((file) => file.title !== tabs.value)

  return (
    <Tabs.RootProvider value={tabs} size="sm" variant="line">
      <CodeBlock.Root code={activeTab.code} language={activeTab.language}>
        <CodeBlock.Header borderBottomWidth="1px">
          <Tabs.List w="full" border="0" ms="-1">
            {files.map((file) => (
              <Tabs.Trigger
                colorPalette="teal"
                key={file.title}
                value={file.title}
                textStyle="xs"
              >
                {file.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
        </CodeBlock.Header>
        <CodeBlock.Content>
          {otherTabs.map((file) => (
            <Tabs.Content key={file.title} value={file.title} />
          ))}
          <Tabs.Content pt="1" value={activeTab.title}>
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>
          </Tabs.Content>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </Tabs.RootProvider>
  )
}

export const CodeBlockWithTabsSync = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <Stack gap="8">
        <CodeTabs />
        <CodeTabs />
      </Stack>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter: CodeBlockAdapter = {
  async loadContext() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["bash"],
      themes: ["github-dark"],
    })
  },
  getHighlighter: (ctx: HighlighterGeneric<any, any> | null) => {
    return ({ code, language, meta }) => {
      if (!ctx) {
        return { code, highlighted: false }
      }

      return {
        highlighted: true,
        code: removeWrapperTags(
          ctx.codeToHtml(code, {
            lang: language,
            theme: "github-dark",
            transformers: [
              {
                line(hast, line) {
                  hast.properties ||= {}
                  Object.assign(hast.properties, {
                    "data-line": line,
                    "data-highlight": meta?.highlightLines?.includes(line)
                      ? ""
                      : undefined,
                    "data-word-wrap": meta?.wordWrap ? "" : undefined,
                  })
                },
              },
            ],
          }),
        ),
      }
    }
  },
}

const removeWrapperTags = (html: string): string => {
  return html
    .replace(/<pre[^>]*>/, "")
    .replace(/<\/pre>$/, "")
    .replace(/<code[^>]*>/, "")
    .replace(/<\/code>$/, "")
}
