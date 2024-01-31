import * as React from "react"
import {
  PinInput,
  PinInputField,
  usePinInput,
  usePinInputField,
  PinInputProvider,
} from "."

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
  console.log(inputProps)
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
      <div ref={context.containerRef} id={context.id}>
        <Input style={style} index="0" />
        <Input style={style} index="1" />
        <Input style={style} index="2" />
        <Input style={style} index="3" />
      </div>
    </PinInputProvider>
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
      <PinInput key="size" size={size} mb="1rem">
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
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

export function AutoFocus() {
  return (
    <PinInput autoFocus>
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  )
}
