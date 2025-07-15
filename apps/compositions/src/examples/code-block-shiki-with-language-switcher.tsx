"use client"

import {
  Badge,
  CodeBlock,
  type CodeBlockAdapter,
  HStack,
  Icon,
  IconButton,
  Portal,
  Select,
  Span,
  createListCollection,
  useSelect,
} from "@chakra-ui/react"
import { IoLogoJavascript, IoLogoPython } from "react-icons/io5"
import type { HighlighterGeneric } from "shiki"

interface CodeFile {
  value: string
  code: string
  language: string
  title: string
  icon: React.ReactElement
}

const files: CodeFile[] = [
  {
    value: "python",
    code: `
from github import Github

# Create a Github instance using an access token
g = Github("YOUR_ACCESS_TOKEN")

# Get a repository
repo = g.get_repo("octocat/Hello-World")

# Get repository information
print(f"Repository: {repo.name}")
print(f"Description: {repo.description}")
print(f"Stars: {repo.stargazers_count}")

# List issues
issues = repo.get_issues(state='open')
for issue in issues:
    print(f"Issue #{issue.number}: {issue.title}")
`,
    language: "python",
    title: "python.py",
    icon: <Icon as={IoLogoPython} size="xs" color="orange.500" />,
  },
  {
    value: "typescript",
    code: `
import { Octokit } from "@octokit/rest";

// Create an Octokit instance
const octokit = new Octokit({
  auth: "YOUR_ACCESS_TOKEN",
});

// Get repository information
const { data: repo } = await octokit.rest.repos.get({
  owner: "octocat",
  repo: "Hello-World",
});

console.log(\`Repository: \${repo.name}\`);
console.log(\`Description: \${repo.description}\`);
console.log(\`Stars: \${repo.stargazers_count}\`);

// List issues
const { data: issues } = await octokit.rest.issues.listForRepo({
  owner: "octocat",
  repo: "Hello-World",
  state: "open",
});

issues.forEach((issue) => {
  console.log(\`Issue #\${issue.number}: \${issue.title}\`);
});
    `,
    language: "typescript",
    title: "typescript.ts",
    icon: <Icon as={IoLogoJavascript} size="xs" color="blue.500" />,
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
      <CodeBlock.Root
        code={selectedItem.code}
        language={selectedItem.language}
        size="lg"
      >
        <CodeBlock.Header mb="1">
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
          <CodeBlock.Code fontSize="xs">
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
    <Select.RootProvider size="xs" variant="subtle" {...props}>
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
                {item.icon}
                <Select.ItemText>{item.value}</Select.ItemText>
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
