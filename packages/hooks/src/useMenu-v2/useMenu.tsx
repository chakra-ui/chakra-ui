import {
  composeEventHandlers,
  createContext,
  createOnKeyDown,
  ensureFocus,
} from "@chakra-ui/utils";
import * as React from "react";
import {
  useDescendant,
  useDescendants,
  UseDescendantsReturn,
} from "../useDescendant";
import useMergeRefs from "../useMergeRefs";
import useId from "../useId";
import useIsomorphicEffect from "../useIsomorphicEffect";
import usePopper from "../usePopper";
import useRapidKeydown from "../useRapidKeydown";
import useUpdateEffect from "../useUpdateEffect";
import useDisclosure from "../useDisclosure";
import useIds from "../useIds";

type PopperType = Pick<ReturnType<typeof usePopper>, "popper" | "reference">;

interface MenuContextType extends PopperType {
  disclosureId: string;
  menuId: string;
  parent: MenuContextType | undefined;
  orientation: any;
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  menuRef: React.RefObject<any>;
  disclosureRef: React.RefObject<any>;
}

// Create the context for a single menu
const MenuContext = React.createContext<MenuContextType | undefined>(undefined);
const useMenuContext = () => React.useContext(MenuContext) as MenuContextType;
const MenuContextProvider = MenuContext.Provider;

function useMenuProvider(props = {}) {
  /**
   *
   * if this menu is a nested menu, that means
   * there's a parent menu and a parent MenuContext
   */
  const parent = useMenuContext();

  // Check if this menu is a nested menu or top level menu
  const hasParent = Boolean(parent);

  // Regular open and close stuff
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  // prepare the reference to the menu and disclosure
  const menuRef = React.useRef<HTMLElement>(null);
  const disclosureRef = React.useRef<HTMLElement>(null);

  // Add some popper.js for dymanic positioning
  const { popper, reference, popperInstance } = usePopper({
    placement: !hasParent ? "bottom-start" : "right-start",
    positionFixed: true,
  });

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
  const [disclosureId, menuId] = useIds(`menu-button`, `menu`);

  return {
    popper,
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
  };
}
const [DescendantProvider, useDescendantCtx] = createContext<
  UseDescendantsReturn
>();

export function MenuProvider(props: any) {
  const ctx = useMenuProvider(props);
  const descendants = useDescendants();
  const descCtx = React.useMemo(() => descendants, [descendants]);

  return (
    <DescendantProvider value={descCtx}>
      <MenuContextProvider value={ctx}>{props.children}</MenuContextProvider>
    </DescendantProvider>
  );
}

//////////////////////////////////////////////////////////////////////////////

interface MenuProps {
  onMouseEnter?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  ref?: React.Ref<any>;
}

