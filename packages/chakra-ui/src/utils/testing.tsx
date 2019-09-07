import * as React from "react";
import { ReactNode } from "react";
import { ThemeProvider } from "emotion-theming";
import { render as RTLrender } from "@testing-library/react";

import theme from "../theme";

export const render = (component: ReactNode, ...args: any) => {
  return RTLrender(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    ...args,
  );
};

export * from "@testing-library/react";
