/** @jsx jsx */
import { jsx } from "@emotion/core";
import ReachAlert from "@reach/alert";
import { oneOf } from "prop-types";
import Icon from "../Icon";
import Text from "../Text";
import useAlertStyle, { useIconStyle } from "./styles";
import { createContext, useContext } from "react";
import Box from "../Box";

const AlertTitle = props => <Text as="h2" fontWeight="bold" {...props} />;
const AlertBody = props => <Box {...props} />;
const AlertContext = createContext();

const statusIcons = {
  info: "info",
  warning: "warning-2",
  success: "check-circle",
  error: "warning"
};

const AlertIcon = props => {
  const { status, variant } = useContext(AlertContext);
  const iconStyleProps = useIconStyle({ variant, color: statusColors[status] });
  return (
    <Icon
      mt="2px"
      mr={3}
      size={6}
      name={statusIcons[status]}
      {...iconStyleProps}
      {...props}
    />
  );
};

const statusColors = {
  error: "red",
  warning: "orange",
  info: "blue",
  success: "green"
};

const Alert = ({ status, variant, ...rest }) => {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statusColors[status]
  });

  return (
    <AlertContext.Provider value={{ status, variant }}>
      <Box as={ReachAlert} position="relative" {...alertStyleProps} {...rest} />
    </AlertContext.Provider>
  );
};

Alert.defaultProps = {
  status: "info",
  variant: "subtle"
};

Alert.propTypes = {
  /**
   * The status of the alert
   */
  status: oneOf(["error", "success", "warning", "info"]),
  /**
   * The variant of the alert style to use.
   */
  variant: oneOf(["subtle", "solid", "left-accent", "top-accent", "card"])
};

export default Alert;
export { AlertTitle, AlertBody, AlertIcon };
