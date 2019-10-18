/** @jsx jsx */
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import Box from "../Box";
import Text from "../Text";
import List from "../List";
import { ListItem } from "../List";
import { ListIcon } from "../List";

const stories = storiesOf("List", module);

stories.add("Default", () => (
  <Box mb={6}>
    <Text fontSize="sm" color="gray.600">
      .list-disc
    </Text>
    <List styleType="disc">
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  </Box>
));

stories.add("Ordered", () => (
  <Box mb={6}>
    <Text fontSize="sm" color="gray.600">
      .list-decimal
    </Text>
    <List styleType="decimal">
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  </Box>
));

stories.add("Unstyled", () => (
  <Box mb={6}>
    <Text fontSize="sm" color="gray.600">
      .list-none
    </Text>
    <List>
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  </Box>
));

const SampleIcon = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="#fed7d7" />
      <path
        fill="#f56565"
        d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
      />
    </svg>
  );
};

stories.add("Unstyled with icon", () => (
  <Box mb={6}>
    <Text fontSize="sm" color="gray.600">
      .list-none
    </Text>
    <List spacing={3}>
      <ListItem>
        <ListIcon icon={SampleIcon} color="green.500" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        <ListIcon icon="phone" color="green.500" />
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        <ListIcon icon="email" color="green.500" />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  </Box>
));
