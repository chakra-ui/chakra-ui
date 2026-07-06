import { Container, Stack } from "@chakra-ui/react"
import { QuoteCard } from "../quote-card"
import { StoryMeta } from "../story-meta"

export default function TestPage() {
  return (
    <Container maxW="5xl">
      <Stack gap="10" mt="12">
        <QuoteCard quote="I love Chakra UI" description="John Doe" />
        <StoryMeta
          data={{
            company: "Chakra UI",
            logo: "/shipped/tree-structured-planning-logo.svg",
            url: "https://treestructuredplanning.com/",
            authorName: "John Doe",
            authorTitle: "CEO & Founder",
            authorAvatar: "/shipped/steven-secreti.png",
            category: "AI Collaboration",
            publishedAt: new Date("2021-01-01"),
          }}
        />
        <QuoteCard
          quote="I love Chakra UI"
          image="/shipped/steven-secreti.png"
        />
      </Stack>
    </Container>
  )
}
