// Credit: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Popper/Popper.js
/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from "react";

import * as PopperJS from "popper.js";
import { Portal, PortalProps } from "../Portal";
import { Box, BoxProps } from "@chakra-ui/layout";
import { assignRef, useEnhancedEffect } from "@chakra-ui/hooks";
import getPopperArrowStyle from "./styles";

function getAnchorEl(anchorEl: any) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}

interface PopperOptions {
  /**
   * The reference element, or a function that returns the reference element,
   * that will be used to set the placment of the popover.
   *
   * The reference element should be an HTML Element instance or a referenceObject:
   * https://popper.js.org/popper-documentation.html#referenceObject.
   */
  anchorEl?: null | PopperJS.ReferenceObject | (() => PopperJS.ReferenceObject);
  /**
   * The container where the Popper should render.
   * By default, the portal renders it's children as a child of `document.body>`
   */
  container?: PortalProps["container"];
  /**
   * If `true`, the Popper will display in a portal.
   *
   * @default true
   */
  usePortal?: boolean;
  /**
   * If `true`, the component will unmount when it closes
   *
   * @default true
   */
  unmountOnExit?: boolean;
  /**
   * This is used to configure how Popper.js computes the positioning of the popper.
   *
   * To ensure the modifiers you pass are performant, [learn how to create a modifier](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
   */
  modifiers?: PopperJS.Modifiers;
  /**
   * If `true`, the popper will be opened in controlled mode
   */
  isOpen?: boolean;
  /**
   * The placement of the popper
   */
  placement?: PopperJS.Placement;
  /**
   * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
   */
  popperOptions?: PopperJS.PopperOptions;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.RefObject<PopperJS.default>;
  /**
   * If `true` and the `PopoverArrow` isn't rendered, we'll remove the margin applied
   * to the `PopoverContent`
   */
  hasArrow?: boolean;
  /**
   * The gap between the popper and it's reference element
   */
  gutter?: number;
  /**
   * The size of the arrow in pixels
   * @default "1rem"
   */
  arrowSize?: string;
  /**
   * The color to apply to the `box-shadow` of the arrow.
   * @default "rgba(0, 0, 0, 0.1)"
   */
  arrowShadowColor?: string;
}

type RenderProps = {
  placement?: PopperJS.Placement;
};

type PopperChildren =
  | {
      children: React.ReactNode;
    }
  | { children: (props: RenderProps) => React.ReactNode };

export type PopperProps<P, T> = PopperOptions & BoxProps<P, T> & PopperChildren;

function useForkRef(refA: any, refB: any) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: any) => {
      assignRef(refA, refValue);
      assignRef(refB, refValue);
    };
  }, [refA, refB]);
}

function createChainedFunction(...funcs: any[]) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc;
      }

      return function chainedFunction(this: any, ...args: any[]) {
        acc.apply(this, args);
        func.apply(this, args);
      };
    },
    () => {},
  );
}

const Popper = forwardRef(function<P, T extends HTMLElement>(
  {
    anchorEl,
    children,
    gutter,
    container,
    usePortal,
    unmountOnExit = true,
    modifiers,
    isOpen,
    placement: initialPlacement = "bottom",
    popperOptions = {},
    popperRef: popperRefProp,
    arrowSize,
    arrowShadowColor,
    hasArrow,
    ...rest
  }: PopperProps<P, T>,
  ref: React.Ref<T>,
) {
  const tooltipRef = useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);

  const popperRef = useRef<PopperJS.default | null>(null);
  const handlePopperRef = popperRefProp
    ? useForkRef(popperRef, popperRefProp)
    : popperRef;
  const handlePopperRefRef = useRef(handlePopperRef as any);

  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);

  //@ts-ignore
  useImperativeHandle(popperRefProp, () => popperRef.current, []);

  const [exited, setExited] = useState(true);
  const [placement, setPlacement] = useState(initialPlacement);

  const handleOpen = useCallback(() => {
    const popperNode = tooltipRef.current;

    if (!popperNode || !anchorEl || !isOpen) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current = null;
    }

    const handlePopperUpdate = (data: PopperJS.Data) => {
      setPlacement(data.placement);
    };

    const popper = new PopperJS.default(getAnchorEl(anchorEl), popperNode, {
      placement: initialPlacement,
      ...popperOptions,
      modifiers: {
        ...(usePortal && {
          preventOverflow: {
            boundariesElement: "window",
          },
        }),
        ...modifiers,
        ...popperOptions.modifiers,
      },
      onUpdate: popperOptions.onUpdate
        ? createChainedFunction(handlePopperUpdate, popperOptions.onUpdate)
        : handlePopperUpdate,
    });
    handlePopperRefRef.current = popper;
  }, [anchorEl, usePortal, modifiers, isOpen, initialPlacement, popperOptions]);

  const handleRef = useCallback(
    (node: HTMLElement) => {
      assignRef(ownRef, node);
      handleOpen();
    },
    [ownRef, handleOpen],
  );

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current = null;
  };

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
  }, [isOpen]);

  if (unmountOnExit && !isOpen && exited) {
    return null;
  }

  return (
    <Portal isDisabled={!usePortal} container={container}>
      <Box
        ref={handleRef}
        pos="absolute"
        css={getPopperArrowStyle({ arrowSize, arrowShadowColor, hasArrow })}
        {...rest}
      >
        {children}
      </Box>
    </Portal>
  );
});

const PopperArrow = (props: BoxProps) => (
  <Box x-arrow="" role="presentation" bg="inherit" {...props} />
);

export { Popper, PopperArrow };
