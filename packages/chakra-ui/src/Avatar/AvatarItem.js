/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex } from "../Layout";
import Text from "../Text";
import Avatar from "./Avatar";

/* 
<AvatarItem avatar={<Avatar/>}>
  <Avatar/>
  <AvatarText>Chaki</AvatarText>
  <AvatarSubtext>chaki@me.com</AvatarSubtext>
</AvatarItem>
*/

const truncateStyle = css`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const parentTruncateStyle = css`
  max-width: 100%;
  min-width: 0;
`;

const AvatarText = props => {
  return <Text css={props.truncate && truncateStyle} {...props} />;
};

const AvatarSubtext = props => {
  return (
    <Text
      fontSize="0.85em"
      color="gray.500"
      css={props.truncate && truncateStyle}
      {...props}
    />
  );
};

const AvatarTextGroup = props => {
  return (
    <Box
      css={props.truncate && parentTruncateStyle}
      lineHeight="short"
      flex="1"
      pl={2}
      {...props}
    />
  );
};

const AvatarItem = props => {
  return (
    <Flex
      alignItems="center"
      p="4px"
      css={{ boxSizing: "content-box" }}
      {...props}
    />
  );
};

export default AvatarItem;
export { AvatarText, AvatarSubtext, AvatarTextGroup };
