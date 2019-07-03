/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Icon from "../Icon";
import { Box } from "../Layout";
import useBadgeStyle from "../Badge/BadgeStyle";

let tabSize = "32px";

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  [data-tag-close-icon] {
    opacity: 0.5;
    transition: 0.2s;
  }

  &:focus {
    box-shadow: rgb(255, 86, 48) 0px 0px 0px 2px;
    > [data-tag-close-icon] {
      opacity: 1;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    > [data-tag-close-icon] {
      opacity: 0.8;
    }
  }

  :active {
    background: rgba(0, 0, 0, 0.14);
    > [data-tag-close-icon] {
      opacity: 1;
    }
  }
`;

const style2 = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
`;

const CloseButton = props => {
  return (
    <Box as="button" css={style} {...props}>
      <Icon size="8px" name="close" focusable="false" data-tag-close-icon="" />
    </Box>
  );
};

const textStyle = css`
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px 0px;
`;

const LeftElemWrapper = props => {
  return <Box css={style2} {...props} />;
};

const Tag = props => {
  const {
    appearance,
    size,
    color,
    isRound,
    leftElement,
    isClosable,
    onClose,
    isSelected,
    isInteractive,
    closeIconLabel,
    children,
    ...rest
  } = props;

  const borderRadius = isRound ? "round" : rest.borderRadius || "sm";
  const tagStyle = useBadgeStyle({ ...props, variant: "subtle" });

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      minHeight={tabSize}
      borderRadius={borderRadius}
      lineHeight="1"
      css={tagStyle}
      maxWidth="100%"
      {...rest}
    >
      {leftElement && (
        <LeftElemWrapper mr="-8px" size={tabSize} icon="phone">
          {leftElement}
        </LeftElemWrapper>
      )}
      <Box mx="8px" css={textStyle} as="span">
        {children}
      </Box>
      {isClosable && (
        <CloseButton
          aria-label={closeIconLabel || `Remove ${children}`}
          ml="-6px"
          size={tabSize}
          borderRadius={borderRadius}
        />
      )}
    </Box>
  );
};

export default Tag;
