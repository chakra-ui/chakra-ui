import { Input, Textarea } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { Field } from "compositions/ui/field"
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithForm = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>
          <Field label="Width">
            <Input placeholder="40px" />
          </Field>
          <Field label="Height">
            <Input placeholder="32px" />
          </Field>
          <Field label="Comments">
            <Textarea placeholder="Start typing..." />
          </Field>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  )
}
