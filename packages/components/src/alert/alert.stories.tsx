import { Alert, Container, chakra } from ".."

export default {
  title: "Components / Feedback / Alert",
  decorators: [(story: Function) => <Container mt={4}>{story()}</Container>],
}

export const Basic = () => (
  <Alert.Root status="error" variant="solid" borderRadius="md">
    <Alert.Icon />
    <Alert.Title mr={2}>Outdated</Alert.Title>
    <Alert.Description>
      Your Chakra experience may be degraded.
    </Alert.Description>
  </Alert.Root>
)

export const Subtle = () => (
  <Alert.Root status="success" mx="auto" alignItems="start">
    <Alert.Icon />
    <chakra.div flex="1">
      <Alert.Title>Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </chakra.div>
  </Alert.Root>
)

export const LeftAccent = () => (
  <Alert.Root variant="left-accent" mx="auto" alignItems="start">
    <Alert.Icon />
    <chakra.div flex="1">
      <Alert.Title>Holy Smokes</Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </chakra.div>
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
    <chakra.div flex="1">
      <Alert.Title display="block" mr="2">
        Holy Smokes
      </Alert.Title>
      <Alert.Description>Something just happened!</Alert.Description>
    </chakra.div>
  </Alert.Root>
)

export const DocsExample = () => {
  return (
    <div>
      <Alert.Root status="error">
        <Alert.Icon />
        There was an error processing your request
      </Alert.Root>
    </div>
  )
}

export const LoadingExample = () => {
  return (
    <div>
      <Alert.Root status="loading">
        <Alert.Icon />
        We are loading something
      </Alert.Root>
    </div>
  )
}
