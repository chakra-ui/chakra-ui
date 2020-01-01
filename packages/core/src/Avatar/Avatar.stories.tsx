import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import { Avatar, AvatarBadge } from ".";
import setup from "../story.setup";

const stories = storiesOf("Avatar", module);

stories.addDecorator(setup);

stories.add("Default", () => (
  <Fragment>
    {["xs", "sm", "md", "lg", "xl", "2xl"].map(size => (
      <Avatar
        mr={2}
        size={size}
        name="Uchiha Itachi"
        src="https://bit.ly/uchiha-itachi"
      >
        <AvatarBadge size="1.25em" bg="green.500" />
      </Avatar>
    ))}
  </Fragment>
));

stories.add("Avatar Group", () => (
  <div>
    <Avatar name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi" />
    <Avatar
      name="Uchiha Sasuke"
      src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
    />
    <Avatar
      name="Uchiha Sasuke"
      src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
    />
    <Avatar
      name="Uchiha Sasuke"
      src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
    />
    <Avatar
      name="Uchiha Sasuke"
      src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
    />
  </div>
));
