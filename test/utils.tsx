import { PortalManager } from "@chakra-ui/portal";
import theme from "@chakra-ui/preset-base";
import {
  ColorMode,
  createThemeContext,
  CSSReset,
} from "@chakra-ui/system";
import { render, RenderOptions } from "@testing-library/react";
import * as React from "react";

const [ThemeProvider] = createThemeContext(theme);

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <PortalManager>
    <ThemeProvider>
        <CSSReset />
        <ColorMode />
        {children}
    </ThemeProvider>
  </PortalManager>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
