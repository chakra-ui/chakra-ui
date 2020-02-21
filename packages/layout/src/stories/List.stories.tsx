/** @jsx jsx */
import { jsx } from "@emotion/core"
import { List, ListItem } from "../List"

export default {
  title: "List",
}

export const Default = () => (
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
)

export const Ordered = () => (
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
)
