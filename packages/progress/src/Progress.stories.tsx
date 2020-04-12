import * as React from "react"
import {
  Progress,
  ProgressLabel,
  CircularProgress,
  CircularProgressLabel,
} from "."

export default {
  title: "Progress",
}

/**
 * Simple linear progress component
 */

export const basicUsage = () => <Progress value={50} />

/**
 * Pass the `colorScheme` prop to change the color of the
 * indicator of the progress component
 */

export const withThemeColor = () => <Progress colorScheme="pink" value={20} />

/**
 * Pass the `value` prop as `undefined` to put the progress component in
 * the indeterminate state
 */

export const linearIndeterminate = () => (
  <Progress margin="20px" colorScheme="red" size="xs" value={undefined} />
)

/**
 * Linear progress with a label
 */

export const labelledLinearProgress = () => (
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

/**
 * Simple circular progress component
 */

export const circularProgress = () => (
  <CircularProgress size="120px" value={60} />
)

/**
 * Pass the `size` prop to change the size of the circular progress component
 */

export const circularProgressSize = () => (
  <CircularProgress size="120px" value={60} />
)

/**
 * Pass the `thickness` prop to change the thickness of the circular progress.
 * The `thickness` prop is a fractional value whose actual value is dependent
 * on the `size` of the circular progress. In this example the circular progress
 * will have a thickness of 50% of size (120px) => 30px
 */

export const circularProgressThickness = () => (
  <CircularProgress size="120px" value={60} thickness={0.5} />
)

/**
 * Circular progress with a label
 */

export const labelledCircularProgress = () => (
  <CircularProgress size="120px" value={60}>
    <CircularProgressLabel>60%</CircularProgressLabel>
  </CircularProgress>
)

/**
 * Pass the `value` prop as `undefined` to put the circular progress
 * component in the indeterminate state
 */

export const circularIndeterminate = () => (
  <CircularProgress trackColor="transparent" size="200px" value={undefined} />
)
