import { chakra } from "@chakra-ui/system"
import * as React from "react"
import { Switch } from "../src"

export default {
  title: "Switch",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="lg" mx="auto" mt={6} p={6}>
        {story()}
      </chakra.div>
    ),
  ],
}

/**
 * A simple switch component.
 */

export const Base = () => (
  <>
    <Switch colorScheme="green" />
  </>
)

/**
 * Pass the `isDisabled` prop set to true, to have the switch in the
 * disabled state.
 */

export const Disabled = () => (
  <Switch isDisabled size="md" colorScheme="blue" margin="20px" />
)

/**
 * Pass the `isReadOnly` prop set to true, to have the switch in the
 * readonly state.
 */

export const Readonly = () => (
  <Switch isReadOnly size="md" colorScheme="blue" margin="20px" />
)

/**
 * Pass the `isInvalid` prop set to true, to have the switch in the
 * invalid state.
 */

export const Invalid = () => (
  <Switch isInvalid size="md" colorScheme="blue" margin="20px" />
)

export const Usage = () => (
  <chakra.div display="flex" justifyContent="center" alignItems="center">
    <chakra.label htmlFor="email-alerts" mr="16px">
      Enable email alerts?
    </chakra.label>
    <Switch colorScheme="green" id="email-alerts" />
  </chakra.div>
)

/**
 * Pass the `size` prop to change the size of the switch.
 * Values can be either sm, md or lg.
 */

export const Sizes = () => {
  const sizes = ["sm", "md", "lg"]

  return (
    <>
      {sizes.map((size) => (
        <Switch size={size} marginLeft="1rem" colorScheme="green" />
      ))}
    </>
  )
}

/**
 * Controlled switch
 */

export const Controlled = () => {
  const [value, setValue] = React.useState(true)

  return (
    <Switch
      isChecked={value}
      colorScheme="blue"
      onChange={(e) => setValue(e.target.checked)}
    />
  )
}
