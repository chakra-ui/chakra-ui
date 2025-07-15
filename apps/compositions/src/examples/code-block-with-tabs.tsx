"use client"

import {
  CodeBlock,
  type CodeBlockAdapter,
  IconButton,
  Tabs,
  useTabs,
} from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const files = [
  { title: "Python", language: "python", code: "print('Hello, World!')" },
  {
    title: "TypeScript",
    language: "typescript",
    code: "console.log('Hello, World!')",
  },
  {
    title: "Java",
    language: "java",
    code: "System.out.println('Hello, World!');",
  },
]

export const CodeBlockWithTabs = () => {
  const tabs = useTabs({
    defaultValue: "python",
  })

  const activeTab =
    files.find((file) => file.language === tabs.value) || files[0]

  const otherTabs = files.filter((file) => file.language !== tabs.value)

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <Tabs.RootProvider value={tabs} size="sm" variant="line">
        <CodeBlock.Root code={activeTab.code} language={activeTab.language}>
          <CodeBlock.Header borderBottomWidth="1px">
            <Tabs.List w="full" border="0" ms="-1">
              {files.map((file) => (
                <Tabs.Trigger
                  colorPalette="teal"
                  key={file.language}
                  value={file.language}
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
              <Tabs.Content key={file.language} value={file.language} />
            ))}
            <Tabs.Content pt="1" value={activeTab.language}>
              <CodeBlock.Code>
                <CodeBlock.CodeText />
              </CodeBlock.Code>
            </Tabs.Content>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </Tabs.RootProvider>
    </CodeBlock.AdapterProvider>
  )
}

const shikiAdapter: CodeBlockAdapter = {
  async loadContext() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["python", "typescript", "java"],
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
