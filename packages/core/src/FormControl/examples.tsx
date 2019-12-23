/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { FormControl } from ".";
import { Box } from "@chakra-ui/layout";
import { FormHelperText } from "../FormHelperText";
import { FormLabel } from "../FormLabel";
import { Input } from "../Input";
import { InputLeftAddon } from "../InputAddon";
import { InputGroup } from "../InputGroup";
import { FormErrorMessage } from "../FormErrorMessage";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("FormControl", module);

stories.addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    <Box maxWidth="lg" mx="auto" mt={6} p={6}>
      {story()}
    </Box>
  </ThemeProvider>
));

stories.add("Default", () => (
  <FormControl isRequired>
    <FormLabel htmlFor="fname">First name</FormLabel>
    <Input id="fname" placeholder="First name" />
  </FormControl>
));

stories.add("with select", () => (
  <FormControl isInvalid>
    <FormLabel htmlFor="fname">First name</FormLabel>
    <Input id="fname" placeholder="First name" />
  </FormControl>
));

stories.add("with helper text", () => (
  <FormControl>
    <FormLabel htmlFor="lname">Last name</FormLabel>
    <Input id="lname" aria-describedby="lname-help" placeholder="Last name" />
    <FormHelperText id="lname-help">
      Ensure it's up to 7 charaters
    </FormHelperText>
  </FormControl>
));

stories.add("with input group", () => (
  <FormControl>
    <FormLabel>How much you wan buy am?</FormLabel>
    <InputGroup>
      <InputLeftAddon>https://</InputLeftAddon>
      <Input roundedLeft="0" placeholder="Welcome" />
    </InputGroup>
    <FormHelperText>Add your website here</FormHelperText>
  </FormControl>
));

stories.add("with error", () => (
  <FormControl isInvalid>
    <FormLabel htmlFor="url">Website</FormLabel>
    <InputGroup>
      <InputLeftAddon>https://</InputLeftAddon>
      <Input
        type="url"
        id="url"
        aria-describedby="url-error"
        roundedLeft="0"
        placeholder="awesomesite.com"
      />
    </InputGroup>
    <FormErrorMessage id="url-error">Website is invalid</FormErrorMessage>
  </FormControl>
));
