import { Button, Container, Heading, Stack } from "@chakra-ui/react"
import { IframeProvider } from "./components/ui/iframe-provider"

function App() {
  return (
    <Container py="8">
      <Heading mb="5">Outside Iframe</Heading>

      <IframeProvider>
        <Stack p="6" align="flex-start" border="1px solid red">
          <Heading>Inside Iframe</Heading>
          <Button>Click me</Button>
        </Stack>
      </IframeProvider>
    </Container>
  )
}

export default App
