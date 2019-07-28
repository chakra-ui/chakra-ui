import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Avatar, { AvatarBadge } from ".";
import AvatarGroup, { MoreIndicator } from "../AvatarGroup";

const stories = storiesOf("Avatar", module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
  <Box maxWidth="md" mt="40px" mx="auto">
    {story()}
  </Box>
));

stories.add("Avatars", () => (
  <>
    {["sm", "md", "lg", "xl", "2xl"].map(size => (
      <Avatar
        mr={2}
        size={size}
        name="Evil Rabbit"
        badge={<AvatarBadge size="1.25em" bg="green.500" />}
        src="https://zeit.co/api/www/avatar/?u=rauchg&s=60"
      />
    ))}
  </>
));

stories.add("Avatar Group", () => (
  <AvatarGroup size="md">
    <Avatar
      name="Segun Adebayo"
      src="https://zeit.co/api/www/avatar/?u=rauchg&s=60"
    />
    <Avatar
      name="Kola Tiolu"
      // src="https://zeit.co/api/www/avatar/?u=leo&s=60"
    />
    <MoreIndicator label="+4" />
  </AvatarGroup>
));
