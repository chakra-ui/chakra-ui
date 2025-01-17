import { Children, cloneElement } from "react"
import { usePopoverContext } from "./popover-context"
import { getElementRef } from "../element-ref"

/**
 * PopoverAnchor is element that is used as the positioning reference
 * for the popover.
 */

export function PopoverAnchor(props: React.PropsWithChildren<{}>) {
  // enforce a single child
  const child: any = Children.only(props.children)
  const { getAnchorProps } = usePopoverContext()

  return (
    <>
      {cloneElement(child, getAnchorProps(child.props, getElementRef(child)))}
    </>
  )
}

PopoverAnchor.displayName = "PopoverAnchor"
