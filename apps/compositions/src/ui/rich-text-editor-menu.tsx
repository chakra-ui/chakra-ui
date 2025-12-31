import {
  Box,
  Center,
  HStack,
  Portal,
  Text,
  VStack,
  mergeRefs,
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

// Types
interface BaseSuggestionItem {
  id: string
  label: string
}

interface MentionItem extends BaseSuggestionItem {
  email: string
}

interface CommandItem extends BaseSuggestionItem {
  description: string
  icon: typeof LuHash
}

interface HashtagItem extends BaseSuggestionItem {
  description: string
}

interface MenuProps {
  items: any[]
  selectedIndex: number
  onSelect: (item: any) => void
  clientRect?: (() => DOMRect | null) | null | undefined
}

// Hook for managing editor menu state and interactions
export const useEditorMenu = () => {
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

// Custom hook for menu positioning using Floating UI
const useMenuPosition = (
  clientRect: (() => DOMRect | null) | null | undefined,
) => {
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

  // Set the virtual element as reference
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

// Mention Menu Component
export const MentionMenu = React.forwardRef<HTMLDivElement, MenuProps>(
  function MentionMenu({ items, selectedIndex, onSelect, clientRect }, ref) {
    const selectedRef = React.useRef<HTMLDivElement>(null)
    const { refs, floatingStyles, isPositioned } = useMenuPosition(clientRect)

    React.useEffect(() => {
      selectedRef.current?.scrollIntoView({ block: "nearest" })
    }, [selectedIndex])

    if (!isPositioned) return null

    return (
      <Portal>
        <Box
          ref={mergeRefs(refs.setFloating, ref)}
          style={floatingStyles}
          bg="white"
          borderWidth="1px"
          borderColor="border"
          rounded="lg"
          shadow="lg"
          minW="280px"
          maxH="360px"
          overflowY="auto"
          zIndex={1000}
          p="1"
          role="listbox"
          aria-label="User mentions"
        >
          {items.length === 0 ? (
            <Box p="3" textAlign="center">
              <Text fontSize="sm" color="fg.muted">
                No users found
              </Text>
            </Box>
          ) : (
            items.map((item: MentionItem, index) => (
              <Box
                key={item.id}
                ref={index === selectedIndex ? selectedRef : undefined}
                onPointerDown={(event) => {
                  event.preventDefault()
                  onSelect(item)
                }}
                cursor="pointer"
                p="2"
                rounded="md"
                bg={index === selectedIndex ? "bg.emphasized" : "transparent"}
                _hover={{ bg: "bg.emphasized" }}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <HStack gap="2.5" w="full">
                  <Center
                    boxSize="8"
                    rounded="full"
                    bg="gray.200"
                    color="gray.700"
                  >
                    <LuUser size={16} />
                  </Center>
                  <VStack align="start" gap="0" flex="1" minW="0">
                    <Text fontSize="sm" fontWeight="medium">
                      {item.label}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      {item.email}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))
          )}
        </Box>
      </Portal>
    )
  },
)

// Suggestion Menu Component
export const SuggestionMenu = React.forwardRef<HTMLDivElement, MenuProps>(
  function SuggestionMenu({ items, selectedIndex, onSelect, clientRect }, ref) {
    const selectedRef = React.useRef<HTMLDivElement>(null)
    const { refs, floatingStyles, isPositioned } = useMenuPosition(clientRect)

    React.useEffect(() => {
      selectedRef.current?.scrollIntoView({ block: "nearest" })
    }, [selectedIndex])

    if (!isPositioned) return null

    return (
      <Portal>
        <Box
          ref={mergeRefs(refs.setFloating, ref)}
          style={floatingStyles}
          bg="white"
          borderWidth="1px"
          borderColor="border"
          rounded="lg"
          shadow="lg"
          minW="280px"
          maxH="360px"
          overflowY="auto"
          zIndex={1000}
          p="1"
          role="listbox"
          aria-label="Suggestions"
        >
          {items.length === 0 ? (
            <Box p="3" textAlign="center">
              <Text fontSize="sm" color="fg.muted">
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
                  onPointerDown={(event) => {
                    event.preventDefault()
                    onSelect(item)
                  }}
                  cursor="pointer"
                  p="2"
                  rounded="md"
                  bg={index === selectedIndex ? "bg.emphasized" : "transparent"}
                  _hover={{ bg: "bg.emphasized" }}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <HStack gap="2.5" w="full">
                    <Center
                      boxSize="8"
                      rounded="full"
                      bg="gray.200"
                      color="gray.700"
                    >
                      <Icon size={16} />
                    </Center>
                    <VStack align="start" gap="0" flex="1" minW="0">
                      <Text fontSize="sm" fontWeight="medium">
                        {isCommand ? item.label : `#${item.label}`}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        {item.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              )
            })
          )}
        </Box>
      </Portal>
    )
  },
)

// Configuration factory functions using the useEditorMenu pattern
export const createMentionConfig = (users: MentionItem[]) => {
  return {
    char: "@",
    pluginKey: new PluginKey("mention"),
    items: ({ query }: { query: string }) =>
      users.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase()),
      ),
    render: () => {
      let component: ReactRenderer<HTMLDivElement, MenuProps> | null = null
      let container: HTMLDivElement | null = null
      let selectedIndex = 0

      return {
        onStart(props: any) {
          selectedIndex = 0
          container = document.createElement("div")
          document.body.appendChild(container)

          component = new ReactRenderer(MentionMenu, {
            props: {
              items: props.items,
              selectedIndex,
              onSelect: (item: MentionItem) => props.command(item),
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
            onSelect: (item: MentionItem) => props.command(item),
            clientRect: props.clientRect,
          })
        },
        onKeyDown({ event }: { event: KeyboardEvent }) {
          if (!component) return false
          if (event.key === "ArrowUp") {
            selectedIndex =
              (selectedIndex - 1 + component.props.items.length) %
              component.props.items.length
            component.updateProps({ ...component.props, selectedIndex })
            return true
          }
          if (event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % component.props.items.length
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
          if (container) container.remove()
          container = null
          if (component) component.destroy()
          component = null
        },
      }
    },
  }
}

export const createSuggestionConfig = (
  char: string,
  getItems: (query: string) => any[],
) => {
  return {
    char,
    pluginKey: new PluginKey(`suggestion-${char}`),
    items: ({ query }: { query: string }) => getItems(query),
    render: () => {
      let component: ReactRenderer<HTMLDivElement, MenuProps> | null = null
      let container: HTMLDivElement | null = null
      let selectedIndex = 0

      return {
        onStart(props: any) {
          selectedIndex = 0
          container = document.createElement("div")
          document.body.appendChild(container)

          component = new ReactRenderer(SuggestionMenu, {
            props: {
              items: props.items,
              selectedIndex,
              onSelect: (item: any) => props.command(item),
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
            onSelect: (item: any) => props.command(item),
            clientRect: props.clientRect,
          })
        },
        onKeyDown({ event }: { event: KeyboardEvent }) {
          if (!component) return false
          if (event.key === "ArrowUp") {
            selectedIndex =
              (selectedIndex - 1 + component.props.items.length) %
              component.props.items.length
            component.updateProps({ ...component.props, selectedIndex })
            return true
          }
          if (event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % component.props.items.length
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
          if (container) container.remove()
          container = null
          if (component) component.destroy()
          component = null
        },
      }
    },
  }
}

// Export types for external use
export type { CommandItem, HashtagItem, MentionItem, MenuProps }
