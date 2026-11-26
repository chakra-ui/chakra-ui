import { CodeBlock, createHighlightJsAdapter } from "@chakra-ui/react"
import { render } from "./core/render"

const code = "/**\n * Adds two numbers\n */\nconst a = 1"

// output of highlight.js 11.12.0 for `code` in typescript
const highlighted =
  '<span class="hljs-comment">/**\n * Adds two numbers\n */</span>\n<span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>'

const hljs = {
  highlight: () => ({ value: highlighted }),
  listLanguages: () => ["typescript"],
  unregisterLanguage: () => {},
}

const adapter = createHighlightJsAdapter<typeof hljs>({
  load: async () => hljs,
  loadSync: () => hljs,
})

const renderCodeBlock = () =>
  render(
    <CodeBlock.AdapterProvider value={adapter}>
      <CodeBlock.Root code={code} language="typescript">
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText data-testid="code-text" />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>,
  )

describe("CodeBlock highlight.js adapter", () => {
  it("renders one top-level element per line", () => {
    const { getByTestId } = renderCodeBlock()
    const codeText = getByTestId("code-text")
    const lines = codeText.querySelectorAll("[data-line]")
    expect(lines).toHaveLength(4)
    lines.forEach((line) => expect(line.parentElement).toBe(codeText))
  })

  it("keeps the token class on every line of a multi-line token", () => {
    const { getByTestId } = renderCodeBlock()
    const lines = getByTestId("code-text").querySelectorAll("[data-line]")
    for (const index of [0, 1, 2]) {
      const comment = lines[index].querySelector(".hljs-comment")
      expect(comment).not.toBeNull()
      expect(comment!.textContent).toBe(code.split("\n")[index])
    }
  })
})
