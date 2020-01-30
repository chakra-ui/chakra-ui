import * as React from "react";
import { useDisclosure, useId } from "@chakra-ui/hooks";
import { composeEventHandlers, isUndefined } from "@chakra-ui/utils";
import { useDescendants, useDescendant } from "@chakra-ui/descendant";

interface ComboboxProps {
  id?: string;
  onHighlight?: (highlightedValue: string) => void;
  onSelect?: (selectedValue: string) => void;
  autoHighlight?: boolean;
  selectTextOnClick?: boolean;
  selectOnBlur?: boolean;
  getA11yStatusMessage?: () => string;
  getA11yHighlightMessage?: () => string;
  openOnFocus?: () => string;
  autoComplete?: boolean;
}

export function useCombobox(props: ComboboxProps) {
  const {
    id: idProp,
    onHighlight,
    onSelect,
    autoHighlight = false,
    selectTextOnClick = false,
    selectOnBlur = false,
    openOnFocus,
    autoComplete = true,
  } = props;

  const [inputValue, setInputValue] = React.useState("");
  const [focusedValue, setFocusedValue] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const listBoxRef = React.useRef<HTMLDivElement>(null);

  const { isOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();

  const descendantsCtx = useDescendants<
    HTMLDivElement,
    { value: string; id: string }
  >();
  const { descendants } = descendantsCtx;

  React.useEffect(() => {
    if (onHighlight && focusedValue != null) {
      onHighlight(focusedValue);
    }
  }, [onHighlight, focusedValue]);

  React.useEffect(() => {
    if (autoHighlight && descendants.length && isOpen) {
      setFocusedValue(descendants[0].value);
    }
  }, [autoHighlight, descendants, isOpen, inputValue]);

  const uuid = useId();
  const id = idProp || uuid;

  const menuId = `chakra-menu-` + id;
  const inputId = `chakra-input-` + id;

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFocusedValue(null);
      setInputValue(event.target.value);
      if (!isOpen) {
        openMenu();
      }
      if (event.target.value.trim() === "") {
        closeMenu();
      }
    },
    [isOpen, openMenu, closeMenu],
  );

  const focusPrevOption = React.useCallback(() => {
    if (!descendants.length) return;

    const index = descendants.findIndex(item => item.value === focusedValue);

    const isAtFirstOption = index === 0;

    if (index === -1) {
      const lastOption = descendants[descendants.length - 1];
      setFocusedValue(lastOption.value);
    } else {
      if (isAtFirstOption && autoComplete) {
        setFocusedValue(null);
      } else {
        const nextOption =
          descendants[(index - 1 + descendants.length) % descendants.length];
        setFocusedValue(nextOption.value);
      }
    }
  }, [autoComplete, descendants, focusedValue]);

  const focusNextOption = React.useCallback(() => {
    if (!descendants.length) return;

    const index = descendants.findIndex(item => item.value === focusedValue);

    const isAtLastOption = index === descendants.length - 1;

    if (index === -1) {
      const firstOption = descendants[0];
      setFocusedValue(firstOption.value);
    } else {
      if (isAtLastOption && autoComplete) {
        setFocusedValue(null);
      } else {
        const nextOption = descendants[(index + 1) % descendants.length];
        setFocusedValue(nextOption.value);
      }
    }
  }, [descendants, autoComplete, focusedValue]);

  const clearValue = React.useCallback(() => {
    setInputValue("");
    setFocusedValue(null);
    closeMenu();
  }, [closeMenu]);

  const selectValue = React.useCallback(() => {
    if (focusedValue == null) return;
    setInputValue(focusedValue);
    setFocusedValue(null);
  }, [focusedValue]);

  const onKeyDown = React.useCallback(
    event => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          focusNextOption();
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          focusPrevOption();
          break;
        }
        case "Escape": {
          event.preventDefault();
          clearValue();
          break;
        }
        case "Enter": {
          event.preventDefault();
          selectValue();
          closeMenu();
          if (onSelect && focusedValue) {
            onSelect(focusedValue);
          }
          break;
        }
        default:
          break;
      }
    },
    [
      focusNextOption,
      focusPrevOption,
      onSelect,
      focusedValue,
      clearValue,
      closeMenu,
      selectValue,
    ],
  );

  const onBlur = React.useCallback(() => {
    if (!listBoxRef.current) return;
    requestAnimationFrame(() => {
      const isFocusWithin = listBoxRef.current?.contains(
        document.activeElement,
      );
      if (!isFocusWithin) {
        selectOnBlur && selectValue();
        closeMenu();
      }
    });
  }, [closeMenu, selectValue, selectOnBlur]);

  const onMouseOver = React.useCallback(value => {
    setFocusedValue(value);
  }, []);

  const onMouseOut = React.useCallback(() => {
    setFocusedValue(null);
  }, []);

  const onClick = React.useCallback(() => {
    focusedValue && setInputValue(focusedValue);
    closeMenu();
    requestAnimationFrame(() => {
      if (selectTextOnClick) {
        inputRef.current?.select();
      } else {
        inputRef.current?.focus();
      }
    });
  }, [closeMenu, selectTextOnClick, focusedValue]);

  const onFocus = React.useCallback(() => {
    if (openOnFocus) {
      openMenu();
    }
  }, [openOnFocus, openMenu]);

  return {
    isOpen,
    descendantsCtx,
    listBoxRef,
    inputRef,
    onChange,
    onBlur,
    inputId,
    onKeyDown,
    onFocus,
    inputValue,
    selectTextOnClick,
    menuId,
    autoComplete,
    focusedValue,
    onMouseOver,
    onMouseOut,
    onClick,
  };
}

