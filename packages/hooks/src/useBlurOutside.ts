import * as React from "react"

export function hasFocusWithin(
  ref: React.RefObject<HTMLElement>,
  event: React.FocusEvent,
) {
  if (!document.activeElement || !ref || !ref.current) return false

  const hasFocus =
    ref.current &&
    ref.current.contains(
      (event.relatedTarget || document.activeElement) as HTMLElement,
    )

  return hasFocus
}

export function useBlurOutside(
  buttonRef: React.RefObject<HTMLButtonElement>,
  containerRef: React.RefObject<HTMLElement>,
  options: {
    action: () => void
    visible: boolean
  },
) {
  React.useEffect(() => {
    if (!buttonRef.current) return
    const buttonNode = buttonRef.current
    const preventDefault = (event: MouseEvent) => event.preventDefault()
    buttonNode.addEventListener("mousedown", preventDefault)

    return () => {
      buttonNode.removeEventListener("mousedown", preventDefault)
    }
  }, [buttonRef])

  return (event: React.FocusEvent) => {
    const shouldClose = options.visible && !hasFocusWithin(containerRef, event)
    if (shouldClose) {
      options.action()
    }
  }
}

export default useBlurOutside
