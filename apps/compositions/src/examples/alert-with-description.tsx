import { Alert } from "@chakra-ui/react"

export const AlertWithDescription = () => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Invalid Fields</Alert.Title>
        <Alert.Description>
          Your form has some errors. Please fix them and try again.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}
