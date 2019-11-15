/** @jsx jsx */
import { Omit, Merge } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { BoxProps } from "@chakra-ui/layout";
import { Button, ButtonIcon, IconType, ButtonOptions } from "../Button";

type ModifiedButtonOptions = Omit<
  ButtonOptions,
  | "loadingText"
  | "isFullWidth"
  | "leftIcon"
  | "rightIcon"
  | "iconSpacing"
  | "children"
>;

interface IconButtonOptions extends ModifiedButtonOptions {
  /**
   * The icon to be used in the button.
   */
  icon: IconType;
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean;
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string;
}

export type IconButtonProps<P, T> = Merge<BoxProps<P, T>, IconButtonOptions>;

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
      aria-label={ariaLabel}
      borderRadius={isRound ? "full" : "md"}
      {...rest}
    >
      <ButtonIcon icon={icon} />
    </Button>
  );
});

//@ts-ignore
IconButton.defaultProps = {
  variant: "solid",
  size: "md",
  type: "button",
  variantColor: "gray",
};

export default IconButton;
