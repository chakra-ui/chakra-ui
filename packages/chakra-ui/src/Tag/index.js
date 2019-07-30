/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "../Badge/styles";
import Icon from "../Icon";
import Box from "../Box";
import Center from "../Center";
import PseudoBox from "../PseudoBox";
import { createContext, useContext } from "react";

const tagSizes = {
  sm: {
    minHeight: "20px",
    minWidth: "20px",
    fontSize: "sm",
    px: "8px"
  },
  md: {
    minHeight: "24px",
    minWidth: "24px",
    fontSize: "sm",
    px: "8px"
  },
  lg: {
    minHeight: "32px",
    minWidth: "32px",
    px: "12px"
  }
};

const TagContext = createContext();
const useTagContext = () => {
  return useContext(TagContext);
};

export const TagAddon = ({ placement, ...props }) => {
  const margin = { sm: "-4px", md: "-4px", lg: "-8px" };
  const sizes = { sm: "20px", md: "24px", lg: "24px" };
  const { size } = useTagContext();

  const _placement = {
    left: { ml: margin[size] },
    right: { mr: margin[size] }
  };

  return (
    <Center
      transition="all 0.2s"
      size={sizes[size]}
      {..._placement[placement]}
      {...props}
    />
  );
};

export const TagCloseButton = props => {
  const margin = { sm: "-8px", md: "-8px", lg: "-12px" };
  const { size } = useTagContext();

  return (
    <PseudoBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      as="button"
      transition="all 0.2s"
      mr={margin[size]}
      width={tagSizes[size]["minWidth"]}
      alignSelf="stretch"
      rounded="full"
      opacity="0.5"
      _focus={{
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)"
      }}
      _hover={{
        opacity: "0.8"
      }}
      _active={{
        opacity: "1"
      }}
      {...props}
    >
      <Icon size="18px" name="small-close" focusable="false" />
    </PseudoBox>
  );
};

export const TagLabel = props => {
  return (
    <Box
      maxWidth="160px"
      overflow="hidden"
      wordBreak="truncate"
      as="span"
      {...props}
    />
  );
};

const Tag = ({ variant = "subtle", size = "lg", color, ...rest }) => {
  const tagStyleProps = useBadgeStyle({ color, variant });
  const sizeProps = tagSizes[size];

  return (
    <TagContext.Provider value={{ size }}>
      <PseudoBox
        display="inline-flex"
        alignItems="center"
        minHeight="24px"
        maxWidth="100%"
        rounded="md"
        fontWeight="medium"
        {...sizeProps}
        {...tagStyleProps}
        {...rest}
      />
    </TagContext.Provider>
  );
};

export default Tag;
