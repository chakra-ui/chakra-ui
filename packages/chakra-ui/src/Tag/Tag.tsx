/** @jsx jsx */
import { jsx } from "@emotion/core";
import useBadgeStyle from "../Badge/styles";
import { Icon, IconProps } from "../Icon";
import { Box, BoxProps, Stack } from "@chakra-ui/layout";
import { BadgeOptions } from "../Badge";
import { Omit, Merge } from "@chakra-ui/utils";
import { forwardRef } from "react";
import { Avatar } from "../Avatar";

type TagIconProps = Omit<IconProps, "name"> & {
  icon: IconProps["name"] | React.ComponentType;
};

export interface TagOptions {
  /**
   * The variant of the tag.
   */
  variant?: BadgeOptions["variant"];
  /**
   * The size of the tag.
   */
  size?: "sm" | "md" | "lg";
  /**
   * The color scheme of the tag.
   */
  variantColor?: BadgeOptions["variantColor"];
}

export type TagProps = Merge<BoxProps, TagOptions>;

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

export const TagCloseButton = forwardRef(function TagCloseButton(
  props: BoxProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <Box
      ref={ref}
      as="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s"
      rounded="full"
      size="1.25rem"
      outline="none"
      mr={-1}
      opacity={0.5}
      _focus={{
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      }}
      _hover={{
        opacity: 0.8,
      }}
      _active={{
        opacity: 1,
      }}
      {...props}
    >
      <Icon size="18px" name="small-close" focusable="false" />
    </Box>
  );
}) as (props: BoxProps) => React.ReactElement<BoxProps>;

export const TagIcon = forwardRef(function TagIcon(
  props: TagIconProps,
  ref: React.Ref<HTMLOrSVGElement>,
) {
  if (typeof props.icon === "string") {
    return (
      <Icon
        name={props.icon}
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
      ref={ref}
      as={props.icon}
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
}) as (props: TagIconProps) => React.ReactElement<TagIconProps>;

export const TagLabel = forwardRef(function TagLabel<P, T extends HTMLElement>(
  props: BoxProps<P, T>,
  ref: React.Ref<T>,
) {
  return <Box ref={ref} isTruncated lineHeight="1.2" as="span" {...props} />;
}) as <P, T>(props: BoxProps<P, T>) => React.ReactElement<BoxProps<P, T>>;

const Tag = forwardRef(function Tag(
  { variant = "subtle", size = "lg", variantColor = "gray", ...rest }: TagProps,
  ref: React.Ref<HTMLElement>,
) {
  const styleProps = useBadgeStyle({ color: variantColor, variant });
  const sizeProps = tagSizes[size];

  return (
    <Box
      ref={ref}
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
}) as (props: TagProps) => React.ReactElement<TagProps>;

export function DefaultTag() {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} variantColor="gray">
          Gray
        </Tag>
      ))}
    </Stack>
  );
}

export function TagWithLeftIcon() {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} variantColor="cyan">
          <TagIcon icon="add" size="12px" />
          <TagLabel>Green</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
}

export function TagWithRightIcon() {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} variantColor="cyan">
          <TagLabel>Green</TagLabel>
          <TagIcon icon="check" size="12px" />
        </Tag>
      ))}
    </Stack>
  );
}

export function TagWithCloseButton() {
  return (
    <Stack spacing={4} isInline>
      {["sm", "md", "lg"].map(size => (
        <Tag size={size} rounded="full" variant="solid" variantColor="cyan">
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </Stack>
  );
}

export function TagWithCustomElement() {
  return (
    <Tag variantColor="red" rounded="full">
      <Avatar
        src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
        size="xs"
        name="Segun Adebayo"
        ml={-1}
        mr={2}
      />
      <TagLabel>Segun</TagLabel>
    </Tag>
  );
}

export default Tag;
