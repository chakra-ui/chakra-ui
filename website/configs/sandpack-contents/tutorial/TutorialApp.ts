export const TutorialApp = `import { Center, ChakraProvider, List, ListItem, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function App() {
  const [usernames, setUsernames] = useState(['malerba118', 'compulves', 'dan_abramov'])
  return (
    <ChakraProvider>
      <Center h='100vh'>
        <List spacing={2}>
          {usernames.map((username) => (
            <ListItem key={username} p={2} bg='gray.100' rounded='lg'>
              <Text>{username}</Text>
            </ListItem>
          ))}
        </List>
      </Center>
    </ChakraProvider>
  )
}`
