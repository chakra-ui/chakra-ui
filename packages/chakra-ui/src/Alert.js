/** @jsx jsx */
import { jsx } from "@emotion/core";
import { oneOf } from "prop-types";
import CloseButton from "./CloseButton";
import Icon from "./Icon";
import { Absolute, Box, Flex } from "./Layout";
import Text from "./Text";

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
  const statusInfo = {
    info: { color: "blue", icon: "info" },
    warning: { color: "orange", icon: "warning-2" },
    success: { color: "green", icon: "check-circle" },
    danger: { color: "red", icon: "warning" }
  };
  const { icon: statusIcon, color: statusColor } = statusInfo[status];
  const colorProps = { bg: `${statusColor}.100`, color: `${statusColor}.500` };

  const variantProps = {
    subtle: { bg: colorProps.bg },
    outline: { borderWidth: 1 },
    card: { borderRadius: "md", boxShadow: "sm" }
  };

  const showLeftBorder = variant === "outline" || variant === "card";

  return (
    <Flex
      role="alert"
      p="12px 16px"
      position="relative"
      overflow="hidden"
      {...variantProps[variant]}
      {...rest}
    >
      {showLeftBorder && (
        <Absolute
          top="0"
          left="0"
          width="3px"
          height="100%"
          zIndex="1"
          bg={colorProps.color}
        />
      )}
      {showIcon && (
        <Icon
          size="1.25rem"
          name={icon || statusIcon}
          color={colorProps.color}
          mr={3}
        />
      )}
      <Box flex="1">
        {title && (
          <Text as="h2" fontWeight="semibold" lineHeight="none">
            {title}
          </Text>
        )}
        {children && <Box opacity="0.8">{children}</Box>}
      </Box>
      {isClosable && (
        <CloseButton
          position="absolute"
          top="12px"
          right="12px"
          size="md"
          onClick={onClose}
        />
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
  variant: oneOf(["subtle", "outline", "card"]),
  type: oneOf(["assertive", "polite"])
};

export default Alert;
