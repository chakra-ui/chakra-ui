import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import Box from "../Box";
import Avatar, { AvatarBadge } from "../Avatar";
import AvatarGroup from "../AvatarGroup";

const stories = storiesOf("Avatar", module);
stories.addDecorator(story => (
  <Box maxWidth="lg" mt="40px" mx="auto">
    {story()}
  </Box>
));

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
  <AvatarGroup size="md" max={2}>
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
  </AvatarGroup>
));
