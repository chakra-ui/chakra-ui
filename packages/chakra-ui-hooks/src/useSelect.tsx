import { findIndex } from "@chakra-ui/utils";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUID as useId } from "react-uid";
import scrollIntoView from "scroll-into-view-if-needed";
import useCreateContext from "./useCreateContext";
import usePrevious from "./usePrevious";

const optionStyle: React.CSSProperties = {
  fontWeight: "normal",
  display: "block",
  whiteSpace: "pre",
  minHeight: "1.2em",
  padding: "0px 2px 1px",
};

// const StyledLi = styled.li`
//   display: flex;
//   align-items: center;
//   position: relative;
//   line-height: 2em;

//   &[data-focus="true"] {
//     background: #bde4ff;
//   }
//   &[aria-disabled="true"] {
//     opacity: 0.4;
//   }
// `;

// const VisuallyHidden =  styled.div`
//   border: 0px;
//   clip: rect(0px, 0px, 0px, 0px);
//   height: 1px;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0px;
//   position: absolute;
//   width: 1px;
// `;

const nodeToObject = <T extends HTMLElement>(node: T) =>
  ({
    value: node.getAttribute("data-value"),
    node,
    textContent: node.textContent,
    id: node.getAttribute("id"),
  } as Option);

const [useSelectContext, SelectContextProvider] = useCreateContext<
  SelectContextValue
>();

interface OptionProps {
  value: number | string;
  isDisabled?: boolean;
  children: React.ReactNode;
}

type Option = {
  value: string | number;
  node: HTMLElement;
  textContent: string;
  id: string;
};

interface SelectContextValue {
  selected: Option | null | undefined;
  focused: Option | null | undefined;
  selectOption: (option: Option) => void;
  focusOption: (option: Option) => void;
  itemToString: (item: Option) => string;
  isOpen: boolean | undefined;
  listBoxId: string;
  controlId: string;
  controlRef: React.Ref<any>;
  listBoxRef: React.Ref<any>;
  controlEvents: Record<string, Function>;
  listBoxEvents: Record<string, Function>;
  resetFocused: () => void;
}

export const Option = forwardRef(
  (
    { value, isDisabled, children, ...rest }: OptionProps,
    ref: React.Ref<any>,
  ) => {
    const {
      selected,
      focused,
      selectOption,
      focusOption,
      // resetFocused,
    } = useSelectContext();
    const isFocused = focused ? focused.value === value : false;
    const isSelected = selected ? selected.value === value : false;

    const uuid = useId();
    const optionId = `select-option-${uuid}`;

    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <li
        ref={ref}
        role="option"
        id={optionId}
        data-value={value}
        data-focus={isFocused}
        style={optionStyle}
        onClick={event => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          const nodeObject = nodeToObject(event.target as HTMLElement);
          selectOption(nodeObject);
        }}
        onMouseOver={event => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          const nodeObject = nodeToObject(event.target as HTMLElement);
          focusOption(nodeObject);
        }}
        // onMouseLeave={() => {
        //   resetFocused();
        // }}
        aria-disabled={isDisabled ? true : undefined}
        aria-selected={isSelected ? true : undefined}
        {...rest}
      >
        {isSelected && "✔️"}
        {children}
      </li>
    );
  },
);

const optGroupStyle = {
  padding: "12px 0",
  minHeight: "1.2em",
  fontSize: "0.8em",
};

interface OptionGroupProp {
  children: React.ReactNode;
  isDisabled?: boolean;
  label: string;
}

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

// const StyledButton = styled.button`
//   align-items: center;
//   background-color: rgb(255, 255, 255);
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   min-height: 38px;
//   position: relative;
//   box-sizing: border-box;
//   border-color: rgba(0, 0, 0, 0.1);
//   border-radius: 4px;
//   border-style: solid;
//   border-width: 1px;
//   transition: all 100ms ease 0s;
//   outline: 0;
//   &:focus {
//     border-color: teal;
//   }
// `;

export const SelectControl = forwardRef((props, ref) => {
  const {
    selected,
    itemToString,
    isOpen,
    listBoxId,
    controlId,
    controlRef,
    controlEvents,
  } = useSelectContext();
  return (
    <button
      ref={controlRef}
      id={controlId}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={listBoxId}
      style={{ minWidth: 80, textAlign: "left" }}
      {...controlEvents}
      {...props}
    >
      {selected ? itemToString(selected) : "Select"}
    </button>
  );
});

// const StyledListbox = styled.ul`
//   /* min-height: 8em; */
//   padding: 0;
//   background: white;
//   border: 1px solid #aaa;
//   border-top: 0;
//   max-height: 8em;
//   overflow-y: auto;
//   position: absolute;
//   margin: 0;
//   width: 148px;
// `;

