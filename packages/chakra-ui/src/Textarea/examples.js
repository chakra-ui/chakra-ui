/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Textarea from "../Textarea";

const stories = storiesOf("Textarea", module);

stories.add("Default", () => (
  <Textarea
    maxWidth="sm"
    mx="auto"
    mt={2}
    placeholder="Here is a sample placeholder"
    size="md"
  />
));
