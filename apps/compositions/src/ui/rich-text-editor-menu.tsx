import {
  Box,
  Circle,
  HStack,
  Portal,
  Span,
  Stack,
  Text,
  mergeRefs,
  useSlotRecipe,
} from "@chakra-ui/react"
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react"
import { PluginKey } from "@tiptap/pm/state"
import { ReactRenderer } from "@tiptap/react"
import * as React from "react"
import { LuHash, LuUser } from "react-icons/lu"

interface SuggestionItem {
  id: string
  label: string
}

export interface MentionItem extends SuggestionItem {
  email: string
}

export interface CommandItem extends SuggestionItem {
  description: string
  icon: typeof LuHash
}

export interface HashtagItem extends SuggestionItem {
  description: string
}

export interface EmojiItem {
  name: string
  shortcodes: string[]
  tags: string[]
  group?: string
  emoji?: string
  fallbackImage?: string
}

export interface FloatingMenuProps<T = any> {
  items: T[]
  selectedIndex: number
  onSelect: (item: T) => void
  clientRect?: (() => DOMRect | null) | null | undefined
}

export function useEditorMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent, items: any[], onSelect: (item: any) => void) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length)
        return true
      }
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % items.length)
        return true
      }
      if (event.key === "Enter") {
        const item = items[selectedIndex]
        if (item) onSelect(item)
        return true
      }
      if (event.key === "Escape") return true
      return false
    },
    [selectedIndex],
  )

  const resetSelection = React.useCallback(() => {
    setSelectedIndex(0)
  }, [])

  return {
    selectedIndex,
    handleKeyDown,
    resetSelection,
    setSelectedIndex,
  }
}

function useMenuPosition(
  clientRect: (() => DOMRect | null) | null | undefined,
) {
  const [virtualElement, setVirtualElement] = React.useState<{
    getBoundingClientRect: () => DOMRect
  } | null>(null)

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [
      offset(8),
      flip({
        fallbackPlacements: ["top-start", "bottom-end", "top-end"],
      }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
  })

  React.useEffect(() => {
    if (virtualElement) {
      refs.setReference(virtualElement as any)
    }
  }, [virtualElement, refs])

  React.useEffect(() => {
    const rect = clientRect?.()
    if (rect) {
      setVirtualElement({
        getBoundingClientRect: () => rect,
      })
    } else {
      setVirtualElement(null)
    }
  }, [clientRect])

  return {
    refs,
    floatingStyles,
    isPositioned: !!virtualElement,
  }
}

/* -----------------------------------------------------------------------------
 * Shared render factory for suggestion menus
 * -------------------------------------------------------------------------- */

function createSuggestionRender<T>(
  MenuComponent: React.ComponentType<FloatingMenuProps<T>>,
) {
  return () => {
    let component: ReactRenderer<HTMLDivElement, FloatingMenuProps<T>> | null =
      null
    let container: HTMLDivElement | null = null
    let selectedIndex = 0

    return {
      onStart(props: any) {
        selectedIndex = 0
        container = document.createElement("div")
        document.body.appendChild(container)

        component = new ReactRenderer(MenuComponent, {
          props: {
            items: props.items,
            selectedIndex,
            onSelect: (item: T) => props.command(item),
            clientRect: props.clientRect,
          },
          editor: props.editor,
        })

        container.appendChild(component.element)
      },

      onUpdate(props: any) {
        if (!component) return
        component.updateProps({
          items: props.items,
          selectedIndex,
          onSelect: (item: T) => props.command(item),
          clientRect: props.clientRect,
        })
      },

      onKeyDown({ event }: { event: KeyboardEvent }) {
        if (!component) return false

        const itemCount = component.props.items.length

        if (event.key === "ArrowUp") {
          selectedIndex = (selectedIndex - 1 + itemCount) % itemCount
          component.updateProps({ ...component.props, selectedIndex })
          return true
        }

        if (event.key === "ArrowDown") {
          selectedIndex = (selectedIndex + 1) % itemCount
          component.updateProps({ ...component.props, selectedIndex })
          return true
        }

        if (event.key === "Enter") {
          const item = component.props.items[selectedIndex]
          if (item) component.props.onSelect(item)
          return true
        }

        if (event.key === "Escape") return true

        return false
      },

      onExit() {
        container?.remove()
        container = null
        component?.destroy()
        component = null
      },
    }
  }
}

/* -----------------------------------------------------------------------------
 * Menu Components
 * -------------------------------------------------------------------------- */

export const MentionMenu = React.forwardRef<
  HTMLDivElement,
  FloatingMenuProps<MentionItem>
>(function MentionMenu(props, ref) {
  const { items, selectedIndex, onSelect, clientRect } = props
  const { refs, floatingStyles, isPositioned } = useMenuPosition(clientRect)

  const menuRecipe = useSlotRecipe({ key: "menu" })
  const styles = menuRecipe({ size: "md" })

  const selectedRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  if (!isPositioned) return null

  return (
    <Portal>
      <Box
        ref={mergeRefs(refs.setFloating, ref)}
        style={floatingStyles}
        css={styles.content}
        role="listbox"
        aria-label="User mentions"
      >
        {items.length === 0 ? (
          <Box p="3" textAlign="center">
            <Text textStyle="sm" color="fg.muted">
              No users found
            </Text>
          </Box>
        ) : (
          items.map((item, index) => (
            <Box
              key={item.id}
              ref={index === selectedIndex ? selectedRef : undefined}
              css={styles.item}
              onPointerDown={(event) => {
                event.preventDefault()
                onSelect(item)
              }}
              data-highlighted={index === selectedIndex ? "" : undefined}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <HStack gap="2.5" w="full">
                <Circle size="8" layerStyle="fill.muted">
                  <LuUser size={16} />
                </Circle>
                <Stack align="start" gap="0" flex="1" minW="0">
                  <Span textStyle="sm" fontWeight="medium">
                    {item.label}
                  </Span>
                  <Span textStyle="xs" color="fg.muted">
                    {item.email}
                  </Span>
                </Stack>
              </HStack>
            </Box>
          ))
        )}
      </Box>
    </Portal>
  )
})

