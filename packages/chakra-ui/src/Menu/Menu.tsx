import {
  useBlurOutside,
  useCreateContext,
  useDisclosure,
  useFocusOnHide,
  useForkRef,
  useId,
  useIds,
} from "@chakra-ui/hooks";
import { Box, BoxProps, Divider, DividerProps, Text } from "@chakra-ui/layout";
import {
  composeEventHandlers as compose,
  createOnKeyDown,
  getAllFocusableIn,
  Merge,
  normalizeEventKey,
  RenderProp,
} from "@chakra-ui/utils";
import { PopperOptions } from "popper.js";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useMenuItemStyle, useMenuListStyle } from "./styles";

interface MenuContext {
  activeIndex: number;
  isOpen: boolean;
  focusAtIndex: (index: number) => void;
  focusOnLastItem: () => void;
  focusOnFirstItem: () => void;
  closeMenu: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  menuRef: React.RefObject<HTMLElement>;
  focusableItems: React.MutableRefObject<HTMLElement[]>;
  placement: PopperOptions["placement"];
  menuId: string;
  buttonId: string;
  openMenu: () => void;
  autoSelect: boolean;
  closeOnSelect: boolean;
  closeOnBlur: boolean;
}

const [useMenuContext, MenuContextProvider] = useCreateContext<MenuContext>();

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
  placement?: PopperOptions["placement"];
}

export type MenuProps = MenuOptions & MenuChildren;

function isMenuElement(element: HTMLElement) {
  const role = element.getAttribute("role");
  const menuRoles = ["menuitem", "menuitemradio", "menuitemcheckbox"];

  // If the element doesn't have a role attribute
  if (!role) return false;

  return menuRoles.includes(role);
}

///////////////////////////////////////////////////////////

const Menu: React.FC<MenuProps> = ({
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
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || -1);
  const disclosure = useDisclosure({ isOpen, onClose, onOpen, defaultIsOpen });
  const [menuId, buttonId] = useIds(["menu", "menubutton"]);

  const focusableItems = useRef<HTMLElement[]>([]);
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (disclosure.isOpen && menuRef && menuRef.current) {
      let focusables = getAllFocusableIn(menuRef.current);
      focusables = focusables.filter(isMenuElement);
      focusableItems.current = focusables;
      initTabIndex();
    }
  }, [disclosure.isOpen]);

  const updateTabIndex = (index: number) => {
    if (focusableItems.current.length > 0) {
      let nodeAtIndex = focusableItems.current[index];
      focusableItems.current.forEach(node => {
        if (node !== nodeAtIndex) {
          node.setAttribute("tabindex", "-1");
        } else {
          nodeAtIndex.setAttribute("tabindex", "0");
        }
      });
    }
  };

  const resetTabIndex = () => {
    if (focusableItems.current) {
      focusableItems.current.forEach(node =>
        node.setAttribute("tabindex", "-1"),
      );
    }
  };

  const initTabIndex = () => {
    focusableItems.current.forEach(
      (node, index) => index === 0 && node.setAttribute("tabindex", "0"),
    );
  };

  useEffect(() => {
    if (activeIndex !== -1) {
      focusableItems.current[activeIndex] &&
        focusableItems.current[activeIndex].focus();
      updateTabIndex(activeIndex);
    }
  }, [activeIndex, disclosure.isOpen, disclosure.prevIsOpen]);

  useFocusOnHide(menuRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: buttonRef,
  });

  const focusOnFirstItem = () => {
    openMenu();
    setActiveIndex(0);
  };

  const openMenu = disclosure.onOpen;
  const closeMenu = () => {
    disclosure.onClose();
    setActiveIndex(-1);
    resetTabIndex();
  };

  const focusAtIndex = (index: number) => {
    setActiveIndex(index);
  };

  const focusOnLastItem = () => {
    openMenu();
    setActiveIndex(focusableItems.current.length - 1);
  };

  const context = {
    activeIndex,
    isOpen: disclosure.isOpen,
    focusAtIndex,
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    buttonRef,
    menuRef,
    focusableItems,
    placement,
    menuId,
    buttonId,
    openMenu,
    autoSelect,
    closeOnSelect,
    closeOnBlur,
  };

  return (
    <MenuContextProvider value={context}>
      {typeof children === "function"
        ? children({ isOpen: disclosure.isOpen, onClose: closeMenu })
        : children}
    </MenuContextProvider>
  );
};

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

