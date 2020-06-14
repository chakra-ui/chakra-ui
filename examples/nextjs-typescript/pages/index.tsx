import Link from "next/link"
import Layout from "../components/Layout"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
} from "@chakra-ui/core"

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>Accordion 1</AccordionButton>
          <AccordionPanel>Welcome home</AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Button colorScheme="red" marginTop="40px">
        Welcome
      </Button>
    </p>
  </Layout>
)

export default IndexPage
