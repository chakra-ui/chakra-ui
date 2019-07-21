/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import VisuallyHidden from "../VisuallyHidden";
import InputBox from ".";
import Box from "../Box";
import Icon from "../Icon";
const stories = storiesOf("InputBox", module);

const Checkbox = props => {
  return (
    <Box as="label" display="flex" alignItems="center" cursor="pointer">
      <VisuallyHidden type="checkbox" as="input" {...props} />
      <InputBox
        size="16px"
        bg="white"
        border="2px"
        rounded="md"
        color="white"
        borderColor="inherit"
        _focus={{ boxShadow: "outline" }}
        _hover={{ borderColor: "gray.300" }}
        _disabled={{ opacity: "40%" }}
        _checked={{ bg: "green.500", borderColor: "green.500" }}
      >
        <Icon name="check" size="10px" />
      </InputBox>
      <Box as="span" ml={2} verticalAlign="center" userSelect="none">
        This is a Checkbox
      </Box>
    </Box>
  );
};

const Radio = props => {
  return (
    <Box as="label" display="flex" alignItems="center" cursor="pointer">
      <VisuallyHidden type="radio" as="input" {...props} />
      <InputBox
        size="16px"
        bg="white"
        border="2px"
        rounded="full"
        type="radio"
        borderColor="inherit"
        _focus={{ boxShadow: "outline" }}
        _hover={{ borderColor: "gray.300" }}
        _disabled={{ opacity: "40%" }}
        _checked={{ bg: "green.500", borderColor: "green.500" }}
      >
        <Box size="8px" bg="white" rounded="full" />
      </InputBox>
      <Box as="span" ml={2} verticalAlign="center" userSelect="none">
        This is a Radio
      </Box>
    </Box>
  );
};

stories.add("Sample", () => (
  <Box maxWidth="md" mx="auto" mt={9}>
    <Checkbox />
    <br />
    <Radio name="id" />
    <Radio name="id" />
  </Box>
));
