import * as React from "react"
import { useForm } from "react-hook-form"
//@ts-ignore
import Lorem from "react-lorem-component"
import {
  Button,
  Field,
  Input,
  NumberInput,
  Stack,
  chakra,
  useNumberInput,
} from "../src"

export default {
  title: "Forms / NumberInput",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="400px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => (
  <NumberInput.Root max={50} min={10}>
    <NumberInput.Field />
    <NumberInput.Stepper>
      <NumberInput.IncrementStepper />
      <NumberInput.DecrementStepper />
    </NumberInput.Stepper>
  </NumberInput.Root>
)

const sizes = ["xs", "sm", "md", "lg"] as const

export const Sizes = () => (
  <Stack spacing="6">
    {sizes.map((size) => (
      <chakra.div key={size}>
        <pre>size = {size}</pre>
        <NumberInput.Root mt="2" size={size} defaultValue={15} min={10}>
          <NumberInput.Field />
          <NumberInput.Stepper>
            <NumberInput.IncrementStepper />
            <NumberInput.DecrementStepper />
          </NumberInput.Stepper>
        </NumberInput.Root>
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
  <NumberInput.Root defaultValue={15} min={10} max={20}>
    <NumberInput.Field />
    <NumberInput.Stepper>
      <NumberInput.IncrementStepper />
      <NumberInput.DecrementStepper />
    </NumberInput.Stepper>
  </NumberInput.Root>
)

export const withStep = () => (
  <NumberInput.Root step={5} defaultValue={15} min={10} max={30}>
    <NumberInput.Field />
    <NumberInput.Stepper>
      <NumberInput.IncrementStepper />
      <NumberInput.DecrementStepper />
    </NumberInput.Stepper>
  </NumberInput.Root>
)

export const withPrecision = () => (
  <NumberInput.Root defaultValue={15} precision={2} step={0.2}>
    <NumberInput.Field />
    <NumberInput.Stepper>
      <NumberInput.IncrementStepper />
      <NumberInput.DecrementStepper />
    </NumberInput.Stepper>
  </NumberInput.Root>
)

export const withClampValueDisabled = () => (
  <NumberInput.Root defaultValue={15} max={30} clampValueOnBlur={false}>
    <NumberInput.Field />
    <NumberInput.Stepper>
      <NumberInput.IncrementStepper />
      <NumberInput.DecrementStepper />
    </NumberInput.Stepper>
  </NumberInput.Root>
)

export const allowOutOfRange = () => (
  <NumberInput.Root
    defaultValue={15}
    max={10}
    keepWithinRange={false}
    clampValueOnBlur={false}
  >
    <NumberInput.Field />
    <NumberInput.Stepper>
      <NumberInput.IncrementStepper />
      <NumberInput.DecrementStepper />
    </NumberInput.Stepper>
  </NumberInput.Root>
)

export const WithReactHookForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      sales: "12",
    },
  })

  const onSubmit = (data: any) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NumberInput.Root name="sales">
        <NumberInput.Field {...register("sales")} />
        <NumberInput.Stepper>
          <NumberInput.IncrementStepper />
          <NumberInput.DecrementStepper />
        </NumberInput.Stepper>
      </NumberInput.Root>

      <button>Submit</button>
    </form>
  )
}

export const WithFormControl = () => {
  const [isError, setIsError] = React.useState(false)

  return (
    <Stack align="start">
      <Field.Root id="first-name" isInvalid={isError}>
        <chakra.div display="flex" mb="2">
          <Field.Label mb="0" lineHeight="1em">
            Amount
          </Field.Label>
          <Field.ErrorMessage
            mt="0"
            bg="red.500"
            color="white"
            px="1"
            lineHeight="1em"
            borderRadius="sm"
          >
            is invalid!
          </Field.ErrorMessage>
        </chakra.div>

        <NumberInput.Root
          max={50}
          min={10}
          defaultValue={20}
          onBlur={() => {
            console.log("blurred")
          }}
        >
          <NumberInput.Field />
          <NumberInput.Stepper>
            <NumberInput.IncrementStepper />
            <NumberInput.DecrementStepper />
          </NumberInput.Stepper>
        </NumberInput.Root>
        <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
      </Field.Root>
      <Button onClick={() => setIsError((s) => !s)}>Toggle Invalid</Button>
    </Stack>
  )
}
