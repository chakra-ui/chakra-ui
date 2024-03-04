import * as React from "react"
import { For } from "../src"
import {
  PinInput,
  PinInputProvider,
  usePinInput,
  usePinInputField,
} from "../src/components/pin-input"

export default {
  title: "Forms / PinInput",
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

export function Basic() {
  return (
    <PinInput.Root>
      <PinInput.Field />
      <PinInput.Field />
      <PinInput.Field />
    </PinInput.Root>
  )
}

export const Sizes = () => (
  <For each={["xs", "sm", "md", "lg"]}>
    {(size) => (
      <div key={size} style={{ marginBottom: "1rem" }}>
        <PinInput.Root size={size}>
          <PinInput.Field />
          <PinInput.Field />
          <PinInput.Field />
        </PinInput.Root>
      </div>
    )}
  </For>
)

export const Controlled = () => {
  const [value, setValue] = React.useState("")

  const handleChange = (value: string) => setValue(value)

  const handleComplete = (value: string) => console.log(value)

  return (
    <PinInput.Root
      value={value}
      onChange={handleChange}
      onComplete={handleComplete}
    >
      <PinInput.Field />
      <PinInput.Field />
      <PinInput.Field />
    </PinInput.Root>
  )
}

export function AutoFocus() {
  return (
    <PinInput.Root autoFocus>
      <PinInput.Field />
      <PinInput.Field />
      <PinInput.Field />
    </PinInput.Root>
  )
}
