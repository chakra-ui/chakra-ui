import { blogs, guides } from "@/.velite"
import { GuideCard } from "@/components/guide-card"
import { Subheading } from "@/components/site/typography"
import { Box, Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guides",
  description: "Get quick guides on how to use Chakra UI",
  openGraph: {
    images: `/og?title=Guides`,
  },
}

export default function GuidePage() {
  return (
    <Box py="20" flex="1">
      <Container>
        <Stack gap={{ base: "5", md: "10" }} mb="20">
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
            <Heading as="h1" size="4xl">
              Guides
            </Heading>
            <Subheading>
              A compilation of code samples and tips using Chakra UI.
            </Subheading>
          </Stack>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="6">
          {guides.map((guide, index) => (
            <GuideCard key={index} data={guide} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
