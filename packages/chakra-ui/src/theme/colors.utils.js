import Color from "color";

export const get = (color, hue) => `${color}.${hue}`;

export const addOpacity = (color, opacity) =>
  Color(color)
    .fade(1 - opacity)
    .rgb()
    .string();

export const addWhite = (color, opacity) => {
  return Color(color)
    .mix(Color("#fff"), opacity)
    .hex();
};

export const addBlack = (color, opacity) =>
  Color(color)
    .mix(Color("#000"), opacity)
    .hex();

export const isDarkColor = color => Color(color).isDark();

export const generateAlphaColors = color => ({
  900: addOpacity(color, 0.92),
  800: addOpacity(color, 0.8),
  700: addOpacity(color, 0.6),
  600: addOpacity(color, 0.48),
  500: addOpacity(color, 0.38),
  400: addOpacity(color, 0.24),
  300: addOpacity(color, 0.16),
  200: addOpacity(color, 0.12),
  100: addOpacity(color, 0.08),
  50: addOpacity(color, 0.04)
});

export const colorEmphasis = (color, emphasis) => {
  switch (emphasis) {
    case "high":
      return color;
    case "medium":
      return generateAlphaColors(color)[700];
    case "low":
      return generateAlphaColors(color)[500];
    case "lowest":
      return generateAlphaColors(color)[300];
    default:
      return;
  }
};

export const generateDarkElevation = color => {
  let _baseDark = color || "#121212";

  let _shadowColors = [
    `rgba(0,0,0,0.14)`,
    `rgba(0,0,0,0.12)`,
    `rgba(0,0,0,0.20)`
  ];

  return {
    50: {
      backgroundColor: _baseDark
    },
    100: {
      backgroundColor: addWhite(_baseDark, 0.05),
      boxShadow: `0 1px 1px 0 ${_shadowColors[0]}, 0 2px 1px -1px ${
        _shadowColors[1]
      }, 0 1px 3px 0 ${_shadowColors[2]}`
    },
    200: {
      backgroundColor: addWhite(_baseDark, 0.07),
      boxShadow: `0 2px 2px 0 ${_shadowColors[0]}, 0 3px 1px -2px ${
        _shadowColors[1]
      }, 0 1px 5px 0 ${_shadowColors[2]}`
    },
    300: {
      backgroundColor: addWhite(_baseDark, 0.08),
      boxShadow: `0 3px 4px 0 ${_shadowColors[0]}, 0 3px 3px -2px ${
        _shadowColors[1]
      }, 0 1px 8px 0 ${_shadowColors[2]}`
    },
    400: {
      backgroundColor: addWhite(_baseDark, 0.09),
      boxShadow: `0 4px 5px 0 ${_shadowColors[0]}, 0 1px 10px 0 ${
        _shadowColors[1]
      }, 0 2px 4px -1px ${_shadowColors[2]}`
    },
    500: {
      backgroundColor: addWhite(_baseDark, 0.11),
      boxShadow: `0 6px 10px 0 ${_shadowColors[0]}, 0 1px 18px 0 ${
        _shadowColors[1]
      }, 0 3px 5px -1px ${_shadowColors[2]}`
    },
    600: {
      backgroundColor: addWhite(_baseDark, 0.12),
      boxShadow: `0 8px 10px 1px ${_shadowColors[0]}, 0 3px 14px 2px ${
        _shadowColors[1]
      }, 0 5px 5px -3px ${_shadowColors[2]}`
    },
    700: {
      backgroundColor: addWhite(_baseDark, 0.14),
      boxShadow: `0 12px 17px 2px ${_shadowColors[0]}, 0 5px 22px 4px ${
        _shadowColors[1]
      }, 0 7px 8px -4px ${_shadowColors[2]}`
    },
    800: {
      backgroundColor: addWhite(_baseDark, 0.15),
      boxShadow: `0 16px 24px 2px ${_shadowColors[0]}, 0 6px 30px 5px ${
        _shadowColors[1]
      }, 0 8px 10px -5px ${_shadowColors[2]}`
    },
    900: {
      backgroundColor: addWhite(_baseDark, 0.16),
      boxShadow: `0 24px 38px 3px ${_shadowColors[0]}, 0 9px 46px 8px ${
        _shadowColors[1]
      }, 0 11px 15px -7px ${_shadowColors[2]}`
    }
  };
};
