import reactLogo from "@/assets/react.svg"
import { Button, Center, HStack } from "@chakra-ui/react"
import viteLogo from "/vite.svg"

function App() {
  return (
    <Center flexDir="column" gap="8" minH="dvh">
      <HStack>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </HStack>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </Center>
  )
}

export default App
