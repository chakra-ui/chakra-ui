import { For, HStack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  DialogAction,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"

export const DialogWithSizes = () => {
  return (
    <HStack>
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <DialogRoot key={size} size={size}>
            <DialogTrigger asChild>
              <Button variant="outline" size={size}>
                Open ({size})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogAction asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogAction>
                <Button>Save</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        )}
      </For>
    </HStack>
  )
}
