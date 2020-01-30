import { PropsOf } from "@chakra-ui/system";
import { createContext } from "@chakra-ui/utils";
import React from "react";
import {
  ComboboxHookProps,
  ComboboxMenuHookProps,
  useCombobox,
  useComboboxInput,
  useComboboxMenu,
  useComboboxOption,
} from "./Combobox.hook";

type ComboboxContext = ReturnType<typeof useCombobox>;
const [ComboboxProvider, useComboboxContext] = createContext<ComboboxContext>();

export function BaseCombobox(props: ComboboxHookProps & PropsOf<"div">) {
  const {
    onHighlight,
    onSelect,
    autoHighlight,
    selectTextOnClick,
    selectOnBlur,
    openOnFocus,
    autoComplete,
    ...htmlProps
  } = props;
  const context = useCombobox(props);

  return (
    <ComboboxProvider value={context}>
      <div data-chakra-combobox="" {...htmlProps} />
    </ComboboxProvider>
  );
}

export function BaseComboboxInput(props: PropsOf<"div">) {
  const context = useComboboxContext();
  const inputProps = useComboboxInput({ context, ...props });
  return <input data-chakra-combobox-input="" {...props} {...inputProps} />;
}

export function BaseComboboxOption(props: PropsOf<"div"> & { value: string }) {
  const { value, ...htmlProps } = props;
  const context = useComboboxContext();
  const optionProps = useComboboxOption({ context, value });
  return <div data-chakra-combobox-option="" {...htmlProps} {...optionProps} />;
}

export function BaseComboboxMenu(props: PropsOf<"div">) {
  const context = useComboboxContext();
  const menuProps = useComboboxMenu({ context });
  return <div data-chakra-combobox-menu="" {...props} {...menuProps} />;
}
