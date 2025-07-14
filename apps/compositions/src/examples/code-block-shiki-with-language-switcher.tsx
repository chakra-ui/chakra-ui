"use client"

import {
  Badge,
  CodeBlock,
  type CodeBlockAdapter,
  HStack,
  IconButton,
  Portal,
  Select,
  Span,
  createListCollection,
  useSelect,
} from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

interface CodeFile {
  value: string
  code: string
  language: string
  title: string
}

const files: CodeFile[] = [
  {
    value: "python",
    code: `
from fern.client import Fern
from fern import EndpointIdentifier, EndpointMethod
client = Fern(
    token="YOUR_TOKEN",
)
client.snippets.get(
    endpoint=EndpointIdentifier(
        method=EndpointMethod.GET,
        path="/v1/search",
    ),
)
`,
    language: "python",
    title: "python.py",
  },
  {
    value: "typescript",
    code: `
    import { FernClient, Fern } from "@fern-api/node-sdk";
const fern = new FernClient({ token: "YOUR_TOKEN" });
await fern.snippets.get({
    endpoint: {
        method: Fern.EndpointMethod.Get,
        path: "/v1/search"
    }
});
    `,
    language: "typescript",
    title: "typescript.ts",
  },
]

export const CodeBlockShikiWithLanguageSwitcher = () => {
  const select = useSelect({
    defaultValue: [files[0].value],
    collection: createListCollection({
      items: files,
      itemToString: (item) => item.value,
      itemToValue: (item) => item.value,
    }),
  })

  const selectedItem = select.selectedItems[0]

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root code={selectedItem.code} language={selectedItem.language}>
        <CodeBlock.Header>
          <HStack flex="1">
            <Badge colorPalette="teal">POST</Badge>
            <Span textStyle="xs">/v1/search</Span>
          </HStack>
          <CodeBlock.Control>
            <FileSelector value={select} />
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
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

function FileSelector(props: Select.RootProviderProps) {
  const { value: select } = props
  return (
    <Select.RootProvider
      size="xs"
      variant="subtle"
      width="fit-content"
      {...props}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {select.collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.value}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.RootProvider>
  )
}

const shikiAdapter: CodeBlockAdapter = {
  async loadContext() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["typescript", "python"],
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
                    "data-diff": meta?.addedLineNumbers?.includes(line)
                      ? "added"
                      : meta?.removedLineNumbers?.includes(line)
                        ? "removed"
                        : undefined,
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
