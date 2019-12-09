import * as React from "react";
import usePopper, { PopperJS } from "../usePopper";
import useDisclosure from "../useDisclosure";
import useIds from "../useIds";
import createCtx from "../useCreateContext";
import {
  useSelectionItem,
  Selection,
  useSelectionState,
} from "../useSelection";
import {
  createOnKeyDown,
  composeEventHandlers,
  ensureFocus,
} from "@chakra-ui/utils";
import { useForkRef } from "../useForkRef";
import useRapidKeydown from "../useRapidKeydown";
import useBlurOutside from "../useBlurOutside";
import useFocusOnHide from "../useFocusOnHide";
import useIsomorphicEffect from "../useIsomorphicEffect";

function useFocusOnShow(
  menuRef: React.RefObject<any>,
  selection: Selection,
  options: {
    autoSelect?: boolean;
    activeIndex?: number;
    visible: boolean;
  },
) {
  useIsomorphicEffect(() => {
    if (options.visible && options.activeIndex && selection.items.length) {
      selection.highlight(selection.items[options.activeIndex]);
    }
    if (!options.autoSelect && options.visible) {
      ensureFocus(menuRef.current);
    }
    // eslint-disable-next-line
  }, [options.visible, options.autoSelect, selection.items]);
}

interface MenuOptions {
  isOpen?: boolean;
  autoSelect?: boolean;
  closeOnBlur?: boolean;
  closeOnSelect?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  defaultIsOpen?: boolean;
  defaultActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number) => void;
  placement?: PopperJS["options"]["placement"];
}

function useMenu(props: MenuOptions) {
  const { autoSelect, closeOnSelect, closeOnBlur } = props;
  // manages the open and close states
  const disclosure = useDisclosure(props);

  // Id generation
  const [menuId, buttonId] = useIds([`menu`, `menu-button`]);

  const popper = usePopper({
    placement: props.placement,
    eventsEnabled: true,
    modifiers: {
      computeStyle: {
        gpuAcceleration: false,
      },
      preventOverflow: {
        boundariesElement: "viewport",
      },
    },
  });

  // update the popper instance when menu is open
  useIsomorphicEffect(() => {
    if (disclosure.isOpen && popper.popperInstance) {
      popper.popperInstance.scheduleUpdate();
    }
  }, [disclosure.isOpen, popper.popperInstance]);

  // provides the selection functionality
  const selection = useSelectionState();

  // refs to get a reference to the menu and button elements :)
  const menuRef = React.useRef<any>(null);
  const buttonRef = React.useRef<any>(null);

  // manage focus restoration when menu closes
  useFocusOnHide(menuRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: buttonRef,
  });

  // Selects first menuitem on mount or use `defaultActiveIndex`
  useFocusOnShow(menuRef, selection, {
    autoSelect: props.autoSelect,
    visible: disclosure.isOpen,
    activeIndex: props.defaultActiveIndex,
  });

  return [
    selection,
    {
      ...disclosure,
      ...popper,
      menuRef,
      menuId,
      buttonRef,
      buttonId,
      autoSelect,
      closeOnSelect,
      closeOnBlur,
    },
  ] as const;
}

//////////////////////////////////////////////////////////////////////////////////////////

const [useMenuCtx, MenuCtxProvider] = createCtx<
  ReturnType<typeof useMenu>[1]
>();
const [useSelection, SelectionCtxProvider] = createCtx<
  ReturnType<typeof useMenu>[0]
>();

