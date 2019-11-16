import * as React from "react";
import {
  useCheckboxGroup,
  useRadioGroup,
  UseCheckboxGroupOptions,
  UseRadioGroupOptions,
} from "@chakra-ui/hooks";
import { useMenuItem, MenuItemOptions, MenuGroup } from "./Menu";
import { Box, BoxProps } from "@chakra-ui/layout";
import { useMenuItemStyle } from "./styles";
import { Icon } from "../Icon";
import { Merge } from "@chakra-ui/utils";

interface MenuItemOptionOptions extends MenuItemOptions {
  isChecked?: boolean;
  type?: "radio" | "checkbox";
  value: string | number;
}

export function useMenuItemOption(
  props: MenuItemOptionOptions,
  ref: React.Ref<any>,
) {
  const role = props.type === "radio" ? "menuitemradio" : "menuitemcheckbox";
  const menuitem = useMenuItem({ ...props, role }, ref);
  return {
    "aria-checked": props.isChecked,
    isChecked: props.isChecked,
    ...menuitem,
  };
}

export type MenuItemOptionProps = Merge<BoxProps, MenuItemOptionOptions>;

export const MenuItemOption = React.forwardRef(function MenuItemRadio(
  props: MenuItemOptionProps,
  ref: React.Ref<any>,
) {
  const { isChecked, ...menuitemOption } = useMenuItemOption(props, ref);
  const styleProps = useMenuItemStyle();

  return (
    <Box
      as="button"
      type="button"
      display="flex"
      textDecoration="none"
      color="inherit"
      minHeight="32px"
      alignItems="center"
      textAlign="left"
      outline="none"
      px={4}
      {...styleProps}
      {...menuitemOption}
    >
      <Icon
        name="check"
        opacity={isChecked ? 1 : 0}
        color="currentColor"
        size="1em"
        mr="-4px"
        aria-hidden
        data-menuitem-icon=""
      />
      <Box textAlign="left" as="span" mx="1rem" flex="1">
        {props.children}
      </Box>
    </Box>
  );
});

type MenuOptionGroupProps = (UseCheckboxGroupOptions | UseRadioGroupOptions) & {
  type?: "radio" | "checkbox";
} & BoxProps;

export function MenuOptionGroup(props: MenuOptionGroupProps) {
  const radioGroup = useRadioGroup(props);
  const checkboxGroup = useCheckboxGroup(props);
  const { type, children, title, ...rest } = props;

  return (
    <MenuGroup title={title} {...rest}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return;

        if (type === "radio") {
          return React.cloneElement(child, {
            type: "radio",
            onClick: () => radioGroup.onChange(child.props.value),
            name: radioGroup.name,
            isChecked: child.props.value === radioGroup.value,
          });
        }

        if (type === "checkbox") {
          return React.cloneElement(child, {
            type: "checkbox",
            onClick: () => checkboxGroup.onChange(child.props.value),
            isChecked: checkboxGroup.value.includes(child.props.value),
          });
        }
      })}
    </MenuGroup>
  );
}
