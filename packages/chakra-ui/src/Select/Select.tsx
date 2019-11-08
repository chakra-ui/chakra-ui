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
import { composeEventHandlers, normalizeEventKey } from "@chakra-ui/utils";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Item, State } from "./reducer";
import scrollIntoView from "scroll-into-view-if-needed";
import { useDeepCompareMemo } from "use-deep-compare";
import { useSelectionState, Selection, useSelectionItem } from "./hook";

/////////////////////////////////////////////////////////////////////////////////

type Option = Item;

interface OptionProps {
  value: NonNullable<Option["value"]>;
  id?: Option["id"];
  children: React.ReactNode;
  isDisabled?: boolean;
  isFocusable?: boolean;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onClick?: React.MouseEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
}

/////////////////////////////////////////////////////////////////////////////////

const Option = forwardRef(
  (
    {
      value,
      id: idProp,
      isDisabled,
      isFocusable,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onClick,
      ...rest
    }: OptionProps,
    forwardedRef: React.Ref<any>,
  ) => {
    const { select, optionProps } = useSelectContext();
    const { id, ref: __ref, isSelected, isHighlighted } = useSelectionItem({
      ...select,
      id: idProp,
      value,
      isDisabled,
      isFocusable,
    });

    const ref = useForkRef(forwardedRef, __ref);

    const getBg = (): SystemProps["bg"] => {
      if (isHighlighted) {
        return isSelected ? "blue.500" : "blue.50";
      } else if (isSelected) {
        return "blue.400";
      } else {
        return undefined;
      }
    };

    return (
      <Box
        role="option"
        data-chakra-select-option=""
        aria-selected={isHighlighted ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={-1}
        ref={ref}
        onMouseEnter={composeEventHandlers(onMouseEnter, () => {
          optionProps.eventHandlers.onMouseEnter(id);
        })}
        onMouseLeave={composeEventHandlers(onMouseLeave, () => {
          optionProps.eventHandlers.onMouseLeave();
        })}
        onMouseDown={event => {
          event.preventDefault();
        }}
        onClick={composeEventHandlers(onClick, () => {
          optionProps.eventHandlers.onClick(id);
        })}
        cursor="pointer"
        backgroundColor={getBg()}
        {...rest}
      />
    );
  },
);

/////////////////////////////////////////////////////////////////////////////////

interface SelectContext {
  select: Selection;
  isOpen: boolean;
  optionProps: {
    eventHandlers: Record<string, Function>;
  };
  controlProps: {
    id: string;
    ref: (React.Ref<any>)[];
    eventHandlers: Record<string, Function>;
  };
  menuProps: {
    id: string;
    ref: (React.Ref<any>)[];
    eventHandlers: Record<string, Function>;
    style?: React.CSSProperties;
    placement?: string;
  };
}

const [useSelectContext, SelectProvider] = useCreateContext<SelectContext>();

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
  highlightedId: Item["id"] | null,
  listBoxRef: React.RefObject<any>,
) {
  useEffect(() => {
    if (!highlightedId) return;

    const scrollOption = items.find(item => item.id === highlightedId);
    if (scrollOption && scrollOption.ref && listBoxRef.current) {
      scrollIntoView(scrollOption.ref.current, {
        boundary: listBoxRef.current,
        behavior: "instant",
        block: "nearest",
        scrollMode: "if-needed",
      });
    }
  }, [highlightedId, items, listBoxRef]);
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
  onChange?: (value?: Item["value"]) => void;
  autoSelect?: boolean;
  blockScrollOnMount?: boolean;
  closeOnSelect?: boolean;
  openOnFocus?: boolean;
  autoFocusOption?: boolean;
  selectOptionOnTab?: boolean;
}

