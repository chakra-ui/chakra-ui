import * as React from "react"
import { Textarea } from "../src/components/textarea"
import { chakra } from "../src/styled-system"

export default {
  title: "Forms / Textarea",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="500px" mt="40px" mx="auto">
        {story()}
      </chakra.div>
    ),
  ],
}

export const basic = () => <Textarea defaultValue="This is a textarea" />

export const rows = () => (
  <Textarea defaultValue="This is a textarea" rows={12} />
)

export const disabled = () => (
  <Textarea isDisabled placeholder="A disabled textarea" />
)

export const invalid = () => (
  <Textarea isInvalid placeholder="An invalid textarea" />
)

export const withSizes = () => (
  <>
    <Textarea
      size="xs"
      placeholder="A sample placeholder"
      defaultValue="This is a x-small textarea"
    />
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

export const Controlled = () => {
  const [value, setValue] = React.useState("")

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
      <p>Value: {value}</p>
      <Textarea
        mt="8px"
        value={value}
        placeholder="Enter value"
        onChange={onChange}
      />
    </>
  )
}

export const withResize = () => (
  <Textarea placeholder="Here is a sample placeholder" resize="horizontal" />
)
