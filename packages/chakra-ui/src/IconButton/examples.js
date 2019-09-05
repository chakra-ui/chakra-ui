/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import IconButton from ".";

const stories = storiesOf("IconButton", module);
stories.add("Default", () => (
  <IconButton aria-label="Call us" icon="phone" color="green" variant="solid" />
));

const AddCircle = props => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm90.5 224H272v74.5c0 8.8-7.2 16-16 16-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3V272h-74.5c-4.4 0-8.4-1.8-11.3-4.7-2.9-2.9-4.7-6.9-4.7-11.3 0-8.8 7.2-16 16-16H240v-74.5c0-8.8 7.2-16 16-16s16 7.2 16 16V240h74.5c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
  </svg>
);

stories.add("with custom Icon", () => (
  <IconButton aria-label="custom icon" size="sm" icon={AddCircle} />
));

stories.add("rounded", () => (
  <IconButton aria-label="custom icon" isRound icon="phone" />
));
