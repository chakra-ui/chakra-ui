/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useId } from "@reach/auto-id";
import { bool, func, string } from "prop-types";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "../Box";
import PseudoBox from "../PseudoBox";
import Text from "../Text";
import { useColorMode } from "../ColorModeProvider";
import usePrevious from "../usePrevious";
import { getFocusables, mergeRefs } from "../utils";
import { useMenuItemStyle, useMenuListStyle } from "./styles";
import Divider from "../Divider";
import usePopper from "../usePopper";

const MenuContext = createContext();

const Menu = ({
  children,
  isOpen: isOpenProp,
  defaultIsOpen,
  onOpenChange,
  autoSelect = true,
  closeOnBlur = true,
  closeOnSelect = true,
  placement: placementProp,
}) => {
  const { colorMode } = useColorMode();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const { current: isControlled } = useRef(isOpenProp != null);

  const _isOpen = isControlled ? isOpenProp : isOpen;

  const menuId = `menu-${useId()}`;
  const buttonId = `menubutton-${useId()}`;

  const focusableItems = useRef(null);

  const {
    placement,
    referenceRef: buttonRef,
    popoverRef: menuRef,
    arrowRef,
    arrowStyles,
    popoverStyles,
  } = usePopper({
    placement: placementProp,
    isOpen: _isOpen,
  });

  useEffect(() => {
    let focusables = getFocusables(menuRef.current).filter(node =>
      ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(
        node.getAttribute("role"),
      ),
    );
    focusableItems.current = menuRef.current ? focusables : [];
    initTabIndex();
  }, [menuRef]);

  const updateTabIndex = index => {
    if (focusableItems.current.length > 0) {
      let nodeAtIndex = focusableItems.current[index];
      focusableItems.current.forEach(node => {
        if (node !== nodeAtIndex) {
          node.setAttribute("tabindex", -1);
        }
      });
      nodeAtIndex.setAttribute("tabindex", 0);
    }
  };

  const resetTabIndex = () => {
    focusableItems.current.forEach(node => node.setAttribute("tabindex", -1));
  };

  const initTabIndex = () => {
    focusableItems.current.forEach(
      (node, index) => index === 0 && node.setAttribute("tabindex", 0),
    );
  };

  const wasPreviouslyOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (activeIndex !== -1) {
      focusableItems.current[activeIndex].focus();
      updateTabIndex(activeIndex);
    }
    if (activeIndex === -1 && !_isOpen && wasPreviouslyOpen) {
      buttonRef.current && buttonRef.current.focus();
    }
    if (activeIndex === -1 && _isOpen) {
      menuRef.current && menuRef.current.focus();
    }
  }, [activeIndex, _isOpen, buttonRef, menuRef, wasPreviouslyOpen]);

  const focusOnFirstItem = () => {
    if (!isControlled) {
      setActiveIndex(0);
      setIsOpen(true);
    }
  };

  const openMenu = () => {
    if (!isControlled) {
      setIsOpen(true);
    }
  };

  const focusAtIndex = index => {
    if (!isControlled) {
      setActiveIndex(index);
    }
  };

  const focusOnLastItem = () => {
    if (!isControlled) {
      setIsOpen(true);
      setActiveIndex(focusableItems.current.length - 1);
    }
  };

  const closeMenu = () => {
    if (!isControlled) {
      setIsOpen(false);
      setActiveIndex(-1);
    }
    resetTabIndex();
  };

  const context = {
    activeIndex,
    isOpen: _isOpen,
    focusAtIndex,
    focusOnLastItem,
    focusOnFirstItem,
    closeMenu,
    buttonRef,
    menuRef,
    focusableItems,
    menuId,
    buttonId,
    openMenu,
    autoSelect,
    closeOnSelect,
    closeOnBlur,
    colorMode,
    placement,
    arrowRef,
    arrowStyles,
    popoverStyles,
  };

  return (
    <MenuContext.Provider value={context}>
      {typeof children === "function"
        ? children({ isOpen: _isOpen, onClose: closeMenu })
        : children}
    </MenuContext.Provider>
  );
};

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error(
      "useMenuContext must be used within a MenuContext Provider",
    );
  }
  return context;
}

//////////////////////////////////////////////////////////////////////////////////////////

const PseudoButton = forwardRef((props, ref) => (
  <PseudoBox ref={ref} as="button" {...props} />
));

