import * as React from "react";
import { storiesOf } from "@storybook/react";
import Spinner from "./Spinner";
import setup from "../story.setup";

const stories = storiesOf("Spinner", module);
stories.addDecorator(setup);

stories.add("Default", () => (
  <div>
    {["xl", "lg", "md", "sm", "xs"].map(size => (
      <Spinner key={size} margin={3} color="red.500" variantSize={size} />
    ))}
  </div>
));
