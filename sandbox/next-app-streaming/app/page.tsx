import { Container, Heading, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"

export default function Home() {
  return (
    <Container py="10" maxW="lg">
      <Heading size="lg" mb="2">
        Acme Store
      </Heading>
      <Text color="fg.muted" mb="6">
        One-pass catalog page. Product details stream reviews in after the
        shell.
      </Text>
      <Link asChild>
        <NextLink href="/stream">Wireless Headphones — $129</NextLink>
      </Link>
    </Container>
  )
}
