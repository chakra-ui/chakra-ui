import * as React from "react"
import { For } from "../src"
import { PinInput } from "../src/components/pin-input"

export default {
  title: "Components / PinInput",
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
