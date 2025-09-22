import { CodeBlock, createShikiAdapter } from "@chakra-ui/react"
import type { HighlighterGeneric } from "shiki"

const testCode = `
const greeting = "Hello, World!";
function sayHello() {
  console.log("Hello, World!");
  console.log(greeting);
}
sayHello();
`

// Test case to verify the fixes
export const TestCodeBlockFixes = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Testing CodeBlock Bug Fixes</h2>
      
      {/* Test 1: Verify highlightLines is now 1-based */}
      <h3>1. Line Highlighting (should highlight lines 2 and 5)</h3>
      <CodeBlock.AdapterProvider value={shikiAdapter}>
        <CodeBlock.Root
          code={testCode}
          language="tsx"
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
      <CodeBlock.AdapterProvider value={shikiAdapter}>
        <CodeBlock.Root
          code={testCode}
          language="tsx"
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

      {/* Test 3: Verify focused lines work correctly */}
      <h3>3. Line Focus (lines 3 and 6 should be focused)</h3>
      <CodeBlock.AdapterProvider value={shikiAdapter}>
        <CodeBlock.Root
          code={testCode}
          language="tsx"
          meta={{
            focusedLineNumbers: [3, 6], // Lines 3 and 6 should be focused
          }}
        >
          <CodeBlock.Content>
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </CodeBlock.AdapterProvider>

      {/* Test 4: Combined test - all features together */}
      <h3>4. Combined Test (highlight line 2, add line 5, remove line 4, focus line 6)</h3>
      <CodeBlock.AdapterProvider value={shikiAdapter}>
        <CodeBlock.Root
          code={testCode}
          language="tsx"
          meta={{
            showLineNumbers: true,
            highlightLines: [2],
            addedLineNumbers: [5],
            removedLineNumbers: [4],
            focusedLineNumbers: [6],
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