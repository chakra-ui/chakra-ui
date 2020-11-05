import { dataAttr, isRightClick, mergeRefs } from "@chakra-ui/utils"
import * as React from "react"
import { useEventListeners } from "./use-event-listeners"

export interface UseClickableProps extends React.HTMLAttributes<Element> {
  /**
   * If `true`, the element will be disabled.
   * It will set the `disabled` HTML attribute
   */
  isDisabled?: boolean
  /**
   * If `true` and isDisabled, the element will
   * have only `aria-disabled` set to `true`
   */
  isFocusable?: boolean
  /**
   * Whether or not trigger click on pressing `Enter`.
   */
  clickOnEnter?: boolean
  /**
   * Whether or not trigger click on pressing `Space`.
   */
  clickOnSpace?: boolean
  /**
   * The ref for the element
   */
  ref?: React.Ref<HTMLElement>
}

function isValidElement(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement
  const { tagName, isContentEditable } = element
  return (
    tagName !== "INPUT" && tagName !== "TEXTAREA" && isContentEditable !== true
  )
}

/**
 * useClickable implements all the interactions of a native `button`
 * component with support for making it focusable even if it's disabled.
 *
 * It can be used with both native button elements or other elements (like `div`).
 */
export function useClickable(props: UseClickableProps = {}) {
  const {
    ref: htmlRef,
    isDisabled,
    isFocusable,
    clickOnEnter = true,
    clickOnSpace = true,
    onMouseDown,
    onMouseUp,
    onClick,
    onKeyDown,
    onKeyUp,
    tabIndex: tabIndexProp,
    onMouseOver,
    onMouseLeave,
    ...htmlProps
  } = props
  /**
   * We'll use this to track if the element is a button element
   */
  const [isButton, setIsButton] = React.useState(true)

  /**
   * For custom button implementation, we'll use this to track when
   * we mouse down on the button, to enable use style it's ":active" style
   */
  const [isPressed, setIsPressed] = React.useState(false)

  const listeners = useEventListeners()

  /**
   * The ref callback that fires as soon as the dom node is ready
   */
  const refCallback = React.useCallback((node) => {
    if (node?.tagName !== "BUTTON") {
      setIsButton(false)
    }
  }, [])

  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0
  const trulyDisabled = isDisabled && !isFocusable

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.stopPropagation()
        event.preventDefault()
        return
      }

      const self = event.currentTarget as HTMLElement
      self.focus()
      onClick?.(event)
    },
    [isDisabled, onClick],
  )

  const onDocumentKeyUp = (e: KeyboardEvent) => {
    if (isPressed && isValidElement(e)) {
      e.preventDefault()
      e.stopPropagation()

      setIsPressed(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listeners.remove(document, "keyup", onDocumentKeyUp, false)
    }
  }

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      onKeyDown?.(event)

      if (isDisabled || event.defaultPrevented || event.metaKey) {
        return
      }

      if (!isValidElement(event.nativeEvent) || isButton) return

      const shouldClickOnEnter = clickOnEnter && event.key === "Enter"
      const shouldClickOnSpace = clickOnSpace && event.key === " "

      if (shouldClickOnSpace) {
        event.preventDefault()
        setIsPressed(true)
      }

      if (shouldClickOnEnter) {
        event.preventDefault()
        const self = event.currentTarget as HTMLElement
        self.click()
      }

      listeners.add(document, "keyup", onDocumentKeyUp, false)
    },
    [isDisabled, isButton, onKeyDown, clickOnEnter, clickOnSpace],
  )

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
      onKeyUp?.(event)

      if (isDisabled || event.defaultPrevented || event.metaKey) return

      if (!isValidElement(event.nativeEvent) || isButton) return

      const shouldClickOnSpace = clickOnSpace && event.key === " "

      if (shouldClickOnSpace) {
        event.preventDefault()
        setIsPressed(false)

        const self = event.currentTarget as HTMLElement
        self.click()
      }
    },
    [clickOnSpace, isButton, isDisabled, onKeyUp],
  )

  const onDocumentMouseUp = (event: MouseEvent) => {
    if (event.button !== 0) return
    setIsPressed(false)
    listeners.remove(document, "mouseup", onDocumentMouseUp, false)
  }

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (isRightClick(event)) return

      if (isDisabled) {
        event.stopPropagation()
        event.preventDefault()
        return
      }

      if (!isButton) {
        setIsPressed(true)
      }

      const target = event.currentTarget as HTMLElement
      target.focus({ preventScroll: true })

      listeners.add(document, "mouseup", onDocumentMouseUp, false)

      onMouseDown?.(event)
    },
    [isDisabled, isButton, onMouseDown],
  )

  const handleMouseUp = React.useCallback(
    (event: React.MouseEvent) => {
      if (isRightClick(event)) return

      if (!isButton) {
        setIsPressed(false)
      }

      onMouseUp?.(event)
    },
    [onMouseUp, isButton],
  )

  const handleMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }

      onMouseOver?.(event)
    },
    [isDisabled, onMouseOver],
  )

  React.useEffect(() => {
    console.log(isPressed)
  })

  const handleMouseLeave = React.useCallback(
    (event: React.MouseEvent) => {
      if (isPressed) {
        event.preventDefault()
        setIsPressed(false)
      }
      onMouseLeave?.(event)
    },
    [isPressed],
  )

  const ref = mergeRefs(htmlRef, refCallback)

  if (isButton) {
    return {
      ...htmlProps,
      ref,
      type: "button" as React.ButtonHTMLAttributes<any>["type"],
      "aria-disabled": trulyDisabled ? undefined : isDisabled,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
      onMouseLeave,
    }
  }

  return {
    ...htmlProps,
    ref,
    role: "button",
    "data-active": dataAttr(isPressed),
    "aria-disabled": isDisabled ? "true" : undefined,
    tabIndex: trulyDisabled ? undefined : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave,
  }
}

export type UseClickableReturn = ReturnType<typeof useClickable>
