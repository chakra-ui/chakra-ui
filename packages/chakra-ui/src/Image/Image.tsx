import * as React from "react";
import { Box, BoxProps } from "../Box";
import { Omit, Merge } from "../utils";

interface NativeImageOptions {
  htmlWidth?: number | string;
  htmlHeight?: number | string;
  alt?: string;
}

type NativeImageHTMLProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

type NativeImageProps = Omit<
  NativeImageHTMLProps,
  "width" | "height" | "inputMode"
> &
  NativeImageOptions;

const NativeImage = React.forwardRef(function NativeImage(
  props: NativeImageProps,
  ref: React.Ref<HTMLImageElement>,
) {
  return (
    <img
      ref={ref}
      alt={props.alt}
      width={props.htmlWidth}
      height={props.htmlHeight}
      {...props}
    />
  );
}) as React.FC<NativeImageProps>;

export type ImageProps<P> = Merge<
  BoxProps<P, HTMLImageElement>,
  NativeImageProps
>;

const Image = React.forwardRef(function Image<P>(
  props: ImageProps<P>,
  ref: React.Ref<HTMLImageElement>,
) {
  return <Box as={NativeImage} ref={ref} {...props} />;
}) as <P>(props: ImageProps<P>) => React.ReactElement<ImageProps<P>>;

export default Image;
