import { adjustHue, darken, desaturate, lighten, toHex } from "color2k"
import { createElement } from "react"

export function createPalette(accentColor: string) {
  return [
    "#FFFFFF",
    accentColor,
    darken(desaturate(adjustHue(accentColor, 4), 0.53), 0.26),
    darken(desaturate(adjustHue(accentColor, 9), 0.51), 0.42),
    darken(desaturate(adjustHue(accentColor, 9), 0.53), 0.38),
    darken(desaturate(adjustHue(accentColor, 9), 0.5), 0.28),
    darken(desaturate(adjustHue(accentColor, 7), 0.36), 0.26),
    darken(desaturate(adjustHue(accentColor, 5), 0.38), 0.16),
    darken(desaturate(adjustHue(accentColor, 6), 0.44), 0.33),
    lighten(adjustHue(accentColor, 5), 0.29),
    darken(desaturate(adjustHue(accentColor, 9), 0.52), 0.1),
    darken(desaturate(adjustHue(accentColor, 9), 0.43), 0.22),
    darken(desaturate(adjustHue(accentColor, 4), 0.38), 0.16),
    lighten(adjustHue(accentColor, 5), 0.22),
    darken(desaturate(adjustHue(accentColor, 9), 0.35), 0.43),
    lighten(desaturate(adjustHue(accentColor, 9), 1), 0.26),
  ].map(toHex)
}

type SvgProps = React.SVGProps<SVGSVGElement>

type BaseProps = SvgProps & { accentColor: string }

type Props = SvgProps & { palette: string[] }

export function createComponent(
  Comp: React.ElementType<Props>,
): React.FC<BaseProps> {
  const AnatomyIcon: React.FC<any> = (props) => {
    const palette = createPalette("#e4e4e7")
    return createElement(Comp, { palette, ...props })
  }
  return AnatomyIcon as React.FC<BaseProps>
}
