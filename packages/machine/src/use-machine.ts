import { useEffect, useLayoutEffect, useState } from "react"
import { useProxy } from "valtio"
import { MachineSrc } from "./machine"
import { Dict } from "./types"

const useSafeLayoutEffect =
  typeof document !== "undefined" ? useLayoutEffect : useEffect

export function useMachine<C extends Dict, S extends string>(
  getMachine: MachineSrc<C, S>,
) {
  const [service] = useState(() =>
    typeof getMachine === "function" ? getMachine() : getMachine,
  )
  useSafeLayoutEffect(() => {
    service.start()
    return () => service.stop()
  }, [service])
  const state = useProxy(service.state)
  return [state, service.send] as const
}
