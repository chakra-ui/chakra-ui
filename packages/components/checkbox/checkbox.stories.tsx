import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Icon } from "@chakra-ui/icon"
import {
  Container,
  Divider,
  Heading,
  Stack,
  HStack,
  Flex,
  Box,
  Text,
} from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Checkbox, CheckboxGroup, useCheckbox, useCheckboxGroup } from "../src"

export default {
  title: "Components / Forms / Checkbox",
  decorators: [(story: Function) => <Container mt="40px">{story()}</Container>],
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

export const Basic = () => <Checkbox colorScheme="red">Hello</Checkbox>

export const Disabled = () => <Checkbox isDisabled>Disabled</Checkbox>

export const Readonly = () => <Checkbox isReadOnly>Readonly</Checkbox>

export const Invalid = () => <Checkbox isInvalid>Invalid</Checkbox>
export const NotFocusable = () => (
  <>
    <Checkbox isFocusable={false}>not focusable</Checkbox>
    <Checkbox isFocusable={false} isDisabled>
      disabled and not focusable (truly disabled)
    </Checkbox>
    <Checkbox tabIndex={-1} isFocusable={false}>
      Not Focusable with provided tabIndex
    </Checkbox>
  </>
)

export const WithIconColor = () => (
  <Checkbox iconColor="yellow.400">I love chakra</Checkbox>
)

export const WithColorScheme = () => {
  return (
    <Stack>
      <Checkbox defaultChecked colorScheme="red">
        Hello world
      </Checkbox>
      <Checkbox defaultChecked>Hello world</Checkbox>
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
        <Checkbox key={size} size={size} />
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

export const CustomCheckboxGroup = () => {
  function CustomCheckbox(props: any) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props)

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
    <>
      <FormControl id="optIn">
        <FormLabel>Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={["1", "3"]}>
          <HStack>
            <Checkbox value="1">Opt-in 1</Checkbox>
            <Checkbox value="2">Opt-in 2</Checkbox>
            <Checkbox value="3">Opt-in 3</Checkbox>
          </HStack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInInvalid" isInvalid mt={4}>
        <FormLabel>Invalid Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <Checkbox value="1">Invalid Opt-in 1</Checkbox>
            <Checkbox value="2">Invalid Opt-in 2</Checkbox>
            <Checkbox value="3">Invalid Opt-in 3</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInDisabled" isDisabled mt={4}>
        <FormLabel>Disabled Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <Checkbox value="1">Disabled Opt-in 1</Checkbox>
            <Checkbox value="2">Disabled Opt-in 2</Checkbox>
            <Checkbox value="3">Disabled Opt-in 3</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInReadonly" isReadOnly mt={4}>
        <FormLabel>Readonly Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <Checkbox value="1">Readonly Opt-in 1</Checkbox>
            <Checkbox value="2">Readonly Opt-in 2</Checkbox>
            <Checkbox value="3">Readonly Opt-in 3</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <FormControl id="optInRequired" isRequired mt={4}>
        <FormLabel>Required Opt-in Example</FormLabel>
        <CheckboxGroup defaultValue={["2", "3"]}>
          <Stack spacing={2}>
            <Checkbox value="1">Required Opt-in 1</Checkbox>
            <Checkbox value="2">Required Opt-in 2</Checkbox>
            <Checkbox value="3">Required Opt-in 3</Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>
    </>
  )
}
