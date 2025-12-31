import jscodeshift from "jscodeshift"
import { describe, expect, it } from "vitest"
import transformer from "../transforms/props/as-props"

const runTransform = (source: string) => {
  const j = jscodeshift.withParser("tsx")
  const sourceWithImport = `import { Box, Button, IconButton, LinkOverlay, HStack, Flex, ListItem, MenuButton } from "@chakra-ui/react";\n${source}`

  const result = transformer(
    {
      path: "test.tsx", // Just a virtual path for the parser
      source: sourceWithImport,
    },
    { j, jscodeshift: j, report: () => {}, stats: () => {} },
    {},
  )

  return result.split("\n").slice(1).join("\n").trim()
}

describe('Chakra v3 "as" to "asChild" Transformer', () => {
  describe("JSX Nesting Logic", () => {
    it('converts as="a" to nested <a> tag', () => {
      const input = `<Button as="a" href="/home">Click</Button>`
      const output = runTransform(input)
      expect(output).toContain("<Button asChild>")
      expect(output).toContain('<a href="/home">Click</a>')
    })

    it("moves event handlers and refs to the child element", () => {
      const input = `<Button as="button" onClick={fn} ref={ref}>Submit</Button>`
      const output = runTransform(input)
      expect(output).toContain("<Button asChild>")
      expect(output).toContain("<button onClick={fn} ref={ref}>Submit</button>")
    })

    it("keeps chakra style props on the parent", () => {
      const input = `<Box as="section" mt="4" color="red.500" id="main">Content</Box>`
      const output = runTransform(input)
      expect(output).toMatch(/<Box[^>]*asChild[^>]*mt="4"[^>]*color="red\.500"/)
      expect(output).toContain('<section id="main">Content</section>')
    })
  })

  describe("Destructuring & Types", () => {
    it("transforms interface property from ElementType to boolean", () => {
      const input = `interface Props { as?: React.ElementType; }`
      const output = runTransform(input)
      expect(output).toContain("asChild?: boolean;")
    })

    it('handles aliased destructuring: { as: Tag = "div" }', () => {
      const input = `const Comp = ({ as = 'div' }: Props) => <Box as={as} />`
      const output = runTransform(input)
      // It should rename 'as' and internal usage
      expect(output).toContain("({ asChild }: Props)")
      expect(output).toContain("<Box asChild />")
    })
  })

  describe("Complex Edge Cases", () => {
    it("handles MemberExpressions (e.g. as={UI.Button})", () => {
      const input = `const UI = { Button: 'button' };\n<Box as={UI.Button}>Text</Box>`
      const output = runTransform(input)
      expect(output).toContain("<Box asChild>")
      expect(output).toContain("<UI.Button>Text</UI.Button>")
    })

    it('correctly formats self-closing "as" elements', () => {
      const input = `<IconButton as="a" href="/url" icon={<AddIcon />} />`
      const output = runTransform(input)
      expect(output).toContain("<IconButton asChild icon={<AddIcon />}>")
      expect(output).toContain('<a href="/url" />')
    })
  })
})
