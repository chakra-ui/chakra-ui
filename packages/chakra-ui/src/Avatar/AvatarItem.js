/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, Flex } from "../Layout";
import Text from "../Text";

const AvatarText = props => (
  <Text fontWeight="semibold" wordBreak="truncate" {...props} />
);

const AvatarSubtext = props => (
  <Text fontSize="0.85em" color="gray.500" wordBreak="truncate" {...props} />
);

const AvatarContent = props => (
  <Box
    maxWidth="full"
    minWidth="0"
    lineHeight="short"
    flex="1"
    pl={2}
    {...props}
  />
);

const AvatarItem = props => (
  <Flex
    alignItems="center"
    p="4px"
    css={{ boxSizing: "content-box" }}
    {...props}
  />
);

export default AvatarItem;
export { AvatarText, AvatarSubtext, AvatarContent };
