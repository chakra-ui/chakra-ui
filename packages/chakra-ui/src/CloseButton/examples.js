/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import CloseButton from "../CloseButton";

const stories = storiesOf("CloseButton", module);
stories.add("Default", () => <CloseButton />);
