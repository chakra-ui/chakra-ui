import * as React from "react"
import { Slide, SlideProps } from "@chakra-ui/transition"
import {
  Dialog,
  DialogProps,
  DialogContentProps,
  DialogContent,
} from "@chakra-ui/dialog"

const DrawerContext = React.createContext<React.CSSProperties>({})
const useDrawerContext = () => React.useContext(DrawerContext)

export interface DrawerProps extends DialogProps {
  placement?: SlideProps["placement"]
  isFullHeight?: boolean
}

export function Drawer(props: DrawerProps) {
  const { isOpen, onClose, placement = "right", children, ...rest } = props
  return (
    <Slide in={isOpen} placement={placement}>
      {styles => (
        <DrawerContext.Provider value={styles}>
          <Dialog isOpen={true} onClose={onClose} {...rest}>
            {children}
          </Dialog>
        </DrawerContext.Provider>
      )}
    </Slide>
  )
}

export function DrawerContent(props: DialogContentProps) {
  const styles = useDrawerContext()
  return <DialogContent position="fixed" style={styles} {...props} />
}

export {
  DialogOverlay as DrawerOverlay,
  DialogBody as DrawerBody,
  DialogHeader as DrawerHeader,
  DialogFooter as DrawerFooter,
  DialogCloseButton as DrawerCloseButton,
} from "@chakra-ui/dialog"
