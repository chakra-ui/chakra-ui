import React, { ReactComponentElement } from "react";
import { render as RTLRender, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/theme/src";

export function render(
  container: HTMLElement | ReactComponentElement<any, any>,
): RenderResult {
  return RTLRender(<ThemeProvider>{container}</ThemeProvider>);
}
