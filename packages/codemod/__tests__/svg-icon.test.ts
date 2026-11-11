import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/svg-icon"
import { applyTransform } from "./test-utils"

describe("svg-icon codemod", () => {
  it("wraps custom SVG children in <svg> with asChild and moves viewBox", async () => {
    const input = `
import { Icon } from '@chakra-ui/react'
const a = (
  <Icon viewBox="0 0 24 24" color="red.500">
    <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
  </Icon>
)
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Icon } from '@chakra-ui/react'
      const a = (
        <Icon color="red.500" asChild>
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
          </svg>
        </Icon>
      )
      "
    `)
  })

  it("leaves react-icons style <Icon as={X} /> untouched (no viewBox/children)", async () => {
    const input = `
import { Icon } from '@chakra-ui/react'
const a = <Icon as={LuCheck} boxSize={6} />
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Icon } from '@chakra-ui/react'
      const a = <Icon as={LuCheck} boxSize={6} />
      "
    `)
  })

  it("is idempotent — already-migrated icons are skipped", async () => {
    const input = `
import { Icon } from '@chakra-ui/react'
const a = (
  <Icon asChild>
    <svg viewBox="0 0 24 24">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  </Icon>
)
`
    expect(await applyTransform(transform, input)).toMatchInlineSnapshot(`
      "import { Icon } from '@chakra-ui/react'
      const a = (
        <Icon asChild>
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
        </Icon>
      )
      "
    `)
  })
})