export function MenuProvider(
  props: MenuOptions & { children?: React.ReactNode },
) {
  const [selection, menu] = useMenu(props);
  return (
    <SelectionCtxProvider value={selection}>
      <MenuCtxProvider value={menu}>{props.children}</MenuCtxProvider>
    </SelectionCtxProvider>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////

export interface UseMenuButtonOptions {
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
}

export function useMenuButton(props: UseMenuButtonOptions) {
  const menu = useMenuCtx();
  const { onOpen, isOpen, onClose, autoSelect } = menu;

  const { reset, first, last } = useSelection();

  const focusOnFirstItem = () => {
    onOpen();
    first("highlight");
  };

  const focusOnLastItem = () => {
    onOpen();
    last("highlight");
  };

  const onClick = React.useCallback(() => {
    if (isOpen) {
      onClose();
      reset("highlighted");
    } else {
      onOpen();
      if (autoSelect) {
        first("highlight");
      }
    }
  }, [isOpen, onClose, onOpen, autoSelect, reset, first]);

  const onKeyDown = createOnKeyDown({
    keyMap: {
      ArrowDown: focusOnFirstItem,
      ArrowUp: focusOnLastItem,
    },
  });

  const ref = useForkRef(menu.buttonRef, menu.reference.ref);

  return {
    ...props,
    "aria-haspopup": "menu",
    "aria-expanded": menu.isOpen,
    "aria-controls": menu.buttonId,
    "data-active": menu.isOpen,
    id: menu.buttonId,
    role: "button",
    type: "button",
    ref,
    onClick: composeEventHandlers(props.onClick, onClick),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
  };
}

//////////////////////////////////////////////////////////////////////////////////////////

export interface UseMenuListOptions {
  onKeyDown?: React.KeyboardEventHandler;
  onBlur?: React.FocusEventHandler;
}

export function useMenuList(props: UseMenuListOptions) {
  const menu = useMenuCtx();
  const selection = useSelection();

  const [onRapidKeyDown] = useRapidKeydown();

  const onKeyDown = createOnKeyDown({
    onKeyDown: event =>
      onRapidKeyDown(event, keys => selection.search(keys, "highlight")),
    keyMap: {
      ArrowDown: () => {
        if (!selection.highlightedItem) {
          selection.first("highlight");
        } else {
          selection.next("highlight");
        }
      },
      ArrowUp: () => {
        if (!selection.highlightedItem) {
          selection.last("highlight");
        } else {
          selection.previous("highlight");
        }
      },
      Home: () => selection.first("highlight"),
      End: () => selection.last("highlight"),
      Tab: event => event && event.preventDefault(),
      Escape: menu.onClose,
    },
  });

  const onBlur = useBlurOutside(menu.buttonRef, menu.menuRef, {
    action: menu.onClose,
    visible: menu.isOpen,
  });

  const ref = useForkRef(menu.menuRef, menu.popper.ref);

  return {
    ...props,
    ref,
    role: "menu",
    id: menu.menuId,
    hidden: !menu.isOpen,
    "aria-labelledby": menu.buttonId,
    "data-placement": menu.popper.placement,
    style: menu.popper.style,
    tabIndex: -1,
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    onBlur: menu.closeOnBlur
      ? composeEventHandlers(props.onBlur, onBlur)
      : props.onBlur,
  };
}

//////////////////////////////////////////////////////////////////////////////////////////

export interface UseMenuItemOptions {
  isDisabled?: boolean;
  isFocusable?: boolean;
  role?: "menuitem" | "menuitemradio" | "menuitemcheckbox";
  onClick?: React.MouseEventHandler<any>;
  onPointerLeave?: React.PointerEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  onPointerEnter?: React.PointerEventHandler<any>;
  command?: string;
  icon?: string | React.ComponentType;
}

export function useMenuItem(props: UseMenuItemOptions) {
  const { closeOnSelect, onClose, isOpen, menuRef } = useMenuCtx();

  const selection = useSelection();
  const { reset, highlight } = selection;

  const { item: menuitem, isHighlighted } = useSelectionItem({
    ...selection,
    isDisabled: props.isDisabled,
    isFocusable: props.isFocusable,
  });

  React.useEffect(() => {
    if (isOpen && isHighlighted) {
      menuitem.ref.current.focus();
    }
  }, [isOpen, isHighlighted, menuitem.ref]);

  const onClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (props.isDisabled) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      if (closeOnSelect) {
        onClose();
        reset("highlighted");
      }
    },
    [props.isDisabled, onClose, closeOnSelect, reset],
  );

  const onPointerEnter = () => {
    if (!props.isDisabled) {
      highlight(menuitem);
    }
  };

  const onPointerLeave = () => {
    reset("highlighted");
    if (menuRef.current) {
      ensureFocus(menuRef.current);
    }
  };

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (props.isDisabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        // dispatch a click event instead of using `onClick`
        event.target.dispatchEvent(
          new MouseEvent("click", {
            cancelable: false,
            bubbles: true,
            view: window,
          }),
        );

        if (closeOnSelect) {
          onClose();
          reset("highlighted");
        }
      }
    },
    [props.isDisabled, closeOnSelect, onClose, reset],
  );

  return {
    ...props,
    ref: menuitem.ref,
    role: props.role || "menuitem",
    tabIndex: isHighlighted ? 0 : -1,
    disabled: props.isDisabled,
    "aria-disabled": props.isDisabled,
    onClick: composeEventHandlers(props.onClick, onClick),
    onPointerEnter: composeEventHandlers(props.onPointerEnter, onPointerEnter),
    onKeyDown: composeEventHandlers(props.onKeyDown, onKeyDown),
    onPointerLeave: composeEventHandlers(props.onPointerLeave, onPointerLeave),
  };
}
