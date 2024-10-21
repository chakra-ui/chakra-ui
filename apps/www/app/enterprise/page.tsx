import { HighlightHeading, Subheading } from "@/components/site/typography"
import { Box, Card, Container, Flex, Span, Stack } from "@chakra-ui/react"
import { Metadata } from "next"
import { LuArrowRightLeft, LuAtom, LuCode, LuLightbulb } from "react-icons/lu"
import { EnterpriseForm } from "./enterprise-form"

export const metadata: Metadata = {
  title: "Enterprise Services",
  description:
    "Get professional support by the Chakra UI creators to optimize and ship your site faster and improve performance.",
  openGraph: {
    images: `/og?title=Enterprise Services`,
  },
}

const items = [
  {
    icon: <LuArrowRightLeft />,
    title: "Migration",
    description: "Migrate your website or application to Chakra v3.x",
  },
  {
    icon: <LuAtom />,
    title: "Design System",
    description: "Build a design system for your enterprise",
  },
  {
    icon: <LuCode />,
    title: "Custom Development",
    description: "Build a custom application for your enterprise",
  },
  {
    icon: <LuLightbulb />,
    title: "Consulting",
    description: "Get professional support by the Chakra UI experts",
  },
]

export default function EnterprisePage() {
  return (
    <Box py="20">
      <Container>
        <Flex
          gap={{ base: "12", md: "20" }}
          align={{ md: "flex-start" }}
          direction={{ base: "column", md: "row" }}
        >
          <Box flex="1">
            <Stack gap={{ base: "5", md: "10" }} mb="20">
              <Stack gap="5" pr="4" maxW="3xl" px="1.5">
                <HighlightHeading as="h1" query="Updates">
                  Enterprise Services
                </HighlightHeading>
                <Subheading>
                  Get professional support by the Chakra UI creators to optimize
                  and ship your site faster and improve performance.
                </Subheading>
              </Stack>
            </Stack>

            <Stack gap="6">
              {items.map((item, index) => (
                <Box fontWeight="medium" spaceX="2" key={index}>
                  <Span
                    asChild
                    color="teal.solid"
                    display="inline-block"
                    me="2"
                  >
                    {item.icon}
                  </Span>
                  {item.title}.
                  <Span color="fg.muted" fontWeight="normal">
                    {item.description}
                  </Span>
                </Box>
              ))}
            </Stack>
          </Box>

          <Card.Root flex="1" variant="outline" size="lg" bg="bg/80">
            <EnterpriseForm />
          </Card.Root>
        </Flex>
      </Container>
    </Box>
  )
}
