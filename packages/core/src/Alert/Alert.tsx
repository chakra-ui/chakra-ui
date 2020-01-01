import * as React from "react";
import { Icon, IconProps } from "../Icon";
import {
  createChakra,
  PropsOf,
  forwardRef,
  useColorMode,
} from "@chakra-ui/system";

export const statuses = {
  info: { icon: "info", color: "blue" },
  warning: { icon: "warning-2", color: "orange" },
  success: { icon: "check-circle", color: "green" },
  error: { icon: "warning", color: "red" },
};

const AlertContext = React.createContext<AlertContextValue>({
  status: "success",
  variant: "solid",
});

const useAlertContext = () => React.useContext(AlertContext);

type AlertContextValue = Required<AlertOptions>;

export interface AlertOptions {
  /**
   * The status of the alert
   */
  status?: keyof typeof statuses;
  /**
   * The variant of the alert style to use.
   */
  variant?: "subtle" | "solid" | "left-accent" | "top-accent";
}

export type AlertProps = PropsOf<typeof AlertRoot> & AlertOptions;

const AlertRoot = createChakra("div", { themeKey: "Alert" });

const Alert = forwardRef((props: AlertProps, ref: React.Ref<any>) => {
  const { status = "info", variant = "subtle", ...rest } = props;
  const variantColor = statuses[status]["color"];

  const context = { status, variant };
  return (
    <AlertContext.Provider value={context}>
      <AlertRoot
        ref={ref}
        role="alert"
        variant={variant}
        {...rest}
        variantColor={variantColor}
      />
    </AlertContext.Provider>
  );
});

const AlertTitle = createChakra("div");
AlertTitle.defaultProps = {
  fontWeight: "bold",
  lineHeight: "normal",
};

const AlertDescription = createChakra("div");

const AlertIcon = (props: IconProps) => {
  const [colorMode] = useColorMode();
  const { status, variant } = useAlertContext();
  const { icon, color } = statuses[status];

  let style = {};

  if (["left-accent", "top-accent", "subtle"].includes(variant)) {
    style = {
      light: { color: `${color}.500` },
      dark: { color: `${color}.200` },
    };
  }

  //@ts-ignore
  const iconStyleProps = style[colorMode];

  return (
    <Icon mt={1} mr={3} size={5} name={icon} {...iconStyleProps} {...props} />
  );
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
