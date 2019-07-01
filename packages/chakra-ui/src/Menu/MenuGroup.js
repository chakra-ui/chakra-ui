/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box } from "../Layout";
import Text from "../Text";

export const MenuGroup = ({ children, title, ...rest }) => (
  <Box role="presentation">
    {title && (
      <Text mx={4} my={2} fontWeight="semibold" {...rest}>
        {title}
      </Text>
    )}
    {children}
  </Box>
);
