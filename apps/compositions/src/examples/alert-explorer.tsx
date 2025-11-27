"use client"

import { Alert, Stack } from "@chakra-ui/react"

export const AlertExplorer = () => {
  return (
    <Stack gap="6" maxW="400px">
      <Alert.Root status="info" variant="subtle">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>
            This is an info alert with a description.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Alert.Root status="success" variant="solid">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>
            Your action was successful and everything worked as expected.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>
            Something went wrong. Please try again.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </Stack>
  )
}
