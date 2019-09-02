/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "../Badge/styles";
import Icon from "../Icon";
import Box from "../Box";
import PseudoBox from "../PseudoBox";

const tagSizes = {
  sm: {
    minH: 6,
    minW: 6,
    fontSize: "sm",
    px: 2,
  },
  md: {
    minH: "1.75rem",
    minW: "1.75rem",
    fontSize: "sm",
    px: 2,
  },
  lg: {
    minH: 8,
    minW: 8,
    px: 3,
  },
};

export const TagCloseButton = props => (
  <PseudoBox
    as="button"
    display="flex"
    alignItems="center"
    justifyContent="center"
    transition="all 0.2s"
    rounded="full"
    size="1.25rem"
    mr={-1}
    opacity="0.5"
    _focus={{
      boxShadow: "outline",
      bg: "rgba(0, 0, 0, 0.14)",
    }}
    _hover={{
      opacity: "0.8",
    }}
    _active={{
      opacity: "1",
    }}
    {...props}
  >
    <Icon size="18px" name="small-close" focusable="false" />
  </PseudoBox>
);

export const TagIcon = ({ icon, ...props }) => {
  if (typeof icon === "string") {
    return (
      <Icon
        name={icon}
        mx="0.5rem"
        css={{
          "&:first-child": { marginLeft: 0 },
          "&:last-child": { marginRight: 0 },
        }}
        {...props}
      />
    );
  }

  return (
    <Box
      as={icon}
      focusable="false"
      color="currentColor"
      mx="0.5rem"
      css={{
        "&:first-child": { marginLeft: 0 },
        "&:last-child": { marginRight: 0 },
      }}
      {...props}
    />
  );
};

export const TagLabel = props => (
  <Box isTruncated lineHeight="1.2" as="span" {...props} />
);

const Tag = ({
  variant = "subtle",
  size = "lg",
  variantColor = "gray",
  ...rest
}) => {
  const styleProps = useBadgeStyle({ color: variantColor, variant });
  const sizeProps = tagSizes[size];

  return (
    <PseudoBox
      display="inline-flex"
      alignItems="center"
      minH={6}
      maxW="100%"
      rounded="md"
      fontWeight="medium"
      {...sizeProps}
      {...styleProps}
      {...rest}
    />
  );
};

export default Tag;
