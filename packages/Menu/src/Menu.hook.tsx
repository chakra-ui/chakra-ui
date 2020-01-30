import { useDescendant, useDescendants } from "@chakra-ui/descendant";
import {
  useDisclosure,
  useId,
  useIds,
  useIsomorphicEffect,
  useMergeRefs,
  useRapidKeydown,
  useUpdateEffect,
} from "@chakra-ui/hooks";
import { usePopper } from "@chakra-ui/popper";
import {
  composeEventHandlers,
  createOnKeyDown,
  getNextIndex,
  getNextItemFromSearch,
  getPrevIndex,
} from "@chakra-ui/utils";
import * as React from "react";

///////////////////////////////////////////////////////////////////////////////////

export function useMenu({ context }: { context?: MenuHookReturn }) {
  /**
   *
   * if this menu is a nested menu, that means
   * there's a parent menu and a parent MenuContext
   */
  const parent = context;

  // Check if this menu is a nested menu or top level menu
  const hasParent = Boolean(parent);

  // Regular open and close stuff
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  // prepare the reference to the menu and disclosure
  const menuRef = React.useRef<HTMLDivElement>(null);
  const disclosureRef = React.useRef<HTMLButtonElement>(null);

  // Add some popper.js for dymanic positioning
  const { placement, popper, reference, popperInstance } = usePopper({
    placement: !hasParent ? "bottom-start" : "right-start",
    positionFixed: true,
  });

  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const descendantsContext = useDescendants<HTMLDivElement, {}>();

  /**
   * To get the correct positioning, let's schedule and update
   * when the menu opens
   */
  useIsomorphicEffect(() => {
    if (isOpen && popperInstance) {
      popperInstance.scheduleUpdate();
    }
  }, [popperInstance, isOpen]);

  /**
   * If a parent menu is closed,
   * this ensure all nested menu are closed as well
   */
  React.useEffect(() => {
    if (!parent) return;
    if (isOpen && hasParent && !parent.isOpen) {
      onClose();
    }
  }, [isOpen, onClose, parent, hasParent]);

  /**
   * Let's focus the top-level disclosure when we close
   * the menu
   */
  useUpdateEffect(() => {
    if (!isOpen && disclosureRef.current && !hasParent) {
      disclosureRef.current.focus();
    }
  }, [isOpen]);

  // generate unique ids for menu and disclosure
  const [disclosureId, menuId] = useIds(
    `chakra-menu-disclosure`,
    `chakra-menu-list`,
  );

  return {
    descendantsContext,
    popper,
    placement,
    reference,
    disclosureId,
    menuId,
    parent,
    orientation: "vertical",
    isOpen,
    onToggle,
    onOpen,
    onClose,
    menuRef,
    disclosureRef,
    focusedIndex,
    setFocusedIndex,
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MenuHookReturn extends ReturnType<typeof useMenu> {}

//////////////////////////////////////////////////////////////////////////////

export interface MenuListHookProps {
  onMouseEnter?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  context: MenuHookReturn;
}

export function useMenuList(props: MenuListHookProps) {
  const { context: menu } = props;
  const {
    focusedIndex,
    setFocusedIndex,
    descendantsContext: { descendants },
  } = menu;

  // then check if this menu is a nested menu
  const hasParent = Boolean(menu.parent);

  // side effect to close this menu on outside click
  React.useEffect(() => {
    const click = (event: MouseEvent) => {
      // if the menu is not open, don't do anything
      if (!menu.isOpen) return;
      // if the click is within the menu container, don't do anything
      if (menu.menuRef.current?.contains(event.target as HTMLElement)) {
        return;
      }
      // If we're clicking on a menuitem that's a disclosure,
      // don't do anything
      if (event.target === menu.disclosureRef.current) {
        return;
      }
      // otherwise, onClose the menu
      menu.onClose();
    };
    // add the event listener for click
    document.addEventListener("click", click);
    return () => {
      // remove the event listener, to avoid memory leak
      document.removeEventListener("click", click);
    };
  }, [menu, hasParent]);

  const onMouseEnter = () => {
    // If we're in a nested menu,
    // keep the menu open when we mouse into it
    if (hasParent) {
      menu.onOpen();
    }
  };

  // const [descendants, { next, previous, search }] = useDescendantCtx();
  const [onSearch] = useRapidKeydown();

  const onKeyDown = createOnKeyDown({
    stopPropagation: event => {
      if (event.key === "Escape" && hasParent) return false;
      return true;
    },
    onKeyDown: onSearch(str => {
      const nextItem = getNextItemFromSearch(
        descendants,
        str,
        node => node.element?.textContent || "",
        descendants[focusedIndex],
      );
      if (nextItem) {
        const index = descendants.indexOf(nextItem);
        setFocusedIndex(index);
      }
    }),
    keyMap: {
      Escape: menu.onClose,
      ArrowDown: () => {
        const nextIndex = getNextIndex(focusedIndex, descendants.length);
        setFocusedIndex(nextIndex);
      },
      ArrowUp: () => {
        const prevIndex = getPrevIndex(focusedIndex, descendants.length);
        setFocusedIndex(prevIndex);
      },
      ArrowLeft: () => {
        if (!hasParent) return;
        menu.onClose();
        const node = menu.disclosureRef.current;
        node?.focus();
      },
    },
  });

  // merge all the refs
  const ref = useMergeRefs(menu.menuRef, menu.popper.ref);

  return {
    ref,
    tabIndex: -1,
    role: "menu",
    id: menu.menuId,
    hidden: !menu.isOpen,
    "aria-orientation": "vertical" as React.AriaAttributes["aria-orientation"],
    "data-placement": menu.placement,
    style: menu.popper.style,
    onMouseEnter: composeEventHandlers(onMouseEnter, props.onMouseEnter),
    onKeyDown: composeEventHandlers(onKeyDown, props.onKeyDown),
  };
}

//////////////////////////////////////////////////////////////////////////////

export interface MenuDisclosureHookProps {
  onMouseOver?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
  onMouseOut?: React.MouseEventHandler;
  context: MenuHookReturn;
}

export function useMenuDisclosure(props: MenuDisclosureHookProps) {
  const { context: menu } = props;
  const {
    setFocusedIndex,
    onOpen,
    descendantsContext: { descendants },
  } = menu;

  // check if this disclosure is for a nested menu
  // in this case, it's both a disclosure and menu item
  const hasParent = Boolean(menu.parent);

  const onClick = () => {
    // if it's the top-level disclosure, toggle the menu
    if (!hasParent) {
      if (menu.isOpen) {
        menu.onClose();
      } else {
        openAndFocusFirstItem();
      }
    }
  };

  const onMouseOver = (event: React.MouseEvent) => {
    // top-level disclosure don't open on mouseover
    // so we do nothing
    if (!hasParent) return;

    const self = event.currentTarget as HTMLElement;

    // open the nested menu after a delay
    setTimeout(() => {
      if (self.contains(document.activeElement)) {
        menu.onOpen();
        // if this menu item hasn't received focus due to browser
        // issues, force it to focus
        if (document.activeElement !== self) {
          self.focus();
        }
      }
    }, 200);
  };

  const onMouseOut = (event: React.MouseEvent) => {
    // if we mouseout to any menuitem within parent menu
    // we'll close the nested menu
    const parentMenuNode = menu.parent?.menuRef.current;
    if (parentMenuNode?.contains(event.target as HTMLElement)) {
      menu.onClose();
    }
  };

  const openAndFocusFirstItem = React.useCallback(() => {
    onOpen();
    setFocusedIndex(0);
  }, [onOpen, setFocusedIndex]);

  const showAndFocusLastItem = React.useCallback(() => {
    onOpen();
    setFocusedIndex(descendants.length - 1);
  }, [onOpen, setFocusedIndex, descendants]);

  const onKeyDown = createOnKeyDown({
    stopPropagation: event => event.key !== "Escape",
    keyMap: {
      ArrowDown: () => {
        if (!hasParent) openAndFocusFirstItem;
      },
      ArrowUp: () => {
        if (!hasParent) showAndFocusLastItem;
      },
      ArrowRight: () => {
        if (hasParent) openAndFocusFirstItem;
      },
    },
  });

  const ref = useMergeRefs(menu.disclosureRef, menu.reference.ref);

  return {
    ref,
    id: menu.disclosureId,
    "aria-expanded": menu.isOpen,
    "aria-haspopup": "menu" as React.AriaAttributes["aria-haspopup"],
    "aria-controls": menu.menuId,
    onClick: composeEventHandlers(onClick, props.onClick),
    onMouseEnter: composeEventHandlers(onMouseOver, props.onMouseOver),
    onMouseOut: composeEventHandlers(onMouseOut, props.onMouseOut),
    onKeyDown,
  };
}

///////////////////////////////////////////////////////////////////////////////////

export interface MenuItemHookProps {
  onMouseOut?: React.MouseEventHandler;
  context: MenuHookReturn;
  onClick?: React.MouseEventHandler;
}

export function useMenuItem(props: MenuItemHookProps) {
  const {
    context: menu,
    onMouseOut: onMouseOutProp,
    onClick: onClickProp,
  } = props;
  const { descendantsContext, setFocusedIndex, focusedIndex, menuRef } = menu;

  const ref = React.useRef<HTMLDivElement>(null);
  const id = useId(`chakra-menu-item`);

  const { index } = useDescendant({
    element: ref.current,
    context: descendantsContext,
  });

  const onMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      if (!event.currentTarget) return;
      const self = event.currentTarget as HTMLElement;
      self.focus();
      setFocusedIndex(index);
    },
    [setFocusedIndex, index],
  );

  const onMouseOut = React.useCallback(
    (event: React.MouseEvent) => {
      const menuNode = menuRef.current;
      const self = event.currentTarget as HTMLElement;
      self.blur();

      if (document.activeElement === document.body && menuNode) {
        menuNode.focus();
      }

      if (onMouseOutProp) {
        onMouseOutProp(event);
      }
    },
    [menuRef, onMouseOutProp],
  );

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      // If we're clicking on an menuitem that's a disclosure
      // ignore the click
      if (event.currentTarget.hasAttribute("aria-controls")) {
        return;
      }

      if (onClickProp) {
        onClickProp(event);
      }

      // close the current menu
      menu.onClose();

      // close all parent menus recursively
      let next = menu.parent;
      while (next != null) {
        next.onClose();
        next = next.parent;
      }
    },
    [menu, onClickProp],
  );

  const isFocused = index === focusedIndex;

  React.useEffect(() => {
    if (!ref.current) return;

    if (isFocused && document.activeElement !== ref.current) {
      ref.current.focus();
    }
  }, [isFocused]);

  return {
    ref,
    id,
    tabIndex: -1,
    role: "menuitem",
    onMouseOver,
    onMouseOut,
    onClick,
  };
}
