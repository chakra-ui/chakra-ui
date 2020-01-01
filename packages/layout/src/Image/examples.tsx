import { storiesOf } from "@storybook/react";
import React from "react";
import { Image } from ".";
import setup from "../story.setup";

const stories = storiesOf("Image", module);
stories.addDecorator(setup);

stories.add("Default", () => (
  <Image
    htmlWidth="100px"
    src="https://avatars3.githubusercontent.com/u/37928?s=52&v=4"
  />
));
