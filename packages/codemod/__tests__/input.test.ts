import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/input"
import { applyTransform } from "./test-utils"

describe("input codemod", () => {
  it("converts focusBorderColor/errorBorderColor string values to css vars", async () => {
    const input = `
import { Input } from '@chakra-ui/react'
const a = <Input focusBorderColor="blue.500" errorBorderColor="red.500" />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Input } from '@chakra-ui/react'
      const a = (
        <Input css={{ '--focus-color': 'blue.500', '--error-color': 'red.500' }} />
      )
      "
    `)
  })

  it("converts expression values on Textarea", async () => {
    const input = `
import { Textarea } from '@chakra-ui/react'
const a = <Textarea focusBorderColor={brand} />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Textarea } from '@chakra-ui/react'
      const a = <Textarea css={{ '--focus-color': brand }} />
      "
    `)
  })

  it("merges into an existing css prop", async () => {
    const input = `
import { Input } from '@chakra-ui/react'
const a = <Input css={{ color: 'red' }} focusBorderColor="blue.500" />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Input } from '@chakra-ui/react'
      const a = <Input css={{ color: 'red', '--focus-color': 'blue.500' }} />
      "
    `)
  })

  it("ignores non-Chakra Input", async () => {
    const input = `
const a = <Input focusBorderColor="blue.500" />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "const a = <Input focusBorderColor="blue.500" />
      "
    `)
  })
})
