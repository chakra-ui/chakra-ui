import { readExampleFile } from "@/lib/composition"
import { highlightCode } from "@/lib/highlight-code"
import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import Link from "next/link"

interface Props {
  name: string
}

function formatComponentName(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

export const ExamplePreview = (props: Props) => {
  const { name } = props
  const componentName = formatComponentName(name)
  const Component = dynamic(() =>
    import(`../../compositions/src/examples/${name}`).then(
      (mod) => mod[componentName],
    ),
  )
  return <Component />
}

export const ExampleCode = async (props: Props) => {
  const { name } = props
  const content = await readExampleFile(name)
  const html = await highlightCode(content)
  return (
    <div
      className="code-highlight"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

type CodeWrapperProps = React.PropsWithChildren<{
  maxHeight?: number
}>

export const ExampleCodeWrapper = (props: CodeWrapperProps) => {
  const { children, maxHeight } = props
  return (
    <Box
      height="100%"
      overflow="auto"
      css={{
        position: "relative",
        "& pre": {
          px: "8",
          py: "6",
          maxHeight,
          overflow: "auto",
        },
        "& code": {
          fontSize: "0.82rem",
          fontFamily: "Geist Mono, Menlo, Monaco, 'Courier New', monospace",
          "& *": {
            fontStyle: "normal!",
          },
        },
        _dark: {
          "& :is(.shiki, .shiki span)": {
            color: "var(--shiki-dark)!",
            bg: "var(--shiki-dark-bg)!",
          },
        },
      }}
    >
      {children}
    </Box>
  )
}

interface ExampleItem {
  name: string
  items: { name: string; path: string }[]
}

interface LinkTreeProps {
  path: string
  tree: ExampleItem[]
}

export const ExampleLinkTree = (props: LinkTreeProps) => {
  const { path, tree } = props
  return (
    <Stack gap="4" fontSize="xs">
      {tree.map((category) => (
        <Stack key={category.name} gap="2">
          <Text fontWeight="medium">{category.name}</Text>
          <Stack gap="1">
            {category.items.map((item) => (
              <HStack
                key={item.path}
                asChild
                py="0.5"
                px="2"
                _currentPage={{
                  layerStyle: "fill.subtle",
                  colorPalette: "gray",
                }}
              >
                <Link
                  href={`?name=${item.path}`}
                  aria-current={item.path === path ? "page" : undefined}
                >
                  <Text>{item.name}</Text>
                </Link>
              </HStack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
