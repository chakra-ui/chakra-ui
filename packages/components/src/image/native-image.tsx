import { PropsOf, forwardRef } from "@chakra-ui/system"

export interface NativeImageOptions {
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number
}

interface NativeImageProps extends PropsOf<"img">, NativeImageOptions {}

export const NativeImage = forwardRef(function NativeImage(
  props: NativeImageProps,
  ref: React.Ref<any>,
) {
  const { htmlWidth, htmlHeight, alt, ...rest } = props
  return (
    <img width={htmlWidth} height={htmlHeight} ref={ref} alt={alt} {...rest} />
  )
})

NativeImage.displayName = "NativeImage"
