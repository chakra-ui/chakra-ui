# @chakra-ui/avatar

The Avatar component is used to represent user, and displays the profile
picture, initials or fallback icon.

## Installation

```sh
yarn add @chakra-ui/avatar

# or

npm i @chakra-ui/avatar
```

## Import components

```jsx
import { Avatar, AvatarGroup } from "@chakra-ui/avatar"
```

## Basic Usage

Simply import the `Avatar` component and pass it the image
`src` and name of the user in the avatar.

```jsx
<Avatar src="john-doe.png" name="John doe" />
```

Stack Avatars in a group by using the `AvatarGroup` component

```jsx
<AvatarGroup size="md" max={2}>
  <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
  <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
  <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
  <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
</AvatarGroup>
```
