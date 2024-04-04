import { MaybeRenderProp, runIfFn } from "@chakra-ui/utils"

export interface ShowProps<T> {
  when: T | null | undefined
  fallback?: React.ReactNode
  children: MaybeRenderProp<T>
}

export function Show<T>(props: ShowProps<T>) {
  const { when, fallback, children } = props

  if (when != null) {
    return fallback || null
  }

  return runIfFn(children, when as T)
}
