import { chakra } from "@chakra-ui/system"
import React from "react"
import Switch from "./Switch"

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
    <Switch variantSize="sm" variantColor="green" margin="20px" />
    <Switch isDisabled variantSize="md" variantColor="blue" margin="20px" />
    <Switch variantSize="lg" variantColor="cyan" />
  </>
)

export const Usage = () => (
  <chakra.div display="flex" justifyContent="center" alignItems="center">
    <chakra.label htmlFor="email-alerts" mr="16px">
      Enable email alerts?
    </chakra.label>
    <Switch variantColor="green" id="email-alerts" />
  </chakra.div>
)
