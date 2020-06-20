import * as React from "react"
import { Progress, ProgressLabel } from "../src"
import { chakra } from "@chakra-ui/system"

export default {
  title: "Linear Progress",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => <Progress value={50} />

/**
 * Pass the `colorScheme` prop to change the color of the
 * indicator of the progress component
 */
export const withColorScheme = () => <Progress colorScheme="pink" value={20} />

/**
 * Pass the `value` prop as `undefined` to put the progress component in
 * the indeterminate state
 */
export const indeterminate = () => (
  <Progress margin="20px" colorScheme="red" size="xs" value={undefined} />
)

export const withLabel = () => (
  <Progress value={60}>
    <ProgressLabel>60%</ProgressLabel>
  </Progress>
)

/**
 * Pass the `hasStripe` prop to have a beautiful gradient to create a striped effect
 */

export const withStripe = () => (
  <Progress colorScheme="green" hasStripe value={20} />
)

/**
 * Pass the `size` prop to change the height of the progress component.
 * Allowed `size` values are sm, md, lg
 */
export const withSizes = () => (
  <div>
    <Progress colorScheme="green" size="sm" value={20} />
    <br />
    <Progress colorScheme="green" size="md" value={20} />
    <br />
    <Progress colorScheme="green" size="lg" value={20} />
  </div>
)

/**
 * Pass the `isAnimated` prop combined with the `hasStrip` prop
 * to get a beautifully animated progress component
 */
export const withAnimation = () => (
  <Progress colorScheme="green" hasStripe isAnimated value={20} />
)
