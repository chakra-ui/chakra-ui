import * as React from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react"
import {
  chakra,
  HStack,
  HTMLChakraProps,
  Kbd,
  Portal,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import SearchStyle from "./search.styles"
import { get, startsWith } from "lodash/fp"
import _ from "lodash"
import { SearchIcon } from "@chakra-ui/icons"

const getLvl1 = get("hierarchy.lvl1")
const startsWithCss = startsWith("css-")

const ACTION_KEY_DEFAULT = ["Ctrl ", "Control"]
const ACTION_KEY_APPLE = ["⌘", "Command"]

function Hit(props) {
  const { hit, children } = props as any
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  )
}

export const SearchButton = React.forwardRef(function SearchButton(
  props: HTMLChakraProps<"button">,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [actionKey, setActionKey] = React.useState<string[]>()

  React.useEffect(() => {
    if (typeof navigator !== "undefined") {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE)
      } else {
        setActionKey(ACTION_KEY_DEFAULT)
      }
    }
  }, [])

  return (
    <chakra.button
      flex="1"
      type="button"
      mx="6"
      ref={ref}
      lineHeight="1.2"
      w="100%"
      bg={useColorModeValue("white", "gray.700")}
      whiteSpace="nowrap"
      display={{ base: "none", sm: "flex" }}
      alignItems="center"
      color="gray.400"
      py="3"
      px="4"
      shadow="base"
      rounded="md"
      {...props}
    >
      {actionKey && (
        <>
          <SearchIcon />
          <HStack w="full" ml="3" spacing="4px">
            <Text textAlign="left" flex="1">
              Search the docs
            </Text>
            <HStack spacing="4px">
              <VisuallyHidden>Press </VisuallyHidden>
              <Kbd color="gray.500" rounded="2px">
                <chakra.div
                  as="abbr"
                  title={actionKey[1]}
                  textDecoration="none !important"
                >
                  {actionKey[0]}
                </chakra.div>
              </Kbd>
              <VisuallyHidden> and </VisuallyHidden>
              <Kbd color="gray.500" rounded="2px">
                K
              </Kbd>
              <VisuallyHidden> to search</VisuallyHidden>
            </HStack>
          </HStack>
        </>
      )}
    </chakra.button>
  )
})

export function Search() {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const searchButtonRef = React.useRef()
  const [initialQuery, setInitialQuery] = React.useState(null)
  const [actionKey, setActionKey] = React.useState<string[]>()

  const onOpen = React.useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = React.useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = React.useCallback(
    (e) => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery],
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  React.useEffect(() => {
    if (typeof navigator !== "undefined") {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE)
      } else {
        setActionKey(ACTION_KEY_DEFAULT)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://BH4D9OD16A-dsn.algolia.net"
          crossOrigin="true"
        />
      </Head>
      <SearchStyle />
      <SearchButton onClick={onOpen} ref={searchButtonRef} />
      {isOpen && (
        <Portal>
          <DocSearchModal
            placeholder="Search the docs"
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName="chakra-ui"
            apiKey="df1dcc41f7b8e5d68e73dd56d1e19701"
            appId="BH4D9OD16A"
            //@ts-expect-error
            navigator={{
              navigate({ suggestionUrl }) {
                setIsOpen(false)
                router.push(suggestionUrl)
              },
            }}
            hitComponent={Hit}
            transformItems={(items) => {
              return items
                .filter((item) => {
                  const lvl1 = item.hierarchy.lvl1
                  return !startsWithCss(lvl1) || !startsWithCss(item.content)
                })
                .map((item) => {
                  /**
                   *  We transform the absolute URL into a relative URL to
                   *  leverage Next's preloading.
                   */
                  const a = document.createElement("a")
                  a.href = item.url
                  const hash = a.hash === "#content-wrapper" ? "" : a.hash

                  return {
                    ...item,
                    url: `${a.pathname}${hash}`,
                    content: item.content ?? item.hierarchy.lvl0,
                  }
                })
            }}
          />
        </Portal>
      )}
    </>
  )
}
