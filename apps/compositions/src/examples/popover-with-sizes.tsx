import { Button, For, Input, Stack, Text } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithSizes = () => {
  return (
    <Stack align="center" direction="row" gap="10">
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <PopoverRoot key={size} size={size}>
            <PopoverTrigger asChild>
              <Button size={size} variant="outline">
                Click me
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle>
                <Text my="4">
                  Naruto is a Japanese manga series written and illustrated by
                  Masashi Kishimoto.
                </Text>
                <Input placeholder="Your fav. character" size={size} />
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        )}
      </For>
    </Stack>
  )
}
