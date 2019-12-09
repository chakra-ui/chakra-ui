import * as React from "react";
import createCtx from "../useCreateContext";
import { useForkRef } from "../useForkRef";
import { composeEventHandlers } from "@chakra-ui/utils";
import useBlurOutside from "../useBlurOutside";
import usePopper, { PopperJS } from "../usePopper";
import useDisclosure from "../useDisclosure";
import useIds from "../useIds";
import useFocusOnHide from "../useFocusOnHide";
import useFocusOnShow from "../useFocusOnShow";
import useIsomorphicEffect from "../useIsomorphicEffect";

const [usePopoverCtx, PopoverCtxProvider] = createCtx<PopoverContext>();
export { usePopoverCtx };
/////////////////////////////////////////////////////////////////////

export function usePopoverTrigger(props: any = {}) {
  const popover = usePopoverCtx();
  const _ref = useForkRef(popover.trigger.ref, popover.reference.ref);

  const ariaHasPopup: React.AriaAttributes["aria-haspopup"] = "dialog";

  return {
    ref: _ref,
    "aria-haspopup": ariaHasPopup,
    "aria-expanded": popover.isOpen,
    "aria-controls": popover.trigger.id,
    onClick: composeEventHandlers(props.onClick, popover.onToggle),
  };
}

/////////////////////////////////////////////////////////////////////

interface UsePopoverContentOptions {
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  gutter?: number;
}

export function usePopoverContent(props: UsePopoverContentOptions = {}) {
  const popover = usePopoverCtx();
  const _ref = (useForkRef(
    popover.content.ref,
    popover.popper.ref,
  ) as unknown) as React.RefObject<any>;

  const onBlur = useBlurOutside(popover.trigger.ref, popover.content.ref, {
    action: popover.onClose,
    visible: popover.isOpen,
  });

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") popover.onClose();
  };

  return {
    ref: _ref,
    "aria-hidden": !popover.isOpen,
    hidden: !popover.isOpen,
    tabIndex: -1,
    id: popover.content.id,
    role: "dialog",
    "data-placement": popover.popper.placement,
    style: popover.popper.style,
    onBlur: composeEventHandlers(props.onBlur, onBlur),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    "aria-labelledby": popover.headerId,
    "aria-describedby": popover.bodyId,
  };
}

/////////////////////////////////////////////////////////////////////

export interface UsePopoverOptions {
  id?: string;
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  returnFocusOnClose?: boolean;
  gutter?: number;
  placement?: PopperJS["options"]["placement"];
  closeOnBlur?: boolean;
  closeOnEsc?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/////////////////////////////////////////////////////////////////////

export function usePopover(props: UsePopoverOptions) {
  const disclosure = useDisclosure(props);
  const triggerRef = React.useRef<any>(null);
  const contentRef = React.useRef<HTMLElement>(null);

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
      computeStyle: { gpuAcceleration: false },
    },
  });

  // update the popper instance when menu is open
  useIsomorphicEffect(() => {
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

  // Manage focus when the popover opens.
  useFocusOnShow(contentRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: props.initialFocusRef,
  });

  return {
    ...disclosure,
    ...popper,
    headerId,
    bodyId,
    options: {
      closeOnEsc: !!props.closeOnEsc,
      closeOnBlur: !!props.closeOnBlur,
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

type PopoverContext = ReturnType<typeof usePopover>;

/////////////////////////////////////////////////////////////////////

export function PopoverProvider(props: any) {
  const popover = usePopover(props);
  return (
    <PopoverCtxProvider value={popover}>{props.children}</PopoverCtxProvider>
  );
}

export function usePopoverState() {
  const popover = usePopoverCtx();
  return { isOpen: popover.isOpen, onClose: popover.onClose };
}
