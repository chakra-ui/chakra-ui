/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Spinner from ".";

const stories = storiesOf("Spinner", module);
stories.add("Default", () =>
  ["xl", "lg", "md", "sm", "xs"].map(size => (
    <Spinner m={3} color="red.500" size={size} />
  )),
);
