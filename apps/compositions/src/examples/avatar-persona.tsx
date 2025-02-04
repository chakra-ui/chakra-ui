import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"

export const AvatarPersona = () => {
  return (
    <Stack gap="8">
      {users.map((user) => (
        <HStack key={user.email} gap="4">
          <Avatar.Root>
            <Avatar.Fallback>{user.initials}</Avatar.Fallback>
            <Avatar.Image src={user.avatar} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="medium">{user.initials}</Text>
            <Text color="fg.muted" textStyle="sm">
              {user.email}
            </Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  )
}

const users = [
  {
    id: "1",
    initials: "JM",
    email: "john.mason@example.com",
    avatar: "https://i.pravatar.cc/300?u=iu",
  },
  {
    id: "2",
    initials: "MJ",
    email: "melissa.jones@example.com",
    avatar: "https://i.pravatar.cc/300?u=po",
  },
]
