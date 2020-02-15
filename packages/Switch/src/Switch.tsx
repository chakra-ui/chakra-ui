
import * as React from "react"
import { useSwitch, SwitchProps }from "./Switch.hook"

export function Switch(props: SwitchProps){
  const hook = useSwitch(props)
  return <div>This is a Switch component</div>
}

export default Switch
