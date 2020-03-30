import * as React from "react"
import { Checkbox } from "./Checkbox"
import { CheckboxGroup } from "./CheckboxGroup"
import { useCheckbox } from "."

export default {
  title: "Checkbox",
}

export const Base = () => {
  const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox()
  return (
    <label {...htmlProps}>
      <input {...getInputProps()} />
      <div {...getCheckboxProps()}>This is custom checkbox</div>
    </label>
  )
}

/**
 * A simple checkbox component.
 */

export const Basic = () => <Checkbox />

/**
 * Pass the `isDisabled` prop set to true, to have the checkbox in the
 * disabled state.
 */

export const Disabled = () => <Checkbox isDisabled children="Disabled" />

/**
 * Pass the `isReadOnly` prop set to true, to have the checkbox in the
 * readonly state.
 */

export const Readonly = () => <Checkbox isReadOnly children="Readonly" />

/**
 * Pass the `isInvalid` prop set to true, to have the checkbox in the
 * invalid state.
 */

export const Invalid = () => <Checkbox isInvalid children="Invalid" />

/**
 * Customise the checkbox appearance with colors set in your theme.
 * Pass the `colorScheme` prop as a color from your theme to change the
 * background of the checkbox.
 *
 * Pass the `color` prop to change the color of the checkbox label.
 */

export const Custom = () => {
  return (
    <>
      <Checkbox
        defaultIsChecked
        marginRight="1rem"
        colorScheme="red"
        children="Hello world"
      />
      <Checkbox defaultIsChecked color="#bbaa82" children="Hello world" />
    </>
  )
}

/**
 * Pass the `size` prop to change the size of the Checkbox.
 * Values can be either sm, md or lg.
 */

export const Sizes = () => {
  const sizes = ["sm", "md", "lg"]

  return (
    <>
      {sizes.map(size => (
        <Checkbox size={size} marginLeft="1rem" />
      ))}
    </>
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
    </>
  )
}

/**
 * A controlled checkbox
 */

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
      <Checkbox value="one">One</Checkbox>
      <Checkbox value="two">Two</Checkbox>
      <Checkbox value="three">Three</Checkbox>
    </CheckboxGroup>
  )
}
