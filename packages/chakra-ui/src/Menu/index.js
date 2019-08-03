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
import { Manager, Popper, Reference } from "react-popper";
import Box from "../Box";
import PseudoBox from "../PseudoBox";
import Text from "../Text";
import { useUIMode } from "../ThemeProvider";
import usePrevious from "../usePrevious";
import { getFocusables, mergeRefs } from "../utils";
import { useMenuItemStyle, useMenuListStyle } from "./styles";
import Divider from "../Divider";

const MenuContext = createContext();

const Menu = ({
  children,
  isOpen,
  autoSelect,
  closeOnBlur = true,
  closeOnSelect = true,
  placement,
}) => {
  const { mode } = useUIMode();

  const [state, setState] = useState({
    isOpen: isOpen || false,
    index: -1,
  });

  const menuId = `menu-${useId()}`;
  const buttonId = `menubutton-${useId()}`;

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const focusableItems = useRef(null);

  useEffect(() => {
    let focusables = getFocusables(menuRef.current).filter(node =>
      ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(
        node.getAttribute("role"),
      ),
    );
    focusableItems.current = menuRef.current ? focusables : [];
    initTabIndex();
  }, []);

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

  const wasPreviouslyOpen = usePrevious(state.isOpen);

  useEffect(() => {
    if (state.index !== -1) {
      focusableItems.current[state.index].focus();
      updateTabIndex(state.index);
    }
    if (state.index === -1 && !state.isOpen && wasPreviouslyOpen) {
      buttonRef.current && buttonRef.current.focus();
    }
    if (state.index === -1 && state.isOpen) {
      menuRef.current && menuRef.current.focus();
    }
  }, [state, wasPreviouslyOpen]);

  const focusOnFirstItem = () => {
    setState({ isOpen: true, index: 0 });
  };

  const openMenu = () => {
    setState({ ...state, isOpen: true });
  };

  const focusAtIndex = index => {
    setState({ ...state, index });
  };

  const focusOnLastItem = () => {
    setState({ isOpen: true, index: focusableItems.current.length - 1 });
  };

  const closeMenu = () => {
    setState({ isOpen: false, index: -1 });
    resetTabIndex();
  };

  const context = {
    state,
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
    placement,
    mode,
  };

  return (
    <MenuContext.Provider value={context}>
      <Manager>
        {typeof children === "function"
          ? children({ isOpen, onClose: closeMenu })
          : children}
      </Manager>
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

const MenuButton = forwardRef(({ as: Comp = "button", ...props }, ref) => {
  const {
    state: { isOpen },
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
    <Reference>
      {({ ref: referenceRef }) => (
        <Comp
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          id={buttonId}
          role="button"
          ref={node => mergeRefs([buttonRef, referenceRef, ref], node)}
          onClick={() => {
            if (isOpen) {
              closeMenu();
            } else {
              autoSelect ? focusOnFirstItem() : openMenu();
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
          }}
          {...props}
        />
      )}
    </Reference>
  );
});
//////////////////////////////////////////////////////////////////////////////////////////

const MenuList = ({ onKeyDown, onBlur, ...props }) => {
  const {
    state: { index, isOpen },
    focusAtIndex,
    focusOnFirstItem,
    focusOnLastItem,
    closeMenu,
    focusableItems,
    buttonRef,
    menuId,
    buttonId,
    menuRef,
    placement,
    closeOnBlur,
  } = useMenuContext();

  const handleKeyDown = event => {
    const count = focusableItems.current.length;
    let nextIndex;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      nextIndex = (index + 1) % count;
      focusAtIndex(nextIndex);
    } else if (event.key === "ArrowUp") {
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
      !menuRef.current.contains(event.relatedTarget) &&
      !buttonRef.current.contains(event.relatedTarget)
    ) {
      closeMenu();
    }

    onBlur && onBlur(event);
  };

  const styleProps = useMenuListStyle();

  return (
    <Popper placement={placement}>
      {({ ref }) => (
        <Box
          maxWidth="xs"
          borderRadius="md"
          role="menu"
          ref={node => mergeRefs([menuRef, ref], node)}
          id={menuId}
          py={2}
          position="absolute"
          aria-labelledby={buttonId}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          tabIndex={-1}
          hidden={!isOpen}
          {...styleProps}
          {...props}
        />
      )}
    </Popper>
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
        minHeight="32px"
        alignItems="center"
        textAlign="left"
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

const MenuDivider = props => <Divider orientation="horizontal" {...props} />;

//////////////////////////////////////////////////////////////////////////////////////////

const MenuGroup = ({ children, label, ...rest }) => (
  <Box role="presentation">
    {label && (
      <Text mx={4} my={2} fontWeight="semibold" fontSize="sm" {...rest}>
        {label}
      </Text>
    )}
    {children}
  </Box>
);

//////////////////////////////////////////////////////////////////////////////////////////

export default Menu;
export { MenuButton, MenuDivider, MenuGroup, MenuList, MenuItem };
