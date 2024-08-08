import { StackBasic } from "compositions/examples/stack-basic"
import { StackHorizontal } from "compositions/examples/stack-horizontal"
import { StackWithCustomSeparator } from "compositions/examples/stack-with-custom-separator"
import { StackWithHstack } from "compositions/examples/stack-with-hstack"
import { StackWithResponsiveDirection } from "compositions/examples/stack-with-responsive-direction"
import { StackWithResponsiveSeparator } from "compositions/examples/stack-with-responsive-separator"
import { StackWithSeparator } from "compositions/examples/stack-with-separator"
import { StackWithVstack } from "compositions/examples/stack-with-vstack"

export default {
  title: "Layout / Stack",
}

export const Basic = () => {
  return <StackBasic />
}

export const Horizontal = () => {
  return <StackHorizontal />
}

export const WithHStack = () => {
  return <StackWithHstack />
}

export const WithVStack = () => {
  return <StackWithVstack />
}

export const WithSeparator = () => {
  return <StackWithSeparator />
}

export const WithResponsiveDirection = () => {
  return <StackWithResponsiveDirection />
}

export const WithCustomSeparator = () => {
  return <StackWithCustomSeparator />
}

export const WithResponsiveSeparator = () => {
  return <StackWithResponsiveSeparator />
}
