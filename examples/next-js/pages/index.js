import { Image } from "@chakra-ui/image"
import { Stack } from "@chakra-ui/layout"
import { chakra, useColorMode } from "@chakra-ui/system"
import Head from "next/head"

function Switcher() {
  const [colorMode, toggleMode] = useColorMode()
  return <button onClick={toggleMode}>Current mode: {colorMode}</button>
}

const Home = () => (
  <div className="container">
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

      <Switcher />

      <Stack direction="row" spacing="40px">
        <div>Welcome home</div>
        <div>Welcome home</div>
        <div>Welcome home</div>
      </Stack>
    </main>
  </div>
)

export default Home
