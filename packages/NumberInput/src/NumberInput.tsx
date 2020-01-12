
import * as React from "react"
import { useNumberInput, NumberInputProps }from "./NumberInput.hook"

export function NumberInput(props: NumberInputProps){
  const hook = useNumberInput(props)
  return <div>This is a NumberInput component</div>
}

export default NumberInput
