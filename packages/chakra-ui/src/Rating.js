/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import { Box } from "./Layout";
import Icon from "./Icon";

const ratingSize = {
  bigger: 24,
  big: 18,
  regular: 16,
  small: 12,
  smaller: 10
};

const StarDiv = styled(Box)`
  transition: width, transform 0.3s;

  .star-first {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    color: ${props => props.emptyColor};
    user-select: none;
    opacity: ${props => (props.allowHalf ? 1 : 0)};

    [data-shape="half"] & {
      width: 50%;
    }

    [data-shape="almost-full"] & {
      width: 75%;
    }

    [data-shape="less-than-half"] & {
      width: 25%;
    }
  }

  [data-shape="full"] & {
    .star-first,
    .star-second {
      color: inherit;
    }
  }

  [data-shape="half"] &,
  [data-shape="almost-full"] &,
  [data-shape="less-than-half"] & {
    .star-first {
      color: inherit;
    }
  }

  .star-first,
  .star-second {
    color: ${props => props.emptyColor};
    transition: transform 0.3s ease-in-out, width 0.2s ease-in-out;
    user-select: none;
  }

  ${props =>
    !props.isReadOnly &&
    css`
      cursor: pointer;

      &:hover,
      &:focus {
        transform: scale(1.1);
      }

      &:focus {
        outline: 0 !important;
      }
    `}

  &:focus {
    outline: 0 !important;
  }
`;

export const Rate = ({
  shape = "half",
  allowHalf = true,
  size,
  isReadOnly,
  activeColor = "blue.500",
  emptyColor = "#e8e8e8",
  ...rest
}) => {
  return (
    <Box
      position="relative"
      display="inline-block"
      as="li"
      data-shape={shape}
      color={activeColor}
      {...rest}
    >
      <StarDiv
        role="radio"
        tabIndex="0"
        allowHalf={allowHalf}
        isReadOnly={isReadOnly}
        emptyColor={emptyColor}
      >
        <div className="star-first">
          <Icon
            name="star"
            style={{ width: ratingSize[size], height: ratingSize[size] }}
          />
        </div>
        <div className="star-second">
          <Icon
            name="star"
            style={{ width: ratingSize[size], height: ratingSize[size] }}
          />
        </div>
      </StarDiv>
    </Box>
  );
};

const determineIcon = (value, index) => {
  let currentIndex = index;
  let remainder = value - currentIndex;
  if (remainder >= 1) {
    return "full";
  } else if (remainder <= 0.5 && remainder > 0.4) {
    return "half";
  } else if (remainder > 0.5 && remainder < 1) {
    return "almost-full";
  } else if (remainder > 0 && remainder < 0.4) {
    return "less-than-half";
  } else {
    return "zero";
  }
};

const Rating = ({
  value = 3,
  size,
  onChange,
  spacing = 1,
  isReadOnly,
  activeColor = "blue.500",
  ...rest
}) => {
  const [rate, setRate] = React.useState(value);
  const [tempRate, setTempRate] = React.useState(0);
  const [useValue, setUseValue] = React.useState(true);
  let dummyArray = [...new Array(5)];

  React.useEffect(() => {
    setUseValue(true);
    setRate(value);
  }, [value]);

  const handleClick = index => {
    setRate(index + 1);
    setUseValue(true);
    onChange && onChange(index + 1);
  };

  const handleMouseOver = index => {
    setUseValue(false);
    setTempRate(index + 1);
  };

  const handleMouseLeave = () => {
    setUseValue(true);
    setTempRate(rate);
  };

  const handleKeyDown = e => {
    setUseValue(true);
    if (e.key === "ArrowRight") {
      setRate(rate + 0.5);
    } else if (e.key === "ArrowLeft") {
      setRate(rate - 0.5);
    } else if (e.key === "Enter") {
      onChange && onChange(rate);
    }
  };

  const determineShape = index => {
    if (useValue) {
      return determineIcon(rate, index);
    } else {
      return determineIcon(tempRate, index);
    }
  };

  return (
    <Box as="ul" onMouseLeave={handleMouseLeave} {...rest}>
      {dummyArray.map((_, index) => {
        let interactiveProps = {
          ...(!isReadOnly && {
            onClick: () => handleClick(index),
            onMouseEnter: () => handleMouseOver(index),
            onKeyDown: handleKeyDown
          })
        };

        return (
          <Rate
            key={index}
            size={size}
            isReadOnly={isReadOnly}
            activeColor={activeColor}
            shape={determineShape(index)}
            mr={index + 1 === dummyArray.length ? 0 : spacing}
            {...interactiveProps}
          />
        );
      })}
    </Box>
  );
};

export default Rating;
