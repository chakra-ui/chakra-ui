export function genId(prefix) {
  return `${prefix}-${Math.random()
    .toString(32)
    .substr(2, 8)}`;
}

export const makeId = (id, index) => `${id}:${index}`;

export const assignRef = (ref, value) => {
  if (ref == null) return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
};

export const mergeRefs = (refs, value) => {
  refs.forEach(ref => assignRef(ref, value));
};

const focusableElList = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "embed",
  "iframe",
  "input:not([disabled])",
  "object",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]",
];

const focusableElSelector = focusableElList.join();

export function getFocusables(element, keyboardOnly = false) {
  let focusableEls = Array.from(element.querySelectorAll(focusableElSelector));

  // filter out elements with display: none
  focusableEls = focusableEls.filter(
    focusableEl => window.getComputedStyle(focusableEl).display !== "none",
  );

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(
      focusableEl => focusableEl.getAttribute("tabindex") !== "-1",
    );
  }

  return focusableEls;
}

/// Evaluate color in theme object

const colorKeyInTheme = (theme, color) => color in theme.colors;

const colorHueValue = (theme, color) => {
  let hasDot = color.search(".") !== -1;
  if (hasDot) {
    const [colorName, hue] = color.split(".");

    if (colorKeyInTheme(theme, colorName)) {
      return theme.colors[colorName][hue];
    }
  }
  return null;
};

export const getColorInTheme = (theme, color) => {
  if (colorKeyInTheme(theme, color)) {
    return theme.colors[color][500];
  }

  if (colorHueValue(theme, color)) {
    return colorHueValue(theme, color);
  }

  return color;
};
