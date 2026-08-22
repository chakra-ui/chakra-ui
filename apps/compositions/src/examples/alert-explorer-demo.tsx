import { Alert } from "@chakra-ui/react"

export const AlertExplorerDemo = () => {
  return (
    <Alert.Root status="info" variant="subtle">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Information</Alert.Title>
        <Alert.Description>
          This is an info alert with a description.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
