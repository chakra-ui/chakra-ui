import * as React from "react"
import VisuallyHidden from "@chakra-ui/visually-hidden"
import { ControlBox } from "../src"
import { chakra } from "@chakra-ui/system"
import { CheckIcon } from "@chakra-ui/icons"

export default {
  title: "Control Box",
}

const Box = chakra.div

export const Checkbox = (props: any) => {
  return (
    <Box as="label" display="flex" alignItems="center" cursor="pointer">
      <VisuallyHidden type="checkbox" as="input" {...props} />
      <ControlBox
        w="16px"
        h="16px"
        bg="white"
        border="2px"
        rounded="md"
        color="white"
        borderColor="inherit"
        _focus={{ boxShadow: "outline" }}
        _hover={{ borderColor: "gray.300" }}
        _disabled={{ opacity: 0.4 }}
        _checked={{ bg: "green.500", borderColor: "green.500" }}
      >
        <CheckIcon w="0.64em" h="0.64em" />
      </ControlBox>
      <Box as="span" ml={2} verticalAlign="center" userSelect="none">
        This is a Checkbox
      </Box>
    </Box>
  )
}

export const Radio = (props: any) => {
  return (
    <Box as="label" display="flex" alignItems="center" cursor="pointer">
      <VisuallyHidden type="radio" as="input" {...props} />
      <ControlBox
        w="16px"
        h="16px"
        bg="white"
        border="2px"
        rounded="full"
        type="radio"
        borderColor="inherit"
        _focus={{ boxShadow: "outline" }}
        _hover={{ borderColor: "gray.300" }}
        _disabled={{ opacity: 0.4 }}
        _checked={{ bg: "green.500", borderColor: "green.500" }}
      >
        <Box w="8px" h="8px" bg="white" rounded="full" />
      </ControlBox>
      <Box as="span" ml={2} verticalAlign="center" userSelect="none">
        This is a Radio
      </Box>
    </Box>
  )
}

export const Combined = () => (
  <Box maxWidth="md" mx="auto" mt={9}>
    <Checkbox />
    <br />
    <Radio name="id" />
    <Radio name="id" />
  </Box>
)
