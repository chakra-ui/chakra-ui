import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/core"
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
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">pages/index.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            fontSize="2xl"
            href="https://chakra-ui.com"
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
