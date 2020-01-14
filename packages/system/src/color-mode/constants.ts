const supportsLocalStorage = typeof Storage !== "undefined";

export const storageKey = "chakra-ui-color-mode";

const cx = (mode: ColorModeValue) => `chakra-ui-${mode}`;

export const classNameLight = cx("light");
export const classNameDark = cx("dark");

export type ColorModeValue = "light" | "dark";

export const storage = {
  get: (init?: ColorModeValue) =>
    ((supportsLocalStorage && window.localStorage.getItem(storageKey)) ||
      init) as ColorModeValue | undefined,
  set: (value: ColorModeValue) =>
    supportsLocalStorage && window.localStorage.setItem(storageKey, value),
};
