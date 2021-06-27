import { useRouter } from "next/router"
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  HStack,
  VStack,
  Text,
  Link,
  extendTheme,
  useClipboard,
  useToast,
} from "@chakra-ui/react"
import PageContainer from "components/page-container"
import Sidebar from "components/sidebar/sidebar"
import { getRoutes } from "layouts/mdx"
import { last, omit } from "lodash"
import { extension } from "theme"
import { useContext, useCallback, useEffect, useState } from "react"
import {
  CodeContainer,
  liveEditorStyle,
  CopyButton,
  liveErrorStyle,
} from "components/codeblock/codeblock"
import theme from "prism-react-renderer/themes/nightOwl"
import { LiveEditor, LiveError, LiveProvider } from "react-live"
import {
  getFromGistId,
  isValidGistId,
  ThemeConfigContext,
} from "components/customizable-theme/helpers"
import { Language } from "prism-react-renderer"

function GistTheme({ onChangeGistId }) {
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      const {
        target: {
          url,
          url: { value },
        },
      } = event
      const fromGistId: string = last(value.split("/"))
      if (!isValidGistId(fromGistId)) {
        return
      }
      url.value = ""
      onChangeGistId(fromGistId)
    },
    [onChangeGistId],
  )

  return (
    <Box as="section" id="gist-theme" pt={12}>
      <Box as="hr" pb={16} />
      <Heading size="md">Import from a public gist URL</Heading>
      <Text>
        Your gist must contain one JavaScript file that is in Common-JS format.
      </Text>
      <Box as="form" p={4} onSubmit={onSubmit}>
        <FormControl id="url">
          <FormLabel>Gist URL</FormLabel>
          <Input type="url" defaultValue="" />
          <FormHelperText>
            eg.
            <Link
              isExternal
              href="https://gist.github.com/tomchentw/989ad340001061726bf2c0734d3739cf"
            >
              https://gist.github.com/tomchentw/989ad340001061726bf2c0734d3739cf
            </Link>
          </FormHelperText>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Import it!
        </Button>
      </Box>
      <Text>The content will be editable in the LiveEditor below.</Text>
    </Box>
  )
}

function LiveTheme({ code, setCode, onApplyCode }) {
  const { hasCopied, onCopy } = useClipboard(code)
  const liveProviderProps = {
    theme,
    language: "javascript" as Language,
    code,
    scope: {
      module: {
        exports: {},
      },
    },
  }
  return (
    <Box as="section" id="live-theme">
      <Heading size="md">Or, try editing here</Heading>
      <LiveProvider {...liveProviderProps}>
        <Box position="relative" zIndex="0" p={4}>
          <CodeContainer>
            <LiveEditor onChange={setCode} style={liveEditorStyle} />
          </CodeContainer>
          <CopyButton onClick={onCopy}>
            {hasCopied ? "copied" : "copy"}
          </CopyButton>
        </Box>
        <LiveError style={liveErrorStyle} />
      </LiveProvider>
      <Button mt={4} colorScheme="teal" onClick={onApplyCode}>
        Apply theme
      </Button>
    </Box>
  )
}

const INITIAL_CODE = `
module.exports = {
  // Your theme here
}
`.trim()

function ApplyTheme() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/docs/")
  const [code, setCode] = useState(INITIAL_CODE)
  const { route, query, replace } = useRouter()
  const toast = useToast()
  const onChangeGistId = useCallback(
    (fromGistId) => {
      getFromGistId(fromGistId).then(({ error, file, localModule }) => {
        if (error) {
          toast({
            title: `Unknown error`,
            description:
              "Please provide a Gist with a CommonJS module, which exports the custom theme.",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
          return
        }
        toast({
          title: `Gist (${fromGistId}) fetched`,
          status: "info",
          duration: 2000,
          isClosable: true,
        })
        setCode(file.content)
        replace({
          pathname: route,
          query: {
            ...query,
            fromGistId,
          },
        })
      })
    },
    [route, query, replace, setCode],
  )
  const setThemeConfig = useContext(ThemeConfigContext)
  useEffect(() => {
    if (!isValidGistId(query.fromGistId)) {
      return
    }
    setThemeConfig({
      gistId: query.fromGistId,
    })
  }, [query.fromGistId, setThemeConfig])
  const onApplyCode = useCallback(() => {
    setThemeConfig({
      code,
    })
    replace({
      pathname: route,
      query: omit(query, ["fromGistId"]),
    })
  }, [code, replace, route, query])

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: `Apply Theme`,
        description: "Try a customized theme on this docs site.",
      }}
    >
      <VStack mt={8} spacing={8} align="stretch">
        <VStack spacing={4} align="stretch">
          <Text>
            In this page, you could play with a custom theme that applies
            directly to this docs site.
          </Text>
          <Text>
            This is fairly useful for the users to experiment with Chakra-UI. It
            also provides a way for organization users to create a public Gist
            that hosts their design system, saving their needs to create a
            customized Chakra-UI documentation site.
          </Text>
          <HStack spacing={[2, 4]}>
            <Button
              as="a"
              colorScheme="teal"
              size="lg"
              variant="solid"
              href="#gist-theme"
            >
              Import from a public Gist
            </Button>
            <Text>or</Text>
            <Button
              as="a"
              colorScheme="teal"
              size="lg"
              variant="outline"
              href="#live-theme"
            >
              Try from a Live Editor
            </Button>
          </HStack>
        </VStack>

        <GistTheme onChangeGistId={onChangeGistId} />
        <LiveTheme code={code} setCode={setCode} onApplyCode={onApplyCode} />
      </VStack>
    </PageContainer>
  )
}

export default ApplyTheme
