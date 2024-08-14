import { For, HStack, Kbd } from "@chakra-ui/react"
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

export const DrawerWithSizes = () => {
  return (
    <HStack wrap="wrap">
      <For each={["xs", "sm", "md", "lg", "xl", "full"]}>
        {(size) => (
          <DrawerRoot key={size} size={size}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm">
                Open ({size})
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                Press the <Kbd>esc</Kbd> key to close the drawer.
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
