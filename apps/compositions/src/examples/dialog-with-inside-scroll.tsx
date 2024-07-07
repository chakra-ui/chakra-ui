import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import Lorem from "react-lorem-ipsum"

export const DialogWithInsideScroll = () => {
  return (
    <DialogRoot scrollBehavior="inside" size="sm">
      <DialogTrigger>
        <Button variant="outline">Inside Scroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>With Inside Scroll</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Lorem p={8} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
