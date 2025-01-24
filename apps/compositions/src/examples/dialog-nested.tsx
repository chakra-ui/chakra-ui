import { Button } from "@chakra-ui/react"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import Lorem from "react-lorem-ipsum"

export const DialogNested = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Lorem p={2} />
        </DialogBody>
        <DialogFooter>
          <Button variant="outline">Button 2</Button>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button>Open Nested</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Lorem p={1} />
              </DialogBody>
            </DialogContent>
          </DialogRoot>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
