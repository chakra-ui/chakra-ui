/** @jsx jsx */
import { jsx } from "@emotion/core";
import ReachAlert from "@reach/alert";
import { oneOf } from "prop-types";
import { createContext, useContext } from "react";
import Box from "../Box";
import Icon from "../Icon";
import { generateStripe } from "../theme/colors-utils";
import useAlertStyle, { useIconStyle } from "./styles";

const AlertContext = createContext();

const Alert = ({ status = "info", variant = "subtle", hasStripe, ...rest }) => {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statusColors[status],
  });

  const stripeStyle = generateStripe({
    size: "8rem",
    color: "rgba(255, 255, 255, 0.05)",
  });

  const context = { status, variant };

  return (
    <AlertContext.Provider value={context}>
      <Box
        as={ReachAlert}
        css={hasStripe && stripeStyle}
        {...alertStyleProps}
        {...rest}
      />
    </AlertContext.Provider>
  );
};

Alert.propTypes = {
  /**
   * The status of the alert
   */
  status: oneOf(["error", "success", "warning", "info"]),
  /**
   * The variant of the alert style to use.
   */
  variant: oneOf(["subtle", "solid", "left-accent", "top-accent", "card"]),
};

const AlertTitle = props => (
  <Box fontWeight="bold" lineHeight="normal" {...props} />
);
const AlertDescription = props => <Box {...props} />;

const statusIcons = {
  info: "info",
  warning: "warning-2",
  success: "check-circle",
  error: "warning",
};

const statusColors = {
  error: "red",
  warning: "orange",
  info: "blue",
  success: "green",
};

const AlertIcon = props => {
  const context = useContext(AlertContext);
  if (context) {
    const { status, variant } = context;
    const iconStyleProps = useIconStyle({
      variant,
      color: statusColors[status],
    });
    return (
      <Icon
        mt="2px"
        mr={3}
        size={5}
        name={statusIcons[status]}
        {...iconStyleProps}
        {...props}
      />
    );
  }
  return null;
};

export default Alert;
export { AlertTitle, AlertDescription, AlertIcon };
