import { Accordion, Badge, chakra } from "@chakra-ui/react-next"
import "./index.css"

function App() {
  return (
    <chakra.div p="8" maxW="600px" mx="auto">
      <chakra.h1 fontSize="2xl" fontWeight="bold" mb="4">
        Chakra UI v4 Test
      </chakra.h1>

      <Badge variant="solid" mb="4">
        Experimental
      </Badge>

      <Accordion.Root>
        <Accordion.Item value="one">
          <Accordion.ItemTrigger>Section One</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <chakra.p p="4">Content for section one</chakra.p>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="two">
          <Accordion.ItemTrigger>Section Two</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <chakra.p p="4">Content for section two</chakra.p>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </chakra.div>
  )
}

export default App
