import * as React from "react"
import { chakra } from ".."
import { ChakraComponent } from "../src"

/**
 * These tests should fail
 * if the typings for `ChakraComponent` change
 * and create a type regression
 */
describe("`as` prop typings", () => {
  const Comp = (props: {}) => null

  type CompWithRequiredProps = { thisIsARequiredProp: boolean }
  const CompWithRequired = (props: CompWithRequiredProps) => null

  it("should has correct types for the chakra factory", () => {
    const div = <chakra.div />
    const divWithAsTag = <chakra.div as="img" src="/this-is-the-way.webp" />
    const divWithAsComp = <chakra.div as={Comp} />
    const divWithAsCompRequired = (
      <chakra.div as={CompWithRequired} thisIsARequiredProp />
    )

    // make jest happy
    expect(true).toBe(true)
  })

  it("should has correct types for the ChakraComponent", () => {
    const Div: ChakraComponent<"div"> = (props) => <chakra.div {...props} />
    const CustomComp: ChakraComponent<typeof Comp> = (props) => (
      <chakra.div as={Comp} {...props} />
    )
    const CustomCompWithRequired = chakra(CompWithRequired)

    // TODO this should fail due missing required prop
    const renderedCustomCompWithRequired = <CustomCompWithRequired />

    // make jest happy
    expect(true).toBe(true)
  })
})
