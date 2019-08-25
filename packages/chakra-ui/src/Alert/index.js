/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext } from "react";
import Box from "../Box";
import Icon from "../Icon";
import useAlertStyle, { useAlertIconStyle } from "./styles";

export const statuses = {
  info: { icon: "info", color: "blue" },
  warning: { icon: "warning-2", color: "orange" },
  success: { icon: "check-circle", color: "green" },
  error: { icon: "warning", color: "red" },
};

const AlertContext = createContext();
const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within a AlertContextProvider",
    );
  }
  return context;
};

const Alert = ({ status = "info", variant = "subtle", ...rest }) => {
  const alertStyleProps = useAlertStyle({
    variant,
    color: statuses[status] && statuses[status]["color"],
  });

  const context = { status, variant };

  return (
    <AlertContext.Provider value={context}>
      <Box role="alert" {...alertStyleProps} {...rest} />
    </AlertContext.Provider>
  );
};

const AlertTitle = props => (
  <Box fontWeight="bold" lineHeight="normal" {...props} />
);
const AlertDescription = props => <Box {...props} />;

const AlertIcon = props => {
  const { status, variant } = useAlertContext();
  const iconStyleProps = useAlertIconStyle({
    variant,
    color: statuses[status] && statuses[status]["color"],
  });

  return (
    <Icon
      mt={1}
      mr={3}
      size={5}
      name={statuses[status] && statuses[status]["icon"]}
      {...iconStyleProps}
      {...props}
    />
  );
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
