/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import List from "../List";
import Tag from ".";
import Icon from "../Icon";
import Avatar from "../Avatar";

const stories = storiesOf("Tag", module);

stories.add("Default", () => {
  return (
    <List spacing={4}>
      <Tag
        fontWeight="semibold"
        isRound
        color="cyan"
        leftElement={<Icon name="add" size="12px" />}
      >
        Green
      </Tag>
      <Tag
        fontWeight="semibold"
        isRound
        variant="solid"
        color="cyan"
        isClosable
      >
        Green
      </Tag>
      <Tag
        color="red"
        isRound
        isClosable
        leftElement={
          <Avatar
            src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
            size="xs"
          />
        }
      >
        Segun
      </Tag>
      <Tag isClosable color="gray">
        Gray
      </Tag>
      <Tag color="pink">Pink</Tag>
      <Tag color="blue">Blue</Tag>
    </List>
  );
});
