import * as React from "react"
import { useToast } from "."

export default {
  title: "Toast",
}

export const Basic = () => {
  const toast = useToast()

  return (
    <button
      onClick={() => {
        toast({
          title: "This is a toast, mehn!",
          description: "Hello I'm here to help",
          position: "top-right",
        })
      }}
    >
      Add Toast
    </button>
  )
}
