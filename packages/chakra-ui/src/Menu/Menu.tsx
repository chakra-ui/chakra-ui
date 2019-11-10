import {
  useControllableValue,
  useCreateContext,
  useForkRef,
  useId,
  usePrevious,
  useLogger,
  useDisclosure,
} from "@chakra-ui/hooks";
import { Box, BoxProps, Divider, DividerProps, Text } from "@chakra-ui/layout";
import {
  composeEventHandlers,
  createOnKeyDown,
  Merge,
  normalizeEventKey,
  getAllFocusables,
} from "@chakra-ui/utils";
import { PopperOptions } from "popper.js";
import React, { forwardRef, useRef, useState, useEffect } from "react";
import { useMenuItemStyle, useMenuListStyle } from "./styles";

import { useFocusOnHide, useFocusOnShow } from "./hook";

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

type InternalState = { isOpen?: boolean; onClose?: () => void };

type MenuChildren =
  | { children: React.ReactNode }
  | { children: (props: InternalState) => React.ReactNode };

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

  const uuid = useId();
  const menuId = `menu-${uuid}`;
  const buttonId = `menubutton-${uuid}`;

  const focusableItems = useRef<HTMLElement[]>([]);
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (disclosure.isOpen && menuRef && menuRef.current) {
      let focusables = getAllFocusables(menuRef.current);
      focusables = focusables.filter(node =>
        ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(
          node.getAttribute("role") as string,
        ),
      );
      focusableItems.current = menuRef.current ? focusables : [];
      initTabIndex();
    }
  }, [disclosure.isOpen]);

  const updateTabIndex = (index: number) => {
    if (focusableItems.current.length > 0) {
      let nodeAtIndex = focusableItems.current[index];
      focusableItems.current.forEach(node => {
        if (node !== nodeAtIndex) {
          node.setAttribute("tabindex", "-1");
        }
      });
      nodeAtIndex.setAttribute("tabindex", "0");
    }
  };

  useLogger(focusableItems.current);
  useLogger(disclosure.isOpen);

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
    if (activeIndex === -1 && disclosure.isOpen) {
      menuRef.current && menuRef.current.focus();
    }
  }, [activeIndex, disclosure.isOpen, disclosure.prevIsOpen]);

  useFocusOnHide(menuRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: buttonRef,
  });

  useFocusOnShow(menuRef, {
    autoFocus: true,
    visible: disclosure.isOpen,
    focusRef: initialFocusRef,
  });

  const focusOnFirstItem = () => {
    openMenu();
    setActiveIndex(0);
  };

  const openMenu = disclosure.onOpen;
  const closeMenu = () => {
    disclosure.onClose();
    setActiveIndex(-1);
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

const MenuButton = forwardRef(function MenuButton<P>(
  { onClick, onKeyDown, as: Comp = PseudoButton, ...rest }: MenuButtonProps<P>,
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

  const menuButtonRef = useForkRef(buttonRef, ref);

  return (
    <Comp
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={menuId}
      id={buttonId}
      role="button"
      ref={menuButtonRef}
      onClick={composeEventHandlers(onClick, () => {
        if (isOpen) {
          closeMenu();
        } else {
          if (autoSelect) {
            focusOnFirstItem();
          } else {
            openMenu();
          }
        }
      })}
      onKeyDown={composeEventHandlers(onKeyDown, event => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusOnFirstItem();
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          focusOnLastItem();
        }
      })}
      {...rest}
    />
  );
}) as <P>(props: MenuButtonProps<P>) => React.ReactElement<MenuButtonProps<P>>;

//////////////////////////////////////////////////////////////////////////////////////////

export interface MenuListOptions {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
}

export type MenuListProps<P, T> = Merge<BoxProps<P, T>, MenuListOptions>;

const MenuList = forwardRef(function MenuList<P, T extends HTMLElement>(
  { onKeyDown, onBlur, ...props }: MenuListProps<P, T>,
  ref: React.Ref<T>,
) {
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
    closeOnBlur,
    placement,
  } = useMenuContext();

  const menulistRef = useForkRef(menuRef, ref);

  const itemCount = focusableItems.current.length;

  const handleKeyDown = createOnKeyDown({
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
      ArrowDown: () => focusAtIndex((index + 1) % itemCount),
      ArrowUp: () => focusAtIndex((index - 1 + itemCount) % itemCount),
      Home: focusOnFirstItem,
      End: focusOnLastItem,
      Tab: event => event && event.preventDefault(),
      Escape: closeMenu,
    },
  });

  // Close the menu on blur
  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (
      closeOnBlur &&
      isOpen &&
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(event.relatedTarget as HTMLElement) &&
      !buttonRef.current.contains(event.relatedTarget as HTMLElement)
    ) {
      closeMenu();
    }

    onBlur && onBlur(event);
  };

  const styleProps = useMenuListStyle();

  return (
    <Box
      minW="3xs"
      rounded="md"
      role="menu"
      hidden={!isOpen}
      ref={menulistRef}
      id={menuId}
      py={2}
      aria-labelledby={buttonId}
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      onBlur={composeEventHandlers(onBlur, handleBlur)}
      tabIndex={-1}
      zIndex={1}
      _focus={{ outline: 0 }}
      {...styleProps}
      {...props}
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

const MenuItem = forwardRef(function MenuItem<P, T extends HTMLElement>(
  {
    isDisabled,
    onClick,
    onMouseLeave,
    onMouseEnter,
    onKeyDown,
    role = "menuitem",
    ...props
  }: MenuItemProps<P, T>,
  ref: React.Ref<T>,
) {
  const {
    focusableItems,
    focusAtIndex,
    closeOnSelect,
    closeMenu,
  } = useMenuContext();

  const styleProps = useMenuItemStyle();

  const handleMouseEnter: React.MouseEventHandler<HTMLElement> = event => {
    if (isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (focusableItems.current && focusableItems.current.length > 0) {
      let nextIndex = focusableItems.current.indexOf(event.currentTarget);
      focusAtIndex(nextIndex);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLElement> = event => {
    if (isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (closeOnSelect) {
      closeMenu();
    }
  };

  return (
    <Box
      as="button"
      type="button"
      ref={ref}
      display="flex"
      textDecoration="none"
      color="inherit"
      minHeight="32px"
      alignItems="center"
      textAlign="left"
      outline="none"
      px={4}
      role={role}
      tabIndex={-1}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={composeEventHandlers(onClick, handleClick)}
      onMouseEnter={composeEventHandlers(onMouseEnter, handleMouseEnter)}
      onMouseLeave={composeEventHandlers(onMouseLeave, () => {
        focusAtIndex(-1);
      })}
      onKeyDown={composeEventHandlers(onKeyDown, event => {
        if (isDisabled) return;
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
      })}
      {...styleProps}
      {...props}
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
