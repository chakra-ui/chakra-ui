import * as React from "react";
import PopperJs, { ReferenceObject } from "popper.js";
import { PortalProps } from "../Portal";
import { TransitionProps } from "../transitions/transition";
import { BoxProps } from "../Box";

export type PopperPlacementType = PopperJs.Placement;

export interface IPopper {
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  children:
    | React.ReactNode
    | ((props: {
        placement: PopperPlacementType;
        transitionProps?: TransitionProps;
      }) => React.ReactNode);
  container?: PortalProps["container"];
  usePortal?: boolean;
  unmountOnExit?: boolean;
  modifiers?: object;
  isOpen: boolean;
  placement?: PopperPlacementType;
  popperOptions?: object;
  popperRef?: React.Ref<PopperJs>;
  willUseTransition?: boolean;
}

type PopperProps = IPopper & BoxProps;

declare const Popper: React.FC<PopperProps>;

export default Popper;
