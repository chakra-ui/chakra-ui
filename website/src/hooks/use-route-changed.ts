import { useRouter } from "next/router"
import { useEffect } from "react"

export const useRouteChanged = (fn: () => void): void => {
  const { events } = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      fn()
      // eslint-disable-next-line no-console
      console.log("App is changing to:", url)
    }

    events.on("routeChangeComplete", handleRouteChange)

    return () => {
      events.off("routeChangeComplete", handleRouteChange)
    }
  }, [events, fn])
}
