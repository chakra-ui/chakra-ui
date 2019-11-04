/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Children, cloneElement, forwardRef, isValidElement } from "react";
import * as StyledSystem from "styled-system";
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";
import { Icon, IconProps } from "../Icon";
import { Text } from "../Text";
import { Omit } from "../utils";

interface ListOptions {
  /**
   * The `list-style-type` of the list
   */
  styleType?: StyledSystem.ResponsiveValue<
    React.CSSProperties["listStyleType"]
  >;
  /**
   * The `list-style-position` of the list
   */
  stylePos?: StyledSystem.ResponsiveValue<
    React.CSSProperties["listStylePosition"]
  >;
  /**
   * The space between each list item
   */
  spacing?: SystemProps["marginBottom"];
}

type ListProps<T = HTMLElement> = ListOptions & BoxProps<{}, T>;

type ListIconProps = Omit<IconProps, "name"> & {
  icon: IconProps["name"] | React.ComponentType;
};

const List = forwardRef(function List<T extends HTMLElement>(
  {
    styleType = "none",
    stylePos = "inside",
    spacing,
    children,
    ...props
  }: ListProps<T>,
  ref: React.Ref<T>,
) {
  return (
    <Box
      ref={ref}
      as="ul"
      listStyleType={styleType}
      listStylePosition={stylePos}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return;

        const isLast = index + 1 === Children.count(children);
        if (isLast) {
          return child;
        }

        return cloneElement(
          child as React.ReactElement<ListProps<HTMLElement>>,
          { spacing },
        );
      })}
    </Box>
  );
}) as <T>(props: ListProps<T>) => React.ReactElement<ListProps<T>>;

export const ListItem = forwardRef(function ListItem<T extends HTMLElement>(
  { spacing, ...props }: ListProps<T>,
  ref: React.Ref<T>,
) {
  return <Box ref={ref} as="li" mb={spacing} {...props} />;
}) as <T>(props: ListProps<T>) => React.ReactElement<ListProps<T>>;

export const ListIcon = ({ icon, ...props }: ListIconProps) => {
  if (typeof icon === "string") {
    return <Icon name={icon} mr={2} {...props} />;
  }

  return (
    <Box
      as={icon}
      d="inline"
      focusable="false"
      size="1em"
      color="currentColor"
      mr={2}
      {...props}
    />
  );
};

export function DefaultList() {
  return (
    <Box mb={6}>
      <Text fontSize="sm" color="gray.600">
        .list-disc
      </Text>
      <List styleType="disc">
        <ListItem>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </Box>
  );
}

export function OrderedList() {
  return (
    <Box mb={6}>
      <Text fontSize="sm" color="gray.600">
        .list-decimal
      </Text>
      <List styleType="decimal">
        <ListItem>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </Box>
  );
}

export function UnstyledList() {
  return (
    <Box mb={6}>
      <Text fontSize="sm" color="gray.600">
        .list-none
      </Text>
      <List>
        <ListItem>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </Box>
  );
}

const SampleIcon = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" fill="#fed7d7" />
      <path
        fill="#f56565"
        d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"
      />
    </svg>
  );
};

export function UnstyledListWithIcon() {
  return (
    <Box mb={6}>
      <Text fontSize="sm" color="gray.600">
        .list-none
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon icon={SampleIcon} color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          <ListIcon icon="phone" color="green.500" />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon icon="email" color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    </Box>
  );
}

export default List;
