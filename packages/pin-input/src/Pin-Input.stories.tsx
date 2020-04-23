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

/**
 * PinInput hook example
 *
 * use the `usePinInput` and `usePinInputField` to create a custom PinInput component
 */

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

/**
 * Chakra UI PinInput component example
 */

export function ComponentExample() {
  return (
    <PinInput defaultValue="234">
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  )
}

/**
 * Sizes
 *
 * Pass the `size` prop to change the height of the input elements
 * of the PinInput component
 */

export const Sizes = () => {
  return (
    <>
      {["sm", "md", "lg"].map((size, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <PinInput size={size} defaultValue="234">
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
          <br />
        </div>
      ))}
    </>
  )
}

/**
 * Controlled PinInput component
 */

export const Controlled = () => {
  const [value, setValue] = React.useState("")

  const handleChange = (value: string) => {
    setValue(value)
  }

  const handleComplete = (value: string) => {
    console.log(value)
  }
  return (
    <PinInput value={value} onChange={handleChange} onComplete={handleComplete}>
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  )
}