export const SelectMenuList = forwardRef((props, ref) => {
  const {
    isOpen,
    listBoxRef,
    listBoxEvents,
    listBoxId,
    focused,
  } = useSelectContext();
  return (
    <ul
      tabIndex={-1}
      hidden={!isOpen}
      role="listbox"
      aria-activedescendant={focused && focused.id ? focused.id : undefined}
      ref={listBoxRef}
      id={listBoxId}
      {...listBoxEvents}
      {...props}
    />
  );
}) as React.FC;

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

const getIndexOf = (
  options: Option[],
  value: Option,
  key: keyof Option = "value",
) => findIndex(options, item => item[key] === value[key]);

export const searchStr = ({
  options,
  str,
  toString,
  currentValue,
}: {
  options: Option[];
  str: string;
  toString: (item: Option) => string;
  currentValue?: Option | null;
}) => {
  if (!!str === false) {
    return null;
  }

  if (currentValue != null) {
    // check the typed str to see if there's a match in the options
    const availableOptions = options.filter(item =>
      toString(item)
        .toLowerCase()
        .startsWith(str.toLowerCase()),
    );

    // if there's a match, let's get the next item to select
    if (availableOptions.length > 0) {
      // debugger;
      let nextIndex;
      // if the currentValue is in the available options, the we need to do some looping
      if (availableOptions.includes(currentValue)) {
        const currentIndex = getIndexOf(availableOptions, currentValue);
        nextIndex = currentIndex + 1;
        if (nextIndex === availableOptions.length) {
          nextIndex = 0;
        }
        return availableOptions[nextIndex];
      } else {
        // if not, pick the first item in the available options
        nextIndex = options.indexOf(availableOptions[0]);
        return options[nextIndex];
      }
    }

    // a decent fallback to the currentValue
    return currentValue;
  } else {
    // if current value is null, find the item that match the search str
    const found = options.find(item =>
      toString(item)
        .toLowerCase()
        .startsWith(str.toLowerCase()),
    );
    return found;
  }
};

export const options = [
  { textContent: "Niger" },
  { textContent: "Nigeria" },
  { textContent: "Negro" },
  { textContent: "Germany" },
  { textContent: "Gerba" },
  { textContent: "Togo" },
  { textContent: "Zambia" },
];

// ============= STARTS HERE ================ //

