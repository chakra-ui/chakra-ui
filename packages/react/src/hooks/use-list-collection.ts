"use client"

import { useState } from "react"
import { createListCollection } from "../collection"
import { useCallbackRef } from "./use-callback-ref"

type ListCollectionOptions<T> = Partial<
  Parameters<typeof createListCollection<T>>[0]
>

interface UseListCollectionProps<T> extends ListCollectionOptions<T> {
  initialItems: T[]
  filter?: (itemText: string, filterText: string) => boolean
}

export function useListCollection<T>(props: UseListCollectionProps<T>) {
  const { initialItems = [], filter, ...collectionOptions } = props

  const create = (items: T[] = initialItems) =>
    createListCollection({ ...collectionOptions, items })

  const [collection, setCollection] = useState(create)

  return {
    collection,
    filter: (inputValue: string) => {
      if (!filter) return
      setCollection(
        create().filter((itemString) => filter(itemString, inputValue)),
      )
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
