/* eslint-disable */

import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  isValidElement,
  cloneElement,
} from "react";
import {
  useCreateContext,
  useId,
  useForkRef,
  usePrevious,
  useScrollIntoView,
} from "@chakra-ui/hooks";
import { normalizeArrowKey } from "@chakra-ui/utils";
import { useMemo } from "react";
import { Children } from "react";
import { useLayoutEffect } from "react";

interface Option {
  value: string | number;
  ref: React.RefObject<HTMLElement>;
  id: string;
}

interface OptionProps {
  value: Option["value"];
  id?: Option["id"];
  children: React.ReactNode;
  isDisabled?: boolean;
  isFocusable?: boolean;
}

const Option = forwardRef(
  (
    { value, id: idProp, isDisabled, isFocusable, ...rest }: OptionProps,
    forwardedRef: React.Ref<any>,
  ) => {
    const { state, optionsRef } = useSelectContext();
    const ownRef = useRef<any>();

    const ref = useForkRef(forwardedRef, ownRef);

    const uuid = useId(`chakra-select-option-`);
    const id = idProp || uuid;

    const isHighlighted = state.highlighted
      ? id === state.highlighted.id
      : false;

    const isSelected = state.selected ? id === state.selected.id : false;

    useEffect(() => {
      if (optionsRef && optionsRef.current) {
        const option = { value, id, ref: ownRef };
        optionsRef.current.push(option);
      }
    });

    return (
      <div
        ref={ref}
        style={{
          ...(isHighlighted && { background: "blue", color: "white" }),
          ...(isSelected && { background: "tomato", color: "white" }),
        }}
        {...rest}
      />
    );
  },
);

interface SelectContext {
  optionsRef: React.MutableRefObject<Option[]>;
  state: {
    isOpen: boolean;
    selected: Option | null;
    highlighted: Option | null;
  };
  actions: {
    selectOption: (option: Option) => void;
    highlightOption: (option: Option) => void;
    clearHighlighted: () => void;
  };
  controlProps: {
    id: string;
    ref: React.Ref<any>;
    eventHandlers: Record<string, Function>;
  };
  menuProps: {
    id: string;
    ref: React.Ref<any>;
    eventHandlers: Record<string, Function>;
  };
}

const [useSelectContext, SelectProvider] = useCreateContext<SelectContext>();

/////////////////////////////////////////////////////////////////////////////////
/**
 * Gets the next highlighted or selected option based on the typed characters
 */
function getNextOptionFromKeys<T>({
  items,
  searchString,
  itemToString,
  currentValue,
}: {
  items: T[];
  searchString: string;
  itemToString: (item: T) => string;
  currentValue: T;
}) {
  if (!searchString) {
    return null;
  }

  // If current value doesn't exist, find the item that match the search string
  if (!currentValue) {
    const found = items.find(item =>
      itemToString(item)
        .toLowerCase()
        .startsWith(searchString.toLowerCase()),
    );
    return found || currentValue;
  }

  // Filter items for ones that match the search string (case insensitive)
  const searchResults = items.filter(item =>
    itemToString(item)
      .toLowerCase()
      .startsWith(searchString.toLowerCase()),
  );

  // If there's a match, let's get the next item to select
  if (searchResults.length) {
    let nextIndex: number;

    // If the currentValue is in the available items, we move to the next available option
    if (searchResults.includes(currentValue)) {
      const currentIndex = searchResults.indexOf(currentValue);
      nextIndex = currentIndex + 1;
      if (nextIndex === searchResults.length) {
        nextIndex = 0;
      }
      return searchResults[nextIndex];
    } else {
      // Else, we pick the first item in the available items
      nextIndex = items.indexOf(searchResults[0]);
      return items[nextIndex];
    }
  }

  // a decent fallback to the currentValue
  return currentValue;
}

/////////////////////////////////////////////////////////////////////////////////
interface GetNextIndex {
  step?: number;
  currentIndex: number;
  itemsLength: number;
  loop: boolean;
}

function getNextIndex({
  step = 1,
  currentIndex,
  itemsLength,
  loop,
}: GetNextIndex) {
  if (currentIndex === -1) {
    return step > 0 ? 0 : itemsLength - 1;
  }

  const nextIndex = currentIndex + step;

  if (nextIndex < 0) {
    return loop ? itemsLength - 1 : 0;
  }

  if (nextIndex >= itemsLength) {
    return loop ? 0 : itemsLength - 1;
  }

  return nextIndex;
}

/////////////////////////////////////////////////////////////////////////////////
/**
 *  Handles focus management for the select
 */
