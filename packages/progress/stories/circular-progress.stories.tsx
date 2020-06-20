import * as React from "react"
import { CircularProgress, CircularProgressLabel } from "../src"
import { chakra } from "@chakra-ui/system"

export default {
  title: "Circular Progress",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => (
  <CircularProgress trackColor="whiteAlpha.200" size="120px" value={60} />
)

/**
 * Pass the `size` prop to change the size of the circular progress component
 */
export const withSize = () => <CircularProgress size="120px" value={60} />

/**
 * Pass the `thickness` prop to change the thickness of the circular progress.
 */
export const withThickness = () => (
  <CircularProgress size="120px" value={60} thickness="3px" />
)

export const withLabel = () => (
  <CircularProgress size="120px" value={60}>
    <CircularProgressLabel>60%</CircularProgressLabel>
  </CircularProgress>
)

/**
 * Pass the `value` prop as `undefined` to put the circular progress
 * component in the indeterminate state
 */
export const circularIndeterminate = () => (
  <CircularProgress
    capIsRound
    trackColor="transparent"
    size="50px"
    value={undefined}
  />
)
