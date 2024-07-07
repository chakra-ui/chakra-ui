import { Button } from "compositions/ui/button"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "compositions/ui/dialog"
import Lorem from "react-lorem-ipsum"

export const DialogNested = () => {
  return (
    <DialogRoot lazyMount>
      <DialogTrigger>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Dialog Title</DialogHeader>
        <DialogBody>
          <Lorem p={2} />
        </DialogBody>
        <DialogFooter>
          <Button variant="outline">Button 2</Button>
          <DialogRoot lazyMount>
            <DialogTrigger>
              <Button>Open Nested</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Dialog. 2 Title</DialogHeader>
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
