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

export const DialogWithOutsideScroll = () => {
  return (
    <DialogRoot size="sm">
      <DialogTrigger>
        <Button variant="outline">Outside Scroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>With Outside Scroll</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Lorem p={8} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
