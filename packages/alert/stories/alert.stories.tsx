import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Container } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "../src"

export default {
  title: "Components / Feedback / Alert",
  decorators: [(story: Function) => <Container mt={4}>{story()}</Container>],
}

export const Basic = () => (
  <Alert status="error" variant="solid" borderRadius="md">
    <AlertIcon />
    <AlertTitle mr={2}>Outdated</AlertTitle>
    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
  </Alert>
)

export const Subtle = () => (
  <Alert status="success" mx="auto" alignItems="start">
    <AlertIcon />
    <chakra.div flex="1">
      <AlertTitle>Holy Smokes</AlertTitle>
      <AlertDescription>Something just happened!</AlertDescription>
    </chakra.div>
  </Alert>
)

export const LeftAccent = () => (
  <Alert variant="left-accent" mx="auto" alignItems="start">
    <AlertIcon />
    <chakra.div flex="1">
      <AlertTitle>Holy Smokes</AlertTitle>
      <AlertDescription>Something just happened!</AlertDescription>
    </chakra.div>
  </Alert>
)

export const TopAccent = () => (
  <Alert
    variant="top-accent"
    mx="auto"
    alignItems="flex-start"
    pt="3"
    rounded="md"
  >
    <AlertIcon />
    <chakra.div flex="1">
      <AlertTitle display="block" mr="2">
        Holy Smokes
      </AlertTitle>
      <AlertDescription>Something just happened!</AlertDescription>
    </chakra.div>
  </Alert>
)

export const DocsExample = () => {
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request
      </Alert>
    </div>
  )
}

export const LoadingExample = () => {
  return (
    <div>
      <Alert status="loading">
        <AlertIcon />
        We are loading something
      </Alert>
    </div>
  )
}
