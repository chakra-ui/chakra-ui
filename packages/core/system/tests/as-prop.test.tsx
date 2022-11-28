/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { chakra, ChakraComponent } from ".."

/**
 * These tests should fail while type checking
 * if the typings for `ChakraComponent` change
 * and create a type regression
 */
describe("`as` prop typings", () => {
  const Comp = (props: {}) => null

  type CompWithRequiredProps = { thisIsARequiredProp: boolean }
  const CompWithRequired = (props: CompWithRequiredProps) => null

  it("should have correct types for the chakra factory", () => {
    const div = <chakra.div />
    const divWithAsTag = <chakra.div as="img" src="/this-is-the-way.webp" />
    const divWithAsComp = <chakra.div as={Comp} />
    const divWithAsCompRequired = (
      <chakra.div as={CompWithRequired} thisIsARequiredProp />
    )

    // make jest happy
    expect(true).toBe(true)
  })

  it("should have correct types for the ChakraComponent", () => {
    const Div: ChakraComponent<"div"> = (props) => <chakra.div {...props} />
    const CustomComp: ChakraComponent<typeof Comp> = (props) => (
      <chakra.div as={Comp} {...props} />
    )
    const CustomCompWithRequired = chakra(CompWithRequired)

    const renderedCustomCompWithRequired = (
      <CustomCompWithRequired thisIsARequiredProp />
    )

    // make jest happy
    expect(true).toBe(true)
  })

  it("should have correct types for the ChakraComponent with additional props", () => {
    const AdditionalPropComp: ChakraComponent<
      "div",
      { additionalProp: boolean }
    > = ({ additionalProp, ...restProps }) => <chakra.div {...restProps} />

    const renderedAdditionPropComp = <AdditionalPropComp additionalProp />

    // make jest happy
    expect(true).toBe(true)
  })

  it("should have correct types for the ChakraComponent with optional additional props", () => {
    const OptionalAdditionalPropComp: ChakraComponent<
      "div",
      { additionalProp?: boolean }
    > = ({ additionalProp, ...restProps }) => <chakra.div {...restProps} />

    const renderedAdditionPropComp = <OptionalAdditionalPropComp />

    // make jest happy
    expect(true).toBe(true)
  })
})
