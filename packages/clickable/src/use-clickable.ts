import { dataAttr, isRightClick, mergeRefs } from "@chakra-ui/utils"
import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  Ref,
  useCallback,
  useState,
} from "react"

export interface UseClickableProps extends HTMLAttributes<Element> {
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
  ref?: Ref<HTMLElement>
}

/**
 * useClickable
 *
 * React hook that implements all the interactions of a native `button`
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
    ...htmlProps
  } = props
  /**
   * We'll use this to track if the element is a button element
   */
  const [isButton, setIsButton] = useState(true)

  /**
   * For custom button implementation, we'll use this to track when
   * we mouse down on the button, to enable use style it's ":active" style
   */
  const [isActive, setIsActive] = useState(false)

  /**
   * The ref callback that fires as soon as the dom node is ready
   */
  const refCallback = useCallback((node) => {
    if (node?.tagName !== "BUTTON") {
      setIsButton(false)
    }
  }, [])

  const tabIndex = isButton ? tabIndexProp : tabIndexProp || 0
  const trulyDisabled = isDisabled && !isFocusable

  const handleClick = useCallback(
    (event: MouseEvent) => {
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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      onKeyDown?.(event)

      if (isDisabled || event.defaultPrevented || event.metaKey) {
        return
      }

      const shouldClickOnEnter = clickOnEnter && event.key === "Enter"
      const shouldClickOnSpace = clickOnSpace && event.key === " "

      if (!isButton && shouldClickOnSpace) {
        event.preventDefault()
        setIsActive(true)
        return
      }

      if (!isButton && shouldClickOnEnter) {
        event.preventDefault()
        const self = event.currentTarget as HTMLElement
        self.click()
      }
    },
    [isDisabled, isButton, onKeyDown, clickOnEnter, clickOnSpace],
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      onKeyUp?.(event)

      if (isDisabled || event.defaultPrevented || event.metaKey) return

      const shouldClickOnSpace = clickOnSpace && event.key === " "

      if (!isButton && shouldClickOnSpace) {
        event.preventDefault()
        setIsActive(false)

        const self = event.currentTarget as HTMLElement
        self.click()
      }
    },
    [clickOnSpace, isButton, isDisabled, onKeyUp],
  )

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      /**
       * Prevent right-click from triggering the
       * active state.
       */
      if (isRightClick(event)) return

      if (isDisabled) {
        event.stopPropagation()
        event.preventDefault()
        return
      }

      if (!isButton) {
        setIsActive(true)
      }

      onMouseDown?.(event)
    },
    [isDisabled, isButton, onMouseDown],
  )

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!isButton) {
        setIsActive(false)
      }

      onMouseUp?.(event)
    },
    [onMouseUp, isButton],
  )

  const handleMouseOver = useCallback(
    (event: MouseEvent) => {
      if (isDisabled) {
        event.preventDefault()
        return
      }

      onMouseOver?.(event)
    },
    [isDisabled, onMouseOver],
  )

  const ref = mergeRefs(htmlRef, refCallback)

  if (isButton) {
    return {
      ...htmlProps,
      ref,
      type: "button" as ButtonHTMLAttributes<any>["type"],
      "aria-disabled": trulyDisabled ? undefined : isDisabled,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
    }
  }

  return {
    ...htmlProps,
    ref,
    role: "button",
    "data-active": dataAttr(isActive),
    "aria-disabled": !!isDisabled,
    tabIndex: trulyDisabled ? undefined : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
  }
}

export type UseClickableReturn = ReturnType<typeof useClickable>
