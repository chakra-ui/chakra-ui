/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Stack from "../Stack";
import Tag, { TagLabel, TagCloseButton, TagIcon } from "../Tag";
import Avatar from "../Avatar";

const stories = storiesOf("Tag", module);

stories.add("Default", () => {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} variantColor="gray">
          Gray
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with left icon", () => {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} variantColor="cyan">
          <TagIcon icon="add" size="12px" />
          <TagLabel>Green</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with right icon", () => {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} variantColor="cyan">
          <TagLabel>Green</TagLabel>
          <TagIcon icon="check" size="12px" />
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with close button", () => {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} rounded="full" variant="solid" variantColor="cyan">
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </Stack>
  );
});

stories.add("with custom element", () => {
  return (
    <Tag variantColor="red" rounded="full">
      <Avatar
        src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
        size="xs"
        name="Segun Adebayo"
        ml={-1}
        mr={2}
      />
      <TagLabel>Segun</TagLabel>
    </Tag>
  );
});
