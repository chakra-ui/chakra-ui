import { type MaybeRenderProp, runIfFn } from "../../utils"

export interface ShowProps<T> {
  /**
   * If `true`, it'll render the `children` prop
   */
  when: T | null | undefined
  /**
   * The fallback content to render if `when` is `false`
   */
  fallback?: React.ReactNode
  /**
   * The children to render if `when` is `true`
   */
  children: MaybeRenderProp<T>
}

export function Show<T>(props: ShowProps<T>) {
  const { when, fallback, children } = props

  if (!when) {
    return fallback || null
  }

  return runIfFn(children, when as T)
}
