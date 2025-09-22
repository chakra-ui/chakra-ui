import { CodeBlock, IconButton, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const longCodeExample = {
  code: `
// This is a very long line of code that should demonstrate the horizontal scrolling padding issue
const veryLongVariableName = "This is an extremely long string that will definitely cause horizontal scrolling in the code block container environment"

function anotherVeryLongFunctionNameThatWillCauseHorizontalScrolling() {
  console.log("This line is also very long and should test the right padding when scrolling horizontally")
  return "Make sure there is proper spacing between the text and the right border of the container environment"
}

// Test with different types of content
const config = { veryLongPropertyName: "veryLongValueThatExtendsWayBeyondTheNormalWidthOfACodeBlockContainer", anotherProperty: true }
`,
  language: "tsx",
  title: "horizontal-padding-test.tsx",
}

export const HorizontalPaddingTest = () => {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        maxW="md" // Constrain width to force horizontal scrolling
        code={longCodeExample.code}
        language={longCodeExample.language}
      >
        <CodeBlock.Header>
          <CodeBlock.Title>{longCodeExample.title}</CodeBlock.Title>
          <CodeBlock.CopyTrigger asChild>
            <IconButton variant="ghost" size="2xs">
              <CodeBlock.CopyIndicator />
            </IconButton>
          </CodeBlock.CopyTrigger>
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