import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import CloseButton from "./CloseButton";

const stories = storiesOf("CloseButton", module);
stories.addDecorator(setup);

stories.add("default", () => (
  <>
    <CloseButton />
    <CloseButton variantSize="sm" />
  </>
));
