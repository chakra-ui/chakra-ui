/** @jsx jsx */
import { chakra } from "@chakra-ui/system";
import { jsx } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { List, ListItem } from "../List";

const stories = storiesOf("List", module);

stories.add("Default", () => (
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
));

stories.add("Ordered", () => (
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
));
