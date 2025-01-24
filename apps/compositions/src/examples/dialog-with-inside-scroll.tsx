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

export const DialogWithInsideScroll = () => {
  return (
    <DialogRoot scrollBehavior="inside" size="sm">
      <DialogTrigger asChild>
        <Button variant="outline">Inside Scroll</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>With Inside Scroll</DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Lorem p={8} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
