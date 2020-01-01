import * as React from "react";
import {
  createChakra,
  forwardRef,
  CreateChakraComponent,
  PropsOf,
} from "@chakra-ui/system";

const BaseLink = createChakra("a", { themeKey: "Link" });

export interface LinkOptions {
  /**
   *  If `true`, the link will open in new tab
   */
  isExternal?: boolean;
  /**
   * If `true`, the link will be disabled and not tabbable
   */
  isDisabled?: boolean;
}

export type LinkProps = PropsOf<typeof BaseLink> & LinkOptions;

const Link = forwardRef((props: LinkProps, ref: React.Ref<any>) => {
  const { isDisabled, isExternal, onClick, ...rest } = props;

  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : null;

  return (
    <BaseLink
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      aria-disabled={isDisabled}
      onClick={isDisabled ? event => event.preventDefault() : onClick}
      {...externalProps}
      {...rest}
    />
  );
}) as CreateChakraComponent<"a", LinkOptions>;

Link.displayName = "Link";

export default Link;
