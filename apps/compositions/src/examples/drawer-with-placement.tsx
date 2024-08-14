import { For, HStack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "compositions/ui/drawer"

export const DrawerWithPlacement = () => {
  return (
    <HStack wrap="wrap">
      <For each={["bottom", "top", "start", "end"]}>
        {(placement) => (
          <DrawerRoot key={placement} placement={placement}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                Open ({placement})
              </Button>
            </DrawerTrigger>
            <DrawerContent
              roundedTop={placement === "bottom" ? "2xl" : undefined}
              roundedBottom={placement === "top" ? "2xl" : undefined}
            >
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </DrawerFooter>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
        )}
      </For>
    </HStack>
  )
}
