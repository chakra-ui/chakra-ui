import * as StyledSystem from "styled-system";

interface Icon {
  path: JSX.Element;
  viewBox?: string;
}

type Icons = { [name: string]: Icon };

export interface ITheme extends StyledSystem.Theme {
  icons: Icons;
}

declare const theme: ITheme;

export default theme;
