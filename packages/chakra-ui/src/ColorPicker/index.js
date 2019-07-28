/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Children, cloneElement, useState, forwardRef } from "react";
import { SketchPicker } from "react-color";
import Icon from "../Icon";
import Input from "../Input";
import { useUIMode } from "../ThemeProvider";
import Color from "color";
import Flex from "../Flex";
import Box from "../Box";

const GradientSwatch = ({ gradient, angle, startColor, endColor, ...rest }) => {
  const _gradient =
    gradient || `linear-gradient(${angle}, ${startColor}, ${endColor})`;

  return <ColorSwatch gradient={_gradient} {...rest} />;
};

const transparencyBgImage = `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)`;

const ColorSwatch = forwardRef(
  ({ isRound, color, gradient, children, isSelected, ...rest }, ref) => {
    let _borderRadius = isRound ? "round" : "sm";
    return (
      <Flex
        as="button"
        size="24px"
        flex="0 0 auto"
        alignItems="center"
        backgroundImage={transparencyBgImage}
        backgroundRepeat="repeat"
        justifyContent="center"
        position="relative"
        ref={ref}
        borderRadius={_borderRadius}
        {...rest}
      >
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          alignItems="center"
          justifyContent="center"
          size="100%"
          bg={color}
          backgroundImage={gradient}
          borderRadius={_borderRadius}
        >
          {isSelected && <Icon name="check" color="#fff" />}
        </Flex>
      </Flex>
    );
  }
);

//////////////////////////////////////////////////////////////////

export const ColorItem = forwardRef(
  ({ isRound, color, isSelected, onClick, ...rest }, ref) => {
    const customStyle = theme => ({
      "& + &": {
        marginLeft: 12,
        marginBottom: 12
      },
      "&:focus": {
        outline: `2px solid ${theme.colors.blue["500"]}`,
        outlineOffset: 2
      }
    });

    return (
      <ColorSwatch
        ref={ref}
        color={color}
        isRound={isRound}
        isSelected={isSelected}
        onClick={onClick}
        tabIndex={isSelected ? 0 : -1}
        css={customStyle}
        {...rest}
      />
    );
  }
);

//////////////////////////////////////////////////////////////////

const ColorList = ({
  children,
  selectedColor: selectedColorProp,
  onChange,
  isRound,
  ...rest
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedColor, setSelectedColor] = useState(selectedColorProp);
  const colorNodes = [];

  const clones = Children.map(children, (child, index) => {
    let isSelected = child.props.color === selectedColor;
    if (child.type !== ColorItem) return child;
    return cloneElement(child, {
      isSelected,
      isRound,
      ref: node => colorNodes.push(node),
      onClick: () => {
        setSelectedColor(child.props.color);
        setSelectedIndex(index);
        onChange && onChange(child.props.color);
      },
      onFocus: () => setSelectedIndex(index)
    });
  });

  const handleKeyDown = event => {
    let nextIndex;
    switch (event.key) {
      case "ArrowLeft":
        nextIndex = selectedIndex - 1;
        if (nextIndex >= 0) {
          setSelectedIndex(nextIndex);
          colorNodes[nextIndex].focus();
        }
        break;
      case "ArrowRight":
        nextIndex = selectedIndex + 1;
        if (nextIndex < Children.count(children)) {
          setSelectedIndex(nextIndex);
          colorNodes[nextIndex].focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <Flex flexWrap="wrap" onKeyDown={handleKeyDown} {...rest}>
      {clones}
    </Flex>
  );
};

//////////////////////////////////////////////////////////////////

const customCSS = ({ theme, mode }) => {
  const { gray, alpha, blue } = theme.colors;

  const color = { light: gray[800], dark: alpha[800] };
  const borderColor = { light: gray[200], dark: alpha[200] };
  const backgroundColor = { light: "#fff", dark: alpha[50] };
  const hoverBorderColor = { light: gray[300], dark: alpha[300] };
  const focusBorderColor = blue[500];

  return css`
    box-shadow: none !important;
    padding: 0 !important;
    background-color: transparent !important;

    input {
      width: 100% !important;
      transition: all 0.3s;
      border-radius: 2px;
      box-shadow: none !important;
      background-color: ${backgroundColor[mode]} !important;
      border-width: 1px !important;
      border-style: solid !important;
      color: ${color[mode]} !important;
      border-color: ${borderColor[mode]} !important;

      &:hover {
        border-color: ${hoverBorderColor[mode]} !important;
      }

      &:focus {
        border-color: ${focusBorderColor} !important;
        box-shadow: 0 0 0 1px ${focusBorderColor} !important;
      }

      + span {
        color: inherit !important;
        font-weight: ${theme.fontWeights.medium};
      }
    }
  `;
};

const ColorPicker = ({
  selectedColor,
  onChanging,
  onChange,
  presetColors = []
}) => {
  const { mode } = useUIMode();

  return (
    <SketchPicker
      color={selectedColor}
      onChange={onChanging}
      onChangeComplete={onChange}
      presetColors={presetColors}
      css={theme => customCSS({ theme, mode })}
    />
  );
};

//////////////////////////////////////////////////////////////////

const formatColor = color => {
  let _color = color;

  if (_color.startsWith("rgb")) {
    _color = Color(_color).hex();
  }

  if (_color.startsWith("#")) {
    _color = _color.slice(1, _color.length);
  }
  return _color;
};

const ColorInput = ({ value: valueProp, onChange }) => {
  const [value, setValue] = useState(() => {
    return valueProp ? formatColor(valueProp) : "fff";
  });

  const handleChange = event => {
    const _value = formatColor(event.target.value);
    onChange && onChange(_value);
    setValue(_value);
  };

  return (
    <Input as="div" maxWidth="140px">
      <ColorSwatch size="16px" color={value ? `#${value}` : "#fff"} />
      <Box pl={3} pr={1} color="gray.500" children="#" />
      <input
        css={{
          width: "100%",
          background: "transparent",
          textTransform: "uppercase"
        }}
        maxLength={8}
        value={value}
        onChange={handleChange}
      />
    </Input>
  );
};

export { ColorInput, ColorPicker, ColorList, ColorSwatch, GradientSwatch };
