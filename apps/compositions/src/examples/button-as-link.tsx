import { Button } from "@chakra-ui/react"

export const ButtonAsLink = () => {
  return (
    <Button asChild>
      <a href="#">Button</a>
    </Button>
  )
}