function useFocusManagement<T extends any>({
  isOpen,
  listBoxRef,
  optionsRef,
  controlRef,
  highlighted,
  selected,
  action,
}: T) {
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen) {
      if (listBoxRef && listBoxRef.current) {
        listBoxRef.current.focus();
        /**
         * If no option is selected before the listbox
         * receives focus, the first option receives focus.
         */
        if (highlighted == null) {
          action(optionsRef.current[0]);
        }
      }
      return;
    }

    if (prevIsOpen && !isOpen) {
      if (controlRef && controlRef.current) {
        controlRef.current.focus();
      }
      action(selected);
    } else {
      /**
       * If an option is selected before the listbox
       * receives focus, focus is set on the selected option.
       */
      if (selected != null) {
        action(selected);
      }
    }
  }, [
    isOpen,
    prevIsOpen,
    selected,
    highlighted,
    listBoxRef,
    action,
    optionsRef,
    controlRef,
  ]);
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

  const outlierKeys = [
    "Tab",
    "Enter",
    "Shift",
    "CapsLock",
    "Control",
    "Alt",
    "Meta",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
  ];

  const keyDownAction = (event: KeyboardEvent, action: Function) => {
    // debugger;
    const { key } = event;

    if (key === "Backspace") {
      let _keys = [...keys];
      _keys.pop();
      setKeys(_keys);
    } else {
      const isOutlierKey = outlierKeys.includes(key);
      const regex = new RegExp("^[a-zA-Z0-9_.-]*$");
      const isSameLetter = key === keys[keys.length - 1];
      const isValid = regex.test(key) && !isOutlierKey && !isSameLetter;

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

  return { keys: keys.join(""), keyDownAction };
}

/////////////////////////////////////////////////////////////////////////////////

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onOpen?: () => void;
  onClose?: () => void;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
}

const Select = ({
  defaultIsOpen,
  onOpen,
  isOpen: isOpenProp,
  onClose,
  children,
}: SelectProps) => {
  const [selected, setSelected] = useState<Option | null>(null);
  const [highlighted, setHighlighted] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);

  // Store the refs of the components we'll be using
  const controlRef = useRef<HTMLElement>();
  const listBoxRef = useRef<HTMLElement>();
  const optionsRef = useRef<Option[]>([]);

  // id generation
  const uuid = useId();
  const controlId = `select-control-${uuid}`;
  const listBoxId = `select-listbox-${uuid}`;

  // Focus Management hook
  useFocusManagement({
    isOpen,
    listBoxRef,
    controlRef,
    optionsRef,
    selected,
    highlighted,
    action: setHighlighted,
  });

  /**
   * If an option is partially or not visible in the select menu,
   * We want to scroll that option into view.
   *
   * Let's use a hook for that
   */
  useScrollIntoView({
    isEnabled: isOpen && highlighted != null,
    node: highlighted ? highlighted.ref.current : null,
    boundary: listBoxRef ? listBoxRef.current : null,
  });

  // Actions
  const selectOptionFromKeys = (
    keys: string,
    action: "select" | "highlight",
  ) => {
    const currentValue = action === "select" ? selected : highlighted;
    const nextOption = getNextOptionFromKeys({
      items: optionsRef.current,
      searchString: keys,
      itemToString: item => {
        if (item) {
          return (item.ref.current as Node).textContent || String(item.value);
        }
        return "";
      },
      currentValue,
    });
    if (nextOption) {
      action === "select"
        ? setSelected(nextOption)
        : setHighlighted(nextOption);
    }
  };

  const { current: openIsControlled } = useRef(isOpenProp != null);
  const _isOpen = openIsControlled ? isOpenProp : isOpen;

  const openMenu = () => {
    if (!openIsControlled) {
      setIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }
  };

  const closeMenu = () => {
    if (!openIsControlled) {
      setIsOpen(false);
    }
    if (onClose) {
      onClose();
    }
  };

  const selectOption = (value: Option) => {
    setSelected(value);
    closeMenu();
  };

  const highlightOption = (value: Option) => {
    setHighlighted(value);
  };

  const clearHighlighted = () => {
    setHighlighted(null);
  };

  const { keyDownAction } = useRapidKeydown();

  // Event handlers for the select control
  const controlEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeArrowKey(event);
      const isOpenKey = ["ArrowUp", "ArrowDown", " "].includes(eventKey);

      if (isOpenKey) {
        openMenu();
      } else {
        const selectItem = (str: string) => selectOptionFromKeys(str, "select");
        keyDownAction(event, selectItem);
      }
    },
    onClick: () => {
      if (_isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    },
    onMouseDown: (event: MouseEvent) => {
      // event.preventDefault();
    },
  };

  const listBoxEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeArrowKey(event);

      if (eventKey === "Enter") {
        if (
          selected == null ||
          (highlighted && highlighted.value != selected.value)
        ) {
          setSelected(highlighted);
        }
        closeMenu();
      }

      const highlightItem = (str: string) =>
        selectOptionFromKeys(str, "highlight");

      keyDownAction(event, highlightItem);

      if (eventKey === "Escape") {
        closeMenu();
      }

      if (eventKey === "ArrowDown") {
        event.preventDefault();
        if (highlighted == null) {
          setHighlighted(optionsRef.current[0]);
          return;
        }

        const currentIndex = optionsRef.current.findIndex(
          item => item.value === highlighted.value,
        );

        const nextIndex = getNextIndex({
          currentIndex,
          itemsLength: optionsRef.current.length,
          loop: true,
        });

        const nextOption = optionsRef.current[nextIndex];
        setHighlighted(nextOption);
      }

      if (eventKey === "ArrowUp") {
        event.preventDefault();
        if (highlighted == null) {
          setHighlighted(optionsRef.current[optionsRef.current.length - 1]);
          return;
        }

        const currentIndex = optionsRef.current.findIndex(
          item => item.value === highlighted.value,
        );

        const nextIndex = getNextIndex({
          step: -1,
          currentIndex,
          itemsLength: optionsRef.current.length,
          loop: true,
        });

        setHighlighted(optionsRef.current[nextIndex]);
      }

      if (eventKey === "Home") {
        event.preventDefault();
        const optionsLength = optionsRef.current.length;
        if (optionsLength) {
          setHighlighted(optionsRef.current[0]);
        }
      }

      if (eventKey === "End") {
        event.preventDefault();
        const { length } = optionsRef.current;
        if (length) {
          setHighlighted(optionsRef.current[length - 1]);
        }
      }
    },
    onBlur: (event: FocusEvent) => {
      let relatedTarget = event.relatedTarget;
      if (event.relatedTarget === null) {
        // In IE11, due to lack of support, event.relatedTarget is always
        // null making every onBlur call to be "outside" of the Listbox
        // even when it's not. Using document.activeElement is another way
        // for us to be able to get what the relatedTarget without relying
        // on the event
        relatedTarget = document.activeElement;
      }

      if (
        isOpen &&
        controlRef.current &&
        listBoxRef.current &&
        !controlRef.current.contains(relatedTarget as HTMLElement) &&
        !listBoxRef.current.contains(relatedTarget as HTMLElement)
      ) {
        closeMenu();
      }
    },
  };

  const context: SelectContext = {
    optionsRef,
    state: {
      isOpen: _isOpen as boolean,
      selected,
      highlighted,
    },
    actions: {
      selectOption,
      highlightOption,
      clearHighlighted,
    },
    controlProps: {
      id: controlId,
      ref: controlRef,
      eventHandlers: controlEventHandlers,
    },
    menuProps: {
      id: listBoxId,
      ref: listBoxRef,
      eventHandlers: listBoxEventHandlers,
    },
  };

  return <SelectProvider value={context}>{children}</SelectProvider>;
};

