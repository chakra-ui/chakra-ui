import { chakra } from "@chakra-ui/system"
import * as React from "react"
import Input from "./Input"
import { InputLeftAddon, InputRightAddon } from "./Input.addon"
import { InputLeftElement, InputRightElement } from "./Input.element"
import InputGroup from "./Input.group"

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

export const States = () => (
  <>
    <Input placeholder="Idle" />
    <br />
    <Input isInvalid placeholder="isInvalid" />
    <br />
    <Input isDisabled placeholder="isDisabled" />
    <br />
    <Input isReadOnly placeholder="isReadonly" />
  </>
)

export const Variants = () => (
  <>
    <Input variant="outline" placeholder="Outline" />
    <br />
    <Input variant="filled" placeholder="Filled" />
    <br />
    <Input variant="flushed" placeholder="Flushed" />
    <br />
    <Input variant="unstyled" placeholder="Unstyled" />
  </>
)

export const LeftAndRightAddon = () => (
  <>
    <InputGroup>
      <InputLeftAddon children="+234" />
      <Input borderLeftRadius="0" placeholder="Phone number..." />
    </InputGroup>

    <br />

    <InputGroup variantSize="sm">
      <InputLeftAddon children="https://" />
      <Input borderRadius="0" placeholder="website.com" />
      <InputRightAddon children=".com" />
    </InputGroup>
  </>
)

export const ElementInsideInput = () => (
  <>
    <InputGroup>
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

export function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup variantSize="md">
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
