import * as React from "react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react"
import { chakra, Portal } from "@chakra-ui/react"
import SearchStyle from "./search.styles"
import { get, startsWith } from "lodash/fp"
import _ from "lodash"

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
      <chakra.button
        type="button"
        ref={searchButtonRef}
        onClick={onOpen}
        role="group"
        lineHeight="1.2"
        display="flex"
        alignItems="center"
      >
        <chakra.svg width="24px" height="24px" fill="none" color="gray.400">
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </chakra.svg>
        <span>
          Quick search<span className="hidden sm:inline"> for anything</span>
        </span>
        {actionKey && (
          <chakra.span
            display={{ base: "hidden", sm: "block" }}
            color="gray.400"
            fontSize="sm"
            py="2"
            px="1"
            borderWidth="1px"
            rounded="md"
          >
            <span className="sr-only">Press </span>
            <kbd className="font-sans">
              <abbr title={actionKey[1]} className="no-underline">
                {actionKey[0]}
              </abbr>
            </kbd>
            <span className="sr-only"> and </span>
            <kbd className="font-sans">K</kbd>
            <span className="sr-only"> to search</span>
          </chakra.span>
        )}
      </chakra.button>
      {isOpen && (
        <Portal>
          <DocSearchModal
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
