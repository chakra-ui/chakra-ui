import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Avatar, { MoreIndicator, AvatarBadge } from ".";
import AvatarGroup from "../AvatarGroup";
import AvatarItem, {
  AvatarText,
  AvatarContent,
  AvatarSubtext
} from "./AvatarItem";
import Badge from "../Badge";

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

stories.add("Avatar Item", () => (
  <AvatarItem>
    <Avatar
      name="Segun Adebayo"
      size="md"
      src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
    />
    <AvatarContent fontSize="md">
      <AvatarText>
        Segun Adebayo
        <Badge fontSize="0.8em" ml={1} color="green">
          New
        </Badge>
      </AvatarText>
      <AvatarSubtext>segun@gmail.com</AvatarSubtext>
    </AvatarContent>
  </AvatarItem>
));
