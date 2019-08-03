import * as StyledSystem from "styled-system";

interface IIcon {
  path: JSX.Element;
  viewBox?: string;
}

export interface ITheme extends StyledSystem.Theme {
  icons: IIcon;
}

declare const theme: ITheme;

export default theme;
