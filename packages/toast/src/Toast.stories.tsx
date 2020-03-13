import * as React from "react"
import { toast } from "./Toast.class"

export default {
  title: "Toast",
}

export const basic = () => (
  <button
    onClick={() => {
      toast.notify("This is a toast, mehn!", { position: "bottom" })
    }}
  >
    Add Toast
  </button>
)
