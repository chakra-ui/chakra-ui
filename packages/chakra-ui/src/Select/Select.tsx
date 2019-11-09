import {
  useControllableValue,
  useCreateContext,
  useForkRef,
  useId,
  useLogger,
  usePopper,
  usePrevious,
} from "@chakra-ui/hooks";
import { Box, SystemProps } from "@chakra-ui/layout";
import {
  composeEventHandlers,
  normalizeEventKey,
  createOnKeyDown,
} from "@chakra-ui/utils";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
import { Item, State } from "./reducer";
import scrollIntoView from "scroll-into-view-if-needed";
import { useSelectionState, Selection, useSelectionItem } from "./hook";

console.clear();

/////////////////////////////////////////////////////////////////////////////////

interface SelectContext {
  select: Selection;
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  controlProps: {
    id: string;
    ref: (React.Ref<any>)[];
  };
  menuProps: {
    id: string;
    ref: (React.Ref<any>)[];
    style?: React.CSSProperties;
    placement?: string;
  };
}

const [useSelectContext, SelectProvider] = useCreateContext<any>();

/////////////////////////////////////////////////////////////////////////////////
/**
 *  Handles focus management for the select
 */
function useFocusManagement(
  controlRef: React.RefObject<any>,
  listBoxRef: React.RefObject<any>,
  isOpen: boolean,
) {
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen && listBoxRef && listBoxRef.current) {
      listBoxRef.current.focus();
      return;
    }

    if (prevIsOpen && !isOpen && controlRef && controlRef.current) {
      controlRef.current.focus();
    }
  }, [isOpen, prevIsOpen, listBoxRef, controlRef]);
}

/////////////////////////////////////////////////////////////////////////////////

function useRapidKeydown() {
  /**
   * When focus is on the select control or the select menu is open,
   * Typing some characters, either rapidly or at intervals, should highlight
   * the option that matches the character(s).
   *
   * So we need to keep some refs
   */
  const [keys, setKeys] = useState<string[]>([]);
  // We'll clear the keys after specific timeout
  const keysTimeoutRef = useRef<any>();

  const keyDownAction = (
    event: KeyboardEvent,
    action: (str: string) => void,
  ) => {
    const keyCode = event.keyCode || event.which;
    const isBackspace = keyCode === 8;
    const { key } = event;

    if (isBackspace) {
      let _keys = [...keys];
      _keys.pop();
      setKeys(_keys);
    } else {
      const isLetter = keyCode >= 65 && keyCode <= 90;
      const isNumber = keyCode >= 48 && keyCode <= 57;
      const isValid = isLetter || isNumber;

      if (isValid) {
        let _keys = keys.concat(key);
        action(_keys.join(""));
        setKeys(_keys);
        clearKeysAfterDelay();
      }
    }
  };

  const clearKeysAfterDelay = () => {
    if (keysTimeoutRef.current) {
      clearTimeout(keysTimeoutRef.current);
      keysTimeoutRef.current = null;
    }
    keysTimeoutRef.current = setTimeout(() => {
      setKeys([]);
      keysTimeoutRef.current = null;
    }, 300);
  };

  return { keys, keyDownAction };
}

/////////////////////////////////////////////////////////////////////////////////

function useScrollIntoView(
  items: State["items"],
  highlightedItem: Item | null,
  listBoxRef: React.RefObject<any>,
  isOpen: boolean,
) {
  useEffect(() => {
    if (isOpen) {
      if (!highlightedItem) return;

      if (highlightedItem && highlightedItem.ref && listBoxRef.current) {
        scrollIntoView(highlightedItem.ref.current, {
          boundary: listBoxRef.current,
          behavior: "instant",
          block: "nearest",
          scrollMode: "if-needed",
        });
      }
    }
  }, [isOpen, highlightedItem, items, listBoxRef]);
}

/////////////////////////////////////////////////////////////////////////////////

