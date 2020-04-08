import { chakra } from "@chakra-ui/system"
import React from "react"
import { useNumberInput } from "./NumberInput.hook"
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "./NumberInput"

export default {
  title: "NumberInput",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

const Input = chakra("input", { themeKey: "Input" })
const Button = chakra("button", { themeKey: "Button" })

const format = (num: any) => "$" + num
const parse = (val: any) => val.replace(/^\$/, "")

export function NumberInputHook() {
  const [val, setVal] = React.useState<any>("1.53")

  const props = {
    step: 0.01,
    // defaultValue: 1.53,
    value: format(val),
    min: -4,
    max: 6,
    precision: 2,
    onChange: val => setVal(parse(val)),
  }

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput(props)

  return (
    <>
      <div>current: {valueAsNumber}</div>
      <chakra.div display="flex">
        <Button tabIndex={-1} {...getIncrementButtonProps()}>
          +
        </Button>
        <Input {...(getInputProps() as any)} />
        <Button tabIndex={-1} {...getDecrementButtonProps()}>
          -
        </Button>
      </chakra.div>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: "relative",
  },
  field: {
    backgroundColor: "black",
    color: "white",
    width: "100%",
    padding: 10,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
  },
}

export const Base = () => (
  <NumberInput style={styles.root}>
    <NumberInputField style={styles.field} />
    <NumberInputStepper style={styles.group}>
      <NumberIncrementStepper children="+" style={styles.button} />
      <NumberDecrementStepper children="-" style={styles.button} />
    </NumberInputStepper>
  </NumberInput>
)
