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

stories.add("Into", () => {
  return (
    <PseudoBox
      bg="green.400"
      // as="input"
      position="relative"
      fontWeight="semibold"
      // placeholder="Testing"
      _after={{ content: `'to'`, ml: 3 }}
    >
      Testing
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

stories.add("Generic", () => {
  return (
    <Box
      bg="white"
      display={["flex", "block"]}
      rounded="lg"
      p={6}
      boxShadow="lg"
      transition="all 0.2s"
    >
      <Box
        as="img"
        size={["24", "16"]}
        rounded="full"
        mx={["0", "auto"]}
        mr={[5, null]}
        mb={[null, 4]}
        display="block"
        src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
      />
      <Box textAlign={["left", "center"]}>
        <Box as="h2" fontSize="lg" fontWeight="bold">
          Erin Lindford
        </Box>
        <Box color="purple.500">Customer Support</Box>
        <Box color="gray.600">erinlindford@example.com</Box>
        <Box color="gray.600">(555) 765-4321</Box>
      </Box>
    </Box>
  );
});
