import { act } from "@testing-library/react"

export function queue(): Promise<void> {
  return act(() => Promise.resolve())
}

export function nextTick(): Promise<any> {
  return act(
    () =>
      new Promise((resolve) => requestAnimationFrame(() => resolve(void 0))),
  )
}

export async function sleep(ms = 16): Promise<void> {
  await act(() => new Promise((resolve) => setTimeout(resolve, ms)))
  await nextTick()
}
