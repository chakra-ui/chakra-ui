import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useReducer,
  isValidElement,
  cloneElement,
  Children,
} from "react";
import {
  useCreateContext,
  useId,
  useForkRef,
  usePrevious,
  useLogger,
} from "@chakra-ui/hooks";
import { normalizeEventKey, composeEventHandlers } from "@chakra-ui/utils";
import { getNextIndex } from "./hook/utils";
import { Item, State, reducer, Action } from "./hook/reducer";
import { useLayoutEffect } from "react";

type Option = Item;

interface OptionProps {
  value: string | number;
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
    const { state, props, actions, dispatch } = useSelectContext();
    const uuid = useId();
    const id = idProp || uuid;
    const ownRef = useRef<any>(null);

    const ref = useForkRef(forwardedRef, ownRef);
    const isHighlighted = state.focusedId === id;
    const isSelected = state.selectedId === id;

    useLayoutEffect(() => {
      if (isDisabled && !isFocusable) return;
      dispatch({
        type: "REGISTER",
        payload: { ref: ownRef, id, value },
      });
      return () => {
        dispatch({ type: "UNREGISTER", payload: { id } });
      };
    }, [id, isDisabled, isFocusable, ref]);

    return (
      <div
        role="option"
        data-chakra-select-option=""
        aria-selected={isHighlighted ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={-1}
        ref={ref}
        onMouseEnter={composeEventHandlers(onMouseEnter, () => {
          dispatch({ type: "FOCUS", payload: { id } });
        })}
        onMouseLeave={composeEventHandlers(onMouseLeave, () => {
          dispatch({ type: "RESET_FOCUSED", payload: {} });
        })}
        onClick={composeEventHandlers(onClick, () => {
          dispatch({ type: "MOUSE_SELECT", payload: { id } });
          actions.closeMenu();
        })}
        onKeyDown={composeEventHandlers(onKeyDown, event => {
          if (event.key === "Tab" && props.selectOptionOnTab) {
            dispatch({ type: "SELECT_FOCUSED", payload: {} });
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
  props: {
    selectOptionOnTab?: boolean;
  };
  state: State & {
    isOpen: boolean;
  };
  dispatch: React.Dispatch<Action>;
  actions: {
    closeMenu: () => void;
    selectOption: (opt: Option) => void;
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
 *  Handles focus management for the select
 */
function useFocusManagement(
  state: State & { isOpen: boolean },
  refs: { listBoxRef: React.RefObject<any>; controlRef: React.RefObject<any> },
) {
  const { isOpen } = state;
  const { listBoxRef, controlRef } = refs;
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
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    lastEvent: "",
    selectedId: "",
    focusedId: "",
  });

  // To handle the default selected value
  useEffect(() => {
    if (defaultValue && state.items.length) {
      const defaultSelectedOption = state.items.find(
        option => option.value === defaultValue,
      );
      if (defaultSelectedOption) {
        dispatch({ type: "SELECT", payload: { id: defaultSelectedOption.id } });
      }
    }
  }, [defaultValue, state.items]);

  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
  const [isMousingDown, setIsMousingDown] = useState(false);

  // Store the refs of the components we'll be using
  const controlRef = useRef<HTMLElement>();
  const listBoxRef = useRef<HTMLElement>();

  const valueIsControlled = value != null;

  // id generation
  const uuid = useId();
  const controlId = `select-control-${uuid}`;
  const listBoxId = `select-listbox-${uuid}`;

  // Focus Management hook
  useFocusManagement({ ...state, isOpen }, { listBoxRef, controlRef });

  const { current: openIsControlled } = useRef(isOpenProp != null);
  const _isOpen = openIsControlled ? isOpenProp : isOpen;

  const openMenu = () => {
    if (!openIsControlled) {
      setIsOpen(true);
    }
    if (onOpen) {
      onOpen();
    }

    // Side effects after open
    if (state.selectedId) {
      dispatch({ type: "FOCUS", payload: { id: state.selectedId } });
    } else {
      if (!state.focusedId) {
        dispatch({ type: "FIRST", payload: {} });
      }
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

    dispatch({ type: "RESET_FOCUSED", payload: {} });
  };

  const selectOption = (option: Option) => {
    const isSameOption = option.id === state.selectedId;
    if (!isSameOption) {
      if (!valueIsControlled) {
        dispatch({ type: "MOUSE_SELECT", payload: option });
      }
      if (onChange && option.value) {
        onChange && onChange(option.value);
      }
    }
    closeMenu();
  };

  const { keys, keyDownAction } = useRapidKeydown();

  const controlEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeEventKey(event);
      const isOpenKey = ["ArrowUp", "ArrowDown", " "].includes(eventKey);

      if (isOpenKey) {
        openMenu();
        return;
      }

      keyDownAction(event, str => {
        dispatch({ type: "CHARACTER_SELECT", payload: { keys: str } });
      });

      if (eventKey === "ArrowLeft") {
        dispatch({
          type: "PREVIOUS",
          payload: { selectOnFocus: true, loop: false },
        });
      }

      if (eventKey === "ArrowRight") {
        dispatch({
          type: "NEXT",
          payload: { selectOnFocus: true, loop: false },
        });
      }

      if (eventKey === "Home") {
        dispatch({ type: "FIRST", payload: { selectOnFocus: true } });
      }

      if (eventKey === "End") {
        dispatch({ type: "LAST", payload: { selectOnFocus: true } });
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

  const listBoxEventHandlers = {
    onKeyDown: (event: KeyboardEvent) => {
      const eventKey = normalizeEventKey(event);

      if (eventKey === "Enter") {
        event.preventDefault();
        if (state.focusedId != null && state.focusedId != state.selectedId) {
          dispatch({ type: "SELECT_FOCUSED", payload: {} });
        }
        closeMenu();
      }

      keyDownAction(event, keys => {
        dispatch({ type: "CHARACTER_FOCUS", payload: { keys } });
      });

      if (eventKey === "Escape") {
        closeMenu();
      }

      if (eventKey === "ArrowDown") {
        event.preventDefault();
        if (!state.focusedId) {
          dispatch({ type: "FIRST", payload: {} });
        } else {
          dispatch({ type: "NEXT", payload: {} });
        }
      }

      if (eventKey === "ArrowUp") {
        event.preventDefault();
        if (!state.focusedId == null) {
          dispatch({ type: "LAST", payload: {} });
        } else {
          dispatch({ type: "PREVIOUS", payload: {} });
        }
      }

      if (eventKey === "Home") {
        event.preventDefault();
        dispatch({ type: "FIRST", payload: {} });
      }

      if (eventKey === "End") {
        event.preventDefault();
        dispatch({ type: "LAST", payload: {} });
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

  const context = React.useMemo<SelectContext>(
    () => ({
      props: {
        selectOptionOnTab,
      },
      state: {
        ...state,
        isOpen: _isOpen as boolean,
      },
      dispatch,
      actions: {
        closeMenu,
        selectOption,
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
    }),
    [state, _isOpen, keys],
  );

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
    const selected = state.items.find(item => item.id === state.selectedId);
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
        {selected ? (selected.ref.current as Node).textContent : "Select"}
      </button>
    );
  },
);

/////////////////////////////////////////////////////////////////////////////////

const SelectMenu = forwardRef((props: any, ref: React.Ref<any>) => {
  const { state, menuProps } = useSelectContext();
  const _ref = useForkRef(ref, menuProps.ref);

  return (
    <ul
      tabIndex={0}
      hidden={!state.isOpen}
      role="listbox"
      aria-activedescendant={state.focusedId || ""}
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
      <select>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Togo">Togo</option>
        <option value="Germany">Germany</option>
      </select>
    </>
  );
}
