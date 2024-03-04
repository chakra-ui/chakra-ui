import * as React from "react"
import { Container, For, Stack } from "../src"
import { NativeSelect as Select } from "../src/components/native-select"

export default {
  title: "Forms / Select",
  decorators: [
    (story: Function) => (
      <Container maxWidth="400px" mt="40px">
        {story()}
      </Container>
    ),
  ],
}

export const Basic = () => (
  <Select.Root>
    <Select.Field color="pink.500" placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select.Field>
    <Select.Icon />
  </Select.Root>
)

export const Invalid = () => (
  <Select.Root isInvalid>
    <Select.Field placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select.Field>
    <Select.Icon />
  </Select.Root>
)

export const Disabled = () => (
  <Select.Root isDisabled>
    <Select.Field placeholder="Select option">
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select.Field>
    <Select.Icon />
  </Select.Root>
)

export const Variants = () => (
  <Stack>
    <For each={["outline", "filled", "flushed", "unstyled"]}>
      {(variant) => (
        <Select.Root key={variant} variant={variant}>
          <Select.Field placeholder="Select option">
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </Select.Field>
          <Select.Icon />
        </Select.Root>
      )}
    </For>
  </Stack>
)

export const Sizes = () => (
  <Stack spacing={4}>
    <For each={["xs", "sm", "md", "lg"]}>
      {(size) => (
        <Select.Root key={size} size={size}>
          <Select.Field placeholder={`Select ${size}`}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </Select.Field>
          <Select.Icon />
        </Select.Root>
      )}
    </For>
  </Stack>
)

export const Controlled = () => {
  const [value, setValue] = React.useState("")

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)
  }

  return (
    <Select.Root value={value} onChange={handleChange}>
      <Select.Field placeholder="Controlled select">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </Select.Field>
      <Select.Icon />
    </Select.Root>
  )
}

const UpDownIcon = (props: any) => (
  <svg viewBox="0 0 6 15" fill="none" stroke="currentColor" {...props}>
    <path d="M5 5.5L3 3.5L1 5.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 9.5L3 11.5L1 9.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CustomIcon = () => (
  <Select.Root size="sm">
    <Select.Field placeholder="Placeholder" />
    <Select.Icon asChild>
      <UpDownIcon />
    </Select.Icon>
  </Select.Root>
)

export const WithFocusBorderColor = () => (
  <Stack>
    <Select.Root focusBorderColor="lime">
      <Select.Field placeholder="Here is a sample placeholder" />
      <Select.Icon />
    </Select.Root>

    <Select.Root focusBorderColor="pink.400">
      <Select.Field placeholder="Here is a sample placeholder" />
      <Select.Icon />
    </Select.Root>
  </Stack>
)

export const WithErrorBorderColor = () => (
  <Stack>
    <Select.Root isInvalid errorBorderColor="red.300">
      <Select.Field placeholder="Here is a sample placeholder" />
      <Select.Icon />
    </Select.Root>

    <Select.Root isInvalid errorBorderColor="crimson">
      <Select.Field placeholder="Here is a sample placeholder" />
      <Select.Icon />
    </Select.Root>
  </Stack>
)

export const StyleOverrides = () => (
  <Select.Root>
    <Select.Field
      color="white"
      height="60px"
      borderColor="tomato"
      bg="tomato"
      placeholder="Woohoo! A new background color!"
    />
    <Select.Icon />
  </Select.Root>
)
