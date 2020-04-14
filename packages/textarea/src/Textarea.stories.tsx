import * as React from "react"
import { Textarea } from "./Textarea"

export default {
  title: "Textarea",
}

/**
 * A simple textarea
 */

export const BasicExample = () => <Textarea defaultValue="This is a textarea" />

/**
 * Pass the `isDisabled` prop to put the textarea in the disabled state
 */

export const Disabled = () => (
  <Textarea isDisabled placeholder="A disabled textarea" />
)

/**
 * Pass the `isInvalid` prop to put the textarea in the invalid state
 */

export const Invalid = () => (
  <Textarea isInvalid placeholder="An invalid textarea" />
)

/**
 * Pass the `size` prop to change the size of the textarea
 */

export const Sizes = () => (
  <>
    <Textarea
      size="sm"
      placeholder="A sample placeholder"
      defaultValue="This is a small textarea"
    />
    <Textarea
      placeholder="A sample placeholder"
      defaultValue="This is a default textarea"
    />
    <Textarea
      size="lg"
      placeholder="A sample placeholder"
      defaultValue="This is a large textarea"
    />
  </>
)

/**
 * A controlled textarea
 */

export const Controlled = () => {
  const [value, setValue] = React.useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
  }

  return (
    <>
      <p>Value: {value}</p>
      <Textarea
        mt="8px"
        value={value}
        placeholder="Enter value"
        onChange={handleInputChange}
      />
    </>
  )
}

/**
 * Pass the `resize` prop to resize to textarea in the vertical or horizontal direction
 */

export const Resize = () => (
  <Textarea placeholder="Here is a sample placeholder" resize="horizontal" />
)
