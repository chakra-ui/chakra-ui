import * as React from "react"
import {
  PinInput,
  PinInputField,
  usePinInput,
  usePinInputField,
  PinInputProvider,
  PinInputDescendantsProvider,
} from "../src"

export default {
  title: "Components / Forms / PinInput",
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
  const { descendants, ...context } = usePinInput({
    autoFocus: true,
    mask: true,
    onComplete: alert,
    type: "number",
  })
  return (
    <PinInputDescendantsProvider value={descendants}>
      <PinInputProvider value={context}>
        <Input style={style} />
        <Input style={style} />
        <Input style={style} />
        <Input style={style} />
      </PinInputProvider>
    </PinInputDescendantsProvider>
  )
}

export function ComponentExample() {
  return (
    <PinInput>
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
        <PinInput size={size}>
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
