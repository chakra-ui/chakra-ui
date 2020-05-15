import { useState, useCallback, useMemo } from "react"
import { useSafeLayoutEffect, useForceUpdate } from "@chakra-ui/hooks"

export type Descendant<T extends HTMLElement, P = {}> = P & {
  element: T | null
  index?: number
  disabled?: boolean
  focusable?: boolean
}

export interface DescendantContext<T extends HTMLElement, P = {}> {
  descendants: Descendant<T, P>[]
  register: (descendant: Descendant<T, P>) => void
  unregister: (element: T) => void
}

export type UseDescendantProps<T extends HTMLElement, P> = {
  context: DescendantContext<T, P>
} & Descendant<T, P>

export function useDescendant<T extends HTMLElement, P>(
  props: UseDescendantProps<T, P>,
) {
  const {
    context,
    element,
    index: indexProp,
    disabled,
    focusable,
    ...rest
  } = props

  const forceUpdate = useForceUpdate()
  const { register, unregister, descendants } = context

  useSafeLayoutEffect(() => {
    if (!element) {
      forceUpdate()
    }

    /**
     * Don't register this descendant if it's disabled and not focusable
     */
    if (disabled && !focusable) return

    /**
     * else, register the descendant
     */
    register({ element, ...rest } as any)

    /**
     * when it unmounts, unregister the descendant
     */
    return () => {
      if (element) {
        unregister(element)
      }
    }
    //eslint-disable-next-line
  }, [element, ...Object.values(rest)])

  const index =
    indexProp ??
    descendants.findIndex(descendant => descendant.element === element)

  return index
}

export function useDescendants<T extends HTMLElement, P>() {
  const [descendants, setDescendants] = useState<Descendant<T, P>[]>([])

  const register = useCallback(({ element, ...rest }: Descendant<T, P>) => {
    if (!element) return

    //@ts-ignore
    setDescendants(prevDescendants => {
      if (prevDescendants.find(item => item.element === element) == null) {
        const index = prevDescendants.findIndex(item => {
          if (!item.element || !element) return false

          return Boolean(
            item.element.compareDocumentPosition(element) &
              Node.DOCUMENT_POSITION_PRECEDING,
          )
        })

        const newItem = { element, ...rest }

        if (index === -1) {
          return [...prevDescendants, newItem]
        }
        return [
          ...prevDescendants.slice(0, index),
          newItem,
          ...prevDescendants.slice(index),
        ]
      }
      return prevDescendants
    })
  }, [])

  const unregister = useCallback((element: T) => {
    if (!element) return
    setDescendants(descendants =>
      descendants.filter(descendant => element !== descendant.element),
    )
  }, [])

  const context = useMemo(() => {
    return { descendants, register, unregister }
  }, [descendants, register, unregister])

  return context
}
