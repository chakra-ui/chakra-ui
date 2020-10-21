import { Icon } from "@chakra-ui/icon"
import { Container, Divider, Heading, Stack } from "@chakra-ui/layout"
import * as React from "react"
import { Checkbox, CheckboxGroup, useCheckbox } from "../src"

export default {
  title: "Checkbox",
  decorators: [(story: Function) => <Container mt="40px">{story()}</Container>],
}

export const CheckboxWithHooks = () => {
  const { state, htmlProps, getInputProps, getCheckboxProps } = useCheckbox()
  return (
    <label {...htmlProps}>
      <input {...getInputProps()} />
      <div {...getCheckboxProps()}>{JSON.stringify(state, null, 4)}</div>
    </label>
  )
}

export const Basic = () => <Checkbox colorScheme="red">Hello</Checkbox>

export const Disabled = () => <Checkbox isDisabled>Disabled</Checkbox>

export const Readonly = () => <Checkbox isReadOnly>Readonly</Checkbox>

export const Invalid = () => <Checkbox isInvalid>Invalid</Checkbox>

export const WithIconColor = () => (
  <Checkbox iconColor="yellow.400">I love chakra</Checkbox>
)

export const withColorScheme = () => {
  return (
    <Stack>
      <Checkbox defaultIsChecked colorScheme="red">
        Hello world
      </Checkbox>
      <Checkbox defaultIsChecked>Hello world</Checkbox>
    </Stack>
  )
}

const CustomIcon = (props: any) => {
  const { isIndeterminate, ...rest } = props

  const d = isIndeterminate
    ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
    : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"

  return (
    <Icon viewBox="0 0 24 24" {...rest}>
      <path fill="currentColor" d={d} />
    </Icon>
  )
}

export const WithCustomIcon = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  return (
    <>
      <Heading>Default </Heading>
      <Checkbox icon={<CustomIcon />} colorScheme="red">
        Hello world
      </Checkbox>

      <Divider />

      <Heading>Indeterminate</Heading>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        icon={<CustomIcon />}
      >
        Parent Checkbox
      </Checkbox>
      <Stack ml="6" mt="2" align="start">
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </Checkbox>
      </Stack>
    </>
  )
}

export const Sizes = () => {
  const sizes = ["sm", "md", "lg"]

  return (
    <Stack direction="row">
      {sizes.map((size) => (
        <Checkbox size={size} />
      ))}
    </Stack>
  )
}

export const Indeterminate = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  return (
    <>
      <Checkbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      >
        Parent Checkbox
      </Checkbox>
      <Stack ml="6" mt="2" align="start">
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </Checkbox>
      </Stack>
    </>
  )
}

export const Controlled = () => {
  const [value, setValue] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
  }

  return <Checkbox isChecked={value} onChange={handleChange} />
}

export const CheckboxGroupExample = () => {
  return (
    <CheckboxGroup
      defaultValue={["one", "two"]}
      onChange={(value) => console.log(value)}
    >
      <Stack align="start" direction={["column", "row"]} spacing={[2, 4, 6]}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </Stack>
    </CheckboxGroup>
  )
}

export const ResponsiveCheckboxGroup = () => {
  return (
    <CheckboxGroup
      defaultValue={["one", "two"]}
      onChange={(value) => console.log(value)}
    >
      <Stack spacing={[2, 4, 6]} direction={["column", "row"]}>
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </Stack>
    </CheckboxGroup>
  )
}

type Value = string | number
type ArrayOfValue = Value[]

export const ControlledCheckboxGroup = () => {
  const [value, setValue] = React.useState<ArrayOfValue>(["one", "two"])
  return (
    <CheckboxGroup
      value={value}
      onChange={(value) => {
        console.log(value)
        setValue(value)
      }}
    >
      <Stack direction="row" spacing="40px">
        <Checkbox value="one">One</Checkbox>
        <Checkbox value="two">Two</Checkbox>
        <Checkbox value="three">Three</Checkbox>
      </Stack>
    </CheckboxGroup>
  )
}
