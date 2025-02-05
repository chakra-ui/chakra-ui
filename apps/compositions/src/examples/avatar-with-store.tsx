"use client"

import { Avatar, Code, Stack, useAvatar } from "@chakra-ui/react"

export const AvatarWithStore = () => {
  const avatar = useAvatar()
  return (
    <Stack align="flex-start">
      <Avatar.RootProvider value={avatar}>
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
        <Avatar.Fallback name="Segun Adebayo" />
      </Avatar.RootProvider>
      <Code>{avatar.loaded ? "loaded" : "not loaded"}</Code>
    </Stack>
  )
}
