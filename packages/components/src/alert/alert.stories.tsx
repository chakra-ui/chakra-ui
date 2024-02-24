import { Alert, Box, Container } from ".."

export default {
  title: "Feedback / Alert",
  decorators: [(story: Function) => <Container mt={4}>{story()}</Container>],
}

export const Basic = () => (
  <Alert.Root>
    <Alert.Icon />
    <Alert.Title mr={2}>Outdated</Alert.Title>
    <Alert.Description>
      Your Chakra experience may be degraded.
    </Alert.Description>
  </Alert.Root>
)

export const WithSolidVariant = () => (
  <Alert.Root status="error" variant="solid" borderRadius="md">
    <Alert.Icon />
    <Alert.Title mr={2}>Outdated</Alert.Title>
    <Alert.Description>
      Your Chakra experience may be degraded.
    </Alert.Description>
  </Alert.Root>
)

export const WithSubtleVariant = () => (
  <Alert.Root status="success" mx="auto" alignItems="start">
    <Alert.Icon />
    <Box flex="1">
      <Alert.Title>Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </Box>
  </Alert.Root>
)

export const WithLeftAccent = () => (
  <Alert.Root variant="left-accent" mx="auto" alignItems="start">
    <Alert.Icon />
    <Box flex="1">
      <Alert.Title>Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </Box>
  </Alert.Root>
)

export const TopAccent = () => (
  <Alert.Root
    variant="top-accent"
    mx="auto"
    alignItems="flex-start"
    pt="3"
    rounded="md"
  >
    <Alert.Icon />
    <Box flex="1">
      <Alert.Title display="block" mr="2">
        Holy Smokes
      </Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </Box>
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
    <Alert.Root status="loading">
      <Alert.Icon />
      We are loading something
    </Alert.Root>
  )
}
