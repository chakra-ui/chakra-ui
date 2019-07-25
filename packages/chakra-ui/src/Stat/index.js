import { oneOf } from "prop-types";
import React, { Children, cloneElement } from "react";
import Icon from "../Icon";
import { Box, Flex } from "../Layout";
import Text from "../Text";

const StatLabel = ({ size, ...rest }) => (
  <Text
    fontWeight="medium"
    fontSize={size === "small" ? "xs" : "sm"}
    {...rest}
  />
);

const StatHelpText = props => (
  <Text fontSize="sm" color="gray.600" mb={2} {...props} />
);

const StatNumber = ({ size, ...rest }) => (
  <Text
    fontSize={size === "small" ? "xl" : "2xl"}
    verticalAlign="baseline"
    fontWeight="semibold"
    color="gray.800"
    {...rest}
  />
);

let arrowOptions = {
  increase: {
    name: "triangle-up",
    color: "green.400"
  },
  decrease: {
    name: "triangle-down",
    color: "red.400"
  }
};

const StatChangeArrow = ({ type = "increase", "aria-label": ariaLabel }) => (
  <Icon
    mr={1}
    size="14px"
    verticalAlign="middle"
    aria-label={ariaLabel}
    {...arrowOptions[type]}
  />
);

StatChangeArrow.propTypes = {
  type: oneOf(["increase", "decrease"])
};

const StatItem = ({ size, children, ...rest }) => (
  <Box flex="1 1 180px" pr={4} position="relative" {...rest}>
    {Children.map(children, child => {
      if (![StatNumber, StatLabel].includes(child.type)) return child;
      return cloneElement(child, { size });
    })}
  </Box>
);

const StatGroup = props => (
  <Flex
    flexWrap="wrap"
    justifyContent="space-around"
    alignItems="flex-start"
    pt={3}
    pl={2}
    {...props}
  />
);

export {
  StatLabel,
  StatNumber,
  StatItem,
  StatHelpText,
  StatChangeArrow,
  StatGroup
};
