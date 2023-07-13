import { Children, cloneElement } from "react"
import { usePopoverContext } from "./popover-context"

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */

export function PopoverTrigger(props: { children: React.ReactNode }) {
  // enforce a single child
  const child: any = Children.only(props.children)
  const { getTriggerProps } = usePopoverContext()
  return cloneElement(child, getTriggerProps(child.props, child.ref))
}

PopoverTrigger.displayName = "PopoverTrigger"
