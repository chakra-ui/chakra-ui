import { Alert } from "@chakra-ui/react"

export const AlertBasic = () => {
  return (
    <Alert.Root status="info" title="This is the alert title">
      <Alert.Indicator />
      <Alert.Title>This is the alert title</Alert.Title>
    </Alert.Root>
  )
}
