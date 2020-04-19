import { chakra } from "@chakra-ui/system"
import * as React from "react"
import {
  Input,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
  InputGroup,
} from "."

export default {
  title: "Input",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="560px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

/**
 * A simple input component
 */

export const Basic = () => {
  return <Input placeholder="Basic input" />
}

/**
 * A controlled input component
 */

export const Controlled = () => {
  const [value, setValue] = React.useState("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="Controlled input"
    />
  )
}

/**
 * Pass the `size` prop to change the size and height of the input component.
 *
 *  @type {('sm'|'md'|'lg' })}
 */

export const Sizes = () => {
  return ["sm", "md", "lg"].map(size => (
    <Input marginBottom="1rem" placeholder="This is an input component" />
  ))
}

/**
 * - Pass the `isInvalid` prop to put the input component in an invalid state
 * - Pass the `isDisabled` prop to put the input component in a disabled state
 * - Pass the `isReadOnly` prop to put the input component in a read-only state
 */

export const States = () => (
  <>
    <Input placeholder="Idle" marginBottom="1rem" />
    <Input isInvalid placeholder="isInvalid" marginBottom="1rem" />
    <Input isDisabled placeholder="isDisabled" marginBottom="1rem" />
    <Input isReadOnly placeholder="isReadonly" />
  </>
)

/**
 * Control the visual appearance of the input component
 * by passing the `variant` prop.
 *
 * @type {('outline'|'filled'|'flushed'|'unstyled' })}
 */

export const Variants = () => (
  <>
    <Input variant="outline" placeholder="Outline" marginBottom="1rem" />
    <Input variant="filled" placeholder="Filled" marginBottom="1rem" />
    <Input variant="flushed" placeholder="Flushed" marginBottom="1rem" />
    <Input variant="unstyled" placeholder="Unstyled" />
  </>
)

/**
 * Add addons to the left and right of the input component,
 * using the InputGroup, InputAddon, InputLeftAddon and
 * InputRightAddon components.
 *
 * Any react child component can be used inside the input
 * component.
 */

export const LeftAndRightAddon = () => (
  <>
    <InputGroup>
      <InputLeftAddon children="+234" />
      <Input borderLeftRadius="0" placeholder="Phone number..." />
    </InputGroup>

    <br />

    <InputGroup size="sm">
      <InputLeftAddon children="https://" />
      <Input borderRadius="0" placeholder="website.com" />
      <InputRightAddon children=".com" />
    </InputGroup>
  </>
)

/**
 * Example of a custom element inside the input component using the InputGroup,
 * InputLeftElement and InputRightElement components.
 *
 * Any valid html element or react component can be used inside the input
 * component.
 */

export const ElementInsideInput = () => (
  <>
    <InputGroup marginBottom="1rem">
      <InputLeftElement children={"P"} />
      <Input type="phone" placeholder="Phone number" />
    </InputGroup>

    <InputGroup>
      <InputLeftElement color="gray.300" fontSize="1.2em" children="$" />
      <Input placeholder="Enter amount" />
      <InputRightElement children={"C"} />
    </InputGroup>
  </>
)

/**
 * PasswordInput component composed with InputGroup, Input
 * and InputRightElement components
 */

export function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <chakra.button h="1.75rem" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </chakra.button>
      </InputRightElement>
    </InputGroup>
  )
}

/**
 * Pass the `focusBorderColor` prop to change the border color of
 * the input component in the focused state
 *
 * Pass the `errorBorderColor` prop to change the border color of
 * the input component in the invalid state
 *
 * The value of these props can be set to a color in the theme object,
 * or a raw CSS value.
 */

export const FocusAndErrorColors = () => (
  <>
    <Input focusBorderColor="lime" placeholder="Here is a sample placeholder" />
    <br />
    <Input
      focusBorderColor="pink.400"
      placeholder="Here is a sample placeholder"
    />
    <br />
    <Input
      isInvalid
      errorBorderColor="red.300"
      placeholder="Here is a sample placeholder"
    />
    <br />
    <Input
      isInvalid
      errorBorderColor="crimson"
      placeholder="Here is a sample placeholder"
    />
    <br />
  </>
)
