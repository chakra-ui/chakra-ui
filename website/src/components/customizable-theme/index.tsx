import {
  ChakraProvider,
  useToast,
  extendTheme,
  Center,
  Link,
  Box,
  Button,
  Text,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { extension } from "theme"
import { useState, useEffect, useCallback } from "react"
import useLocalStorageExpired from "hooks/use-local-storage-expired"
import {
  ThemeConfigContext,
  File,
  isValidGistId,
  getFromGistId,
} from "./helpers"

const initialTheme = extendTheme(extension)

export function CustomizableThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  return (
    <ChakraProvider theme={theme}>
      <ThemeConfigProvider setTheme={setTheme}>{children}</ThemeConfigProvider>
    </ChakraProvider>
  )
}

type ThemeConfig = {
  gistId?: string
}

function ThemeConfigProvider({ setTheme, children }) {
  const [
    themeConfig,
    setThemeConfig,
    removeThemeConfig,
  ] = useLocalStorageExpired<ThemeConfig>("theme-config")
  const onReset = useCallback(() => {
    removeThemeConfig()
    setTheme(initialTheme)
  }, [removeThemeConfig, setTheme])

  return (
    <>
      {themeConfig && isValidGistId(themeConfig?.gistId) && (
        <FetchAndDisplayThemeConfig
          themeConfig={themeConfig}
          onReset={onReset}
          setTheme={setTheme}
        />
      )}
      <ThemeConfigContext.Provider value={setThemeConfig}>
        {children}
      </ThemeConfigContext.Provider>
    </>
  )
}

function FetchAndDisplayThemeConfig({ themeConfig, onReset, setTheme }) {
  const toast = useToast()
  const [file, setFile] = useState<File>()

  useEffect(() => {
    const description = file
      ? false
      : /* Only show on the first render from localStorage */ "The Gist Id is read from the localStored with 1 day expiration."

    getFromGistId(themeConfig.gistId).then(({ error, file, localModule }) => {
      if (error) {
        return
      }
      setFile(file)
      const finalTheme = extendTheme(extension, localModule.exports)
      console.log(finalTheme)
      setTheme(finalTheme)
      toast({
        title: `Applied theme from Gist (${themeConfig.gistId})`,
        description,
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    })
  }, [themeConfig])

  if (!file) {
    return <noscript />
  }
  return (
    <Center py="4" px="6" bgColor="tomato" color="white" textAlign="center">
      <Text
        fontSize="lg"
        fontWeight="medium"
        maxW={{ base: "32ch", md: "unset" }}
      >
        Gist{" "}
        {
          <Link
            href={`https://gists,github.com/${themeConfig.gistId}`}
            ms="2"
            color="whiteAlpha.900"
            fontSize="md"
            fontWeight="semibold"
            fontStyle="italic"
          >
            {themeConfig.gistId}
          </Link>
        }
        , {<Box as="i">{file.filename}</Box>} applied!
      </Text>
      <NextLink href="/apply-theme">
        <Link
          flexShrink={0}
          ms="6"
          bg="blackAlpha.300"
          color="whiteAlpha.900"
          fontWeight="semibold"
          px="3"
          py="1"
          rounded="base"
        >
          Read how
        </Link>
      </NextLink>
      <Button
        variant="link"
        flexShrink={0}
        ms="6"
        color="blackAlpha.900"
        px="3"
        py="1"
        onClick={onReset}
      >
        Reset
      </Button>
    </Center>
  )
}
