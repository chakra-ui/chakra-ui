import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import Box from "../Box";
import Avatar, { AvatarBadge } from ".";
import AvatarGroup, { MoreIndicator } from "../AvatarGroup";

const stories = storiesOf("Avatar", module);
stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Default", () => (
  <Fragment>
    {["sm", "md", "lg", "xl", "2xl"].map(size => (
      <Avatar
        mr={2}
        size={size}
        name="Uchiha Itachi"
        badge={<AvatarBadge size="1.25em" bg="green.500" />}
        src="https://vignette.wikia.nocookie.net/naruto/images/b/bb/Itachi.png/revision/latest/scale-to-width-down/300?cb=20160125182202"
      />
    ))}
  </Fragment>
));

stories.add("Avatar Group", () => (
  <AvatarGroup size="md">
    <Avatar
      name="Uchiha Itachi"
      src="https://vignette.wikia.nocookie.net/naruto/images/b/bb/Itachi.png/revision/latest/scale-to-width-down/300?cb=20160125182202"
    />
    <Avatar
      name="Uchiha Sasuke"
      src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
    />
    <MoreIndicator label="+4" />
  </AvatarGroup>
));
