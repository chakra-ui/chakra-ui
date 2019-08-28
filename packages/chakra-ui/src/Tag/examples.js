/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Stack from "../Stack";
import Tag, { TagLabel, TagLeftAddon, TagRightAddon, TagCloseButton } from ".";
import Icon from "../Icon";
import Avatar from "../Avatar";

const stories = storiesOf("Tag", module);

stories.add("Default", () => {
  return (
    <Stack spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} color="gray">
          <TagLabel>Gray</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with left icon", () => {
  return (
    <Stack spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} color="cyan">
          <TagLeftAddon>
            <Icon name="add" size="12px" />
          </TagLeftAddon>
          <TagLabel>Green</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with right icon", () => {
  return (
    <Stack spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} color="cyan">
          <TagLabel>Green</TagLabel>
          <TagRightAddon>
            <Icon name="check" size="12px" />
          </TagRightAddon>
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with close button", () => {
  return (
    <Stack spacing={4} inline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} rounded="full" variant="solid" color="cyan">
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with custom element", () => {
  return (
    <Stack spacing={4} inline>
      <Tag color="red" rounded="full">
        <TagLeftAddon>
          <Avatar
            src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
            size="xs"
            name="Segun Adebayo"
          />
        </TagLeftAddon>
        <TagLabel>Segun</TagLabel>
      </Tag>
    </Stack>
  );
});
