import * as React from "react"
import { useCheckbox, CheckboxGroup, Checkbox } from "."
import { Stack, Container } from "@chakra-ui/layout"

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

export const Basic = () => <Checkbox colorScheme="green">Hello</Checkbox>

export const Disabled = () => <Checkbox isDisabled children="Disabled" />

export const Readonly = () => <Checkbox isReadOnly children="Readonly" />

export const Invalid = () => <Checkbox isInvalid children="Invalid" />

export const withColorScheme = () => {
  return (
    <Stack>
      <Checkbox defaultIsChecked colorScheme="red" children="Hello world" />
      <Checkbox defaultIsChecked children="Hello world" />
    </Stack>
  )
}

export const Sizes = () => {
  const sizes = ["sm", "md", "lg"]

  return (
    <Stack>
      {sizes.map(size => (
        <Checkbox size={size} marginLeft="1rem" />
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
        onChange={e => setCheckedItems([e.target.checked, e.target.checked])}
        children="Parent Checkbox"
      />
      <Stack ml="6" mt="2" align="start">
        <Checkbox
          isChecked={checkedItems[0]}
          onChange={e => setCheckedItems([e.target.checked, checkedItems[1]])}
          children="Child Checkbox 1"
        />
        <Checkbox
          isChecked={checkedItems[1]}
          onChange={e => setCheckedItems([checkedItems[0], e.target.checked])}
          children="Child Checkbox 2"
        />
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
      onChange={value => console.log(value)}
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
      onChange={value => console.log(value)}
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
      onChange={value => {
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
