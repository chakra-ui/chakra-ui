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
          position: "top",
          description: "Hello I'm here to help",
        })
      }}
    >
      Add Toast
    </button>
  )
}