interface SelectProps {
  children: React.ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  autoFocus?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onChange?: (value?: Item["value"] | null) => void;
  autoSelect?: boolean;
  blockScrollOnMount?: boolean;
  closeOnSelect?: boolean;
  openOnFocus?: boolean;
  autoFocusOption?: boolean;
  selectOptionOnTab?: boolean;
}

const [useDisclosure, DisclosureProvider] = useCreateContext<any>();
const [useRefContext, RefProvider] = useCreateContext<any>();

/////////////////////////////////////////////////////////////////////////////////
export const Select = ({
  defaultIsOpen,
  onOpen,
  isOpen: isOpenProp,
  onClose,
  children,
  onChange,
  selectOptionOnTab,
  defaultValue,
  value,
}: SelectProps) => {
  const select = useSelectionState();
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const [isMousingDown, setIsMousingDown] = useState(false);

  const [isOpenControlled, isOpenValue] = useControllableValue(
    isOpenProp,
    isOpen,
  );

  const { reference, popper } = usePopper({ placement: "bottom-start" });
  const controlRef = useRef();
  const listBoxRef = useRef();

  const refContext = { reference, popper, controlRef, listBoxRef };

  useScrollIntoView(
    select.items,
    select.highlightedItem,
    listBoxRef,
    Boolean(isOpenValue),
  );

  useFocusManagement(controlRef, listBoxRef, Boolean(isOpenValue));

  const open = () => {
    if (!isOpenControlled) setIsOpen(true);
    if (onOpen) onOpen();
  };

  const close = () => {
    if (!isOpenControlled) setIsOpen(false);
    if (onOpen) onOpen();
    setIsMousingDown(false);
  };

  const toggle = () => {
    const action = isOpenValue ? close : open;
    action();
  };

  const prevIsOpen = usePrevious(isOpenValue);

  useEffect(() => {
    if (prevIsOpen && !isOpenValue) {
      select.reset("highlighted");
      return;
    }

    if (isOpen) {
      if (select.selectedItem) {
        select.highlight(select.selectedItem);
      } else {
        if (!select.highlightedItem) {
          select.first("highlight");
        }
      }
    }
  }, [isOpen, isOpenValue, prevIsOpen]);

  const selectOption = (option: Item, highlightOnSelect?: boolean) => {
    select.select(option, highlightOnSelect);
    onChange && onChange(option.value);
    close();
  };

  useLayoutEffect(() => {
    if (defaultValue && select.items.length) {
      const option = select.items.find(option => option.value === defaultValue);
      if (option) {
        select.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.items]);

  useLayoutEffect(() => {
    if (value && select.items.length) {
      const option = select.items.find(option => option.value === value);
      if (option) {
        select.select(option, true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, select.items]);

  const selectContext = useMemo(() => select, Object.values(select));
  const disclosureContext = {
    isOpen: Boolean(isOpenValue),
    open,
    close,
    toggle,
    isMousingDown,
    setIsMousingDown,
    selectOption,
  };
  return (
    <RefProvider value={refContext}>
      <DisclosureProvider value={disclosureContext}>
        <SelectProvider value={selectContext}>{children}</SelectProvider>
      </DisclosureProvider>
    </RefProvider>
  );
};
/////////////////////////////////////////////////////////////////////////////////

export const Option = forwardRef((props: any, forwardedRef: React.Ref<any>) => {
  const select = useSelectContext();
  const disclosure = useDisclosure();

  const { item, isHighlighted } = useSelectionItem({
    ...select,
    ...props,
  });

  return (
    <div
      id={item.id}
      ref={item.ref}
      data-value={item.value}
      role="option"
      aria-selected={isHighlighted ? "true" : undefined}
      onMouseEnter={() => {
        if (select.highlightedItem && item.id === select.highlightedItem.id) {
          return;
        }
        select.highlight(item);
      }}
      onMouseLeave={() => {
        select.reset("highlighted");
      }}
      onClick={() => {
        if (item.id === select.selectedItem.id) {
          disclosure.close();
        } else {
          disclosure.selectOption(item);
        }
      }}
      style={{ background: isHighlighted ? "pink" : "white" }}
    >
      {props.children}
    </div>
  );
});

/////////////////////////////////////////////////////////////////////////////////

export const SelectControl = forwardRef((props: any, ref) => {
  const select = useSelectContext();
  const disclosure = useDisclosure();
  const refs = useRefContext();

  const buttonRef = useForkRef(refs.controlRef, refs.reference.ref, ref);
  const { keyDownAction } = useRapidKeydown();
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-expanded={disclosure.isOpen}
      aria-haspopup="listbox"
      style={{ minWidth: 80, textAlign: "left" }}
      onClick={disclosure.toggle}
      onMouseDown={() => {
        if (disclosure.isOpen) {
          disclosure.setIsMousingDown(true);
        }
      }}
      onKeyDown={createOnKeyDown({
        onKeyDown: event =>
          keyDownAction(event as any, keys => select.search(keys, "select")),
        keyMap: {
          ArrowUp: disclosure.open,
          ArrowDown: disclosure.open,
          ArrowRight: () => select.next("select"),
          ArrowLeft: () => select.previous("select"),
          Home: () => select.first("select"),
          End: () => select.last("select"),
          " ": event => {
            event && event.preventDefault();
            disclosure.toggle();
          },
        },
      })}
      {...props}
    >
      {select.selectedItem
        ? (select.selectedItem.ref.current as Node).textContent
        : "Select"}
    </button>
  );
});

/////////////////////////////////////////////////////////////////////////////////

export const SelectMenu = forwardRef((props: any, ref: React.Ref<any>) => {
  const select = useSelectContext();
  const disclosure = useDisclosure();
  const refs = useRefContext();

  const { keyDownAction } = useRapidKeydown();
  const menuRef = useForkRef(refs.listBoxRef, refs.popper.ref, ref);

  return (
    <div
      ref={menuRef}
      hidden={!disclosure.isOpen}
      tabIndex={0}
      role="listbox"
      style={{
        maxWidth: 400,
        padding: 40,
        maxHeight: "90vh",
        overflow: "auto",
        ...refs.popper.style,
      }}
      data-placement={refs.popper.placement}
      onKeyDown={createOnKeyDown({
        onKeyDown: event =>
          keyDownAction(event as any, keys => select.search(keys, "highlight")),
        keyMap: {
          ArrowDown: () => {
            select.next("highlight");
          },
          ArrowUp: () => select.previous("highlight"),
          Enter: () => {
            select.select(null);
            disclosure.close();
          },
          Tab: event => {
            event && event.preventDefault();
            select.select(null);
            disclosure.close();
          },
          Escape: event => {
            event && event.preventDefault();
            select.reset("highlighted");
            disclosure.close();
          },
        },
      })}
      onBlur={event => {
        const shouldClose =
          !disclosure.isMousingDown &&
          refs.listBoxRef.current &&
          !refs.listBoxRef.current.contains((event.relatedTarget ||
            document.activeElement) as HTMLElement);

        if (shouldClose) {
          disclosure.close();
        }
      }}
    >
      {props.children}
    </div>
  );
});

////////////////////////////////////////////////////////////////////////////////////

interface OptionGroupProp {
  children: React.ReactNode;
  isDisabled?: boolean;
  label: string;
}

const optGroupStyle = {
  padding: "12px 0",
  minHeight: "1.2em",
  fontSize: "0.8em",
};

export const OptionGroup = forwardRef(
  (
    { children, isDisabled, label, ...props }: OptionGroupProp,
    ref: React.Ref<any>,
  ) => {
    const clones = Children.map(children, child => {
      if (!isValidElement(child)) return;
      return cloneElement(child, { isDisabled });
    });
    return (
      <>
        <div
          style={optGroupStyle}
          ref={ref}
          aria-label={label}
          role="group"
          {...props}
        >
          {label}
        </div>
        {clones}
      </>
    );
  },
);
