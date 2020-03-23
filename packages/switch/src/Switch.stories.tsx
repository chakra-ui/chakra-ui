import { chakra } from "@chakra-ui/styled"
import React from "react"
import { Switch } from "./Switch"

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

export const Base = () => (
  <>
    <Switch size="sm" colorScheme="green" margin="20px" />
    <Switch isDisabled size="md" colorScheme="blue" margin="20px" />
    <Switch size="lg" colorScheme="cyan" />
  </>
)

export const Usage = () => (
  <chakra.div display="flex" justifyContent="center" alignItems="center">
    <chakra.label htmlFor="email-alerts" mr="16px">
      Enable email alerts?
    </chakra.label>
    <Switch colorScheme="green" id="email-alerts" />
  </chakra.div>
)

export const Controlled = () => {
  const [value, setValue] = React.useState(false)

  return (
    <Switch
      isChecked={value}
      colorScheme="green"
      onChange={e => setValue(e.target.checked)}
    />
  )
}
