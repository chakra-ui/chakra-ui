import React from "react"
import { Link } from "gatsby"
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

import Layout from "../components/layout"
import GatsbyImage from "../components/image"
import SEO from "../components/seo"

function Switcher() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("light-man", "dark-man")
  return <button onClick={toggleMode}>Current mode: {text}</button>
}

const InputGrouper = () => {
  const [bool, setBool] = React.useState(false)
  return (
    <>
      <InputGroup maxWidth="400px">
        <InputLeftElement color="gray.300" fontSize="1.2em" children="$23" />
        <Input placeholder="Enter amount" />
        {bool && <InputRightElement children={"C"} />}
      </InputGroup>
      <button onClick={() => setBool(s => !s)}>Toggle Right Element</button>
      <br />
    </>
  )
}

const IndexPage = () => (
  <Layout>
    <Container>
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
        <InputGroup>
          <InputLeftElement children={"+234"} />
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
        <InputGrouper />
        <Switcher />
        <Stack direction="row" spacing="40px" mb="8">
          <div>Welcome home</div>
          <div>Welcome home</div>
          <div>Welcome home</div>
        </Stack>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <GatsbyImage />
        </div>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </main>
    </Container>
  </Layout>
)

export default IndexPage
