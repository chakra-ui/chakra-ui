import { getNextTabbable, getPreviousTabbable } from "@chakra-ui/utils"
import { fireEvent } from "@testing-library/react"
import { focus } from "./focus"
import { queue, sleep } from "./utils"

const keydownMap: Record<
  string,
  (element: Element, options: KeyboardEventInit) => void
> = {
  Tab: (_, { shiftKey }) => {
    const body = document.body

    const nextElement = shiftKey
      ? getPreviousTabbable(body)
      : getNextTabbable(body)

    if (nextElement) {
      focus(nextElement)
    }
  },
}

const keyupMap: Record<
  string,
  (element: Element, options: KeyboardEventInit) => void
> = {}

export async function press(
  key: string,
  element?: Element | null,
  options: KeyboardEventInit = {},
) {
  if (element == null) {
    element = document.activeElement || document.body
  }

  if (!element) return

  if (document.activeElement !== element) {
    fireEvent.focus(element)
  }

  const downFired = fireEvent.keyDown(element, { key, ...options })

  await queue()

  if (downFired && key in keydownMap && !options.metaKey) {
    keydownMap[key]?.(element, options)
  }

  await sleep()

  const upFired = fireEvent.keyUp(element, { key, ...options })

  await queue()

  if (upFired && key in keyupMap && !options.metaKey) {
    keyupMap[key]?.(element, options)
  }

  await sleep()
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
