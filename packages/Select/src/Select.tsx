
import * as React from "react"
import { useSelect, SelectProps }from "./Select.hook"

export function Select(props: SelectProps){
  const hook = useSelect(props)
  return <div>This is a Select component</div>
}

export default Select
