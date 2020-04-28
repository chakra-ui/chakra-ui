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
  const ref = React.useRef<any>()

  return (
    <>
      <button onClick={toast.closeAll}>Close all</button>
      <button
        onClick={() => {
          ref.current = toaster({
            title: "This is a toast, mehn!",
            description: "Hello I'm here to help",
            position: "top-right",
            duration: null,
          })
        }}
      >
        Add Toast
      </button>
      <button
        onClick={() => {
          toast.update(2, {
            duration: 1000,
            message: () => "Woohoo",
          })
        }}
      >
        Update Toast
      </button>
    </>
  )
}
