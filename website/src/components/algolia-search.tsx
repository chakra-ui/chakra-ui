import {
  HStack,
  HTMLChakraProps,
  Kbd,
  Portal,
  Text,
  VisuallyHidden,
  chakra,
} from '@chakra-ui/react'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchStyle from './search.styles'

const SearchIcon = chakra(FaSearch)

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

interface HitProps {
  hit: InternalDocSearchHit | StoredDocSearchHit
  children: React.ReactNode
}

function Hit({ hit, children }: HitProps) {
  return <Link href={hit.url}>{children}</Link>
}

export const SearchButton = React.forwardRef(function SearchButton(
  props: HTMLChakraProps<'button'>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  return (
    <chakra.button
      flex='1'
      type='button'
      mx='6'
      ref={ref}
      lineHeight='1.2'
      w='100%'
      bg='white'
      whiteSpace='nowrap'
      display={{ base: 'none', sm: 'flex' }}
      alignItems='center'
      color='gray.600'
      _dark={{ bg: 'gray.700', color: 'gray.400' }}
      py='3'
      px='4'
      outline='0'
      _focus={{ shadow: 'outline' }}
      shadow='xs'
      rounded='md'
      {...props}
    >
      <SearchIcon />
      <HStack w='full' ml='3' gap='4px'>
        <Text textAlign='left' flex='1'>
          Search the docs
        </Text>
        <HStack gap='4px'>
          <VisuallyHidden>Press</VisuallyHidden>
          <Kbd rounded='2px'>
            <chakra.div
              as='abbr'
              title={actionKey[1]}
              textDecoration='none !important'
            >
              {actionKey[0]}
            </chakra.div>
          </Kbd>
          <VisuallyHidden> and </VisuallyHidden>
          <Kbd rounded='2px'>K</Kbd>
          <VisuallyHidden> to search</VisuallyHidden>
        </HStack>
      </HStack>
    </chakra.button>
  )
})

function AlgoliaSearch() {
  const router = useRouter()
  const [open, setopen] = React.useState(false)
  const searchButtonRef = React.useRef()
  const [initialQuery, setInitialQuery] = React.useState(null)

  const onOpen = React.useCallback(() => {
    setopen(true)
  }, [setopen])

  const onClose = React.useCallback(() => {
    setopen(false)
  }, [setopen])

  const onInput = React.useCallback(
    (e) => {
      setopen(true)
      setInitialQuery(e.key)
    },
    [setopen, setInitialQuery],
  )

  useDocSearchKeyboardEvents({
    isOpen: open,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <>
      <Head>
        <link
          rel='preconnect'
          href='https://BH4D9OD16A-dsn.algolia.net'
          crossOrigin='anonymous'
        />
      </Head>
      <SearchStyle />
      <SearchButton onClick={onOpen} ref={searchButtonRef} />
      {open && (
        <Portal>
          <DocSearchModal
            placeholder='Search the docs'
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName='chakra-ui'
            apiKey='df1dcc41f7b8e5d68e73dd56d1e19701'
            appId='BH4D9OD16A'
            navigator={{
              navigate({ itemUrl }) {
                setopen(false)
                router.push(itemUrl)
              },
            }}
            hitComponent={Hit}
            transformItems={(items) => {
              return items.map((item) => {
                const a = document.createElement('a')
                a.href = item.url
                const hash = a.hash === '#content-wrapper' ? '' : a.hash
                item.url = `${a.pathname}${hash}`
                return item
              })
            }}
          />
        </Portal>
      )}
    </>
  )
}

export default AlgoliaSearch
