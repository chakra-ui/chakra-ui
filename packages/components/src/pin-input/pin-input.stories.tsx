import * as React from "react"
import {
  PinInput,
  usePinInput,
  usePinInputField,
  PinInputProvider,
  PinInputDescendantsProvider,
} from "."
import { For } from ".."

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
