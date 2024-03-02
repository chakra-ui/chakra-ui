import {
  Box,
  Center,
  Dialog,
  Flex,
  chakra,
  useDisclosure,
  useEventListener,
  useUpdateEffect,
} from '@chakra-ui/react'
import searchData from 'configs/search-meta.json'
import { findAll } from 'highlight-words-core'
import { matchSorter } from 'match-sorter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FaSearch } from 'react-icons/fa'
import MultiRef from 'react-multi-ref'
import scrollIntoView from 'scroll-into-view-if-needed'
import { SearchButton } from './algolia-search'

const SearchIcon = chakra(FaSearch)

interface OptionTextProps {
  searchWords: string[]
  textToHighlight: string
}

function OptionText({ searchWords, textToHighlight }: OptionTextProps) {
  const chunks = findAll({
    searchWords,
    textToHighlight,
    autoEscape: true,
  })

  const highlightedText = chunks.map((chunk, id) => {
    const { end, highlight, start } = chunk
    const text = textToHighlight.substr(start, end - start)
    if (highlight) {
      return (
        <Box key={id} as='mark' bg='transparent' color='teal.500'>
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
      strokeWidth='2px'
      width='20px'
      height='20px'
      viewBox='0 0 20 20'
      {...props}
    >
      <path
        d='M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4'
        stroke='currentColor'
        fill='none'
        fillRule='evenodd'
        strokeLinejoin='round'
      />
    </chakra.svg>
  )
}

function EnterIcon(props) {
  return (
    <chakra.svg
      strokeWidth='2px'
      width='16px'
      height='16px'
      viewBox='0 0 20 20'
      {...props}
    >
      <g
        stroke='currentColor'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M18 3v4c0 2-2 4-4 4H2' />
        <path d='M8 17l-6-6 6-6' />
      </g>
    </chakra.svg>
  )
}

function HashIcon(props) {
  return (
    <chakra.svg
      strokeWidth='2px'
      width='20px'
      height='20px'
      viewBox='0 0 20 20'
      {...props}
    >
      <path
        d='M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z'
        stroke='currentColor'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </chakra.svg>
  )
}

function OmniSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const [shouldCloseModal, setShouldCloseModal] = React.useState(true)
  const menu = useDisclosure()
  const modal = useDisclosure()
  const [menuNodes] = React.useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = React.useRef<HTMLDivElement>(null)
  const eventRef = React.useRef<'mouse' | 'keyboard'>(null)

  React.useEffect(() => {
    router.events.on('routeChangeComplete', modal.onClose)
    return () => {
      router.events.off('routeChangeComplete', modal.onClose)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // @ts-expect-error @segunadebayo not sure what this should be?!
  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    if (event?.key?.toLowerCase() === 'k' && event[hotkey]) {
      event.preventDefault()
      modal.isOpen ? modal.onClose() : modal.onOpen()
    }
  })

  React.useEffect(() => {
    if (modal.isOpen && query.length > 0) {
      setQuery('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.isOpen])

  const results = React.useMemo(
    function getResults() {
      if (query.length < 2) return []
      return matchSorter(searchData, query, {
        keys: ['hierarchy.lvl1', 'hierarchy.lvl2', 'hierarchy.lvl3', 'content'],
      }).slice(0, 20) // There is probably a filter needed to filter for current locale
    },
    [query],
  )

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = 'keyboard'
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          if (active + 1 < results.length) {
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (active - 1 >= 0) {
            setActive(active - 1)
          }
          break
        }
        case 'Control':
        case 'Alt':
        case 'Shift': {
          e.preventDefault()
          setShouldCloseModal(true)
          break
        }
        case 'Enter': {
          if (results?.length <= 0) {
            break
          }

          modal.onClose()
          router.push(results[active].url)
          break
        }
      }
    },
    [active, modal, results, router],
  )

  const onKeyUp = React.useCallback((e: React.KeyboardEvent) => {
    eventRef.current = 'keyboard'
    switch (e.key) {
      case 'Control':
      case 'Alt':
      case 'Shift': {
        e.preventDefault()
        setShouldCloseModal(false)
      }
    }
  }, [])

  useUpdateEffect(() => {
    setActive(0)
  }, [query])

  useUpdateEffect(() => {
    if (!menuRef.current || eventRef.current === 'mouse') return

    const node = menuNodes.map.get(active)
    if (!node) return

    scrollIntoView(node, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: menuRef.current,
    })
  }, [active])

  const open = menu.isOpen && results.length > 0

  return (
    <>
      <SearchButton onClick={modal.onOpen} />
      <Dialog.Root
        scrollBehavior='inside'
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <Dialog.Overlay />
        <Dialog.Positioner>
          <Dialog.Content
            role='combobox'
            aria-expanded='true'
            aria-haspopup='listbox'
            rounded='lg'
            overflow='hidden'
            top='4vh'
            bg='transparent'
            shadow='lg'
            maxW='600px'
          >
            <Flex pos='relative' align='stretch'>
              <chakra.input
                aria-autocomplete='list'
                autoComplete='off'
                autoCorrect='off'
                spellCheck='false'
                maxLength={64}
                css={{
                  w: '100%',
                  h: '68px',
                  pl: '68px',
                  fontWeight: 'medium',
                  outline: 0,
                  bg: 'white',
                  '.chakra-ui-dark &': { bg: 'gray.700' },
                }}
                placeholder='Search the docs'
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  menu.onOpen()
                }}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
              />
              <Center pos='absolute' left={7} h='68px'>
                <SearchIcon color='teal.500' boxSize='20px' />
              </Center>
            </Flex>
            <Dialog.Body maxH='66vh' p='0' ref={menuRef}>
              {open && (
                <Box
                  css={{
                    px: 4,
                    bg: 'white',
                    '.chakra-ui-dark &': { bg: 'gray.700' },
                  }}
                >
                  <Box
                    as='ul'
                    role='listbox'
                    borderTopWidth='1px'
                    pt={2}
                    pb={4}
                  >
                    {results.map((item, index) => {
                      const selected = index === active
                      const isLvl1 = item.type === 'lvl1'

                      return (
                        <Link key={item.url} href={item.url} passHref>
                          <a>
                            <Box
                              id={`search-item-${index}`}
                              as='li'
                              aria-selected={selected ? true : undefined}
                              onMouseEnter={() => {
                                setActive(index)
                                eventRef.current = 'mouse'
                              }}
                              onClick={() => {
                                if (shouldCloseModal) {
                                  modal.onClose()
                                }
                              }}
                              ref={menuNodes.ref(index)}
                              role='option'
                              key={item.url}
                              css={{
                                display: 'flex',
                                alignItems: 'center',
                                minH: 16,
                                mt: 2,
                                px: 4,
                                py: 2,
                                rounded: 'lg',
                                bg: 'gray.100',
                                '.chakra-ui-dark &': { bg: 'gray.600' },
                                _selected: {
                                  bg: 'teal.500',
                                  color: 'white',
                                  mark: {
                                    color: 'white',
                                    textDecoration: 'underline',
                                  },
                                },
                              }}
                            >
                              {isLvl1 ? (
                                <DocIcon opacity={0.4} />
                              ) : (
                                <HashIcon opacity={0.4} />
                              )}

                              <Box flex='1' ml='4'>
                                {!isLvl1 && (
                                  <Box
                                    fontWeight='medium'
                                    fontSize='xs'
                                    opacity={0.7}
                                  >
                                    {item.hierarchy.lvl1}
                                  </Box>
                                )}
                                <Box fontWeight='semibold'>
                                  <OptionText
                                    searchWords={[query]}
                                    textToHighlight={item.content}
                                  />
                                </Box>
                              </Box>

                              <EnterIcon opacity={0.5} />
                            </Box>
                          </a>
                        </Link>
                      )
                    })}
                  </Box>
                </Box>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export default OmniSearch
