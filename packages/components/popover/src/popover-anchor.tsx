import React, {Children, cloneElement, FC, useEffect} from "react"
import { usePopoverContext } from "./popover-context"

/**
 * PopoverAnchor is element that is used as the positioning reference
 * for the popover.
 */

type PopoverAnchorWithChildrenProps = React.PropsWithChildren;

type PopoverAnchorRefProps = { anchorRef: React.RefObject<HTMLElement | null> };

type PopoverAnchorProps = PopoverAnchorWithChildrenProps | PopoverAnchorRefProps;

export const PopoverAnchor: FC<PopoverAnchorProps> = (props) => {
  if ("children" in props) {
    return <PopoverAnchorWithChildren {...props} />
  } else if("anchorRef" in props) {
    return <PopoverRefAnchor {...props} />
  } else {
    throw new Error("PopoverAnchor missing anchorRef or children!")
  }
}

PopoverAnchor.displayName = "PopoverAnchor"

const PopoverAnchorWithChildren: FC<React.PropsWithChildren> = ({children}) => {
  // enforce a single child
  const child: any = Children.only(children)
  const { getAnchorProps } = usePopoverContext()

  return cloneElement(child, getAnchorProps(child.props, child.ref))
}

const PopoverRefAnchor: FC<PopoverAnchorRefProps> = (props) => {
  const { setAnchorRef } = usePopoverContext()

  useEffect(() => {
    setAnchorRef(props.anchorRef);
  }, [props.anchorRef, setAnchorRef]);

  return <></>
}