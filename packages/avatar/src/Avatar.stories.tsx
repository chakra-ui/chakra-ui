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
 * You can use a custom generic avatar instead of
 * what we have in Chakra.
 */
const GenericAvatar = () => (
  <svg
    fill="#fff"
    viewBox="0 0 30 31"
    role="img"
    style={{ width: "56%", height: "56%" }}
  >
    <path
      d="M14.71 0c5.04 0 9.29 3.076 9.862 7.319.179 1.338.2 2.36.048 3.859l-.195 1.72-.112.94-.071.564c-.162 1.246-.321 2.224-.495 2.959-.568 2.386-1.747 4.857-3.212 5.969l-.096.068-.041.223-.03.169c-.067.407-.116.805-.138 1.171-.04.66.024 1.132.077 1.194.331.385 1.775.904 3.789 1.34.774.169 1.596.32 2.428.453l.894.136 1.116.148a1 1 0 01-.229 1.987l-.404-.05-.768-.105-.278-.041a49.902 49.902 0 01-3.183-.573l-.688-.156c-2.107-.5-3.527-1.06-4.194-1.836-.51-.592-.628-1.458-.556-2.62a13.6 13.6 0 01.162-1.375l.065-.373c.043-.228.083-.415.114-.546a1 1 0 01.417-.6l.11-.064c1.007-.504 2.193-2.853 2.699-4.98.123-.521.243-1.215.366-2.078l.126-.95.294-2.503c.182-1.573.176-2.49.003-3.784C22.164 4.422 18.817 2 14.71 2c-4.108 0-7.454 2.422-7.88 5.584-.159 1.187-.178 2.057-.04 3.405l.19 1.679c.053.447.1.836.146 1.204l.035.271c.154 1.185.304 2.106.457 2.755.487 2.047 1.602 4.297 2.583 4.916l.117.066a1 1 0 01.526.664l.053.237c.038.183.082.415.127.682.078.47.135.934.162 1.375.071 1.162-.047 2.028-.557 2.62-.736.857-2.394 1.453-4.881 1.992-.813.176-1.67.334-2.534.472l-.65.1c-.378.057-.73.106-1.046.147l-.404.05a1 1 0 01-.228-1.987l.375-.046c.228-.03.476-.064.74-.102l.269-.04a47.96 47.96 0 003.054-.548l.534-.121c1.733-.41 2.953-.87 3.255-1.22.053-.062.117-.535.077-1.194a11.655 11.655 0 00-.14-1.171l-.07-.392-.096-.068c-1.407-1.068-2.549-3.387-3.14-5.684l-.072-.287a25.921 25.921 0 01-.397-2.241l-.098-.716a97.8 97.8 0 01-.144-1.174L4.845 11.6c-.2-1.736-.193-2.82.003-4.28C5.418 3.075 9.67 0 14.71 0z"
      fillRule="nonzero"
    />
  </svg>
)

/**
 * Without a `src` or `name` attribute, the avatar
 * will show a default svg avatar icon
 */
export const WithCustomIcon = () => (
  <AvatarGroup spacing="40px">
    <Avatar icon={GenericAvatar} />
    <Avatar />
  </AvatarGroup>
)

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
