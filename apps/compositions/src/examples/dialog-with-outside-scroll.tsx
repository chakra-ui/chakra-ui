import { Button } from "@chakra-ui/react"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import Lorem from "react-lorem-ipsum"

export const DialogWithOutsideScroll = () => {
  return (
    <DialogRoot size="sm" scrollBehavior="outside">
      <DialogTrigger asChild>
        <Button variant="outline">Outside Scroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>With Outside Scroll</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Lorem p={8} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