/////////////////////////////////////////////////////////////////////////////////
const Select = ({
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

  // const _selectedOption = state.items.find(item => item.value === value);

  // const sharedProps = {
  //   onSelect(id: string | null, option?: Item) {
  //     if (option && onChange) {
  //       onChange(option.value);
  //     }
  //   },
  //   selectedId: _selectedOption ? _selectedOption.id : "",
  // };

  // To handle the default selected value
  // useLayoutEffect(() => {
  //   if (defaultValue && state.items.length) {
  //     const defaultSelectedOption = state.items.find(
  //       option => option.value === defaultValue,
  //     );
  //     if (defaultSelectedOption) {
  //       dispatch({ type: "SELECT", payload: { id: defaultSelectedOption.id } });
  //     }
  //   }
  // }, [defaultValue, state.items]);

  // useLayoutEffect(() => {
  //   if (value && state.items.length) {
  //     const selectedOption = state.items.find(option => option.value === value);
  //     if (selectedOption) {
  //       dispatch({ type: "SELECT", payload: { id: selectedOption.id } });
  //     }
  //   }
  // }, [value, state.items]);

  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const [isMousingDown, setIsMousingDown] = useState(false);

  // Store the refs of the components we'll be using

  const { reference, popper } = usePopper<HTMLButtonElement, HTMLDivElement>({
    modifiers: { keepTogether: { enabled: true } },
    placement: "bottom-start",
  });

  const controlRef = useRef<HTMLElement>();
  const listBoxRef = useRef<HTMLDivElement>();

  const { current: valueIsControlled } = useRef(value != null);

  // id generation
  const uuid = useId();
  const controlId = `select-control-${uuid}`;
  const listBoxId = `select-listbox-${uuid}`;

  useLogger(select.highlightedId);

  // Focus and scroll Management hook
  useFocusManagement(controlRef, listBoxRef, isOpen);
  useScrollIntoView(select.items, select.highlightedId, listBoxRef);

  const [openIsControlled, _isOpen] = useControllableValue(isOpenProp, isOpen);

  const openMenu = () => {
    if (!openIsControlled) {
      setIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }

    // Side effects after open
    if (select.selectedId) {
      select.highlight(select.selectedId);
    } else {
      if (!select.highlightedId) {
        select.first("highlight");
      }
    }
  };

  const closeMenu = useCallback(() => {
    if (!openIsControlled) {
      setIsOpen(false);
    }
    if (onClose) {
      onClose();
    }

    setIsMousingDown(false);

    select.reset("highlighted");
  }, [onClose, openIsControlled, select]);

  const { keys, keyDownAction } = useRapidKeydown();

  const controlEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeEventKey(event);
      const isOpenKey = ["ArrowUp", "ArrowDown", " "].includes(eventKey);

      if (isOpenKey) {
        openMenu();
        return;
      }

      keyDownAction(event, characters => select.search(characters, "select"));

      if (eventKey === "ArrowLeft") {
        select.previous("select");
      }

      if (eventKey === "ArrowRight") {
        select.next("select");
      }

      if (eventKey === "Home") {
        select.first("select");
      }

      if (eventKey === "End") {
        select.last("select");
      }
    },
    onMouseDown: () => {
      if (_isOpen) {
        setIsMousingDown(true);
      }
    },
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      if (document.activeElement !== event.target) {
        (event.target as HTMLElement).focus();
      }
      if (_isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    },
  };

  const rAF = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  const moveDown = () => {
    rAF(() => {
      if (select.highlightedId == null) {
        select.first("highlight");
      } else {
        select.next("highlight");
      }
    });
  };

  const listBoxEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeEventKey(event);

      // if (eventKey === "Enter") {
      //   event.preventDefault();
      //   if (
      //     select.highlightedId != null &&
      //     select.highlightedId != select.selectedId
      //   ) {
      //     select.select(null); // setting to null use the `highlightedId`
      //   }
      //   closeMenu();
      // }

      // keyDownAction(event, keys => select.search(keys, "highlight"));

      // if (eventKey === "Escape") {
      //   closeMenu();
      // }

      if (eventKey === "ArrowDown") {
        event.preventDefault();
        moveDown();
        // if (select.highlightedId == null) {
        //   select.first("highlight");
        // } else {
        //   select.next("highlight");
        // }
      }

      if (eventKey === "ArrowUp") {
        event.preventDefault();
        if (select.highlightedId == null) {
          select.last("highlight");
        } else {
          select.previous("highlight");
        }
      }

      // if (eventKey === "Home") {
      //   event.preventDefault();
      //   select.first("highlight");
      // }

      // if (eventKey === "End") {
      //   event.preventDefault();
      //   select.last("highlight");
      // }

      // if (eventKey === "Tab") {
      //   if (selectOptionOnTab) {
      //     event.preventDefault();
      //     select.select(null);
      //     closeMenu();
      //   }
      // }
    },
    onBlur: (event: FocusEvent) => {
      const shouldCloseMenu =
        !isMousingDown &&
        listBoxRef.current &&
        !listBoxRef.current.contains((event.relatedTarget ||
          document.activeElement) as HTMLElement);

      if (shouldCloseMenu) {
        closeMenu();
      }
    },
  };

  const optionEventHandlers = {
    onMouseEnter: (id: Item["id"]) => select.highlight(id),
    onMouseLeave: () => select.reset("highlighted"),
    onClick: (id: Item["id"]) => {
      select.select(id);
      closeMenu();
    },
  };

  const context = {
    select,
    isOpen: _isOpen as boolean,
    optionProps: {
      eventHandlers: optionEventHandlers,
    },
    controlProps: {
      ...reference,
      ref: [reference.ref, controlRef],
      id: controlId,
      eventHandlers: controlEventHandlers,
    },
    menuProps: {
      ...popper,
      ref: [popper.ref, listBoxRef],
      id: listBoxId,
      eventHandlers: listBoxEventHandlers,
    },
  };

  // const context = useDeepCompareMemo<SelectContext>(
  //   () => ({
  //     select,
  //     isOpen: _isOpen as boolean,
  //     optionProps: {
  //       eventHandlers: optionEventHandlers,
  //     },
  //     controlProps: {
  //       ...reference,
  //       ref: [reference.ref, controlRef],
  //       id: controlId,
  //       eventHandlers: controlEventHandlers,
  //     },
  //     menuProps: {
  //       ...popper,
  //       ref: [popper.ref, listBoxRef],
  //       id: listBoxId,
  //       eventHandlers: listBoxEventHandlers,
  //     },
  //   }),
  //   [select],
  // );

  return <SelectProvider value={context}>{children}</SelectProvider>;
};

