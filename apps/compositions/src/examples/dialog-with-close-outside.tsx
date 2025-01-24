import { AspectRatio, Button } from "@chakra-ui/react"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"

export const DialogWithCloseOutside = () => {
  return (
    <DialogRoot placement="center">
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody pt="4">
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription mb="4">
            This is a dialog with some content and a video.
          </DialogDescription>
          <AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
            <iframe
              title="naruto"
              src="https://www.youtube.com/embed/QhBnZ6NPOY0"
              allowFullScreen
            />
          </AspectRatio>
        </DialogBody>
        <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />
      </DialogContent>
    </DialogRoot>
  )
}
