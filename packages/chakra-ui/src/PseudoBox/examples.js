/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import PseudoBox from ".";
import Box from "../Box";

const stories = storiesOf("PseudoBox", module);

stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Button", () => {
  return (
    <PseudoBox
      as="button"
      py={2}
      px={4}
      userSelect="none"
      rounded="md"
      transition="all 0.2s"
      color="white"
      bg="green.400"
      fontWeight="semibold"
      _hover={{ bg: "green.500" }}
      _active={{ bg: "green.600" }}
      _focus={{ boxShadow: "outline" }}
      _disabled={{ opacity: "40%" }}
    >
      Button
    </PseudoBox>
  );
});

stories.add("Input", () => {
  const isDisabled = false;
  return (
    <PseudoBox
      as="input"
      type="email"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      placeholder="sage@adebayosegun.com"
      border="1px"
      py={2}
      px={4}
      fontSize="lg"
      width="full"
      rounded="lg"
      transition="all 0.2s"
      bg="white"
      borderColor="gray.200"
      // css={{ fontSize: 90 }}
      _placeholder={{ color: "red.500" }}
      _hover={{ borderColor: "gray.300" }}
      _focus={{ boxShadow: "outline", borderColor: "blue.500" }}
      _disabled={{ opacity: "40%", bg: "gray.100" }}
    />
  );
});
