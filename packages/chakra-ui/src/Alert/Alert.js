/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import CloseButton from "../CloseButton";
import Icon from "../Icon";
import { Box, Flex } from "../Layout";
import Text from "../Text";
import useAlertStyle from "./AlertStyle";

const AlertTitle = props => {
  return <Text data-alert-title="" as="h2" fontWeight="semibold" {...props} />;
};

const AlertBody = props => {
  return <Box data-alert-body="" opacity="0.8" {...props} />;
};

const AlertIcon = ({ icon, status, ...rest }) => {
  const statusIcons = {
    info: "info",
    warning: "warning-2",
    success: "check-circle",
    error: "warning"
  };

  const _icon = icon || statusIcons[status];
  return (
    <Icon
      data-alert-icon=""
      size="1.285rem"
      mt="2px"
      name={_icon}
      mr={3}
      {...rest}
    />
  );
};

const Alert = ({
  icon,
  showIcon = true,
  status,
  variant,
  isClosable,
  onClose,
  title,
  children,
  ...rest
}) => {
  const style = useAlertStyle({ variant, status });

  return (
    <Flex role="alert" css={style} {...rest}>
      {showIcon && <AlertIcon status={status} icon={icon} />}
      <Box flex="1">
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertBody opacity="0.8">{children}</AlertBody>}
      </Box>
      {isClosable && (
        <CloseButton size="md" onClick={onClose} mr="-1.15rem" mt="4px" />
      )}
    </Flex>
  );
};

Alert.defaultProps = {
  status: "info",
  variant: "subtle"
};

Alert.propTypes = {
  status: oneOf(["error", "success", "warning", "info"]),
  variant: oneOf(["subtle", "solid", "left-accent", "top-accent", "card"])
};

export default Alert;
