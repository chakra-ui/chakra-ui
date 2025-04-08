import { Alert, Stack } from "@chakra-ui/react"

export const AlertWithVariants = () => {
  return (
    <Stack gap="4">
      <Alert.Root status="success" variant="subtle">
        <Alert.Indicator />
        <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
      </Alert.Root>

      <Alert.Root status="success" variant="solid">
        <Alert.Indicator />
        <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
      </Alert.Root>

      <Alert.Root status="success" variant="surface">
        <Alert.Indicator />
        <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
      </Alert.Root>
    </Stack>
  )
}
