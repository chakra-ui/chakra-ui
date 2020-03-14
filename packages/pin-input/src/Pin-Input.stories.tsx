import * as React from "react"
import { PinInput, PinInputField, usePinInput, usePinInputField } from "."

export default {
  title: "PinInput",
}

const style: React.CSSProperties = {
  width: 40,
  height: 40,
  textAlign: "center",
  color: "black",
  margin: 4,
}

export function HookExample() {
  const context = usePinInput({ autoFocus: true })
  const input1 = usePinInputField({ context })
  const input2 = usePinInputField({ context })
  const input3 = usePinInputField({ context })
  const input4 = usePinInputField({ context })

  return (
    <div>
      <input style={style} {...input1} />
      <input style={style} {...input2} />
      <input style={style} {...input3} />
      <input style={style} {...input4} />
    </div>
  )
}

export function ComponentExample() {
  return (
    <PinInput defaultValue="234">
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  )
}
