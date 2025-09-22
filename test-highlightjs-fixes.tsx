import { CodeBlock, createHighlightJsAdapter } from "@chakra-ui/react"
import hljs from "highlight.js/lib/core"

const testCode = `
const greeting = "Hello, World!";
function sayHello() {
  console.log("Hello, World!");
  console.log(greeting);
}
sayHello();
`

// Test case to verify the HighlightJS adapter fixes
export const TestHighlightJSFixes = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Testing HighlightJS CodeBlock Bug Fixes</h2>
      
      {/* Include HighlightJS CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      />
      
      {/* Test 1: Verify highlightLines is now 1-based */}
      <h3>1. Line Highlighting (should highlight lines 2 and 5)</h3>
      <CodeBlock.AdapterProvider value={highlightJsAdapter}>
        <CodeBlock.Root
          code={testCode}
          language="javascript"
          meta={{
            showLineNumbers: true,
            highlightLines: [2, 5], // Now 1-based - should highlight lines 2 and 5
          }}
        >
          <CodeBlock.Content>
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </CodeBlock.AdapterProvider>

      {/* Test 2: Verify diff symbols align correctly */}
      <h3>2. Diff View (+ symbols should align with green lines, - with red lines)</h3>
      <CodeBlock.AdapterProvider value={highlightJsAdapter}>
        <CodeBlock.Root
          code={testCode}
          language="javascript"
          meta={{
            showLineNumbers: true,
            addedLineNumbers: [2, 5], // Lines 2 and 5 should show + and be green
            removedLineNumbers: [4], // Line 4 should show - and be red
          }}
        >
          <CodeBlock.Content>
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </CodeBlock.AdapterProvider>
    </div>
  )
}

const highlightJsAdapter = createHighlightJsAdapter<typeof hljs>({
  async load() {
    const languages = {
      javascript: () => import("highlight.js/lib/languages/javascript"),
      typescript: () => import("highlight.js/lib/languages/typescript"),
      html: () => import("highlight.js/lib/languages/xml"),
    }
    await Promise.all(
      Object.entries(languages).map(async ([language, file]) => {
        const { default: langModule } = await file()
        hljs.registerLanguage(language, langModule)
      }),
    )
    return hljs
  },
})