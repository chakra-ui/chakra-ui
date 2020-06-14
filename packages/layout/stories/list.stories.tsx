import * as React from "react"
import {
  List,
  ListItem,
  Box,
  Text,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "../src"
import { FaCheck, FaPhone, FaAccessibleIcon } from "react-icons/fa"

export default {
  title: "List",
}

export const Default = () => (
  <Box mt={6}>
    <Text fontSize="sm" color="gray.600">
      .list-disc
    </Text>
    <UnorderedList spacing="2px">
      <ListItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </UnorderedList>
  </Box>
)

export const Ordered = () => (
  <OrderedList>
    <ListItem>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </ListItem>
    <ListItem>
      Assumenda, quia temporibus eveniet a libero incidunt suscipit
    </ListItem>
    <ListItem>
      Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
    </ListItem>
  </OrderedList>
)

export const unstyledWithIcon = () => (
  <Box mb={6}>
    <Text fontSize="sm" color="gray.600">
      .list-none
    </Text>
    <List spacing={3}>
      <ListItem>
        <ListIcon as={FaCheck} color="green.500" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
      <ListItem>
        <ListIcon as={FaPhone} color="green.500" />
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </ListItem>
      <ListItem>
        <ListIcon as={FaAccessibleIcon} color="green.500" />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </ListItem>
    </List>
  </Box>
)
