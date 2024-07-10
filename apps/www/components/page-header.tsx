import { HStack, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { LuArrowUpRight } from "react-icons/lu"

interface PageHeaderProps {
  title: string
  description: string
  links?: Array<{ label: string; href: string }>
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description, links } = props
  return (
    <Stack gap="4" pb="6">
      <Heading as="h1" size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      <Text>{description}</Text>
      {links && (
        <HStack gap="6" mt="4" mb="3">
          {links.map((link) => (
            <Link
              variant="underline"
              fontSize="sm"
              target="_blank"
              color="fg.subtle"
              key={link.href}
              href={link.href}
            >
              {link.label}
              <LuArrowUpRight />
            </Link>
          ))}
        </HStack>
      )}
    </Stack>
  )
}
