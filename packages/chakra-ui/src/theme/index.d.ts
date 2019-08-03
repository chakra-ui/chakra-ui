import * as StyledSystem from "styled-system";

interface IIcon {
  path: JSX.Element;
  viewBox?: string;
}

export interface Theme extends StyledSystem.Theme {
  icons: IIcon;
}
