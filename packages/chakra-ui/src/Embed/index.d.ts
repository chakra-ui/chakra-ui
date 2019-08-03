import * as React from "react";
import { BoxProps } from "../Box";

interface IEmbed {
  aspectRatio?: "21:9" | "16:9" | "9:16" | "4:3" | "1.85:1" | "1:1";
}

export type EmbedProps = IEmbed & BoxProps;

declare const Embed: React.FC<EmbedProps>;

export default Embed;
