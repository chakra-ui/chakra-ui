/** @jsx jsx */
import { jsx } from "@emotion/core";
import { statuses } from "../Alert";
import useAlertStyle from "../Alert/styles";
import Box from "../Box";

const Callout = ({ status = "info", variant = "subtle", ...rest }) => {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statuses[status] && statuses[status]["color"],
  });

  return <Box {...alertStyleProps} {...rest} />;
};

export default Callout;
