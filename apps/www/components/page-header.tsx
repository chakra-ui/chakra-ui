import { HStack, Heading, Link, Span, Stack, Text } from "@chakra-ui/react"
import { LuArrowUpRight } from "react-icons/lu"
import { titleCase } from "scule"
import { ResourceIcon } from "./resource-icon"

interface PageHeaderProps {
  title: string
  description: string
  links?: {
    source?: string
    storybook?: string
    recipe?: string
    ark?: string
  }
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description, links } = props
  return (
    <Stack gap="4" pb="4">
      <Heading as="h1" size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      <Text color="fg.muted">{description}</Text>
      {links && (
        <HStack gap="6" mb="4" wrap="wrap">
          {Object.entries(links).map(([title, url]) => (
            <Link
              fontWeight="medium"
              variant="underline"
              fontSize="sm"
              target="_blank"
              color="fg.muted"
              key={title + url}
              href={url}
              _icon={{ fontSize: "1em" }}
            >
              <ResourceIcon type={title} />
              {titleCase(title)}
              <Span color="fg.subtle">
                <LuArrowUpRight />
              </Span>
            </Link>
          ))}
        </HStack>
      )}
    </Stack>
  )
}
