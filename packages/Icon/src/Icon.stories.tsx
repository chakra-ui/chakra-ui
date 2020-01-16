import * as React from "react";
import { storiesOf } from "@storybook/react";
import setup from "../story.setup";
import Icon, { IconProps } from "./Icon";
import { Md3DRotation } from "react-icons/md";

const stories = storiesOf("Icon", module);
stories.addDecorator(setup);

stories.add("default", () => <Icon fontSize="24px" />);

const ArrowIcon = (props: IconProps) => (
  <Icon viewBox="0 0 32 32" {...props}>
    <g fill="currentColor">
      <path d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z" />
      <path d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z" />
    </g>
  </Icon>
);

stories.add("custom icon", () => <ArrowIcon size="40px" color="red.100" />);

stories.add("using react-icon", () => (
  <Icon as={Md3DRotation} size="40px" color="tomato" />
));
