/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Manager } from "react-popper";
import { usePrevious } from "../hooks";
import { genId, getFocusables } from "../utils";

const MenuContext = createContext();

const Menu = forwardRef(
  (
    {
      children,
      isOpen,
      autoSelect,
      closeOnOutsideClick = true,
      orientation,
      closeOnSelect = true,
      placement,
      preventBodyScroll
    },
    ref
  ) => {
    const [state, setState] = useState({
      isOpen: isOpen || false,
      index: -1
    });

    const menuId = genId("menu");
    const buttonId = genId("button");

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const focusableItems = useRef(null);

    useEffect(() => {
      let focusables = getFocusables(menuRef.current).filter(node =>
        ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(
          node.getAttribute("role")
        )
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
        (node, index) => index === 0 && node.setAttribute("tabindex", 0)
      );
    };

    const wasPreviouslyOpen = usePrevious(state.isOpen);

    useEffect(() => {
      if (state.index !== -1) {
        focusableItems.current[state.index].focus();
        updateTabIndex(state.index);
      }
      if (state.index === -1 && !state.isOpen && wasPreviouslyOpen) {
        buttonRef.current.focus();
      }
      if (state.index === -1 && state.isOpen) {
        menuRef.current.focus();
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

    const childContext = {
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
      closeOnOutsideClick,
      placement
    };

    return (
      <MenuContext.Provider value={childContext}>
        <Manager>{children}</Manager>
      </MenuContext.Provider>
    );
  }
);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error(
      "useMenuContext must be used within a MenuContext Provider"
    );
  }
  return context;
}

export { useMenuContext, Menu };
