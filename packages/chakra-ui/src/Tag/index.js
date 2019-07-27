/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "../Badge/styles";
import Icon from "../Icon";
import Box from "../Box";

let tabSize = "24px";

// const styleProps = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   transition: "0.2s",
//   "[data-tag-close-icon]": {
//     opacity: 0.5
//   },

//   "&:focus": {
//     boxShadow: "inset rgb(255, 86, 48) 0px 0px 0px 2px",
//     "> [data-tag-close-icon]": {
//       opacity: 1
//     }
//   },

//   "&:hover": {
//     background: "rgba(0, 0, 0, 0.04)",
//     "> [data-tag-close-icon]": {
//       opacity: 0.8
//     }
//   },

//   "&:active": {
//     background: "rgba(0, 0, 0, 0.14)",
//     "> [data-tag-close-icon]": {
//       opacity: 1
//     }
//   }
// };

const CloseButton = props => (
  <Box
    as="button"
    display="flex"
    justifyContent="center"
    alignItems="center"
    transition="0.2s"
    {...props}
  >
    <Icon size="8px" name="close" focusable="false" data-tag-close-icon="" />
  </Box>
);

const LeftElemWrapper = props => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    transition="0.2s"
    {...props}
  />
);

const Tag = ({
  appearance,
  size,
  variant = "subtle",
  color,
  isRound,
  leftElement,
  isClosable,
  onClose,
  isSelected,
  isInteractive,
  closeLabel,
  children,
  ...rest
}) => {
  const borderRadius = isRound ? "round" : rest.borderRadius || "sm";
  const tagStyleProps = useBadgeStyle({ color, variant });

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      minHeight={tabSize}
      borderRadius={borderRadius}
      lineHeight="1"
      maxWidth="100%"
      {...tagStyleProps}
      {...rest}
    >
      {leftElement && (
        <LeftElemWrapper mr="-8px" size={tabSize}>
          {leftElement}
        </LeftElemWrapper>
      )}
      <Box
        mx="8px"
        maxWidth="160px"
        overflow="hidden"
        wordBreak="truncate"
        p="2px 0px"
        as="span"
      >
        {children}
      </Box>
      {isClosable && (
        <CloseButton
          aria-label={closeLabel}
          ml="-6px"
          width="24px"
          alignSelf="stretch"
          borderRadius={borderRadius}
        />
      )}
    </Box>
  );
};

export default Tag;
