import * as React from "react"
import {
  Box,
  Checkbox,
  Container,
  Divider,
  Field,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  chakra,
  useCheckbox,
  useCheckboxGroup,
} from "../src"
import { splitCheckboxProps } from "../src/components/checkbox/checkbox-props"

export default {
  title: "Forms / Checkbox",
  decorators: [(story: Function) => <Container mt="40px">{story()}</Container>],
}

const DemoCheckbox = (props: Checkbox.RootProps) => {
  return (
    <Checkbox.Root {...props}>
      <Checkbox.Control />
      <Checkbox.Label>{props.children}</Checkbox.Label>
    </Checkbox.Root>
  )
}

export const WithHooks = () => {
  const { state, getRootProps, getInputProps, getCheckboxProps } = useCheckbox()
  return (
    <label {...getRootProps()}>
      <input {...getInputProps()} />
      <span {...getCheckboxProps()}>{JSON.stringify(state, null, 4)}</span>
      <span>Hello</span>
    </label>
  )
}

export const Basic = () => <DemoCheckbox colorScheme="red">Hello</DemoCheckbox>

export const Disabled = () => <DemoCheckbox isDisabled>Disabled</DemoCheckbox>

export const Readonly = () => <DemoCheckbox isReadOnly>Readonly</DemoCheckbox>

export const Invalid = () => <DemoCheckbox isInvalid>Invalid</DemoCheckbox>

export const NotFocusable = () => (
  <Stack>
    <DemoCheckbox isFocusable={false}>not focusable</DemoCheckbox>
    <DemoCheckbox isFocusable={false} isDisabled>
      disabled and not focusable (truly disabled)
    </DemoCheckbox>
    <DemoCheckbox tabIndex={-1} isFocusable={false}>
      Not Focusable with provided tabIndex
    </DemoCheckbox>
  </Stack>
)

export const WithIconColor = () => {
  return (
    <Checkbox.Root>
      <Checkbox.Control iconColor="yellow.400" />
      <Checkbox.Label>I love chakra</Checkbox.Label>
    </Checkbox.Root>
  )
}

export const WithColorScheme = () => {
  return (
    <Stack>
      <DemoCheckbox defaultChecked colorScheme="red">
        Hello world
      </DemoCheckbox>
      <DemoCheckbox defaultChecked>Hello world</DemoCheckbox>
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
      <Heading>Default</Heading>

      <Checkbox.Root colorScheme="red">
        <Checkbox.Control icon={<CustomIcon />} />
        <Checkbox.Label>Hello world</Checkbox.Label>
      </Checkbox.Root>

      <Divider />

      <Heading>Indeterminate</Heading>

      <Checkbox.Root
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
        colorScheme="red"
      >
        <Checkbox.Control icon={<CustomIcon />} />
        <Checkbox.Label>Parent Checkbox</Checkbox.Label>
      </Checkbox.Root>

      <Stack ml="6" mt="2" align="start">
        <DemoCheckbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </DemoCheckbox>
        <DemoCheckbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </DemoCheckbox>
      </Stack>
    </>
  )
}

const sizes = ["sm", "md", "lg"]

export const WithSizes = () => (
  <Stack direction="row">
    {sizes.map((size) => (
      <DemoCheckbox key={size} size={size} />
    ))}
  </Stack>
)

export const Indeterminate = () => {
  const [checkedItems, setCheckedItems] = React.useState([false, false])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  return (
    <>
      <DemoCheckbox
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
      >
        Parent Checkbox
      </DemoCheckbox>
      <Stack ml="6" mt="2" align="start">
        <DemoCheckbox
          isChecked={checkedItems[0]}
          onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
        >
          Child Checkbox 1
        </DemoCheckbox>
        <DemoCheckbox
          isChecked={checkedItems[1]}
          onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
        >
          Child Checkbox 2
        </DemoCheckbox>
      </Stack>
    </>
  )
}

export const Controlled = () => {
  const [value, setValue] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
  }

  return <DemoCheckbox isChecked={value} onChange={handleChange} />
}

export const CheckboxGroupExample = () => {
  return (
    <Checkbox.Group
      defaultValue={["one", "two"]}
      onChange={(value) => console.log(value)}
    >
      <Stack align="start" direction={["column", "row"]} spacing={[2, 4, 6]}>
        <DemoCheckbox value="one">One</DemoCheckbox>
        <DemoCheckbox value="two">Two</DemoCheckbox>
        <DemoCheckbox value="three">Three</DemoCheckbox>
      </Stack>
    </Checkbox.Group>
  )
}

