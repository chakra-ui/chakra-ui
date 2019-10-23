import { Box, BoxProps } from "../Box";
import * as React from "react";
import { Omit } from "@chakra-ui/utils";

// TODO: Move this to theme object
// Under theme.components.Link = {root: "", variants: ""}

const baseStyleProps = {
  transition: `all 0.15s ease-out`,
  cursor: "pointer",
  textDecoration: "none",
  outline: "none",
  _focus: {
    boxShadow: "outline",
  },
  _disabled: {
    opacity: "0.4",
    cursor: "not-allowed",
    textDecoration: "none",
  },
};

interface LinkOptions {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean;
  /**
   * If `true`, the link will be disabled and not tabbable
   */
  isDisabled?: boolean;
  /**
   * Action to perform when clicked
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type LinkHTMLProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
>;

type LinkProps<P> = BoxProps<P, HTMLAnchorElement> &
  LinkOptions &
  LinkHTMLProps;

const Link = React.forwardRef(function Link<P>(
  { isExternal, isDisabled, onClick, ...props }: LinkProps<P>,
  ref: React.Ref<HTMLAnchorElement>,
) {
  const externalProps: { target: string; rel: string } | null = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : null;

  return (
    <Box
      as="a"
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      onClick={
        isDisabled
          ? (event: React.MouseEvent) => event.preventDefault()
          : onClick
      }
      _hover={{ textDecoration: "underline" }}
      {...externalProps}
      {...baseStyleProps}
      {...props}
    />
  );
}) as <P>(props: LinkProps<P>) => React.ReactElement<LinkProps<P>>;

export default Link;
