import { Alert } from "@chakra-ui/react"

export const AlertWithoutSnippet = () => {
  return (
    <Alert.Root status="info">
      <Alert.Indicator />
      <Alert.Title>This is the alert title</Alert.Title>
    </Alert.Root>
  )
}
