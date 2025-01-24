import { Alert } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"

export const AlertWithCloseButton = () => {
  return (
    <Alert.Root>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Success!</Alert.Title>
        <Alert.Description>
          Your application has been received. We will review your application
          and respond within the next 48 hours.
        </Alert.Description>
      </Alert.Content>
      <CloseButton pos="relative" top="-2" insetEnd="-2" />
    </Alert.Root>
  )
}
