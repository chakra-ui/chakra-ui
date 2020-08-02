import { chakra, PropsOf, useStyleConfig } from "@chakra-ui/system"
import * as React from "react"
import {
  useNumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "../src"
import { Stack } from "@chakra-ui/layout"

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

const Input = (props: PropsOf<"input">) => {
  const styles = useStyleConfig("Input", props)
  return <chakra.input __css={styles.field} {...props} />
}
const Button = (props: PropsOf<"button">) => {
  const styles = useStyleConfig("Button", props)
  return <chakra.button __css={styles.container} {...props} />
}

export const HookUsage = () => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 0.01,
    defaultValue: 1.53,
    min: 1,
    max: 6,
    precision: 2,
  })

  return (
    <>
      <div>current: {valueAsNumber}</div>
      <chakra.div display="flex">
        <Button {...getIncrementButtonProps()}>+</Button>
        <Input {...(getInputProps() as any)} />
        <Button {...getDecrementButtonProps()}>-</Button>
      </chakra.div>
    </>
  )
}

const format = (val: string) => `$` + val
const parse = (val: string) => val.replace(/^\$/, "")

export const HookWithFormatAndParse = () => {
  const [value, setValue] = React.useState<string>("1.53")

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 0.01,
    value: format(value),
    min: 1,
    max: 6,
    precision: 2,
    onChange: (valueString) => setValue(parse(valueString)),
  })

  return (
    <>
      <div>current: {valueAsNumber}</div>
      <chakra.div display="flex">
        <Button {...getIncrementButtonProps()}>+</Button>
        <Input {...(getInputProps() as any)} />
        <Button {...getDecrementButtonProps()}>-</Button>
      </chakra.div>
    </>
  )
}

export const usage = () => (
  <NumberInput max={50} min={10}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export const withMinAndMax = () => (
  <NumberInput defaultValue={15} min={10} max={20}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export const withStep = () => (
  <NumberInput step={5} defaultValue={15} min={10} max={30}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export const withPrecision = () => (
  <NumberInput defaultValue={15} precision={2} step={0.2}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export const withClampValueDisabled = () => (
  <NumberInput defaultValue={15} max={30} clampValueOnBlur={false}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export const allowOutOfRange = () => (
  <NumberInput
    defaultValue={15}
    max={10}
    keepWithinRange={false}
    clampValueOnBlur={false}
  >
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

export const inputSizes = () => (
  <Stack>
    <NumberInput size="sm" defaultValue={15} min={10}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>

    <NumberInput size="md" defaultValue={15} min={10}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>

    <NumberInput size="lg" defaultValue={15} min={10}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </Stack>
)
