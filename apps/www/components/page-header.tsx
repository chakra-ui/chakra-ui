import {
  Badge,
  Box,
  HStack,
  Heading,
  Link,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import type { StackProps } from "@chakra-ui/react"
import NextLink from "next/link"
import { LuArrowUpRight } from "react-icons/lu"
import { titleCase } from "scule"
import { LLMSCopyWidget } from "./llms-copy-widget"
import { ResourceIcon } from "./resource-icon"
import { Docs } from ".velite"

interface PageHeaderProps {
  data: Docs
}

export const PageHeader = (props: PageHeaderProps) => {
  const { data } = props
  const { title, description, links } = data
  return (
    <Stack gap="4" pb="4" position="relative">
      <Heading as="h1" size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      <Text color="fg.muted">{description}</Text>
      {links && (
        <HStack gap="6" wrap="wrap">
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

      <McpNotice mt="3" mb="4" alignSelf="flex-start" />

      <Box pos="absolute" top="0" right="0" hideBelow="sm">
        <LLMSCopyWidget data={data} />
      </Box>
    </Stack>
  )
}

const McpNotice = (props: StackProps) => (
  <HStack
    display="inline-flex"
    layerStyle="fill.surface"
    px="2"
    py="2"
    rounded="l1"
    colorPalette="purple"
    {...props}
  >
    <Badge variant="solid">AI Tip</Badge>
    <Span textStyle="sm" pe="3">
      Want to skip the docs? Use the{" "}
      <Link asChild variant="underline" fontWeight="medium">
        <NextLink href="/docs/get-started/ai/mcp-server">MCP Server</NextLink>
      </Link>
    </Span>
  </HStack>
)