/////////////////////////////////////////////////////////////////////////////////

const SelectControl = forwardRef(
  (
    props: {
      isReadOnly?: boolean;
      isDisabled?: boolean;
      isInvalid?: boolean;
      children?: React.ReactNode;
    },
    ref,
  ) => {
    const { select, isOpen, controlProps, menuProps } = useSelectContext();
    const controlRef = useForkRef(ref, ...controlProps.ref);
    const selected = select.items.find(item => item.id === select.selectedId);
    return (
      <button
        ref={controlRef}
        type="button"
        id={controlProps.id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuProps.id}
        style={{ minWidth: 80, textAlign: "left" }}
        {...controlProps.eventHandlers}
        {...props}
      >
        {selected ? (selected.ref.current as Node).textContent : "Select"}
      </button>
    );
  },
);

/////////////////////////////////////////////////////////////////////////////////

const SelectMenu = forwardRef((props: any, ref: React.Ref<any>) => {
  const { select, isOpen, menuProps } = useSelectContext();
  const menuRef = useForkRef(ref, ...menuProps.ref);

  return (
    <Box
      as="ul"
      tabIndex={0}
      hidden={!isOpen}
      role="listbox"
      aria-activedescendant={select.highlightedId || ""}
      ref={menuRef}
      id={menuProps.id}
      data-placement={menuProps.placement}
      style={menuProps.style}
      width="240px"
      shadow="lg"
      outline="0"
      p={5}
      {...menuProps.eventHandlers}
      {...props}
    />
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

const OptionGroup = forwardRef(
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

////////////////////////////////////////////////////////////////////////////////////
export { Select, SelectControl, SelectMenu, Option, OptionGroup };
