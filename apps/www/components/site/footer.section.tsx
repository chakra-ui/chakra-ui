import { Logo } from "@/components/logo"
import {
  Box,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"

const linkTree = [
  {
    title: "Documentation",
    items: [
      { label: "Components", href: "/docs/components/concepts/overview" },
      { label: "Theming", href: "/docs/theming/overview" },
      { label: "Styling", href: "/docs/styling/overview" },
      { label: "Get Started", href: "/docs/get-started/installation" },
    ],
  },
  {
    title: "Projects",
    items: [
      { label: "Chakra UI Pro", href: "https://pro.chakra-ui.com" },
      { label: "FigPilot", href: "https://figma.chakra-ui.com" },
      { label: "Zag.js", href: "https://zagjs.com" },
      { label: "Ark UI", href: "https://ark-ui.com" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Team", href: "/team" },
      { label: "Discord", href: "https://discord.gg/chakra-ui" },
      { label: "Twitter", href: "https://x.com/chakra_ui" },
      { label: "GitHub", href: "https://github.com/chakra-ui/chakra-ui" },
    ],
  },
]

export const FooterSection = () => {
  return (
    <footer role="contentinfo">
      <Container py="8" fontSize="sm">
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align="flex-start"
          gap="8"
        >
          <Stack align="flex-start">
            <Logo />
            <Text color="fg.muted">
              Project by Chakra Systems &copy; {new Date().getFullYear()}
            </Text>
            <VercelCredit />
            <Text
              color="fg.muted"
              css={{ "& a": { color: "fg", textDecoration: "underline" } }}
            >
              Maintained by{" "}
              <Link href="https://x.com/thesegunadebayo">Sage</Link> and
              contributors
            </Text>
          </Stack>
          <SimpleGrid
            width="full"
            columns={{ base: 1, sm: 3 }}
            gap="10"
            maxW={{ md: "2xl" }}
            pb="20"
          >
            {linkTree.map((column) => (
              <Stack key={column.title} direction="column" gap="4">
                <Text>{column.title}</Text>
                {column.items.map((item) => (
                  <Box key={item.label} asChild color="fg.muted">
                    <Link href={item.href}>{item.label}</Link>
                  </Box>
                ))}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </footer>
  )
}

const VercelCredit = () => (
  <HStack my="6" color="fg.muted" fontSize="sm" fontWeight="medium">
    Deployed on
    <VercelLogo />
  </HStack>
)

const VercelLogo = () => {
  return (
    <svg aria-label="Vercel logo" height="16" role="img" viewBox="0 0 283 64">
      <path
        d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
        fill="currentColor"
      />
    </svg>
  )
}
