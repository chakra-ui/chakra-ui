/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import { createContext, useContext } from "react";
import Box from "../Box";
import Icon from "../Icon";
import useAlertStyle, { useIconStyle } from "./styles";

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

const AlertContext = createContext();
const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within a AlertContext.Provider",
    );
  }
  return context;
};

const Alert = ({ status = "info", variant = "subtle", hasStripe, ...rest }) => {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statusColors[status],
    hasStripe,
  });

  const context = { status, variant };

  return (
    <AlertContext.Provider value={context}>
      <Box role="alert" {...alertStyleProps} {...rest} />
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

const AlertIcon = props => {
  const { status, variant } = useAlertContext();
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
};

export default Alert;
export { AlertTitle, AlertDescription, AlertIcon };