const MenuButton = forwardRef(
  ({ onClick, onKeyDown, as: Comp = PseudoButton, ...rest }, ref) => {
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

    return (
      <Comp
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        id={buttonId}
        role="button"
        ref={node => mergeRefs([buttonRef, ref], node)}
        onClick={event => {
          if (isOpen) {
            closeMenu();
          } else {
            autoSelect ? focusOnFirstItem() : openMenu();
          }
          if (onClick) {
            onClick(event);
          }
        }}
        onKeyDown={event => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusOnFirstItem();
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            focusOnLastItem();
          }

          if (onKeyDown) {
            onKeyDown(event);
          }
        }}
        {...rest}
      />
    );
  },
);
//////////////////////////////////////////////////////////////////////////////////////////

const MenuList = ({ onKeyDown, onBlur, placement, ...props }) => {
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
    popoverStyles,
  } = useMenuContext();

  const handleKeyDown = event => {
    const count = focusableItems.current.length;
    let nextIndex;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (index + 1) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      nextIndex = (index - 1 + count) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === "Home") {
      focusOnFirstItem();
    } else if (event.key === "End") {
      focusOnLastItem();
    } else if (event.key === "Tab") {
      event.preventDefault();
    } else if (event.key === "Escape") {
      closeMenu();
    }

    // Set focus based on first character
    if (/^[a-z0-9_-]$/i.test(event.key)) {
      event.stopPropagation();
      event.preventDefault();
      let foundNode = focusableItems.current.find(item =>
        item.textContent.toLowerCase().startsWith(event.key),
      );
      if (foundNode) {
        nextIndex = focusableItems.current.indexOf(foundNode);
        focusAtIndex(nextIndex);
      }
    }

    onKeyDown && onKeyDown(event);
  };

  // Close the menu on blur
  const handleBlur = event => {
    if (
      closeOnBlur &&
      isOpen &&
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(event.relatedTarget) &&
      !buttonRef.current.contains(event.relatedTarget)
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
      ref={menuRef}
      id={menuId}
      py={2}
      pos="absolute"
      aria-labelledby={buttonId}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      tabIndex={-1}
      zIndex="1"
      hidden={!isOpen}
      css={popoverStyles}
      {...styleProps}
      {...props}
    />
  );
};

//////////////////////////////////////////////////////////////////////////////////////////

const MenuItem = forwardRef(
  (
    {
      isDisabled,
      onClick,
      onMouseLeave,
      onKeyDown,
      onMouseMove,
      role = "menuitem",
      ...props
    },
    ref,
  ) => {
    const {
      focusableItems,
      focusAtIndex,
      closeOnSelect,
      closeMenu,
    } = useMenuContext();

    const styleProps = useMenuItemStyle();

    return (
      <PseudoBox
        as="button"
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
        onClick={event => {
          if (isDisabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          onClick && onClick(event);
          closeOnSelect && closeMenu();
        }}
        onMouseMove={event => {
          if (isDisabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
          }
          let nextIndex = focusableItems.current.indexOf(event.currentTarget);
          focusAtIndex(nextIndex);
          onMouseMove && onMouseMove(event);
        }}
        onMouseLeave={event => {
          focusAtIndex(-1);
          onMouseLeave && onMouseLeave(event);
        }}
        onKeyDown={event => {
          if (isDisabled) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick && onClick();
            closeOnSelect && closeMenu();
          }
          onKeyDown && onKeyDown(event);
        }}
        {...styleProps}
        {...props}
      />
    );
  },
);

MenuItem.propTypes = {
  isDisabled: bool,
  onKeyDown: func,
  onClick: func,
  onMouseMove: func,
  role: string,
};

//////////////////////////////////////////////////////////////////////////////////////////

const MenuDivider = forwardRef((props, ref) => (
  <Divider ref={ref} orientation="horizontal" {...props} />
));

//////////////////////////////////////////////////////////////////////////////////////////

const MenuGroup = forwardRef(({ children, title, ...rest }, ref) => (
  <Box ref={ref} role="group">
    {title && (
      <Text mx={4} my={2} fontWeight="semibold" fontSize="sm" {...rest}>
        {title}
      </Text>
    )}
    {children}
  </Box>
));

//////////////////////////////////////////////////////////////////////////////////////////

export default Menu;
export { MenuButton, MenuDivider, MenuGroup, MenuList, MenuItem };
export * from "./MenuOption";
