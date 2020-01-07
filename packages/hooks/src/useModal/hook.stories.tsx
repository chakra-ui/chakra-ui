import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import { SampleModal } from "./v2";

const stories = storiesOf("use modal", module);
stories.addDecorator(setup);

stories.add("default", SampleModal);
