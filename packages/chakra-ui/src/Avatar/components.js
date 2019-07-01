/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Flex, Absolute } from "../Layout";

const MoreIndicator = ({ src, size, label, ...props }) => (
  <Flex
    bg="gray.200"
    color="gray.800"
    borderRadius="round"
    alignItems="center"
    justifyContent="center"
    border="2px"
    borderColor="#fff"
    size={size === "fill" ? "100%" : `avatar.${size}`}
    css={theme => ({
      fontSize: `calc(${theme.sizes.avatar[size]}/2.75)`
    })}
    {...props}
  >
    {label}
  </Flex>
);

const AvatarBadge = props => {
  return (
    <Absolute
      display="flex"
      alignItems="center"
      justifyContent="center"
      size="32%"
      bottom="4%"
      right="-4%"
      bg="white"
      border="2px"
      borderColor="white"
      borderRadius="round"
      {...props}
    />
  );
};

export { MoreIndicator, AvatarBadge };
