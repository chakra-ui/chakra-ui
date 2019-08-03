import { oneOf } from "prop-types";
import React from "react";
import Icon from "../Icon";
import Text from "../Text";
import Box from "../Box";
import Flex from "../Flex";

const StatLabel = props => (
  <Text fontWeight="medium" fontSize="sm" {...props} />
);

const StatHelpText = props => (
  <Text fontSize="sm" opacity="0.8" mb={2} {...props} />
);

const StatNumber = props => (
  <Text
    fontSize="2xl"
    verticalAlign="baseline"
    fontWeight="semibold"
    {...props}
  />
);

const arrowOptions = {
  increase: {
    name: "triangle-up",
    color: "green.400",
  },
  decrease: {
    name: "triangle-down",
    color: "red.400",
  },
};

const StatArrow = ({ type = "increase", "aria-label": ariaLabel, ...rest }) => (
  <Icon
    mr={1}
    size="14px"
    verticalAlign="middle"
    aria-label={ariaLabel}
    {...arrowOptions[type]}
    {...rest}
  />
);

StatArrow.propTypes = {
  type: oneOf(["increase", "decrease"]),
};

const Stat = props => <Box flex="1" pr={4} position="relative" {...props} />;

const StatGroup = props => (
  <Flex
    flexWrap="wrap"
    justifyContent="space-around"
    alignItems="flex-start"
    {...props}
  />
);

export { StatLabel, StatNumber, Stat, StatHelpText, StatArrow, StatGroup };
