import { FaAccessibleIcon, FaCheck, FaPhone } from "react-icons/fa"
import { Box, List, Text } from "../src"

export default {
  title: "Data Display / List",
}

export const Basic = () => (
  <Box mt="6">
    <Text fontSize="sm" color="gray.600">
      .list-disc
    </Text>
    <List.Root gap="2px">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  </Box>
)

export const Ordered = () => (
  <Box mt="6">
    <Text fontSize="sm" color="gray.600">
      .list-decimal
    </Text>
    <List.Root as="ol" styleType="decimal">
      <List.Item>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  </Box>
)

export const WithIcon = () => (
  <Box mb="6">
    <Text fontSize="sm" color="gray.600">
      .list-none
    </Text>
    <List.Root gap="2" styleType="none">
      <List.Item>
        <List.Icon as={FaCheck} color="green.500" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </List.Item>
      <List.Item>
        <List.Icon as={FaPhone} color="green.500" />
        Assumenda, quia temporibus eveniet a libero incidunt suscipit
      </List.Item>
      <List.Item>
        <List.Icon as={FaAccessibleIcon} color="green.500" />
        Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
      </List.Item>
    </List.Root>
  </Box>
)
