import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from "./Alert"

export default {
  title: "Alert",
}

export const Basic = () => (
  <Alert status="error" variant="solid" justifyContent="center">
    <AlertIcon />
    <AlertTitle display="inline-block" mr={2}>
      Your browser is outdated!
    </AlertTitle>
    <AlertDescription display="inline-block">
      Your Chakra experience may be degraded.
    </AlertDescription>
  </Alert>
)

export const Subtle = () => (
  <Alert status="success" maxWidth="sm" mx="auto" alignItems="start">
    <AlertIcon />
    <chakra.div flex="1">
      <AlertTitle>Holy Smokes!</AlertTitle>
      <AlertDescription>Something just happened!</AlertDescription>
    </chakra.div>
  </Alert>
)

export const LeftAccent = () => (
  <Alert variant="left-accent" maxWidth="sm" mx="auto" alignItems="start">
    <AlertIcon />
    <chakra.div flex="1">
      <AlertTitle>Holy Smokes</AlertTitle>
      <AlertDescription>Something just happened!</AlertDescription>
    </chakra.div>
  </Alert>
)

export const TopAccent = () => (
  <Alert variant="top-accent" maxWidth="sm" mx="auto" alignItems="start">
    <AlertIcon />
    <chakra.div flex="1">
      <AlertTitle>Holy Smokes</AlertTitle>
      <AlertDescription>Something just happened!</AlertDescription>
    </chakra.div>
  </Alert>
)