const Select: React.FC<{
  children: React.ReactNode;
  value?: string;
  onOpen?: () => void;
  onClose?: () => void;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
}> = ({
  // onChange,
  // defaultValue,
  value,
  // isDisabled,
  // name,
  // isReadOnly,
  // isInvalid,
  // onBlur,
  // onKeyDown,
  // placeholder,
  onOpen,
  onClose,
  defaultIsOpen,
  // defaultHighlightedValue,
  // closeOnBlur,
  // closeOnEsc,
  // closeOnSelect,
  // openMenuOnFocus,
  // tabSelectsValue,
  children,
  isOpen: isOpenProp,
}) => {
  const [selected, setSelected] = useState<Option | null>();
  const [focused, setFocused] = useState<Option | null>();
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen || false);

  // For typeahead when control has focus
  const [keys, setKeys] = useState<string[]>([]);
  const keysTimeoutRef = useRef<any>();

  const controlRef = useRef<HTMLElement>();
  const listBoxRef = useRef<HTMLElement>();
  const optionsRef = useRef<Option[]>([]);

  // controlled & un-controlled check
  const { current: openIsControlled } = useRef(isOpenProp != null);
  const _isOpen = openIsControlled ? isOpenProp : isOpen;
  const { current: valueIsControlled } = useRef(value != null);

  // id generation
  const uuid = useId();
  const controlId = `select-control-${uuid}`;
  const listBoxId = `select-listbox-${uuid}`;

  useEffect(() => {
    // Query the DOM for only enabled options
    const _optionNodes: NodeListOf<HTMLElement> = document.querySelectorAll(
      "[role=option]:not([aria-disabled=true])",
    );

    const optionNodes = Array.from(_optionNodes);

    const formattedOptions = optionNodes.map(nodeToObject);
    optionsRef.current = formattedOptions;
    // console.log(optionsRef.current);
  }, []);

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

  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen) {
      if (listBoxRef && listBoxRef.current) {
        listBoxRef.current.focus();
        /**
         * If no option is selected before the listbox
         * receives focus, the first option receives focus.
         */
        if (focused == null) {
          setFocused(optionsRef.current[0]);
        }
      }
    } else if (prevIsOpen && !isOpen) {
      if (controlRef && controlRef.current) {
        controlRef.current.focus();
      }
      setFocused(selected);
    } else {
      /**
       * If an option is selected before the listbox
       * receives focus, focus is set on the selected option.
       */
      if (selected != null) {
        setFocused(selected);
      }
    }
  }, [isOpen, prevIsOpen, selected, focused]);

  useEffect(() => {
    if (isOpen && focused && focused.node && listBoxRef.current) {
      scrollIntoView(focused.node, {
        boundary: listBoxRef.current,
        behavior: "instant",
        scrollMode: "if-needed",
      });
    }
  }, [focused, isOpen]);

  const itemToString = (item: Option) => {
    return item.textContent;
  };

  const selectItem = (val: string) => {
    const nextOption = searchStr({
      options: optionsRef.current,
      str: val,
      toString: itemToString,
      currentValue: selected,
    });
    if (nextOption) {
      setSelected(nextOption);
    }
  };

  const focusItem = (val: string) => {
    const nextOption = searchStr({
      options: optionsRef.current,
      str: val,
      toString: itemToString,
      currentValue: focused,
    });
    if (nextOption) {
      setFocused(nextOption);
    }
  };

  // Typeahead support for options
  const getOptionFromKeys = (
    event: KeyboardEvent,
    action: typeof focusItem,
  ) => {
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

  const selectOption = (value: Option) => {
    setSelected(value);
    closeMenu();
  };

  const focusOption = (value: Option) => {
    setFocused(value);
  };

  const resetFocused = () => {
    setFocused(null);
  };

  const controlEvents = {
    onKeyDown: (event: KeyboardEvent) => {
      const isOpenKey = ["ArrowUp", "ArrowDown", " "].includes(event.key);
      if (isOpenKey) {
        openMenu();
      } else {
        getOptionFromKeys(event, selectItem);
      }
    },
    onClick: () => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    },
    onMouseDown: (event: MouseEvent) => {
      event.preventDefault();
    },
  };

  const listBoxEvents = {
    onKeyDown: (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "Enter") {
        if (selected == null || (focused && focused.value != selected.value)) {
          setSelected(focused);
        }
        closeMenu();
      }

      // Keep this function here. Don't move it down bro!
      getOptionFromKeys(event, focusItem);

      if (key === "Escape") {
        closeMenu();
      }

      if (key === "ArrowDown") {
        event.preventDefault();
        if (focused == null) {
          setFocused(optionsRef.current[0]);
          return;
        }

        const currentIndex = findIndex(
          optionsRef.current,
          item => item.value === focused.value,
        );

        let nextIndex;
        if (currentIndex === -1) {
          nextIndex = 0;
        } else {
          nextIndex = currentIndex;
          if (nextIndex < optionsRef.current.length - 1) {
            nextIndex = currentIndex + 1;
          }
        }
        const nextOption = optionsRef.current[nextIndex];
        setFocused(nextOption);
      }

      if (key === "ArrowUp") {
        event.preventDefault();
        if (focused == null) {
          setFocused(optionsRef.current[optionsRef.current.length - 1]);
          return;
        }

        const currentIndex = findIndex(
          optionsRef.current,
          item => item.value === focused.value,
        );

        let nextIndex;
        if (currentIndex === -1) {
          nextIndex = 0;
        } else {
          nextIndex = currentIndex;
          if (nextIndex > 0) {
            nextIndex = currentIndex - 1;
          }
        }
        setFocused(optionsRef.current[nextIndex]);
      }

      if (key === "Home") {
        event.preventDefault();
        const optionsLength = optionsRef.current.length;
        if (optionsLength) {
          setFocused(optionsRef.current[0]);
        }
      }

      if (key === "End") {
        event.preventDefault();
        const optionsLength = optionsRef.current.length;
        if (optionsLength) {
          setFocused(optionsRef.current[optionsLength - 1]);
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

  // const getA11yMessage = () => {
  //   if (focused) {
  //     return focused.value;
  //   }

  //   if (selected) {
  //     return selected.value;
  //   }

  //   return null;
  // };

  return (
    <SelectContextProvider
      value={{
        isOpen: _isOpen,
        listBoxRef,
        itemToString,
        controlRef,
        selected,
        focused,
        selectOption,
        controlEvents,
        listBoxEvents,
        focusOption,
        resetFocused,
        controlId,
        listBoxId,
      }}
    >
      {children}
      {/* <VisuallyHidden
        id="a11y-status-message"
        role="status"
        aria-live="assertive"
        aria-relevant="additions text"
      >
        {getA11yMessage()}
      </VisuallyHidden> */}
    </SelectContextProvider>
  );
};

export default Select;

export function SelectExample() {
  return (
    <Select>
      <SelectControl />
      <SelectMenuList>
        <Option value="Niger">Niger</Option>
        <Option value="Nigeria">Nigeria</Option>
        <Option value="Togo">Togo</Option>
        <Option value="Germany">Germany</Option>
        <OptionGroup label="Other room">
          <Option value="Zambia">Zambia</Option>
          <Option value="Gerba">Gerba</Option>
          <Option value="Tunisia">Tunisia</Option>
        </OptionGroup>
      </SelectMenuList>
    </Select>
  );
}
