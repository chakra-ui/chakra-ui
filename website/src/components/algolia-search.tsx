import {
  Input,
  useEventListener,
  Box,
  InputLeftElement,
  InputGroup,
  BoxProps,
} from "@chakra-ui/core"
import { SearchIcon } from "@chakra-ui/icons"
import { get, startsWith } from "lodash/fp"
import { useRouter } from "next/router"
import { useRef, useEffect } from "react"

const getLvl1 = get("hierarchy.lvl1")
const startsWithCss = startsWith("css-")

let link: HTMLAnchorElement

if (typeof window !== "undefined") {
  link = document.createElement("a")
}

function getHash(url: string) {
  link.href = url
  return link.hash
}

// eslint-disable-next-line import/no-default-export
export default function Search(props: BoxProps): JSX.Element {
  const router = useRouter()
  const ref = useRef<HTMLInputElement | null>(null)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "/") {
      const { activeElement } = document
      const focusWrapper = document.querySelector("#gatsby-focus-wrapper")

      if (activeElement === focusWrapper || activeElement === document.body) {
        event.preventDefault()
        ref.current?.focus({ preventScroll: true })
      }
    }
  }

  useEventListener("keydown", onKeyDown)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises, promise/prefer-await-to-then
      import(/* webpackChunkName: "docsearch" */ "docsearch.js").then(
        ({ default: docsearch }) => {
          const _window = window
          // @ts-expect-error global declaration
          _window.docsearch = docsearch

          docsearch({
            apiKey: "df1dcc41f7b8e5d68e73dd56d1e19701",
            // debug: true,
            handleSelected: (input, event, suggestion) => {
              event.preventDefault()
              input.setVal("")
              input.close()
              if (ref.current) {
                ref.current.blur()
              }

              const url = suggestion.url.replace("https://chakra-ui.com", "")
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              router.push(url)
              const hash = window.decodeURI(getHash(url))

              if (hash !== "#" && hash !== "") {
                const link: HTMLAnchorElement = document.querySelector(
                  `.docSearch-content ${hash} a`,
                )
                if (link) {
                  link.click()
                }
              }
            },

            indexName: "chakra-ui",

            inputSelector: "#algolia-search",
            transformData(hits: unknown[]) {
              return hits.filter((hit) => {
                const lvl1 = getLvl1(hit)
                return !startsWithCss(lvl1)
              })
            },
          })
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      position="relative"
      width="100%"
      mt="3"
      mb="32px"
      boxSizing="content-box"
      display={["none", "block", "block"]}
      {...props}
      sx={{
        ".algolia-autocomplete": {
          width: "100%",
        },
        ".algolia-autocomplete .ds-dropdown-menu": {
          maxWidth: "100% !important",
          minWidth: "0 !important",
          width: "100% !important",
        },
        ".algolia-docsearch-suggestion--category-header": {
          bg: "teal.400",
        },
        ".algolia-docsearch-suggestion--highlight": {
          bg: "teal.50",
          color: "gray.800",
        },
        ".ds-cursor .algolia-docsearch-suggestion--wrapper": {
          bg: "gray.100",
          boxShadow: "none",
        },
        ".ds-dropdown-menu": {
          "&:before": {
            display: "none",
          },
        },
      }}
    >
      <InputGroup size="md">
        <InputLeftElement>
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          bg="gray.50"
          placeholder="Search docs"
          focusBorderColor="teal.200"
          ref={ref}
          borderRadius="lg"
          id="algolia-search"
          aria-label="Search Chakra UI docs"
        />
      </InputGroup>
    </Box>
  )
}