function useMenuButton(
  props: MenuButtonOptions,
  ref: React.Ref<HTMLButtonElement>,
) {
  const {
    isOpen,
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    menuId,
    buttonId,
    autoSelect,
    openMenu,
    buttonRef,
  } = useMenuContext();

  const onClick = () => {
    if (isOpen) {
      closeMenu();
    } else {
      if (autoSelect) {
        focusOnFirstItem();
      } else {
        openMenu();
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

  const _ref = useForkRef(buttonRef, ref);

  return {
    ...props,
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": menuId,
    "data-active": isOpen,
    id: buttonId,
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

const MenuButton = forwardRef(function MenuButton<P>(
  { as: Comp = PseudoButton, ...props }: MenuButtonProps<P>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const menuButton = useMenuButton(props, ref);
  return <Comp {...menuButton} />;
}) as <P>(props: MenuButtonProps<P>) => React.ReactElement<MenuButtonProps<P>>;

//////////////////////////////////////////////////////////////////////////////////////////

export interface MenuListOptions {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export type MenuListProps<P, T> = Merge<BoxProps<P, T>, MenuListOptions>;

//////////////////////////////////////////////////////

function useMenuList(props: MenuListOptions, ref: React.Ref<any>) {
  const {
    activeIndex: index,
    isOpen,
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    closeMenu,
    focusableItems,
    buttonRef,
    menuId,
    buttonId,
    menuRef,
  } = useMenuContext();

  const onKeyDown = createOnKeyDown({
    onKeyDown: event => {
      const eventKey = normalizeEventKey(event as any);
      if (/^[a-z0-9_-]$/i.test(eventKey)) {
        event.stopPropagation();
        event.preventDefault();
        const foundNode = focusableItems.current.find(item =>
          (item.textContent as string).toLowerCase().startsWith(eventKey),
        );
        if (foundNode) {
          const nextIndex = focusableItems.current.indexOf(foundNode);
          focusAtIndex(nextIndex);
        }
      }
    },
    keyMap: {
      ArrowDown: () => {
        const itemCount = focusableItems.current.length;
        const nextIndex = (index + 1) % itemCount;
        focusAtIndex(nextIndex);
      },
      ArrowUp: () => {
        const itemCount = focusableItems.current.length;
        focusAtIndex((index - 1 + itemCount) % itemCount);
      },
      Home: focusOnFirstItem,
      End: focusOnLastItem,
      Tab: event => event && event.preventDefault(),
      Escape: closeMenu,
    },
  });

  const onBlur = useBlurOutside(buttonRef, menuRef, {
    action: closeMenu,
    visible: isOpen,
  });

  const _ref = useForkRef(menuRef, ref);

  return {
    ...props,
    ref: _ref,
    isOpen,
    role: "menu",
    id: menuId,
    "aria-labelledby": buttonId,
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

const MenuList = forwardRef(function MenuList<P, T extends HTMLElement>(
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

interface MenuItemOptions {
  isDisabled?: boolean;
  role?: "menuitem" | "menuitemradio" | "menuitemcheckbox";
  onClick?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  command?: string;
  icon?: string | React.ComponentType;
}

export type MenuItemProps<P, T> = Merge<BoxProps<P, T>, MenuItemOptions>;

function useMenuItem(props: MenuItemOptions, ref: React.Ref<any>) {
  const {
    focusableItems,
    focusAtIndex,
    closeOnSelect,
    closeMenu,
  } = useMenuContext();

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (props.isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (focusableItems.current && focusableItems.current.length > 0) {
      let nextIndex = focusableItems.current.indexOf(event.currentTarget);
      focusAtIndex(nextIndex);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    if (props.isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (closeOnSelect) {
      closeMenu();
    }
  };

  const onMouseLeave = () => {
    focusAtIndex(-1);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (props.isDisabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      // dispatch a click event
      event.target.dispatchEvent(
        new MouseEvent("click", {
          cancelable: false,
          bubbles: true,
          view: window,
        }),
      );

      if (closeOnSelect) {
        closeMenu();
      }
    }
  };

  return {
    ...props,
    role: props.role || "menuitem",
    tabIndex: -1,
    disabled: props.isDisabled,
    "aria-disabled": props.isDisabled,
    onClick: compose(
      props.onClick,
      onClick,
    ),
    onMouseEnter: compose(
      props.onMouseEnter,
      onMouseEnter,
    ),
    onKeyDown: compose(
      props.onKeyDown,
      onKeyDown,
    ),
    onMouseLeave: compose(
      props.onMouseLeave,
      onMouseLeave,
    ),
  };
}

const MenuItem = forwardRef(function MenuItem<P, T extends HTMLElement>(
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

//////////////////////////////////////////////////////////////////////////////////////////

const MenuDivider = forwardRef<HTMLElement, DividerProps>((props, ref) => (
  <Divider ref={ref} orientation="horizontal" {...props} />
));

//////////////////////////////////////////////////////////////////////////////////////////

const MenuGroup = forwardRef<HTMLElement, BoxProps>(
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

//////////////////////////////////////////////////////////////////////////////////////////

export { Menu, MenuButton, MenuDivider, MenuGroup, MenuList, MenuItem };
