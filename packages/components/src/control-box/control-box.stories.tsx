import { VisuallyHidden } from "../visually-hidden"
import { chakra } from "../system"
import { FaCheck } from "react-icons/fa"
import { ControlBox } from "."

export default {
  title: "Components / Forms / Control Box",
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
        fontSize="0.64em"
        _focus={{ boxShadow: "outline" }}
        _hover={{ borderColor: "gray.300" }}
        _disabled={{ opacity: 0.4 }}
        _checked={{ bg: "green.500", borderColor: "green.500" }}
      >
        <FaCheck />
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
