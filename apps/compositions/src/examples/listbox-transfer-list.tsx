"use client"

import {
  Center,
  type CollectionOptions,
  Flex,
  IconButton,
  Listbox,
  VStack,
  createListCollection,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface ListboxRenderProps<T> extends Listbox.RootProps<T> {
  contentRef: React.RefObject<HTMLDivElement | null>
}

function ListboxRender<T>(props: ListboxRenderProps<T>) {
  const { collection, contentRef, ...rest } = props
  return (
    <Listbox.Root {...rest} collection={collection} selectionMode="multiple">
      <Listbox.Content minH="96" ref={contentRef}>
        {collection.items.length > 0 ? (
          collection.items.map((item) => {
            const itemValue = collection.getItemValue(item)
            const itemLabel = collection.stringifyItem(item)
            return (
              <Listbox.Item item={item} key={itemValue} flex="0">
                <Listbox.ItemText>{itemLabel}</Listbox.ItemText>
                <Listbox.ItemIndicator />
              </Listbox.Item>
            )
          })
        ) : (
          <Center boxSize="full" p="4" color="fg.muted" textStyle="sm">
            No items available
          </Center>
        )}
      </Listbox.Content>
    </Listbox.Root>
  )
}

export const ListboxTransferList = () => {
  const state = useTransferListState<Item>({ items: animeCharacters })

  return (
    <Flex gap="4" maxW="600px" align="stretch">
      <ListboxRender
        contentRef={state.sourceContentRef}
        collection={state.source}
        value={state.selectedSource.map((item) => item.value)}
        onValueChange={(e) => state.setSelectedSource(e.items)}
      />
      <VStack justify="center" gap="2" py="8">
        <IconButton
          size="xs"
          variant="subtle"
          disabled={state.selectedSource.length === 0}
          onClick={() => {
            state.moveToTarget(state.selectedSource)
          }}
        >
          <LuChevronRight />
        </IconButton>
        <IconButton
          size="xs"
          variant="subtle"
          disabled={state.selectedTarget.length === 0}
          onClick={() => {
            state.moveToSource(state.selectedTarget)
          }}
        >
          <LuChevronLeft />
        </IconButton>
      </VStack>
      <ListboxRender
        contentRef={state.targetContentRef}
        collection={state.target}
        value={state.selectedTarget.map((item) => item.value)}
        onValueChange={(e) => state.setSelectedTarget(e.items)}
      />
    </Flex>
  )
}

function useTransferListState<T>(options: CollectionOptions<T>) {
  const sourceContentRef = useRef<HTMLDivElement | null>(null)
  const targetContentRef = useRef<HTMLDivElement | null>(null)

  const [source, setSource] = useState(createListCollection<T>(options))
  const [target, setTarget] = useState(
    createListCollection<T>({ ...options, items: [] }),
  )
  const [selectedSource, setSelectedSource] = useState<T[]>([])
  const [selectedTarget, setSelectedTarget] = useState<T[]>([])

  const scrollToItem = (container: HTMLDivElement | null, item: T) => {
    if (!container) return
    requestAnimationFrame(() => {
      const itemValue = target.getItemValue(item)
      const itemElement = container.querySelector(`[data-value="${itemValue}"]`)
      itemElement?.scrollIntoView({ block: "nearest" })
    })
  }

  const moveToTarget = (items: T[]) => {
    setSource(source.remove(...items))
    setTarget(target.append(...items))
    setSelectedSource([])
    scrollToItem(targetContentRef.current, items[items.length - 1])
  }

  const moveToSource = (items: T[]) => {
    setSource(source.append(...items))
    setTarget(target.remove(...items))
    setSelectedTarget([])
    scrollToItem(sourceContentRef.current, items[items.length - 1])
  }

  return {
    source,
    target,
    selectedSource,
    selectedTarget,
    setSelectedSource,
    setSelectedTarget,
    moveToTarget,
    moveToSource,
    sourceContentRef,
    targetContentRef,
  }
}

interface Item {
  label: string
  value: string
}

const animeCharacters = [
  { label: "Naruto", value: "naruto" },
  { label: "Sasuke", value: "sasuke" },
  { label: "Sakura", value: "sakura" },
  { label: "Kakashi", value: "kakashi" },
  { label: "Shisui", value: "shisui" },
  { label: "Itachi", value: "itachi" },
  { label: "Gaara", value: "gaara" },
  { label: "Rock Lee", value: "rock-lee" },
  { label: "Neji", value: "neji" },
  { label: "Tenten", value: "tenten" },
  { label: "Hinata", value: "hinata" },
  { label: "Kiba", value: "kiba" },
  { label: "Shino", value: "shino" },
  { label: "Choji", value: "choji" },
  { label: "Ino", value: "ino" },
]
