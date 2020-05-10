import * as React from "react"
import { useRadio, Radio, useRadioGroup, RadioGroup } from "."
import { chakra } from "@chakra-ui/system"
import { Stack, VStack, Wrap, SimpleGrid, Container } from "@chakra-ui/layout"
import { UseRadioProps } from "./Radio.hook"

export default {
  title: "Radio",
  decorators: [(story: Function) => <Container mt="40px">{story()}</Container>],
}

export const Basic = () => <Radio>Hello</Radio>

export const Disabled = () => <Radio isDisabled>Disabled</Radio>

export const Readonly = () => (
  <Radio mt="40px" isChecked isReadOnly size="lg" colorScheme="green">
    I'm a readonly radio
  </Radio>
)

export const WithSizes = () => {
  const sizes = ["sm", "md", "lg"]

  return (
    <>
      {sizes.map(size => (
        <Radio
          key={size}
          size={size}
          name="sample"
          ml="1rem"
          colorScheme="green"
        >
          Option
        </Radio>
      ))}
    </>
  )
}

export const radioGroup = () => {
  return (
    <RadioGroup defaultValue="Option 1" onChange={console.log}>
      <VStack>
        <Radio value="Option 1">Option 1</Radio>
        <Radio value="Option 2">Option 2</Radio>
        <Radio value="Option 3">Option 3</Radio>
      </VStack>
    </RadioGroup>
  )
}

export const GroupWithStack = () => {
  return (
    <RadioGroup defaultValue="Option 1" onChange={console.log}>
      <VStack>
        <Radio value="Option 1">Option 1</Radio>
        <Radio value="Option 2">Option 2</Radio>
        <Radio value="Option 3">Option 3</Radio>
      </VStack>
    </RadioGroup>
  )
}

export const GroupWithWrap = () => {
  const range = Array.from(Array(10)).map((_, i) => i + 1)
  return (
    <RadioGroup onChange={console.log} defaultValue="Option 1">
      <Wrap spacing={[2, 4, 6]}>
        {range.map(num => (
          <Radio key={num} value={`Option ${num}`}>{`Option ${num}`}</Radio>
        ))}
      </Wrap>
    </RadioGroup>
  )
}

export const GroupWithSimpleGrid = () => {
  const range = Array.from(Array(10)).map((_, i) => i + 1)
  return (
    <RadioGroup onChange={console.log} defaultValue="Option 1">
      <SimpleGrid columns={2} spacing={[2, 4, 6]}>
        {range.map(num => (
          <Radio key={num} value={`Option ${num}`}>{`Option ${num}`}</Radio>
        ))}
      </SimpleGrid>
    </RadioGroup>
  )
}

export const WithHook = () => {
  const options = ["react", "vue", "svelte"]

  const { getRadioProps, getRootProps } = useRadioGroup({
    name: "test",
    defaultValue: "vue",
    onChange: console.log,
  })

  return (
    <Stack spacing="20px" direction="row" {...getRootProps()}>
      {options.map(value => (
        <Radio key={value} {...getRadioProps({ value })}>
          {value}
        </Radio>
      ))}
    </Stack>
  )
}

/**
 * Compose a custom RadioCard component using the `useRadio` hook.
 */
function RadioCard(props: UseRadioProps & { children?: React.ReactNode }) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  return (
    <chakra.label>
      <input {...getInputProps()} />
      <chakra.div
        {...getCheckboxProps()}
        display="inline-block"
        border="1px solid gray"
        _checked={{ bg: "tomato", color: "white" }}
        _focus={{ outline: "3px dotted red" }}
        px={5}
        py={3}
      >
        {props.children}
      </chakra.div>
    </chakra.label>
  )
}

export function CustomRadioCard() {
  const options = ["react", "vue", "svelte"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "vue",
    onChange: console.log,
  })

  return (
    <Stack direction="row" {...getRootProps()}>
      {options.map(value => (
        <RadioCard key={value} {...getRadioProps({ value })}>
          {value}
        </RadioCard>
      ))}
    </Stack>
  )
}
