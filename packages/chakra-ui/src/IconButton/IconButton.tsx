/** @jsx jsx */
import { Omit } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { Icons } from "../theme/theme";
import { Box } from "@chakra-ui/layout";
import { Button, ButtonProps } from "../Button";
import { Icon } from "../Icon";

type _ButtonProps<P, T> = Omit<
  ButtonProps<P, T>,
  | "loadingText"
  | "isFullWidth"
  | "leftIcon"
  | "rightIcon"
  | "iconSpacing"
  | "children"
>;

interface IconButtonOptions {
  /**
   * The icon to be used in the button.
   */
  icon?: Icons | React.ComponentType;
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean;
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string;
}

export type IconButtonProps<P, T> = IconButtonOptions & _ButtonProps<P, T>;

const IconButton = forwardRef(function IconButton<
  P,
  T extends HTMLButtonElement
>(
  { icon, isRound, "aria-label": ariaLabel, ...rest }: IconButtonProps<P, T>,
  ref: React.Ref<T>,
) {
  return (
    <Button
      p="0"
      ref={ref}
      {...rest}
      aria-label={ariaLabel}
      borderRadius={isRound ? "full" : "md"}
    >
      {typeof icon === "string" ? (
        <Icon name={icon} focusable="false" color="currentColor" aria-hidden />
      ) : (
        <Box as={icon} aria-hidden focusable="false" color="currentColor" />
      )}
    </Button>
  );
}) as <P, T>(
  props: IconButtonProps<P, T>,
) => React.ReactElement<IconButtonProps<P, T>>;

export function DefaultIconButtonExample() {
  return (
    <IconButton
      aria-label="Call us"
      icon="phone"
      color="green"
      variant="solid"
    />
  );
}

export function RoundedIconButtonExample() {
  return <IconButton aria-label="custom icon" isRound icon="phone" />;
}

export default IconButton;
