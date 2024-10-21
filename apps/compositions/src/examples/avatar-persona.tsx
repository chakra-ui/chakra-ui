import { HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "compositions/ui/avatar"

export const AvatarPersona = () => {
  return (
    <Stack gap="8">
      {users.map((user) => (
        <HStack key={user.email} gap="4">
          <Avatar name={user.name} size="lg" src={user.avatar} />
          <Stack gap="0">
            <Text fontWeight="medium">{user.name}</Text>
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
    name: "John Mason",
    email: "john.mason@example.com",
    avatar: "https://i.pravatar.cc/300?u=iu",
  },
  {
    id: "2",
    name: "Melissa Jones",
    email: "melissa.jones@example.com",
    avatar: "https://i.pravatar.cc/300?u=po",
  },
]