export function useMenu(
  props: MenuProps,
): React.DetailedHTMLProps<React.HTMLAttributes<any>, any> & {
  "data-placement": string;
} {
  // let's read from the menu context
  const menu = useMenuContext();
  // then check if this menu is a nested menu
  // i.e. it has a parent menu context
  const hasParent = Boolean(menu.parent);

  // side effect to close this menu on outside click
  React.useEffect(() => {
    const click = (event: MouseEvent) => {
      // if the menu is not open, don't do anything
      if (!menu.isOpen) return;
      // if the click is within the menu container, don't do anything
      if (menu.menuRef.current.contains(event.target)) {
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

  const [descendants, { next, previous, search }] = useDescendantCtx();
  const [onSearch, keys] = useRapidKeydown();

  const onKeyDown = createOnKeyDown({
    stopPropagation: event => {
      if (event.key === "Escape" && hasParent) return false;
      return true;
    },
    onKeyDown: onSearch(keys => search(keys, "highlight")),
    keyMap: {
      Escape: menu.onClose,
      ArrowDown: () => next("highlight"),
      ArrowUp: () => previous("highlight"),
      ArrowLeft: () => {
        if (!hasParent) return;
        menu.onClose();
        const disclosureNode = menu.disclosureRef.current;
        disclosureNode.focus();
      },
    },
  });

  // merge all the refs
  const ref = useMergeRefs(menu.menuRef, menu.popper.ref, props.ref);

  return {
    ...props,
    ref,
    tabIndex: -1,
    role: "menu",
    id: menu.menuId,
    hidden: !menu.isOpen,
    "aria-orientation": "vertical",
    "data-placement": menu.popper.placement,
    style: menu.popper.style,
    onMouseEnter: composeEventHandlers(onMouseEnter, props.onMouseEnter),
    onKeyDown: composeEventHandlers(onKeyDown, props.onKeyDown),
  };
}

//////////////////////////////////////////////////////////////////////////////

interface MenuDisclosureProps {
  ref?: React.Ref<any>;
  onMouseOver?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
  onMouseOut?: React.MouseEventHandler;
}

export function useMenuDisclosure(props: MenuDisclosureProps) {
  // read from the menu context
  const menu = useMenuContext();
  // check if this disclosure is for a nested menu
  // in this case, it's both a disclosure and menu item
  const hasParent = Boolean(menu.parent);

  const onClick = () => {
    // if it's the top-level disclosure, toggle the menu
    if (!hasParent) {
      if (menu.isOpen) {
        menu.onClose();
      } else {
        showAndFocusFirstItem();
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
    if (!menu.parent) return;

    // if we mouseout to any menuitem within parent menu
    // we'll close the nested menu
    const parentMenuNode = menu.parent.menuRef.current;
    if (parentMenuNode.contains(event.target)) {
      menu.onClose();
    }
  };

  const [{ items }, { highlight }] = useDescendantCtx();

  const showAndFocusFirstItem = () => {
    menu.onOpen();
    const firstItem = items[0];
    const firstItemNode = firstItem.ref.current as HTMLElement;
    ensureFocus(firstItemNode);
    highlight(firstItem);
  };

  const showAndFocusLastItem = () => {
    menu.onOpen();
    const lastItem = items[items.length - 1];
    const lastItemNode = lastItem.ref.current as HTMLElement;
    ensureFocus(lastItemNode);
    highlight(lastItem);
  };

  const onKeyDown = createOnKeyDown({
    stopPropagation: event => event.key !== "Escape",
    //@ts-ignore
    keyMap: {
      ArrowDown: !hasParent && showAndFocusFirstItem,
      ArrowUp: !hasParent && showAndFocusLastItem,
      ArrowRight: hasParent && showAndFocusFirstItem,
    },
  });

  // merge the refs
  const ref = useMergeRefs(menu.disclosureRef, menu.reference.ref, props.ref);

  return {
    ...props,
    ref,
    id: menu.disclosureId,
    "aria-expanded": menu.isOpen,
    // "aria-haspopup": "menu",
    "aria-controls": menu.menuId,
    onClick: composeEventHandlers(onClick, props.onClick),
    onMouseEnter: composeEventHandlers(onMouseOver, props.onMouseOver),
    onMouseOut: composeEventHandlers(onMouseOut, props.onMouseOut),
    onKeyDown,
  };
}

export function useMenuItem(props: any) {
  const menu = useMenuContext();

  const [state, actions] = useDescendantCtx();

  const { item, isHighlighted } = useDescendant({ state, actions });

  const onMouseOver = (event: React.MouseEvent) => {
    if (!event.currentTarget) return;
    const self = event.currentTarget as HTMLElement;
    self.focus();
    actions.highlight(item);
  };

  const onMouseOut = (event: React.MouseEvent) => {
    const menuNode = menu.menuRef.current;
    const self = event.currentTarget as HTMLElement;
    self.blur();

    if (document.activeElement === document.body && menuNode) {
      menuNode.focus();
    }

    if (props.onMouseOut) {
      props.onMouseOut(event);
    }
  };

  const onClick = (event: React.MouseEvent) => {
    // If we're clicking on an menuitem that's a disclosure
    // ignore the click
    if (event.currentTarget.hasAttribute("aria-controls")) {
      return;
    }

    if (props.onClick) {
      props.onClick(event);
    }

    // close the current menu
    menu.onClose();

    // close all parent menus recursively
    let next = menu.parent;
    while (next != null) {
      next.onClose();
      next = next.parent;
    }
  };

  React.useEffect(() => {
    if (!item.ref) return;

    if (isHighlighted && document.activeElement !== item.ref.current) {
      item.ref.current.focus();
    }
  }, [isHighlighted, item.ref]);

  const ref = useMergeRefs(item.ref, props.ref);

  return {
    ...props,
    ref,
    id: item.id,
    tabIndex: -1,
    role: "menuitem",
    onMouseOver,
    onMouseOut,
    onClick,
  };
}
