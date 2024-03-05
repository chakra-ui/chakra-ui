import { Alert, Container, HStack, Spinner, Stack } from "../src"

export default {
  title: "Feedback / Alert",
  decorators: [(story: Function) => <Container mt="4">{story()}</Container>],
}

export const Basic = () => (
  <Alert.Root>
    <Alert.Icon />
    <HStack spacing="1">
      <Alert.Title>Outdated</Alert.Title>
      <Alert.Description>
        Your Chakra experience may be degraded.
      </Alert.Description>
    </HStack>
  </Alert.Root>
)

export const WithSolidVariant = () => (
  <Alert.Root status="error" variant="solid" borderRadius="md">
    <Alert.Icon />
    <HStack spacing="1">
      <Alert.Title>Outdated</Alert.Title>
      <Alert.Description>
        Your Chakra experience may be degraded.
      </Alert.Description>
    </HStack>
  </Alert.Root>
)

export const WithSubtleVariant = () => (
  <Alert.Root status="success" mx="auto" alignItems="start">
    <Alert.Icon />
    <Stack spacing="1" flex="1">
      <Alert.Title>Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </Stack>
  </Alert.Root>
)

export const WithLeftAccent = () => (
  <Alert.Root variant="left-accent" mx="auto" alignItems="start">
    <Alert.Icon />
    <Stack spacing="1" flex="1">
      <Alert.Title>Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </Stack>
  </Alert.Root>
)

export const WithTopAccent = () => (
  <Alert.Root variant="top-accent" mx="auto" alignItems="flex-start" pt="4">
    <Alert.Icon />
    <Stack spacing="0.5" flex="1">
      <Alert.Title display="block">Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </Stack>
  </Alert.Root>
)

export const WithErrorStatus = () => {
  return (
    <Alert.Root status="error">
      <Alert.Icon />
      There was an error processing your request
    </Alert.Root>
  )
}

export const WithLoadingStatus = () => {
  return (
    <Alert.Root>
      <Alert.Icon>
        <Spinner size="sm" />
      </Alert.Icon>
      We are loading something
    </Alert.Root>
  )
}
