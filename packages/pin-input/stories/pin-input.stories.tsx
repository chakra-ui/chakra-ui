import * as React from "react"
import {
  PinInput,
  PinInputField,
  usePinInput,
  usePinInputField,
  PinInputProvider,
} from "../src"

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

function Input(props: any) {
  const inputProps = usePinInputField(props)
  return <input {...inputProps} />
}

export function HookExample() {
  const context = usePinInput({
    autoFocus: true,
    mask: true,
    onComplete: alert,
    type: "number",
  })
  return (
    <PinInputProvider value={context}>
      <Input style={style} />
      <Input style={style} />
      <Input style={style} />
      <Input style={style} />
    </PinInputProvider>
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

export const Sizes = () => (
  <>
    {["xs", "sm", "md", "lg"].map((size) => (
      <div key={size} style={{ marginBottom: "1rem" }}>
        <PinInput size={size} defaultValue="234">
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </div>
    ))}
  </>
)

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
