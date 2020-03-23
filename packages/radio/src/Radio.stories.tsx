import React from "react"
import { useRadio, Radio, useRadioGroup } from "."
import { chakra } from "@chakra-ui/styled"
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

export const RadioOnly = () => (
  <Radio marginTop="40px" variantSize="lg" variantColor="green">
    I'm a radio
  </Radio>
)

function RadioGroup(props: any) {
  const options = ["Option 1", "Option 2", "Option 3"]

  const { getRadioProps, getRootProps } = useRadioGroup(props)

  return (
    <div {...getRootProps()}>
      {options.map(value => (
        <label key={value}>
          <input type="radio" {...getRadioProps({ value })} />
          <span style={{ margin: 10 }}>{value}</span>
        </label>
      ))}
    </div>
  )
}

export const radioGroup = () => (
  <RadioGroup isNative defaultValue={"Option 1"} onChange={console.log} />
)

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