/////////////////////////////////////////////////////////////////////////////////

const SelectControl = forwardRef((props, ref) => {
  const { state, controlProps, menuProps } = useSelectContext();
  const _ref = useForkRef(ref, controlProps.ref);
  return (
    <button
      ref={_ref}
      id={controlProps.id}
      aria-haspopup="listbox"
      aria-expanded={state.isOpen}
      aria-controls={menuProps.id}
      style={{ minWidth: 80, textAlign: "left" }}
      {...controlProps.eventHandlers}
      {...props}
    >
      {state.selected
        ? (state.selected.ref.current as Node).textContent
        : "Select"}
    </button>
  );
});

/////////////////////////////////////////////////////////////////////////////////

const SelectMenu = forwardRef((props: any, ref: React.Ref<any>) => {
  const { optionsRef, state, menuProps } = useSelectContext();
  const _ref = useForkRef(ref, menuProps.ref);

  useLayoutEffect(() => {
    optionsRef.current = [];
    return () => {
      optionsRef.current = [];
    };
  }, [optionsRef]);

  return (
    <ul
      tabIndex={-1}
      hidden={!state.isOpen}
      role="listbox"
      aria-activedescendant={state.highlighted ? state.highlighted.id : ""}
      ref={_ref}
      id={menuProps.id}
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

export function SelectExample() {
  return (
    <Select>
      <SelectControl />
      <SelectMenu>
        <Option value="Niger">Niger</Option>
        <Option value="Nigeria">Nigeria</Option>
        <Option value="Togo">Togo</Option>
        <Option value="Germany">Germany</Option>
        <OptionGroup label="Other room">
          <Option value="Zambia">Zambia</Option>
          <Option value="Gerba">Gerba</Option>
          <Option value="Tunisia">Tunisia</Option>
        </OptionGroup>
      </SelectMenu>
    </Select>
  );
}
