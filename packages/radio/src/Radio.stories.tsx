import React from "react"
import { useRadio, Radio, useRadioGroup, RadioGroup } from "."
import { chakra } from "@chakra-ui/system"
import { Stack } from "@chakra-ui/layout"

export default {
  title: "Radio",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="500px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}
/**
 * A simple radio component.
 */

export const Basic = () => <Radio>Hello</Radio>

/**
 * Pass the `isDisabled` prop set to true, to have the radio in the
 * disabled state.
 */

export const Disabled = () => <Radio isDisabled>Disabled</Radio>

/**
 * Pass the `isReadOnly` prop set to true, to have the radio in the
 * readonly state.
 */

export const RadioOnly = () => (
  <Radio marginTop="40px" isChecked isReadOnly size="lg" colorScheme="green">
    I'm a readonly radio
  </Radio>
)

/**
 * Pass the `size` prop to change the size of the radio.
 * Values can be either sm, md or lg.
 */

export const Sizes = () => {
  const sizes = ["sm", "md", "lg"]

  return (
    <>
      {sizes.map(size => (
        <Radio size={size} marginLeft="1rem" colorScheme="red">
          Option
        </Radio>
      ))}
    </>
  )
}

/**
 * Default RadioGroup
 */

export const radioGroup = () => {
  return (
    <RadioGroup defaultValue="Option 1" onChange={console.log}>
      <Radio value="Option 1">Option 1</Radio>
      <Radio value="Option 2">Option 2</Radio>
      <Radio value="Option 3">Option 3</Radio>
    </RadioGroup>
  )
}

/**
 * Pass the `direction` prop to change the orientation of the RadioGroup.
 * `direction` can be either row or column, it is row by default
 */

export const radioGroupDirection = () => {
  return (
    <RadioGroup
      direction="column"
      defaultValue="Option 1"
      onChange={console.log}
    >
      <Radio value="Option 1">Option 1</Radio>
      <Radio value="Option 2">Option 2</Radio>
      <Radio value="Option 3">Option 3</Radio>
    </RadioGroup>
  )
}

/**
 * Pass the `spacing` prop to change the spacing between
 * the children radios of the RadioGroup.
 */

export const radioGroupSpacing = () => {
  return (
    <RadioGroup spacing={10} defaultValue="Option 1" onChange={console.log}>
      <Radio value="Option 1">Option 1</Radio>
      <Radio value="Option 2">Option 2</Radio>
      <Radio value="Option 3">Option 3</Radio>
    </RadioGroup>
  )
}

/**
 * The `spacing` and `direction` props take responsvie values
 * to help achieve flexible layouts in applications.
 */

export const responsiveRadioGroup = () => {
  return (
    <RadioGroup
      spacing={[2, 4, 6]}
      onChange={console.log}
      defaultValue="Option 1"
      direction={["column", "row"]}
    >
      {Array.from(Array(10))
        .map((_, i) => i + 1)
        .map(item => (
          <Radio value={`Option ${item}`}>{`Option ${item}`}</Radio>
        ))}
    </RadioGroup>
  )
}

/**
 * Compose a custom RadioGroup component using the `useRadioGroup` hook.
 */

export const WithTheming = () => {
  const options = ["react", "vue", "svelte"]

  const { getRootProps, getRadioProps } = useRadioGroup({
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
 * Compose a custom RadioButton component using the `useRadio` hook.
 */

function RadioButton(props: any) {
  const { children, ...rest } = props
  const { getInputProps, getCheckboxProps } = useRadio(rest)

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
        {children}
      </chakra.div>
    </chakra.label>
  )
}

/**
 * Compose a custom Radio component using the `useRadio` hook.
 */

export function CustomRadioCard() {
  const options = ["react", "vue", "svelte"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "test",
    defaultValue: "vue",
    onChange: console.log,
  })

  return (
    <Stack direction="row" {...getRootProps()}>
      {options.map(option => (
        <RadioButton {...getRadioProps({ value: option })}>
          {option}
        </RadioButton>
      ))}
    </Stack>
  )
}
