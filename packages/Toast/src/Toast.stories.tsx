import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";

const stories = storiesOf("Toast", module);
stories.addDecorator(setup);

stories.add("default", () => <div>Let's show the toaster</div>);
