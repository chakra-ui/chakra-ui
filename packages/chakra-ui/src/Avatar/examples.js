import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import Box from "../Box";
import Avatar, { MoreIndicator } from ".";
import AvatarGroup from "../AvatarGroup";
import AvatarItem, {
  AvatarText,
  AvatarTextGroup,
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
    {["sm", "md", "lg", "xl", "xxl"].map(size => (
      <Avatar
        size={size}
        name="Evil Rabbit"
        badge={<Box borderRadius="full" size="100%" bg="green.500" />}
        // src="https://zeit.co/api/www/avatar/?u=rauchg&s=60"
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
      name="sage"
      size="md"
      src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
    />
    <AvatarTextGroup fontSize="md">
      <AvatarText fontWeight="semibold" display="inline-block">
        Segun Adebayo
      </AvatarText>
      <Badge fontSize="xs" ml={1} color="green">
        New
      </Badge>
      <AvatarSubtext>segun@gmail.com</AvatarSubtext>
    </AvatarTextGroup>
  </AvatarItem>
));
