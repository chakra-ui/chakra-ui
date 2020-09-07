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

export const withColorScheme = () => <Progress colorScheme="pink" value={20} />

export const indeterminate = () => (
  <Progress margin="20px" colorScheme="cyan" size="xs" isIndeterminate />
)

export const withLabel = () => (
  <Progress value={60}>
    <ProgressLabel>60%</ProgressLabel>
  </Progress>
)

export const withStripe = () => (
  <Progress colorScheme="green" hasStripe value={20} />
)

export const withSizes = () => (
  <div>
    <Progress colorScheme="green" size="sm" value={20} />
    <br />
    <Progress colorScheme="green" size="md" value={20} />
    <br />
    <Progress colorScheme="green" size="lg" value={20} />
  </div>
)

export const withAnimation = () => (
  <Progress colorScheme="green" hasStripe isAnimated value={20} />
)
