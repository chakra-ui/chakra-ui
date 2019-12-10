import * as React from "react";
import { BoxProps } from "../Box/index";
import { IInput } from "../Input";
import { PseudoBoxProps } from "../PseudoBox";
import { Omit, Merge } from "../common-types";

type SelectAttributes = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size" | "disabled" | "required" | "defaultChecked"
>;

type MergeSelectAttributes = Merge<
  Omit<PseudoBoxProps, "ref" | "as" | "defaultChecked">,
  SelectAttributes
>;

export type ISelect = IInput<HTMLSelectElement> &
  MergeSelectAttributes &
  React.RefAttributes<HTMLSelectElement>;

export type SelectProps = ISelect & {
  /**
   * The props passed to the select's root element.
   *
   * The internal structure looks like this:
   *
   * ```jsx
   * <SelectWrapper {...rootProps}>
   *  <Select /> <== most props go here directly
   *  <SelectIconWrapper />
   * </SelectWrapper>
   * ```
   *
   * In some scenario, you might want to pass some other props to the root.
   */
  rootProps?: BoxProps;
  /**
   * The placeholder for the select. This renders an `<option>` with empty value
   *
   * ```jsx
   * <option value="">{placeholder}</option>
   * ```
   */
  placeholder?: string;
  /**
   * The icon component to render
   */
  icon?: JSX.Element;
};

declare const Select: React.FC<SelectProps>;
export default Select;
