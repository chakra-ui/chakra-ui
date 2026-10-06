import { describe, expect, it } from "vitest"
import transform from "../src/transforms/removed/manual-migrations"
import { applyTransform, applyTransformMultiple } from "./test-utils"

describe("manual-migrations codemod", () => {
  it("flags ChakraProvider theme/resetCSS", async () => {
    const input = `
import { ChakraProvider } from '@chakra-ui/react'
const a = <ChakraProvider theme={theme}><App /></ChakraProvider>
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { ChakraProvider } from '@chakra-ui/react'
      // TODO(chakra-v3): ChakraProvider: pass \`value={system}\` (createSystem) instead of \`theme\`, and set \`preflight\` on the system instead of \`resetCSS\`.
      const a = (
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      )
      "
    `)
  })

  it("flags FocusLock and useToast imports", async () => {
    const input = `
import { FocusLock, useToast, Box } from '@chakra-ui/react'
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "// TODO(chakra-v3): FocusLock was removed — install and use \`react-focus-lock\`.
      import { FocusLock, useToast, Box } from '@chakra-ui/react'
      "
    `)
  })

  it("flags an invalid Input that is not wrapped in Field", async () => {
    const input = `
import { Input } from '@chakra-ui/react'
const a = <Input invalid />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Input } from '@chakra-ui/react'
      // TODO(chakra-v3): Input with an invalid state should be wrapped in <Field.Root invalid> with a <Field.Label>.
      const a = <Input invalid />
      "
    `)
  })

  it("does not flag an invalid Input already inside Field.Root", async () => {
    const input = `
import { Field, Input } from '@chakra-ui/react'
const a = (
  <Field.Root invalid>
    <Input invalid />
  </Field.Root>
)
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Field, Input } from '@chakra-ui/react'
      const a = (
        <Field.Root invalid>
          <Input invalid />
        </Field.Root>
      )
      "
    `)
  })

  it("flags a wrapper component that spreads props into a Chakra component", async () => {
    const input = `
import { Button } from '@chakra-ui/react'
const MyButton = (props) => <Button {...props} colorScheme="blue" />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Button } from '@chakra-ui/react'
      // TODO(chakra-v3): MyButton wraps <Button> and spreads props — review v3 prop changes (colorScheme, isOpen, spacing, …) at its call sites; the codemod can't migrate them through the wrapper.
      const MyButton = (props) => <Button {...props} colorScheme="blue" />
      "
    `)
  })

  it("is idempotent (does not stack duplicate TODOs)", async () => {
    const input = `
import { FocusLock } from '@chakra-ui/react'
`
    const once = await applyTransform(transform, input)
    const twice = await applyTransformMultiple(transform, input, 2)
    expect(twice).toBe(once)
  })
})
