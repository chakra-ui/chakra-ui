/** @jsx jsx */
import {
  computeArrowStyle,
  PopperJS,
  useBlurOutside,
  createCtx,
  useDisclosure,
  useFocusOnHide,
  useFocusOnShow,
  useForkRef,
  useIds,
  usePopper,
} from "@chakra-ui/hooks";
import { Box, BoxProps } from "@chakra-ui/layout";
import { composeEventHandlers, createOnKeyDown } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import { cloneElement, useLayoutEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import { CloseButton, CloseButtonProps } from "../CloseButton";

/////////////////////////////////////////////////////////////////////

interface PopoverContext extends ReturnType<typeof useDisclosure> {
  popper: ReturnType<typeof usePopper>;
  headerId: string;
  bodyId: string;
  options: {
    closeOnEsc: boolean;
    closeOnBlur: boolean;
    matchTriggerWidth: boolean;
    usePortal: boolean;
    returnFocusOnClose: boolean;
    trapFocus: boolean;
  };
  trigger: {
    id: string;
    ref: React.RefObject<any>;
  };
  content: {
    id: string;
    ref: React.RefObject<any>;
  };
}

const [usePopoverContext, PopoverProvider] = createCtx<PopoverContext>();

/////////////////////////////////////////////////////////////////////

function usePopoverTrigger(props: any, ref: React.Ref<any>) {
  const popover = usePopoverContext();
  const _ref = useForkRef(popover.trigger.ref, popover.popper.reference.ref);

  return {
    ref: _ref,
    "aria-haspopup": "dialog",
    "aria-expanded": popover.isOpen,
    "aria-controls": popover.trigger.id,
    onClick: composeEventHandlers(props.onClick, popover.onToggle),
  };
}

/////////////////////////////////////////////////////////////////////

interface PopoverContentOptions {
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  gutter?: number;
}

/////////////////////////////////////////////////////////////////////

function usePopoverContent(props: PopoverContentOptions, ref: React.Ref<any>) {
  const popover = usePopoverContext();
  const _ref = useForkRef(popover.content.ref, popover.popper.popper.ref);

  const onBlur = useBlurOutside(popover.trigger.ref, popover.content.ref, {
    action: popover.onClose,
    visible: popover.isOpen,
  });

  const onKeyDown = createOnKeyDown({
    keyMap: {
      Escape: popover.onClose,
    },
  });

  return {
    ref: _ref,
    "aria-hidden": !popover.isOpen,
    hidden: !popover.isOpen,
    tabIndex: -1,
    id: popover.content.id,
    role: "dialog",
    "data-placement": popover.popper.popper.placement,
    style: popover.popper.popper.style,
    onBlur: composeEventHandlers(props.onBlur, onBlur),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    "aria-modal": false,
    "aria-labelledby": popover.headerId,
    "aria-describedby": popover.bodyId,
  };
}

/////////////////////////////////////////////////////////////////////

interface PopoverOptions {
  id?: string;
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  trigger?: "hover" | "click";
  returnFocusOnClose?: boolean;
  gutter?: number;
  placement?: PopperJS["options"]["placement"];
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  matchTriggerWidth?: boolean;
  usePortal?: boolean;
  trapFocus?: boolean;
}

/////////////////////////////////////////////////////////////////////

function usePopover(props: PopoverOptions) {
  const disclosure = useDisclosure(props);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const [triggerId, contentId, headerId, bodyId] = useIds([
    "popover-trigger",
    "popover-content",
    "popover-header",
    "popover-body",
  ]);

  const popper = usePopper({
    placement: props.placement,
    modifiers: {
      offset: { enabled: true, offset: `0, ${props.gutter}` },
    },
  });

  // update the popper instance when menu is open
  useLayoutEffect(() => {
    if (disclosure.isOpen && popper.popperInstance) {
      popper.popperInstance.scheduleUpdate();
    }
  }, [disclosure.isOpen, popper.popperInstance]);

  /**
   * Manage focus when the popover closes.This is necessary in situations where you open a popover,
   * and you click outside it on a "tabbable" element. In this scenario,
   * focus should not return to the popover trigger but should remain on the element you clicked on
   */
  useFocusOnHide(contentRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: triggerRef,
  });

  /**
   * Manage focus when the popover opens.
   */
  useFocusOnShow(contentRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: props.initialFocusRef,
  });

  return {
    ...disclosure,
    popper,
    headerId,
    bodyId,
    options: {
      closeOnEsc: !!props.closeOnEsc,
      closeOnBlur: !!props.closeOnBlur,
      matchTriggerWidth: !!props.matchTriggerWidth,
      usePortal: !!props.usePortal,
      returnFocusOnClose: !!props.returnFocusOnClose,
      trapFocus: !!props.trapFocus,
    },
    trigger: {
      id: triggerId,
      ref: triggerRef,
    },
    content: {
      id: contentId,
      ref: contentRef,
    },
  };
}

/////////////////////////////////////////////////////////////////////

export function Popover(props: any) {
  const popover = usePopover(props);
  return <PopoverProvider value={popover}>{props.children}</PopoverProvider>;
}

/////////////////////////////////////////////////////////////////////

export function PopoverTrigger(props: any, ref: any) {
  const trigger = usePopoverTrigger(props, ref);
  return cloneElement(props.children, trigger);
}

/////////////////////////////////////////////////////////////////////

export function PopoverContent(props: any, ref: any) {
  const content = usePopoverContent(props, ref);
  const popover = usePopoverContext();
  const arrowStyle = computeArrowStyle({
    size: "0.8rem",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    hasArrow: props.hasArrow,
  });

  return (
    <Box
      as="section"
      borderWidth="1px"
      width="100%"
      position="relative"
      display="flex"
      flexDirection="column"
      rounded="md"
      shadow="sm"
      maxWidth="xs"
      bg="white"
      _focus={{ outline: 0, shadow: "outline" }}
      {...props}
      {...content}
      css={arrowStyle}
    >
      {props.hasArrow && (
        <Box
          {...popover.popper.arrow}
          bg="inherit"
          role="presentation"
          data-arrow=""
        />
      )}
      <FocusLock persistentFocus={false} disabled={!popover.options.trapFocus}>
        {props.children}
      </FocusLock>
    </Box>
  );
}

/////////////////////////////////////////////////////////////////////

export const PopoverHeader = (props: BoxProps) => {
  const { headerId } = usePopoverContext();
  return (
    <Box
      as="header"
      id={headerId}
      px={3}
      py={2}
      borderBottomWidth="1px"
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////

export const PopoverFooter = (props: BoxProps) => (
  <Box as="footer" px={3} py={2} borderTopWidth="1px" {...props} />
);

/////////////////////////////////////////////////////////////////////

export const PopoverBody = (props: BoxProps) => {
  const { bodyId } = usePopoverContext();
  return <Box id={bodyId} flex="1" px={3} py={2} {...props} />;
};

/////////////////////////////////////////////////////////////////////

export const PopoverCloseButton = ({ onClick, ...props }: CloseButtonProps) => {
  const { onClose } = usePopoverContext();
  return (
    <CloseButton
      size="sm"
      onClick={composeEventHandlers(onClick, onClose)}
      aria-label="Close"
      position="absolute"
      rounded="md"
      top={1}
      right={2}
      padding={2}
      {...props}
    />
  );
};

/////////////////////////////////////////////////////////////////////
