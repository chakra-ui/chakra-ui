// Credit: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import * as React from "react"
import useLatestRef from "./useLatestRef"

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useLatestRef(callback)

  React.useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, savedCallback])
}

export default useInterval
