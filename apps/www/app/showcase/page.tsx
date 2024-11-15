import { Subheading } from "@/components/site/typography"
import {
  Box,
  Card,
  Container,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { showcases } from ".velite"

export const metadata: Metadata = {
  title: "Showcase",
  description: "A collection of beautiful websites that are built in Chakra UI",
  openGraph: {
    images: `/og?title=Showcase`,
  },
}

export default function ShowcasePage() {
  return (
    <Box py="20" width="full">
      <Container>
        <Stack gap={{ base: "5", md: "10" }} mb="20">
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
            <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
              Showcase
            </Heading>
            <Subheading>Beautiful websites built with Chakra UI</Subheading>
          </Stack>
        </Stack>

        <SimpleGrid minChildWidth="420px" gap="6">
          {showcases.map(({ title, description, url, image }) => (
            <Card.Root
              size="sm"
              key={url}
              asChild
              cursor="pointer"
              overflow="hidden"
              focusVisibleRing="inside"
            >
              <Link href={url}>
                <Image
                  src={`/${image}`}
                  alt={title}
                  width={420}
                  height={236}
                  objectFit="cover"
                />

                <Card.Body gap="1">
                  <Card.Title textStyle="sm">{title}</Card.Title>
                  <Card.Description textStyle="xs">
                    {description}
                  </Card.Description>
                </Card.Body>
              </Link>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
