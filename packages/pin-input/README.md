# Pin Input

The PinInupt component is optimized for entering sequences of digits. The most
common application is for entering single-use security codes. It is optimized
for entering digits quickly.

## Installation

```sh
yarn add @chakra-ui/pin-input

or

npm i @chakra-ui/pin-input
```

## Import component

```jsx
import {
  PinInput,
  PinInputField,
  usePinInput,
  usePinInputField,
} from "@chakra-ui/pin-input"
```

## Usage

Chakra UI exports two primary components, `PinInput` and `PinInputField` to
compose a PinInput component. Chakra UI also provides hooks to can create a
custom PinInput component.

```jsx
<PinInput defaultValue="234">
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>
```

```jsx
function PinInputHookExample() {
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
```

## Sizes

```jsx
<PinInput size="lg" defaultValue="234">
  <PinInputField />
  <PinInputField />
  <PinInputField />
</PinInput>
```

## Controlled

```jsx
function ControlledPinInput() {
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
```