export const SuggestionMenu = React.forwardRef<
  HTMLDivElement,
  FloatingMenuProps<CommandItem | HashtagItem>
>(function SuggestionMenu(props, ref) {
  const { items, selectedIndex, onSelect, clientRect } = props
  const { refs, floatingStyles, isPositioned } = useMenuPosition(clientRect)

  const selectedRef = React.useRef<HTMLDivElement | null>(null)
  const menuRecipe = useSlotRecipe({ key: "menu" })
  const styles = menuRecipe({ size: "md" })

  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  if (!isPositioned) return null

  return (
    <Portal>
      <Box
        ref={mergeRefs(refs.setFloating, ref)}
        style={floatingStyles}
        css={styles.content}
        role="listbox"
        aria-label="Suggestions"
      >
        {items.length === 0 ? (
          <Box p="3" textAlign="center">
            <Text textStyle="sm" color="fg.muted">
              No suggestions found
            </Text>
          </Box>
        ) : (
          items.map((item: CommandItem | HashtagItem, index) => {
            const isCommand = "icon" in item
            const Icon = isCommand ? (item as CommandItem).icon : LuHash

            return (
              <Box
                key={item.id}
                ref={index === selectedIndex ? selectedRef : undefined}
                css={styles.item}
                onPointerDown={(event) => {
                  event.preventDefault()
                  onSelect(item)
                }}
                data-highlighted={index === selectedIndex ? "" : undefined}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <HStack gap="2.5" w="full">
                  <Circle size="8" layerStyle="fill.muted">
                    <Icon size={16} />
                  </Circle>
                  <Stack align="start" gap="0" flex="1" minW="0">
                    <Span textStyle="sm" fontWeight="medium">
                      {isCommand ? item.label : `#${item.label}`}
                    </Span>
                    <Span textStyle="xs" color="fg.muted">
                      {item.description}
                    </Span>
                  </Stack>
                </HStack>
              </Box>
            )
          })
        )}
      </Box>
    </Portal>
  )
})

export const EmojiMenu = React.forwardRef<
  HTMLDivElement,
  FloatingMenuProps<EmojiItem>
>(function EmojiMenu(props, ref) {
  const { items, selectedIndex, onSelect, clientRect } = props
  const { refs, floatingStyles, isPositioned } = useMenuPosition(clientRect)

  const menuRecipe = useSlotRecipe({ key: "menu" })
  const styles = menuRecipe({ size: "md" })

  const selectedRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  if (!isPositioned) return null

  return (
    <Portal>
      <Box
        ref={mergeRefs(refs.setFloating, ref)}
        style={floatingStyles}
        css={styles.content}
        role="listbox"
        aria-label="Emoji suggestions"
        maxH="200px"
      >
        {items.length === 0 ? (
          <Box p="3" textAlign="center">
            <Text textStyle="sm" color="fg.muted">
              No emojis found
            </Text>
          </Box>
        ) : (
          items.map((item, index) => (
            <Box
              key={item.name}
              ref={index === selectedIndex ? selectedRef : undefined}
              css={styles.item}
              onPointerDown={(event) => {
                event.preventDefault()
                onSelect(item)
              }}
              data-highlighted={index === selectedIndex ? "" : undefined}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <HStack gap="2.5" w="full">
                <Circle size="8" layerStyle="fill.muted" fontSize="lg">
                  {item.emoji || "❓"}
                </Circle>
                <Span textStyle="sm" fontWeight="medium">
                  :{item.shortcodes[0]}:
                </Span>
              </HStack>
            </Box>
          ))
        )}
      </Box>
    </Portal>
  )
})

/* -----------------------------------------------------------------------------
 * Config Factories
 * -------------------------------------------------------------------------- */

export const createMentionConfig = (users: MentionItem[]) => {
  return {
    char: "@",
    pluginKey: new PluginKey("mention"),
    items: ({ query }: { query: string }) =>
      users.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase()),
      ),
    render: createSuggestionRender(MentionMenu),
  }
}

export const createSuggestionConfig = (
  char: string,
  getItems: (query: string) => (CommandItem | HashtagItem)[],
) => {
  return {
    char,
    pluginKey: new PluginKey(`suggestion-${char}`),
    items: ({ query }: { query: string }) => getItems(query),
    render: createSuggestionRender(SuggestionMenu),
  }
}

export const createEmojiSuggestionConfig = (
  allEmojis: EmojiItem[],
  options?: { maxResults?: number },
) => {
  const maxResults = options?.maxResults ?? 10

  return {
    char: ":",
    pluginKey: new PluginKey("emoji-suggestion"),
    items: ({ query }: { query: string }) => {
      if (!query) return allEmojis.slice(0, maxResults)
      const lowerQuery = query.toLowerCase()
      return allEmojis
        .filter(
          (emoji) =>
            emoji.shortcodes.some((sc) => sc.includes(lowerQuery)) ||
            emoji.tags.some((tag) => tag.includes(lowerQuery)),
        )
        .slice(0, maxResults)
    },
    render: createSuggestionRender(EmojiMenu),
  }
}
