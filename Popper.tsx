
import * as React from "react"
import { usePopper, PopperProps }from "./Popper.hook"

export function Popper(props: PopperProps){
  const hook = usePopper(props)
  return <div>This is a Popper component</div>
}

export default Popper
