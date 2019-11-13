import {
  useBlurOutside,
  useCreateContext,
  useDisclosure,
  useFocusOnHide,
  useForkRef,
  useIds,
  useSelectionState,
  Selection,
  useRapidKeyDown,
  useFocusEffect,
  useSelectionItem,
  usePopper,
  PopperJS,
} from "@chakra-ui/hooks";
import { Box, BoxProps, Divider, DividerProps, Text } from "@chakra-ui/layout";
import {
  composeEventHandlers as compose,
  createOnKeyDown,
  Merge,
  RenderProp,
  ensureFocus,
} from "@chakra-ui/utils";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { useMenuItemStyle, useMenuListStyle } from "./styles";

type ExposedProps = { isOpen?: boolean; onClose?: () => void };

type MenuChildren =
  | { children: React.ReactNode }
  | { children: RenderProp<ExposedProps> };

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

export type MenuProps = MenuOptions & MenuChildren;

type Popper = ReturnType<typeof usePopper>;
const [usePopperContext, PopperProvider] = useCreateContext<Popper>();

// Here's what the menu context looks like
interface MenuContext extends ReturnType<typeof useDisclosure> {
  menu: {
    ref: React.RefObject<HTMLElement>;
    id: string;
  };
  button: {
    ref: React.RefObject<HTMLButtonElement>;
    id: string;
  };
  options: {
    autoSelect: boolean;
    closeOnSelect: boolean;
    closeOnBlur: boolean;
  };
}
const [useMenuContext, MenuContextProvider] = useCreateContext<MenuContext>();
const [useSelection, SelectionProvider] = useCreateContext<Selection>();

///////////////////////////////////////////////////////////

export const Menu: React.FC<MenuProps> = ({
  children,
  isOpen,
  defaultIsOpen,
  onOpen,
  onClose,
  autoSelect = true,
  closeOnBlur = true,
  closeOnSelect = true,
  defaultActiveIndex,
  placement,
}) => {
  // manages the open and close states
  const disclosure = useDisclosure({ isOpen, onClose, onOpen, defaultIsOpen });

  // generates unique ids for components
  const [menuId, buttonId] = useIds(["menu", "menubutton"]);

  // provides the popper functionality
  const popper = usePopper({
    placement,
    modifiers: {
      computeStyle: {
        gpuAcceleration: false,
      },
    },
  });

  // update the popper instance when menu is open
  React.useLayoutEffect(() => {
    if (disclosure.isOpen && popper.popperInstance) {
      popper.popperInstance.scheduleUpdate();
    }
  }, [disclosure.isOpen, popper.popperInstance]);

  // provides the selection functionality
  const selection = useSelectionState();

  // refs to get a reference to the menu and button elements :)
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // const focusableItems = useRef<HTMLElement[]>([]);

  // manage focus restoration when menu closes
  useFocusOnHide(menuRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: buttonRef,
  });

  // manage the defaultActiveIndex since we're not storing it in the `useSelection` hook
  useLayoutEffect(() => {
    if (defaultActiveIndex && selection.items.length) {
      selection.highlight(selection.items[defaultActiveIndex]);
    }
    // eslint-disable-next-line
  }, [selection.items]);

  const context = {
    ...disclosure,
    menu: {
      ref: buttonRef,
      id: menuId,
    },
    button: {
      ref: buttonRef,
      id: buttonId,
    },
    options: {
      autoSelect,
      closeOnSelect,
      closeOnBlur,
    },
  };

  const selectionContext = React.useMemo(() => selection, [
    ...Object.values(selection),
  ]);

  return (
    <PopperProvider value={popper}>
      <SelectionProvider value={selectionContext}>
        <MenuContextProvider value={context}>
          {typeof children === "function"
            ? children({
                isOpen: disclosure.isOpen,
                onClose: disclosure.onClose,
              })
            : children}
        </MenuContextProvider>
      </SelectionProvider>
    </PopperProvider>
  );
};

Menu.displayName = "Menu";

//////////////////////////////////////////////////////////////////////////////////////////

const PseudoButton = forwardRef((props, ref) => (
  <Box ref={ref} as="button" {...props} />
));

export interface MenuButtonOptions {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  as?: React.ElementType | React.ComponentType;
}

export type MenuButtonProps<P> = Merge<
  BoxProps<P, HTMLButtonElement>,
  MenuButtonOptions
>;

export function useMenuButton(
  props: MenuButtonOptions,
  ref: React.Ref<HTMLButtonElement>,
) {
  const menu = useMenuContext();
  const popper = usePopperContext();
  const selection = useSelection();

  const focusOnFirstItem = () => {
    menu.onOpen();
    selection.first("highlight");
  };

  const focusOnLastItem = () => {
    menu.onOpen();
    selection.last("highlight");
  };

  const onClick = () => {
    if (menu.isOpen) {
      menu.onClose();
      selection.reset("highlighted");
    } else {
      menu.onOpen();
      if (menu.options.autoSelect) {
        selection.first("highlight");
      }
    }
  };

  const onKeyDown = createOnKeyDown({
    preventDefault: true,
    keyMap: {
      ArrowDown: focusOnFirstItem,
      ArrowUp: focusOnLastItem,
    },
  });

  const _ref = useForkRef(menu.button.ref, ref, popper.reference.ref);

  return {
    ...props,
    "aria-haspopup": "menu",
    "aria-expanded": menu.isOpen,
    "aria-controls": menu.button.id,
    "data-active": menu.isOpen,
    id: menu.button.id,
    role: "button",
    type: "button",
    ref: _ref,
    onClick: compose(
      props.onClick,
      onClick,
    ),
    onKeyDown: compose(
      props.onKeyDown,
      onKeyDown,
    ),
  };
}

