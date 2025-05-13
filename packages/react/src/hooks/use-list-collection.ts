"use client"

import { useState } from "react"
import { type ListCollection, createListCollection } from "../collection"
import { useCallbackRef } from "./use-callback-ref"

type ListCollectionOptions<T> = Partial<
  Parameters<typeof createListCollection<T>>[0]
>

export interface UseListCollectionProps<T> extends ListCollectionOptions<T> {
  /**
   * The initial items to display in the collection.
   */
  initialItems: T[]
  /**
   * The filter function to use to filter the items.
   */
  filter?: (itemText: string, filterText: string) => boolean
  /**
   * The maximum number of items to display in the collection.
   * Useful for performance when you have a large number of items.
   */
  limit?: number
}

export function useListCollection<T>(props: UseListCollectionProps<T>) {
  const { initialItems = [], filter, limit, ...collectionOptions } = props

  const create = (items: T[]) => {
    return createListCollection({ ...collectionOptions, items })
  }

  const [collection, setCollectionImpl] = useState(() =>
    create(limit != null ? initialItems.slice(0, limit) : initialItems),
  )

  const setCollection = useCallbackRef((collection: ListCollection<T>) => {
    setCollectionImpl(
      limit == null
        ? collection
        : collection.copy(collection.items.slice(0, limit)),
    )
  })

  return {
    collection,
    filter: (inputValue: string) => {
      if (!filter) return
      let filtered = create(initialItems).filter((itemString) =>
        filter(itemString, inputValue),
      )
      setCollection(filtered)
    },
    set: useCallbackRef((items: T[]) => {
      setCollection(create(items))
    }),
    reset: useCallbackRef(() => {
      setCollection(create(initialItems))
    }),
    clear: useCallbackRef(() => {
      setCollection(create([]))
    }),
    insert: useCallbackRef((index: number, ...items: T[]) => {
      setCollection(collection.insert(index, ...items))
    }),
    insertBefore: useCallbackRef((value: string, ...items: T[]) => {
      setCollection(collection.insertBefore(value, ...items))
    }),
    insertAfter: useCallbackRef((value: string, ...items: T[]) => {
      setCollection(collection.insertAfter(value, ...items))
    }),
    remove: useCallbackRef((...itemOrValues: T[]) => {
      setCollection(collection.remove(...itemOrValues))
    }),
    move: useCallbackRef((value: string, to: number) => {
      setCollection(collection.move(value, to))
    }),
    moveBefore: useCallbackRef((value: string, ...values: string[]) => {
      setCollection(collection.moveBefore(value, ...values))
    }),
    moveAfter: useCallbackRef((value: string, ...values: string[]) => {
      setCollection(collection.moveAfter(value, ...values))
    }),
    reorder: useCallbackRef((from: number, to: number) => {
      setCollection(collection.reorder(from, to))
    }),
    append: useCallbackRef((...items: T[]) => {
      setCollection(collection.append(...items))
    }),
    prepend: useCallbackRef((...items: T[]) => {
      setCollection(collection.prepend(...items))
    }),
    update: useCallbackRef((value: string, item: T) => {
      setCollection(collection.update(value, item))
    }),
  }
}
