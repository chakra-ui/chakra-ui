import { Button, Input, Stack, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithForm = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack gap="4">
            <Field label="Width">
              <Input placeholder="40px" />
            </Field>
            <Field label="Height">
              <Input placeholder="32px" />
            </Field>
            <Field label="Comments">
              <Textarea placeholder="Start typing..." />
            </Field>
          </Stack>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  )
}