export const MenuButton = forwardRef(function MenuButton<P>(
  { as: Comp = PseudoButton, ...props }: MenuButtonProps<P>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const menuButton = useMenuButton(props, ref);
  return <Comp {...menuButton} />;
}) as <P>(props: MenuButtonProps<P>) => React.ReactElement<MenuButtonProps<P>>;

//@ts-ignore
MenuButton.displayName = "MenuButton";

//////////////////////////////////////////////////////////////////////////////////////////

export interface MenuListOptions {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export type MenuListProps<P, T> = Merge<BoxProps<P, T>, MenuListOptions>;

export function useMenuList(props: MenuListOptions, ref: React.Ref<any>) {
  const menu = useMenuContext();
  const popper = usePopperContext();
  const selection = useSelection();
  const [keys, onRapidKeyDown] = useRapidKeyDown();

  const onKeyDown = createOnKeyDown({
    onKeyDown: event =>
      onRapidKeyDown(event as any, keys => selection.search(keys, "highlight")),
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

  const onBlur = useBlurOutside(menu.button.ref, menu.menu.ref, {
    action: menu.onClose,
    visible: menu.isOpen,
  });

  const _ref = useForkRef(menu.menu.ref, ref, popper.popper.ref);

  return {
    ...props,
    ref: _ref,
    isOpen: menu.isOpen,
    role: "menu",
    id: menu.menu.id,
    "aria-labelledby": menu.button.id,
    "data-placement": popper.popper.placement,
    style: popper.popper.style,
    tabIndex: -1,
    onKeyDown: compose(
      props.onKeyDown,
      onKeyDown,
    ),
    onBlur: compose(
      props.onBlur,
      onBlur,
    ),
  };
}

//////////////////////////////////////////////////////

export const MenuList = forwardRef(function MenuList<P, T extends HTMLElement>(
  { onKeyDown, onBlur, ...props }: MenuListProps<P, T>,
  ref: React.Ref<T>,
) {
  const { isOpen, ...menulist } = useMenuList(props, ref);
  const styleProps = useMenuListStyle();

  return (
    <Box
      minW="3xs"
      rounded="md"
      hidden={!isOpen}
      py={2}
      zIndex={1}
      _focus={{ outline: 0 }}
      {...styleProps}
      {...props}
      {...menulist}
    />
  );
});

//////////////////////////////////////////////////////////////////////////////////////////

export interface MenuItemOptions {
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

export type MenuItemProps<P, T> = Merge<BoxProps<P, T>, MenuItemOptions>;

export function useMenuItem(props: MenuItemOptions, ref: React.Ref<any>) {
  const menu = useMenuContext();
  const selection = useSelection();
  const menuItem = useSelectionItem({
    ...selection,
    isDisabled: props.isDisabled,
    isFocusable: props.isFocusable,
  });

  useFocusEffect(menuItem.isHighlighted, menuItem.item.ref);
  const _ref = useForkRef(menuItem.item.ref, ref);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (props.isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (menu.options.closeOnSelect) {
      menu.onClose();
    }
  };

  const onPointerEnter = () => {
    if (!props.isDisabled) {
      selection.highlight(menuItem.item);
    }
  };

  const onPointerLeave = () => {
    selection.reset("highlighted");
    const menuRef = menu.menu.ref;
    if (menuRef.current) {
      ensureFocus(menuRef.current);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
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

      if (menu.options.closeOnSelect) {
        menu.onClose();
      }
    }
  };

  return {
    ...props,
    ref: _ref,
    role: props.role || "menuitem",
    tabIndex: menuItem.isHighlighted ? 0 : -1,
    disabled: props.isDisabled,
    "aria-disabled": props.isDisabled,
    onClick: compose(
      props.onClick,
      onClick,
    ),
    onPointerEnter: compose(
      props.onPointerEnter,
      onPointerEnter,
    ),
    onKeyDown: compose(
      props.onKeyDown,
      onKeyDown,
    ),
    onPointerLeave: compose(
      props.onPointerLeave,
      onPointerLeave,
    ),
  };
}

export const MenuItem = forwardRef(function MenuItem<P, T extends HTMLElement>(
  props: MenuItemProps<P, T>,
  ref: React.Ref<T>,
) {
  const styleProps = useMenuItemStyle();
  const menuitem = useMenuItem(props, ref);

  return (
    <Box
      as="button"
      type="button"
      display="flex"
      textDecoration="none"
      color="inherit"
      minHeight="32px"
      alignItems="center"
      textAlign="left"
      outline="none"
      px={4}
      {...styleProps}
      {...props}
      {...menuitem}
    />
  );
});

MenuItem.displayName = "MenuItem";

//////////////////////////////////////////////////////////////////////////////////////////

export const MenuDivider = forwardRef<HTMLElement, DividerProps>(
  (props, ref) => <Divider ref={ref} orientation="horizontal" {...props} />,
);

//////////////////////////////////////////////////////////////////////////////////////////

export const MenuGroup = forwardRef<HTMLElement, BoxProps>(
  ({ children, title, ...rest }, ref) => (
    <Box ref={ref} role="group">
      {title && (
        <Text mx={4} my={2} fontWeight="semibold" fontSize="sm" {...rest}>
          {title}
        </Text>
      )}
      {children}
    </Box>
  ),
);
