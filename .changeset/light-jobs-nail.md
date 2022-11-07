---
"@chakra-ui/anatomy": minor
"@chakra-ui/card": minor
"@chakra-ui/theme": minor
---

Added new card component

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
