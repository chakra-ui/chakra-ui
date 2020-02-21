import * as React from "react"

function useHasMounted() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  return mounted
}

export default useHasMounted
