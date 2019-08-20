/** @jsx jsx */
import { jsx } from "@emotion/core";
import { statusColors } from "../Alert";
import useAlertStyle from "../Alert/styles";
import Box from "../Box";

const Callout = ({ status = "info", variant = "subtle", ...rest }) => {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statusColors[status],
    hasStripe: false,
  });

  return <Box {...alertStyleProps} {...rest} />;
};

export default Callout;
