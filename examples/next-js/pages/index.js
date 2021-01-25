import {
  chakra,
  DarkMode,
  useColorMode,
  useColorModeValue,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Container,
} from "@chakra-ui/react"
import Head from "next/head"
import { Chakra } from "../src/Chakra"
import { useState } from "react"

function Switcher() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("light-man", "dark-man")
  return <button onClick={toggleMode}>Current mode: {text}</button>
}

const InputGrouper = () => {
  const [bool, setBool] = useState(false)
  return (
    <>
      <InputGroup maxWidth="400px">
        <InputLeftElement color="gray.300" fontSize="1.2em" children="$" />
        <Input placeholder="Enter amount" />
        {bool && <InputRightElement children={"C"} />}
      </InputGroup>
      <button onClick={() => setBool((s) => !s)}>Toggle Right Element</button>
      <br />
    </>
  )
}

const Home = () => (
  <Chakra>
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <chakra.div fontSize="20px">Welcome to chakra</chakra.div>
        <Image
          src="https://bit.ly/sage-adebayo"
          fallbackSrc="https://via.placeholder.com/240"
          fit="cover"
          width="400px"
          height="300px"
        />

        <chakra.div bg="gray.800" padding={4}>
          <DarkMode>
            <Button colorScheme="green">Welcome</Button>
          </DarkMode>
        </chakra.div>

        <Input type="tel" placeholder="Phone number" />

        <InputGrouper />

        <Switcher />

        <Stack direction="row" spacing="40px">
          <div>Welcome home</div>
          <div>Welcome home</div>
          <div>Welcome home</div>
        </Stack>
      </main>
    </Container>
  </Chakra>
)

export default Home
