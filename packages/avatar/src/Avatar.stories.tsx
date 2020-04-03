import * as React from "react"
import { Avatar, AvatarBadge, AvatarGroup } from "."
import { Stack, Box } from "@chakra-ui/layout"

export default {
  title: "Avatar",
  decorators: [
    (Story: Function) => (
      <Box mx="auto" maxW="500px" mt="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => (
  <Stack direction="row">
    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
    <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
  </Stack>
)

/**
 * Without a `src` or `name` attribute, the avatar
 * will show a default svg avatar icon
 */
export const WithDefaultAvatar = () => <Avatar size="md" />

/**
 * You can change the size of the avatar
 * as defined in your component theme
 */
export const WithSizes = () => (
  <React.Fragment>
    {["xs", "sm", "md", "lg", "xl", "2xl"].map(size => (
      <Avatar
        mr={2}
        size={size}
        name="Uchiha Itachi"
        src="https://uinames.com/api/photos/female/18.jpg"
      >
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
    ))}
  </React.Fragment>
)

/**
 * Use the AvatarGroup component to stack
 * multiple avatars and add some space between them
 */
export const avatarGroup = () => (
  <AvatarGroup size="lg" showBorder max={3}>
    <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
    <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
    <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
    <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
  </AvatarGroup>
)
