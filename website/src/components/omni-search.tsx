import { SearchIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  useEventListener,
  useUpdateEffect,
} from "@chakra-ui/react"
import searchData from "configs/search-meta.json"
import { matchSorter } from "match-sorter"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import MultiRef from "react-multi-ref"
import scrollIntoView from "scroll-into-view-if-needed"
import { findAll } from "highlight-words-core"
import { SearchButton } from "./algolia-search"

function OptionText(props: any) {
  const { searchWords, textToHighlight } = props

  const chunks = findAll({
    searchWords,
    textToHighlight,
  })

  const highlightedText = chunks.map((chunk) => {
    const { end, highlight, start } = chunk
    const text = textToHighlight.substr(start, end - start)
    if (highlight) {
      return (
        <Box as="mark" color="teal.500" bg="transparent" fontWeight="medium">
          {text}
        </Box>
      )
    } else {
      return text
    }
  })

  return highlightedText
}

function DocIcon(props) {
  return (
    <chakra.svg
      strokeWidth="2px"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinejoin="round"
      />
    </chakra.svg>
  )
}

function EnterIcon(props) {
  return (
    <chakra.svg
      strokeWidth="2px"
      width="16px"
      height="16px"
      viewBox="0 0 20 20"
      {...props}
    >
      <g
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 3v4c0 2-2 4-4 4H2" />
        <path d="M8 17l-6-6 6-6" />
      </g>
    </chakra.svg>
  )
}

function HashIcon(props) {
  return (
    <chakra.svg
      strokeWidth="2px"
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z"
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </chakra.svg>
  )
}

function OmniSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const menu = useDisclosure()
  const modal = useDisclosure()
  const [menuNodes] = React.useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = React.useRef<HTMLDivElement>(null)
  const eventRef = React.useRef<"mouse" | "keyboard">(null)

  React.useEffect(() => {
    router.events.on("routeChangeComplete", modal.onClose)
    return () => {
      router.events.off("routeChangeComplete", modal.onClose)
    }
  }, [])

  useEventListener("keydown", (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? "metaKey" : "ctrlKey"
    if (event?.key?.toLowerCase() === "k" && event[hotkey]) {
      event.preventDefault()
      modal.onOpen()
    }
  })

  React.useEffect(() => {
    if (modal.isOpen && query.length > 0) {
      setQuery("")
    }
  }, [modal.isOpen])

  const results = React.useMemo(
    function getResults() {
      if (query.length < 2) return []
      return matchSorter(searchData, query, {
        keys: ["content", "hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3"],
      })
        .slice(0, 20)
        .sort((a, b) => {
          if (a.hierarchy.lvl2 == null && b.hierarchy != null) return -1
          if (a.hierarchy.lvl2 != null && b.hierarchy == null) return 1
          return 0
        })
    },
    [query],
  )

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = "keyboard"
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault()
          if (active + 1 < results.length) {
            setActive(active + 1)
          }
          break
        }
        case "ArrowUp": {
          e.preventDefault()
          if (active - 1 >= 0) {
            setActive(active - 1)
          }
          break
        }
        case "Enter": {
          router.push(results[active].url)
          break
        }
      }
    },
    [active, results, router],
  )

  useUpdateEffect(() => {
    setActive(0)
  }, [query])

  useUpdateEffect(() => {
    if (!menuRef.current || eventRef.current === "mouse") return
    const node = menuNodes.map.get(active)
    if (!node) return
    scrollIntoView(node, {
      scrollMode: "if-needed",
      block: "nearest",
      inline: "nearest",
      boundary: menuRef.current,
    })
  }, [active])

  const open = menu.isOpen && results.length > 0

  return (
    <>
      <SearchButton onClick={modal.onOpen} />
      <Modal
        scrollBehavior="inside"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <ModalOverlay />
        <ModalContent
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          rounded="md"
          overflow="hidden"
          top="10vh"
          bg="transparent"
          shadow="search"
        >
          <Flex pos="relative" align="stretch">
            <chakra.input
              aria-autocomplete="list"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength={64}
              w="100%"
              h="40px"
              bg={useColorModeValue("white", "gray.700")}
              pl="40px"
              outline="0"
              id="docsearch-input"
              placeholder="Search the docs"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                menu.onOpen()
              }}
              onKeyDown={onKeyDown}
            />
            <Center pos="absolute" left="0" w="40px" h="40px">
              <SearchIcon />
            </Center>
          </Flex>
          <ModalBody maxH="calc(60vh - 40px)" p="0" ref={menuRef}>
            {open && (
              <Box
                as="ul"
                borderTopWidth="1px"
                role="listbox"
                id="docsearch-menu"
                bg={useColorModeValue("white", "gray.700")}
              >
                {results.map((item, index) => {
                  const selected = index === active
                  const isLvl1 = item.type === "lvl1"
                  return (
                    <Link key={item.id} href={item.url}>
                      <Box
                        id={`search-item-${index}`}
                        as="li"
                        cursor="pointer"
                        onMouseEnter={() => {
                          setActive(index)
                          eventRef.current = "mouse"
                        }}
                        ref={menuNodes.ref(index)}
                        role="option"
                        aria-selected={selected ? true : undefined}
                        _selected={{
                          bg: "teal.500",
                          color: "white",
                          mark: {
                            color: "white",
                            textDecor: "underline",
                          },
                        }}
                        key={item.id}
                        fontSize="sm"
                        px="4"
                        py="2"
                        display="flex"
                        alignItems="center"
                        minH="60px"
                      >
                        {isLvl1 ? (
                          <DocIcon opacity={0.3} />
                        ) : (
                          <HashIcon opacity={0.3} />
                        )}

                        <Box flex="1" ml="3">
                          {!isLvl1 && (
                            <Box
                              fontWeight="medium"
                              fontSize="xs"
                              opacity={0.6}
                            >
                              {item.hierarchy.lvl1}
                            </Box>
                          )}
                          <Box mb="1" fontWeight="semibold">
                            <OptionText
                              searchWords={[query]}
                              textToHighlight={item.content}
                            />
                          </Box>
                        </Box>

                        <EnterIcon opacity={0.3} />
                      </Box>
                    </Link>
                  )
                })}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OmniSearch
