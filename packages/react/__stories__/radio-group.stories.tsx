import * as React from "react"
import {
  Button,
  Container,
  For,
  HStack,
  SimpleGrid,
  Stack,
  Wrap,
  WrapItem,
} from "../src"
import {
  RadioGroup,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "../src/components/radio-group"
import { chakra } from "../src/styled-system"

export default {
  title: "Form / Radio Group",
  decorators: [(story: Function) => <Container mt="40px">{story()}</Container>],
}

const RadioDemo = (props: RadioGroup.ItemProps) => {
  const { children, ...rest } = props
  return (
    <RadioGroup.Item {...rest}>
      <RadioGroup.ItemControl />
      <RadioGroup.ItemText>{children}</RadioGroup.ItemText>
    </RadioGroup.Item>
  )
}

export const Basic = () => <RadioDemo>Hello</RadioDemo>

export const Disabled = () => <RadioDemo isDisabled>Disabled</RadioDemo>

export const Readonly = () => (
  <RadioDemo mt="40px" isChecked isReadOnly size="lg" colorScheme="green">
    I'm a readonly radio
  </RadioDemo>
)

const radioSizes = ["sm", "md", "lg"]

export const WithSizes = () => {
  return (
    <For each={radioSizes}>
      {(size) => (
        <RadioDemo size={size} name="sample" ml="1rem" colorScheme="green">
          Option
        </RadioDemo>
      )}
    </For>
  )
}

export const Controlled = () => {
  const [value, setValue] = React.useState("")
  return (
    <RadioGroup.Root value={value} onChange={setValue}>
      <Stack mb="4">
        <RadioDemo value="Option 1">Option 1</RadioDemo>
        <RadioDemo value="Option 2">Option 2</RadioDemo>
        <RadioDemo value="Option 3">Option 3</RadioDemo>
      </Stack>

      <Button onClick={() => setValue("")}>Clear</Button>
    </RadioGroup.Root>
  )
}

export const StackLayout = () => {
  return (
    <RadioGroup.Root defaultValue="Option 1" onChange={console.log}>
      <Stack>
        <RadioDemo value="Option 1">Option 1</RadioDemo>
        <RadioDemo value="Option 2">Option 2</RadioDemo>
        <RadioDemo value="Option 3">Option 3</RadioDemo>
      </Stack>
    </RadioGroup.Root>
  )
}

export const WrapLayout = () => {
  const range = Array.from(Array(10)).map((_, i) => i + 1)
  return (
    <RadioGroup.Root onChange={console.log} defaultValue="Option 1">
      <Wrap spacing={[2, 4, 6]}>
        {range.map((num) => (
          <WrapItem key={num}>
            <RadioDemo value={`Option ${num}`}>{`Option ${num}`}</RadioDemo>
          </WrapItem>
        ))}
      </Wrap>
    </RadioGroup.Root>
  )
}

export const SimpleGridLayout = () => {
  const range = Array.from(Array(10)).map((_, i) => i + 1)
  return (
    <RadioGroup.Root onChange={console.log} defaultValue="Option 1">
      <SimpleGrid columns={2} spacing={[2, 4, 6]}>
        {range.map((num) => (
          <RadioDemo
            key={num}
            value={`Option ${num}`}
          >{`Option ${num}`}</RadioDemo>
        ))}
      </SimpleGrid>
    </RadioGroup.Root>
  )
}

export const WithHook = () => {
  const options = ["react", "vue", "svelte"]

  const api = useRadioGroup({
    name: "test",
    defaultValue: "vue",
    onChange: console.log,
  })

  return (
    <Stack spacing="20px" direction="row" {...api.getRootProps()}>
      {options.map((value) => (
        <RadioDemo key={value} {...(api.getItemProps({ value }) as any)}>
          {value}
        </RadioDemo>
      ))}
    </Stack>
  )
}

/**
 * Compose a custom RadioCard component using the `useRadio` hook.
 */
function RadioCard(props: UseRadioProps & { children?: React.ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props)

  return (
    <chakra.label>
      <input {...getInputProps()} />
      <chakra.div
        {...getRadioProps()}
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

  const { getRootProps, getItemProps } = useRadioGroup({
    name: "framework",
    defaultValue: "vue",
    onChange: console.log,
  })

  return (
    <Stack direction="row" {...getRootProps()}>
      {options.map((value) => (
        <RadioCard key={value} {...getItemProps({ value })}>
          {value}
        </RadioCard>
      ))}
    </Stack>
  )
}

export const DisabledRadioGroup = () => {
  return (
    <RadioGroup.Root asChild isDisabled>
      <HStack gap="4">
        <RadioDemo value="one">One</RadioDemo>
        <RadioDemo value="two" isDisabled>
          Two
        </RadioDemo>
        <RadioDemo value="three" isDisabled={false}>
          Three
        </RadioDemo>
      </HStack>
    </RadioGroup.Root>
  )
}
