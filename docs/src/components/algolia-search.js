import React from "react"
import { get, startsWith } from "lodash/fp"
import {
  Input,
  useEventListener,
  Box,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/core"
import { SearchIcon } from "@chakra-ui/icons"
import "../styles/algolia.css"
import { navigate } from "@reach/router"

const getLvl1 = get("hierarchy.lvl1")
const startsWithCss = startsWith("css-")

let link

if (typeof window !== "undefined") {
  link = document.createElement("a")
}

function getHash(url) {
  link.href = url
  return link.hash
}

function Search(props) {
  const ref = React.useRef()

  const onKeyDown = (event) => {
    if (event.key === "/") {
      const activeElement = document.activeElement
      const focusWrapper = document.getElementById("gatsby-focus-wrapper")
      if (activeElement === focusWrapper || activeElement === document.body) {
        event.preventDefault()
        if (ref.current) {
          ref.current.focus({ preventScroll: true })
        }
      }
    }
  }

  useEventListener("keydown", onKeyDown, window)

  React.useEffect(() => {
    if (window) {
      import("docsearch.js").then(({ default: docsearch }) => {
        window.docsearch = docsearch
        docsearch({
          apiKey: "df1dcc41f7b8e5d68e73dd56d1e19701",
          indexName: "chakra-ui",
          inputSelector: "#algolia-search",
          // debug: true,
          handleSelected: (input, event, suggestion) => {
            event.preventDefault()
            input.setVal("")
            input.close()
            if (ref.current) {
              ref.current.blur()
            }

            const url = suggestion.url.replace("https://chakra-ui.com", "")
            navigate(url)
            const hash = window.decodeURI(getHash(url))

            if (hash !== "#" && hash !== "") {
              const link = document.querySelector(
                `.docSearch-content ${hash} a`,
              )
              if (link) {
                link.click()
              }
            }
          },
          transformData(hits) {
            return hits.filter((hit) => {
              const lvl1 = getLvl1(hit)
              return !startsWithCss(lvl1)
            })
          },
        })
      })
    }
  }, [])

  return (
    <Box
      position="relative"
      width="100%"
      boxSizing="content-box"
      display={["none", "none", "block"]}
      {...props}
      __css={{
        ".algolia-autocomplete": {
          width: "100%",
        },
        ".algolia-autocomplete .ds-dropdown-menu": {
          width: "100% !important",
          maxWidth: "100% !important",
          minWidth: "0 !important",
        },
        ".algolia-docsearch-suggestion--category-header": {
          bg: "teal.400",
        },
        ".algolia-docsearch-suggestion--highlight": {
          bg: "teal.50",
          color: "gray.800",
        },
        ".ds-dropdown-menu": {
          "&:before": {
            display: "none",
          },
        },
        ".ds-cursor .algolia-docsearch-suggestion--wrapper": {
          bg: "gray.100",
          boxShadow: "none",
        },
      }}
    >
      <InputGroup variant="filled" size="md">
        <InputLeftElement>
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder={`Search the docs (Press "/" to focus)`}
          focusBorderColor="teal.200"
          ref={ref}
          borderRadius="md"
          id="algolia-search"
          aria-label="Search Chakra UI docs"
        />
      </InputGroup>
    </Box>
  )
}

export default Search
