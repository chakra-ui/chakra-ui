import { chakra } from "@chakra-ui/system"
import * as React from "react"
import Lorem from "react-lorem-component"
import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Stack } from "@chakra-ui/layout"
import { useForm } from "react-hook-form"
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control"
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useNumberInput,
} from "../src"

export default {
  title: "Components / Forms / NumberInput",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <NumberInput max={50} min={10}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
)

const sizes = ["xs", "sm", "md", "lg"] as const

export const Sizes = () => (
  <Stack spacing="6">
    {sizes.map((size) => (
      <chakra.div key={size}>
        <pre>size = {size}</pre>
        <NumberInput mt="2" size={size} defaultValue={15} min={10}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </chakra.div>
    ))}
  </Stack>
)

export const UseNumberInput = () => {
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
    allowMouseWheel: true,
  })

  return (
    <>
      <div>current: {valueAsNumber}</div>
      <Lorem />
      <chakra.div display="flex">
        <Button {...getIncrementButtonProps()}>+</Button>
        <Input {...(getInputProps() as any)} />
        <Button {...getDecrementButtonProps()}>-</Button>
      </chakra.div>
      <Lorem />
    </>
  )
}

const format = (val: string) => `$${val}`
const parse = (val: string) => val.replace(/^\$/, "")

export const FormatAndParse = () => {
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
        <Input {...getInputProps()} />
        <Button {...getDecrementButtonProps()}>-</Button>
      </chakra.div>
    </>
  )
}

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

export const WithReactHookForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      sales: 12,
    },
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumberInput
        name="sales"
        onBlur={() => {
          console.log("blurred")
        }}
      >
        <NumberInputField ref={register as any} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </form>
  )
}

function FormError(props: any) {
  return (
    <FormErrorMessage
      mt="0"
      bg="red.500"
      color="white"
      px="1"
      lineHeight="1em"
      borderRadius="sm"
      {...props}
    />
  )
}

export const WithFormControl = () => {
  const [isError, setIsError] = React.useState(false)

  return (
    <Stack align="start">
      <FormControl id="first-name" isInvalid={isError}>
        <chakra.div display="flex" mb="2">
          <FormLabel mb="0" lineHeight="1em">
            Amount
          </FormLabel>
          <FormError>is invalid!</FormError>
        </chakra.div>
        <NumberInput
          max={50}
          min={10}
          defaultValue={20}
          onBlur={() => {
            console.log("blurred")
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>Keep it very short and sweet!</FormHelperText>
      </FormControl>
      <Button onClick={() => setIsError((s) => !s)}>Toggle Invalid</Button>
    </Stack>
  )
}
