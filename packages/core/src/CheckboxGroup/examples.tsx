/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { CheckboxGroup } from ".";
import { Checkbox } from "../Checkbox";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";

const stories = storiesOf("CheckboxGroup", module);

stories.addDecorator(story => {
  return (
    <ThemeProvider>
      <CSSReset />
      {story()}
    </ThemeProvider>
  );
});

stories.add("Default", () => (
  <CheckboxGroup
    variantColor="green"
    defaultValue={[1]}
    onChange={val => console.log(val)}
  >
    <Checkbox value={1}>One</Checkbox>
    <Checkbox value={2}>Two</Checkbox>
    <Checkbox value={3}>Three</Checkbox>
  </CheckboxGroup>
));
