import { storiesOf } from "@storybook/react";
import React from "react";
import { Heading } from ".";
import setup from "../story.setup";

const stories = storiesOf("Heading", module);
stories.addDecorator(setup);

stories.add("Default", () => (
  <>
    {["2xl", "xl", "lg", "md", "sm", "xs"].map((size, index) => (
      <Heading variantSize={size}>Heading {index + 1}</Heading>
    ))}
  </>
));
