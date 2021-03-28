import { AnyFunction, isFunction } from "@chakra-ui/utils"
import * as ReactDOM from "react-dom"

/** This is a workaround for React Concurrent Mode issue https://github.com/facebook/react/issues/18591. Remove once it's fixed. */
export function withFlushSync<T extends AnyFunction>(fn: any) {
  return (event: Parameters<T>[0]) => {
    const flushSync = (ReactDOM as any).flushSync as
      | ((fn: AnyFunction) => void)
      | undefined
    if (isFunction(flushSync)) {
      flushSync(() => {
        fn(event)
      })
    } else {
      fn(event)
    }
  }
}
