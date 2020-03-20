import * as React from "react"
import { useToast, toast } from "."

export default {
  title: "Toast",
  decorators: [
    (Story: Function) => (
      <React.Fragment>
        <Story />
      </React.Fragment>
    ),
  ],
}

export const Basic = () => {
  const toaster = useToast()
  return (
    <>
      <button onClick={toast.closeAll}>Close all</button>
      <button
        onClick={() => {
          toaster({
            title: "This is a toast, mehn!",
            description: "Hello I'm here to help",
            position: "top-right",
            duration: null,
          })
        }}
      >
        Add Toast
      </button>
    </>
  )
}
