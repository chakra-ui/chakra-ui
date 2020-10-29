import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { fromEntries } from "@chakra-ui/utils"
import {
  createPopper as defaultCreatePopper,
  Instance,
  Modifier,
  Options as PopperOptions,
  VirtualElement,
} from "@popperjs/core"
import * as React from "react"
import { dequal } from "dequal"

type Options = Partial<PopperOptions> & {
  createPopper?: typeof defaultCreatePopper
}

type State = {
  styles: {
    [key: string]: Partial<React.CSSProperties>
  }
  attributes: {
    [key: string]: { [key: string]: string }
  }
}

function resolve(obj: any, elements: string[]) {
  return (prev: any) => {
    const next = fromEntries(
      elements.map((element) => [element, obj[element]]),
    ) as any

    const isPopperEqual = dequal(prev.popper, next.popper)
    const isArrowEqual = dequal(prev.arrow, next.arrow)

    if (isArrowEqual && isPopperEqual) return prev
    return next
  }
}

const EMPTY_MODIFIERS: any[] = []

export function usePopper(
  referenceElement: Element | VirtualElement,
  popperElement: HTMLElement,
  options: Options = {},
) {
  const prevOptions = React.useRef<any>(null)

  const optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS,
  }

  const [styles, setStyles] = React.useState<State["styles"]>({
    popper: {
      position: optionsWithDefaults.strategy,
      left: "0",
      top: "0",
    },
  })

  const [attrs, setAttrs] = React.useState<State["attributes"]>({})

  const updateStateModifier: Modifier<"updateState", any> = React.useMemo(
    () => ({
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: ({ state }) => {
        const elements = Object.keys(state.elements)
        setStyles(resolve(state.styles, elements))
        setAttrs(resolve(state.attributes, elements))
      },
      requires: ["computeStyles"],
    }),
    [],
  )

  const popperOptions = React.useMemo(() => {
    const newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [
        ...optionsWithDefaults.modifiers,
        updateStateModifier,
        { name: "applyStyles", enabled: false },
      ],
    }

    if (dequal(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions
    }

    prevOptions.current = newOptions
    return newOptions
  }, [
    optionsWithDefaults.onFirstUpdate,
    optionsWithDefaults.placement,
    optionsWithDefaults.strategy,
    optionsWithDefaults.modifiers,
    updateStateModifier,
  ])

  const popperInstanceRef = React.useRef<Instance | null>()

  useSafeLayoutEffect(() => {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions)
    }
  }, [popperOptions])

  useSafeLayoutEffect(() => {
    if (referenceElement == null && popperElement == null) return

    const createPopper = options.createPopper || defaultCreatePopper
    const popperInstance = createPopper(
      referenceElement,
      popperElement,
      popperOptions,
    )

    popperInstanceRef.current = popperInstance

    return () => {
      popperInstance.destroy()
      popperInstanceRef.current = null
    }
  }, [referenceElement, popperElement, options.createPopper])

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      popperInstanceRef.current?.forceUpdate()
    })
    return () => {
      cancelAnimationFrame(id)
    }
  }, [])

  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles,
    attributes: attrs,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current
      ? popperInstanceRef.current.forceUpdate
      : null,
  }
}
