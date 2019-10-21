/** @jsx jsx */
import { jsx } from "@emotion/core";
import { createContext, useContext } from "react";
import { Box, BoxProps } from "../Box";
import { Icon, IconProps } from "../Icon";
import useAlertStyle, { useAlertIconStyle } from "./styles";
import { Icons, Theme } from "../theme";

type Status = { icon: Icons; color: keyof Theme["colors"] };

interface Statuses {
  info: Status;
  warning: Status;
  success: Status;
  error: Status;
}

export const statuses: Statuses = {
  info: { icon: "info", color: "blue" },
  warning: { icon: "warning-2", color: "orange" },
  success: { icon: "check-circle", color: "green" },
  error: { icon: "warning", color: "red" },
};

// export type AlertContextType = { status?: string; variant?: string };

const AlertContext = createContext<AlertContextValue>({
  status: "success",
  variant: "solid",
});
const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext must be used within a AlertContextProvider",
    );
  }
  return context;
};

type AlertContextValue = Required<AlertOptions>;

export interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: "error" | "success" | "warning" | "info";
  /**
   * The variant of the alert style to use.
   */
  variant?: "subtle" | "solid" | "left-accent" | "top-accent";
}

export type AlertProps<P> = BoxProps<P> & AlertOptions;

function Alert<P>({
  status = "info",
  variant = "subtle",
  ...rest
}: AlertProps<P>) {
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
}

function AlertTitle<P>(props: BoxProps<P>) {
  return <Box fontWeight="bold" lineHeight="normal" {...props} />;
}

function AlertDescription<P>(props: BoxProps<P>) {
  return <Box {...props} />;
}

const AlertIcon = (props: IconProps) => {
  const { status, variant } = useAlertContext();
  const iconStyleProps = useAlertIconStyle({
    variant: variant,
    color: statuses[status] && statuses[status]["color"],
  });

  let iconName: Icons | undefined;
  if (statuses[status] && statuses[status]["icon"]) {
    iconName = statuses[status]["icon"];
  }

  return (
    <Icon
      mt={1}
      mr={3}
      size={5}
      name={iconName}
      {...iconStyleProps}
      {...props}
    />
  );
};

export function AlertExample() {
  return (
    <Alert status="error" variant="solid" justifyContent="center">
      <AlertIcon name="phone" />
      <AlertTitle display="inline-block" mr={2}>
        Your browser is outdated!
      </AlertTitle>
      <AlertDescription display="inline-block">
        Your Chakra experience may be degraded.
      </AlertDescription>
    </Alert>
  );
}

export { Alert, AlertTitle, AlertDescription, AlertIcon };
