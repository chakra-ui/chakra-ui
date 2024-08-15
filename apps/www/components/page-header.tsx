import { HStack, Heading, Link, Stack, Text } from "@chakra-ui/react"
import { LuArrowUpRight } from "react-icons/lu"

interface PageHeaderProps {
  title: string
  description: string
  links?: Array<{ title: string; url: string }>
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description, links } = props
  return (
    <Stack gap="4" pb="4">
      <Heading as="h1" size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      <Text fontSize="sm">{description}</Text>
      {links && (
        <HStack gap="6" mb="4">
          {links.map((link) => (
            <Link
              variant="underline"
              fontSize="sm"
              target="_blank"
              color="fg.muted"
              key={link.url}
              href={link.url}
            >
              {link.title}
              <LuArrowUpRight />
            </Link>
          ))}
        </HStack>
      )}
    </Stack>
  )
}
