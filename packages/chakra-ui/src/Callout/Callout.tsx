/** @jsx jsx */
import { jsx } from "@emotion/core";
import { statuses, AlertOptions } from "../Alert";
import useAlertStyle from "../Alert/styles";
import { Box, BoxProps } from "../Box";
import { forwardRef } from "react";

interface CalloutOptions {
  /**
   * The status of the callout
   */
  status?: AlertOptions["status"];
  /**
   * The variant of the callout
   */
  variant?: AlertOptions["variant"];
}

type CalloutProps<P, T> = BoxProps<P, T> & CalloutOptions;

const Callout = forwardRef(function Callout<P, T extends HTMLElement>(
  { status = "info", variant = "subtle", ...rest }: CalloutProps<P, T>,
  ref: React.Ref<T>,
) {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statuses[status] && statuses[status]["color"],
  });

  return <Box ref={ref} {...alertStyleProps} {...rest} />;
}) as <P, T>(
  props: CalloutProps<P, T>,
) => React.ReactElement<CalloutProps<P, T>>;

export default Callout;
