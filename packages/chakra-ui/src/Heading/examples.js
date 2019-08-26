/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Fragment } from "react";
import Heading from ".";

const stories = storiesOf("Heading", module);

stories.add("Default", () => (
  <Fragment>
    {["2xl", "xl", "lg", "md", "sm", "xs"].map((size, index) => (
      <Heading size={size}>Heading {index + 1}</Heading>
    ))}
  </Fragment>
));
