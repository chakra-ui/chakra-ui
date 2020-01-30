
import * as React from "react"
import { useCombobox, ComboboxProps }from "./Combobox.hook"

export function Combobox(props: ComboboxProps){
  const hook = useCombobox(props)
  return <div>This is a Combobox component</div>
}

export default Combobox