export const ResponsiveCheckboxGroup = () => {
  return (
    <Checkbox.Group
      defaultValue={["one", "two"]}
      onChange={(value) => console.log(value)}
    >
      <Stack spacing={[2, 4, 6]} direction={["column", "row"]}>
        <DemoCheckbox value="one">One</DemoCheckbox>
        <DemoCheckbox value="two">Two</DemoCheckbox>
        <DemoCheckbox value="three">Three</DemoCheckbox>
      </Stack>
    </Checkbox.Group>
  )
}

type Value = string | number
type ArrayOfValue = Value[]

export const ControlledCheckboxGroup = () => {
  const [value, setValue] = React.useState<ArrayOfValue>(["one", "two"])
  return (
    <Checkbox.Group
      value={value}
      onChange={(value) => {
        console.log(value)
        setValue(value)
      }}
    >
      <Stack direction="row" spacing="40px">
        <DemoCheckbox value="one">One</DemoCheckbox>
        <DemoCheckbox value="two">Two</DemoCheckbox>
        <DemoCheckbox value="three">Three</DemoCheckbox>
      </Stack>
    </Checkbox.Group>
  )
}

export const CustomCheckboxGroup = () => {
  function CustomCheckbox(props: any) {
    const [checkboxProps, htmlProps] = splitCheckboxProps(props)

    const { state, getCheckboxProps, getInputProps, getLabelProps } =
      useCheckbox(checkboxProps)

    return (
      <chakra.label
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        maxW="40"
        bg="green.50"
        border="1px solid"
        borderColor="green.500"
        rounded="lg"
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="green.500"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="green.500" />}
        </Flex>
        <Text {...getLabelProps()}>Click me for {props.value}</Text>
      </chakra.label>
    )
  }

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [2],
  })

  return (
    <Stack>
      <Text>The selected checkboxes are: {value.sort().join(" and ")}</Text>
      <CustomCheckbox {...getCheckboxProps({ value: 1 })} />
      <CustomCheckbox {...getCheckboxProps({ value: 2 })} />
      <CustomCheckbox {...getCheckboxProps({ value: 3 })} />
    </Stack>
  )
}
export const WithFormControl = () => {
  return (
    <Stack>
      <Field.Root id="optIn">
        <Field.Label>Opt-in Example</Field.Label>
        <Checkbox.Group defaultValue={["1", "3"]}>
          <HStack>
            <DemoCheckbox value="1">Opt-in 1</DemoCheckbox>
            <DemoCheckbox value="2">Opt-in 2</DemoCheckbox>
            <DemoCheckbox value="3">Opt-in 3</DemoCheckbox>
          </HStack>
        </Checkbox.Group>
      </Field.Root>

      <Field.Root id="optInInvalid" isInvalid mt={4}>
        <Field.Label>Invalid Opt-in Example</Field.Label>
        <Checkbox.Group defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <DemoCheckbox value="1">Invalid Opt-in 1</DemoCheckbox>
            <DemoCheckbox value="2">Invalid Opt-in 2</DemoCheckbox>
            <DemoCheckbox value="3">Invalid Opt-in 3</DemoCheckbox>
          </Stack>
        </Checkbox.Group>
      </Field.Root>

      <Field.Root id="optInDisabled" isDisabled mt={4}>
        <Field.Label>Disabled Opt-in Example</Field.Label>
        <Checkbox.Group defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <DemoCheckbox value="1">Disabled Opt-in 1</DemoCheckbox>
            <DemoCheckbox value="2">Disabled Opt-in 2</DemoCheckbox>
            <DemoCheckbox value="3">Disabled Opt-in 3</DemoCheckbox>
          </Stack>
        </Checkbox.Group>
      </Field.Root>

      <Field.Root id="optInReadonly" isReadOnly mt={4}>
        <Field.Label>Readonly Opt-in Example</Field.Label>
        <Checkbox.Group defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <DemoCheckbox value="1">Readonly Opt-in 1</DemoCheckbox>
            <DemoCheckbox value="2">Readonly Opt-in 2</DemoCheckbox>
            <DemoCheckbox value="3">Readonly Opt-in 3</DemoCheckbox>
          </Stack>
        </Checkbox.Group>
      </Field.Root>

      <Field.Root id="optInRequired" isRequired mt={4}>
        <Field.Label>Required Opt-in Example</Field.Label>
        <Checkbox.Group defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <DemoCheckbox value="1">Required Opt-in 1</DemoCheckbox>
            <DemoCheckbox value="2">Required Opt-in 2</DemoCheckbox>
            <DemoCheckbox value="3">Required Opt-in 3</DemoCheckbox>
          </Stack>
        </Checkbox.Group>
      </Field.Root>
    </Stack>
  )
}
