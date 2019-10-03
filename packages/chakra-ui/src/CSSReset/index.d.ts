import * as React from "react";
import { ITheme } from "../theme";

interface Config {
  color: string;
  bg: string;
  borderColor: string;
  placeholderColor: string;
}

type ConfigReturnType = { light: Config; dark: Config };

export type CSSResetProps = {
  config?: (
    theme: ITheme,
    defaultConfig?: ConfigReturnType,
  ) => ConfigReturnType;
};

declare const CSSReset: React.FC<CSSResetProps>;
export default CSSReset;
