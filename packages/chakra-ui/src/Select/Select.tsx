import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  isValidElement,
  cloneElement,
  Children,
} from "react";
import {
  useCreateContext,
  useId,
  useForkRef,
  usePrevious,
  useScrollIntoView,
} from "@chakra-ui/hooks";
import { normalizeEventKey, composeEventHandlers } from "@chakra-ui/utils";
import { registerOption } from "./utils";

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
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  onClick?: React.MouseEventHandler<any>;
  onKeyDown?: React.KeyboardEventHandler<any>;
}

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
    const { state, props, actions, optionsRef } = useSelectContext();
    const ownRef = useRef<any>();

    const ref = useForkRef(forwardedRef, ownRef);

    const uuid = useId(`chakra-select-option-`);
    const id = idProp || uuid;

    const isHighlighted = state.highlighted
      ? id === state.highlighted.id
      : false;

    const isSelected = state.selected ? id === state.selected.id : false;

    const option = { value, id, ref: ownRef };

    useEffect(() => {
      if (optionsRef && optionsRef.current) {
        optionsRef.current = registerOption(optionsRef.current, option);
        console.log(optionsRef.current);
      }
      return () => {
        if (optionsRef && optionsRef.current.length) {
          const newOptions = optionsRef.current.filter(item => item.id !== id);
          optionsRef.current = newOptions;
        }
      };
    }, []);

    return (
      <div
        role="option"
        data-chakra-select-option=""
        aria-selected={isHighlighted ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={-1}
        ref={ref}
        onMouseEnter={composeEventHandlers(onMouseEnter, () => {
          actions.highlightOption(option);
        })}
        onMouseLeave={composeEventHandlers(onMouseLeave, () => {
          actions.clearHighlighted();
        })}
        onClick={composeEventHandlers(onClick, () => {
          actions.selectOption(option);
        })}
        onKeyDown={composeEventHandlers(onKeyDown, event => {
          if (event.key === "Tab" && props.selectOptionOnTab) {
            actions.selectOption(option);
          }
        })}
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
  props: {
    selectOptionOnTab?: boolean;
  };
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
    debugger;

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
    if (loop) return 0;
    return currentIndex > itemsLength ? itemsLength : currentIndex;
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
  items,
  controlRef,
  focusedId,
  selectedId,
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
        if (!prevIsOpen && focusedId == null) {
          action(items.current[0]);
        }
      }
      return;
    }

    if (prevIsOpen && !isOpen) {
      if (controlRef && controlRef.current) {
        controlRef.current.focus();
      }
      action(selectedId);
    } else {
      /**
       * If an option is selected before the listbox
       * receives focus, focus is set on the selected option.
       */
      if (selectedId != null) {
        action(selectedId);
      }
    }
  }, [
    isOpen,
    prevIsOpen,
    selectedId,
    focusedId,
    listBoxRef,
    action,
    items,
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
  value?: string | number;
  defaultValue?: string | number;
  autoFocus?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onChange?: (val: string | number) => void;
  autoSelect?: boolean;
  blockScrollOnMount?: boolean;
  closeOnSelect?: boolean;
  openOnFocus?: boolean;
  autoFocusOption?: boolean;
  selectOptionOnTab?: boolean;
}

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
  const [selected, setSelected] = useState<Option | null>(null);
  const [highlighted, setHighlighted] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const [isMousingDown, setIsMousingDown] = useState(false);

  // Store the refs of the components we'll be using
  const controlRef = useRef<HTMLElement>();
  const listBoxRef = useRef<HTMLElement>();
  const optionsRef = useRef<Option[]>([]);

  // To handle the default selected value
  useEffect(() => {
    const defaultSelectedOption = optionsRef.current.find(
      option => option.value === defaultValue,
    );
    if (defaultSelectedOption) {
      setSelected(defaultSelectedOption);
    }
  }, [defaultValue]);

  const valueIsControlled = value != null;
  // To handle the selected value

  useEffect(() => {
    if (valueIsControlled && value) {
      const selectedOption = optionsRef.current.find(
        option => option.value === value,
      );
      if (selectedOption) {
        setSelected(selectedOption);
      }
    }
  }, [value, valueIsControlled]);

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
  const goToOptionFromKeys = (keys: string, type: "select" | "highlight") => {
    const action = type === "select" ? selectOption : highlightOption;
    const currentValue = type === "select" ? selected : highlighted;
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
      action(nextOption);
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
    setIsMousingDown(false);
  };

  const selectOption = (option: Option) => {
    const isSameOption = selected ? option.value === selected.value : false;
    if (!isSameOption) {
      if (!valueIsControlled) {
        setSelected(option);
      }
      onChange && onChange(option.value);
    }
    closeMenu();
  };

  const highlightOption = (value: Option) => {
    setHighlighted(value);
  };

  const clearHighlighted = () => {
    setHighlighted(null);
  };

  const { keyDownAction } = useRapidKeydown();

  const goToNextOrPreviousOption = (
    type: "highlight" | "select",
    step: number = 1,
    loop: boolean = true,
  ) => {
    const option = type === "highlight" ? highlighted : selected;
    const action = type === "highlight" ? highlightOption : selectOption;

    const currentIndex = option
      ? optionsRef.current.findIndex(item => item.value === option.value)
      : -1;

    const nextIndex = getNextIndex({
      step,
      currentIndex,
      itemsLength: optionsRef.current.length,
      loop,
    });

    const nextOption = optionsRef.current[nextIndex];

    action(nextOption);
  };

  const goToFirstOrLastOption = (
    type: "highlight" | "select",
    position: "first" | "last",
  ) => {
    const action = type === "highlight" ? highlightOption : selectOption;
    const { length } = optionsRef.current;
    if (length) {
      const nextOption =
        position === "first"
          ? optionsRef.current[0]
          : optionsRef.current[length - 1];
      action(nextOption);
    }
  };

  // Select Actions
  const selectNextOption = (loop?: boolean) =>
    goToNextOrPreviousOption("select", 1, loop);
  const selectPrevOption = (loop?: boolean) =>
    goToNextOrPreviousOption("select", -1, loop);
  const selectFirstOption = () => goToFirstOrLastOption("select", "first");
  const selectLastOption = () => goToFirstOrLastOption("select", "last");
  const selectOptionFromKeys = (str: string) =>
    goToOptionFromKeys(str, "select");

  // Highlight Actions
  const highlightNextOption = (loop?: boolean) =>
    goToNextOrPreviousOption("highlight", 1, loop);
  const highlightPrevOption = (loop?: boolean) =>
    goToNextOrPreviousOption("highlight", -1, loop);
  const highlightFirstOption = () =>
    goToFirstOrLastOption("highlight", "first");
  const highlightLastOption = () => goToFirstOrLastOption("highlight", "last");
  const highlightOptionFromKeys = (str: string) =>
    goToOptionFromKeys(str, "highlight");

  // Event handlers for the select control
  const controlEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeEventKey(event);
      const iOpenKey = ["ArrowUp", "ArrowDown", " "].includes(eventKey);
      if (iOpenKey) {
        openMenu();
        return;
      }

      keyDownAction(event, selectOptionFromKeys);

      if (eventKey === "ArrowLeft") {
        selectPrevOption(false);
      }

      if (eventKey === "ArrowRight") {
        selectNextOption(false);
      }

      if (eventKey === "Home") {
        selectFirstOption();
      }

      if (eventKey === "End") {
        selectLastOption();
      }
    },
    onMouseDown: (event: MouseEvent) => {
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

  const listBoxEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeEventKey(event);

      if (eventKey === "Enter") {
        event.preventDefault();
        if (highlighted != null && highlighted != selected) {
          setSelected(highlighted);
          onChange && onChange(highlighted.value);
        }
        closeMenu();
      }

      keyDownAction(event, highlightOptionFromKeys);

      if (eventKey === "Escape") {
        closeMenu();
      }

      if (eventKey === "ArrowDown") {
        event.preventDefault();
        if (!highlighted) {
          highlightFirstOption();
        } else {
          highlightNextOption();
        }
      }

      if (eventKey === "ArrowUp") {
        event.preventDefault();
        if (!highlighted == null) {
          highlightLastOption();
        } else {
          highlightPrevOption();
        }
      }

      if (eventKey === "Home") {
        event.preventDefault();
        highlightFirstOption();
      }

      if (eventKey === "End") {
        event.preventDefault();
        highlightLastOption();
      }
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

  const context: SelectContext = {
    optionsRef,
    props: {
      selectOptionOnTab,
    },
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
    const { state, controlProps, menuProps } = useSelectContext();
    const _ref = useForkRef(ref, controlProps.ref);
    return (
      <button
        ref={_ref}
        id={controlProps.id}
        aria-haspopup="listbox"
        aria-expanded={state.isOpen}
        // aria-readonly={props.isReadOnly}
        aria-controls={menuProps.id}
        style={{ minWidth: 80, textAlign: "left" }}
        {...controlProps.eventHandlers}
        {...props}
      >
        {state.selected && state.selected.ref
          ? (state.selected.ref.current as Node).textContent
          : "Select"}
      </button>
    );
  },
);

/////////////////////////////////////////////////////////////////////////////////

const SelectMenu = forwardRef((props: any, ref: React.Ref<any>) => {
  const { optionsRef, state, menuProps } = useSelectContext();
  const _ref = useForkRef(ref, menuProps.ref);

  useLayoutEffect(() => {
    optionsRef.current = [];
    return () => {
      optionsRef.current = [];
    };
  }, []);

  return (
    <ul
      tabIndex={0}
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
  const [add, setAdd] = useState(false);
  return (
    <>
      <Select defaultValue="Togo" onChange={val => console.log(val)}>
        <SelectControl />
        <SelectMenu>
          <Option value="Niger">Niger</Option>
          <Option value="Nigeria">Nigeria</Option>
          <Option value="Togo">Togo</Option>
          <Option value="Germany">Germany</Option>
          {add && <Option value="Ghana">Ghana</Option>}
          <OptionGroup label="Other room">
            <Option value="Zambia">Zambia</Option>
            <Option value="Gerba">Gerba</Option>
            <Option value="Tunisia">Tunisia</Option>
          </OptionGroup>
        </SelectMenu>
      </Select>
      <button onClick={() => setAdd(!add)}>Add</button>
    </>
  );
}