type ComboboxHookReturn = ReturnType<typeof useCombobox>;

interface ComboBoxInputHookProps {
  context: ComboboxHookReturn;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export function useComboboxInput(props: ComboBoxInputHookProps) {
  const { context, onChange: onChangeProp, value: valueProp } = props;

  const isControlled = !isUndefined(valueProp);

  const {
    inputValue,
    inputId,
    menuId,
    onBlur,
    onChange,
    onKeyDown,
    focusedValue,
    autoComplete,
    selectTextOnClick,
    inputRef,
  } = context;

  const onClick = React.useCallback(() => {
    if (selectTextOnClick) {
      inputRef.current?.select();
    }
  }, [selectTextOnClick, inputRef]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        onChange(event);
      }
    },
    [isControlled, onChange],
  );

  return {
    type: "text",
    "aria-activedescendant": focusedValue
      ? String(makeHash(focusedValue))
      : undefined,
    "aria-autocomplete": (autoComplete
      ? "both"
      : "list") as React.AriaAttributes["aria-autocomplete"],
    "aria-controls": menuId,
    autoComplete: "off",
    ref: inputRef,
    id: inputId,
    onChange: composeEventHandlers(onChangeProp, handleChange),
    onKeyDown,
    onClick,
    onBlur,
    value: autoComplete
      ? focusedValue || valueProp || inputValue
      : valueProp || inputValue,
  };
}

export function useComboboxInputWrapper({
  context,
}: {
  context: ComboboxHookReturn;
}) {
  const { isOpen, menuId } = context;
  return {
    role: "combobox",
    "aria-expanded": isOpen,
    "aria-owns": menuId,
    "aria-haspopup": "listbox" as React.AriaAttributes["aria-haspopup"],
  };
}

export function useComboboxMenu({ context }: { context: ComboboxHookReturn }) {
  const { menuId, isOpen, listBoxRef } = context;

  return {
    ref: listBoxRef,
    id: menuId,
    role: "listbox",
    hidden: !isOpen,
  };
}

export interface ComboboxOptionProps {
  context: ComboboxHookReturn;
  value: string;
}

export function useComboboxOption({ context, value }: ComboboxOptionProps) {
  const {
    descendantsCtx,
    focusedValue,
    onMouseOver,
    onMouseOut,
    onClick,
  } = context;

  const ref = React.useRef<HTMLDivElement>(null);
  const id = String(makeHash(value));

  useDescendant({
    context: descendantsCtx,
    value: value,
    element: ref.current,
    id,
  });

  const isSelected = focusedValue === value;

  const handleMouseOver = React.useCallback(() => {
    onMouseOver(value);
  }, [onMouseOver, value]);

  return {
    id,
    ref,
    onMouseOver: handleMouseOver,
    onMouseOut,
    onClick,
    role: "option",
    tabIndex: -1,
    "aria-selected": isSelected ? true : undefined,
  };
}

export function useComboboxButton({
  context,
}: {
  context: ComboboxHookReturn;
}) {
  return {
    tabindex: -1,
    type: "button",
    role: "button",
    "aria-haspopup": true,
  };
}

function makeHash(str: string) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}
