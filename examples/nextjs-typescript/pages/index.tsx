import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/core"
import { ColorModeSwitcher } from "../components/ColorModeSwitcher"
import { Layout } from "../components/Layout"
import { Logo } from "../components/Logo"

const IndexPage = () => (
  <Layout title="Next.js + TypeScript example">
    <Box textAlign="center" fontSize="xl">
      <Grid
        minH="100vh"
        p={3}
        direction="column"
        align="center"
        justify="center"
      >
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">pages/index.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
    </Box>
  </Layout>
)

export default IndexPage
