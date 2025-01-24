import { Alert, Button } from "@chakra-ui/react"

export const AlertWithButtons = () => {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>This is the alert title</Alert.Title>
        <Alert.Description>This is the alert description</Alert.Description>
      </Alert.Content>
      <Button size="sm" alignSelf="center">
        Action
      </Button>
    </Alert.Root>
  )
}
