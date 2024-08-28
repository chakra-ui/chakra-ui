import { Logo } from "@/components/logo"
import { Container, Stack, Text } from "@chakra-ui/react"
import NextLink from "next/link"

const resources = [
  {
    name: "GitHub",
    href: "https://github.com/chakra-ui/chakra-ui",
  },
  {
    name: "Twitter",
    href: "https://x.com/chakra_ui",
  },
  {
    name: "Discord",
    href: "https://v2.chakra-ui.com/discord",
  },
]

export const Footer = () => {
  return (
    <footer role="contentinfo">
      <Container py="8">
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align={{ base: "start", md: "center" }}
          gap="8"
        >
          <Stack gap="1" align="start">
            <Logo />
            <Text color="fg.muted">A project by Chakra Systems</Text>
          </Stack>
          <Stack direction="row" gap="8">
            <NextLink href="/docs/get-started/overview/installation">
              Docs
            </NextLink>
            {resources.map((resource) => (
              <a
                key={resource.name}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
              >
                {resource.name}
              </a>
            ))}
          </Stack>
        </Stack>
      </Container>
    </footer>
  )
}
