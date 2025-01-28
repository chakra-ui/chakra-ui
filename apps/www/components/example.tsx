import { readExampleFile } from "@/lib/composition"
import { highlightCode } from "@/lib/highlight-code"
import { Box, BoxProps, Tabs } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { CopyButton } from "./copy-button"
import { ErrorBoundary } from "./error-boundary"

interface Props {
  name: string
}

function formatComponentName(name: string) {
  return name
    .split(/[-\/]/)
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

interface CodeProps extends Props {
  showCopy?: boolean
  ext?: string
}

export const ExampleCode = async (props: CodeProps) => {
  const { name, showCopy = true, ext = "tsx" } = props
  const content = await readExampleFile(name, ext)
  const html = await highlightCode(content)
  return (
    <>
      <div
        className="code-highlight"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showCopy && (
        <Box pos="absolute" top="4" right="6">
          <CopyButton value={content} />
        </Box>
      )}
    </>
  )
}

interface CodeWrapperProps extends BoxProps {}

export const ExampleCodeWrapper = (props: CodeWrapperProps) => {
  const { children, maxHeight, bg, px = "8", py = "6", ...rest } = props
  return (
    <Box
      height="100%"
      overflow="auto"
      colorScheme="dark"
      pos="relative"
      {...rest}
      css={{
        "& pre": {
          px,
          py,
          maxHeight,
          overflow: "auto",
          my: "0",
          bg,
        },
      }}
    >
      {children}
    </Box>
  )
}

export const Example = (props: Props) => {
  const { name } = props
  if (!name) return null
  return (
    <Box
      className="example-tabs"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      divideY="1px"
    >
      <Box padding="10">
        <ExamplePreview name={name} />
      </Box>
      <ExampleCodeWrapper maxHeight="400px">
        <ExampleCode name={name} />
      </ExampleCodeWrapper>
    </Box>
  )
}

export const ExampleTabs = (props: Props) => {
  const { name } = props
  if (!name) return null
  return (
    <Tabs.Root
      className="example-tabs"
      variant="subtle"
      defaultValue={"preview"}
      mb="4em"
      size="sm"
      unmountOnExit
    >
      <Tabs.List mb="4">
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup borderWidth="1px" rounded="md" overflow="hidden">
        <Tabs.Content value="preview" mt="0!" padding={{ base: "6", sm: "10" }}>
          <ErrorBoundary>
            <ExamplePreview name={name} />
          </ErrorBoundary>
        </Tabs.Content>
        <Tabs.Content value="code" pt="0!">
          <ExampleCodeWrapper maxHeight="480px">
            <ExampleCode name={name} />
          </ExampleCodeWrapper>
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
