---
"@chakra-ui/anatomy": minor
"@chakra-ui/card": minor
"@chakra-ui/theme": minor
"@chakra-ui/react": minor
---

Added `Card` component

```jsx live="false"
export const Basic = () => (
  <Card>
    <CardHeader>
      <Heading size="md"> Customer dashboard</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your customers over the last month.</Text>
    </CardBody>
    <CardFooter>
      <Button>View here</Button>
    </CardFooter>
  </Card>
)
```
