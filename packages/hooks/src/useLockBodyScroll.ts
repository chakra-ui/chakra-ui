import * as React from "react"
import { enableBodyScroll, disableBodyScroll } from "body-scroll-lock"

/**
 * React hook to lock scrolling on the `body` element
 *
 * @param ref the target element to preserve after lock
 * @param shouldLock if `true`, scroll lock will be applied
 */
export function useLockBodyScroll(
  ref: React.RefObject<HTMLElement>,
  shouldLock?: boolean,
) {
  React.useEffect(() => {
    const node = ref.current

    if (!node || !shouldLock) return undefined

    disableBodyScroll(node, { reserveScrollBarGap: true })
    return () => enableBodyScroll(node)
  }, [ref, shouldLock])
}
