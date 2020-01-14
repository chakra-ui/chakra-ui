import { classNameDark, classNameLight } from "./constants";

const getBodyElement = () => {
  // for SSR
  const mockBody = {
    classList: {
      add: (token: string) => {},
      remove: (token: string) => {},
    },
  };

  return window.document?.body ?? mockBody;
};

export function syncBodyClassName(isDark: boolean) {
  const body = getBodyElement();
  body.classList.add(isDark ? classNameDark : classNameLight);
  body.classList.remove(isDark ? classNameLight : classNameDark);
}
