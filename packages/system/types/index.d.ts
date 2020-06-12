import { SystemStyleObject } from "@chakra-ui/css"

declare module "@emotion/core" {
  export type InterpolationWithTheme<Theme> =
    | SystemStyleObject
    | ((theme: Theme) => SystemStyleObject)
}
