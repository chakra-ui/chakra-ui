import { useRouter } from "next/router"
import { useEffect } from "React"

const useRouteChanged = (callback) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      callback()
      console.log("App is changing to: ", url)
    }

    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events, callback])
}

export default useRouteChanged
