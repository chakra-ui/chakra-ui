/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Box, Flex } from "../Layout";
import Text from "../Text";

const AvatarText = props => (
  <Text wordBreak={props.truncate ? "truncate" : undefined} {...props} />
);

const AvatarSubtext = props => (
  <Text
    fontSize="0.85em"
    color="gray.500"
    wordBreak={props.truncate ? "truncate" : undefined}
    {...props}
  />
);

const AvatarTextGroup = props => (
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
export { AvatarText, AvatarSubtext, AvatarTextGroup };
