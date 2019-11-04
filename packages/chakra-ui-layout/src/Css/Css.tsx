import _css from "@styled-system/css";
import { transformAliasProps as tx } from "../Box/config";

const css = (styleProps: any) => _css(tx(styleProps));

export default css;
