import { fireEvent } from "@testing-library/react"

export function press(
  key: string,
  element?: Element | null,
  options: KeyboardEventInit = {},
) {
  if (!element) return

  if (document.activeElement !== element) {
    fireEvent.focus(element)
  }

  fireEvent.keyDown(element, { key, ...options })
  fireEvent.keyUp(element, { key, ...options })
}

function createPress(key: string, defaultOptions: KeyboardEventInit = {}) {
  return (element?: Element | null, options: KeyboardEventInit = {}) =>
    press(key, element, { ...defaultOptions, ...options })
}

press.Escape = createPress("Escape")
press.Backspace = createPress("Backspace")
press.Delete = createPress("Delete")
press.Tab = createPress("Tab")
press.ShiftTab = createPress("Tab", { shiftKey: true })
press.Enter = createPress("Enter")
press.Space = createPress(" ")
press.ArrowUp = createPress("ArrowUp")
press.ArrowRight = createPress("ArrowRight")
press.ArrowDown = createPress("ArrowDown")
press.ArrowLeft = createPress("ArrowLeft")
press.End = createPress("End")
press.Home = createPress("Home")
press.PageUp = createPress("PageUp")
press.PageDown = createPress("PageDown")
