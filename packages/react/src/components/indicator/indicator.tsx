import { mapResponsive } from "@chakra-ui/utils"
import { useMemo } from "react"
import {
  ConditionalValue,
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "../../styled-system"

type Dict = Record<string, any>

export interface IndicatorOptions {
  /**
   * The x offset of the indicator
   */
  offsetX?: SystemStyleObject["left"]
  /**
   * The y offset of the indicator
   */
  offsetY?: SystemStyleObject["top"]
  /**
   * The x and y offset of the indicator
   */
  offset?: SystemStyleObject["top"]
  /**
   * The placement of the indicator
   * @default "top-end"
   */
  placement?: ConditionalValue<
    | "bottom-end"
    | "bottom-start"
    | "top-end"
    | "top-start"
    | "bottom-center"
    | "top-center"
    | "middle-center"
    | "middle-end"
    | "middle-start"
  >
}

export interface IndicatorProps
  extends Omit<HTMLChakraProps<"div">, keyof IndicatorOptions>,
    IndicatorOptions {}

export const Indicator = forwardRef<IndicatorProps, "div">(
  function Indicator(props, ref) {
    const {
      offsetX,
      offsetY,
      offset = "0",
      placement = "top-end",
      ...rest
    } = props

    const styles: SystemStyleObject = useMemo(
      () => ({
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        insetBlockStart: mapResponsive(placement, (v) => {
          const [side] = v.split("-")
          const map: Dict = {
            top: offsetY ?? offset,
            middle: "50%",
            bottom: "auto",
          }
          return map[side]
        }),
        insetBlockEnd: mapResponsive(placement, (v) => {
          const [side] = v.split("-")
          const map: Dict = {
            top: "auto",
            middle: "50%",
            bottom: offsetY ?? offset,
          }
          return map[side]
        }),
        insetStart: mapResponsive(placement, (v) => {
          const [, align] = v.split("-")
          const map: Dict = {
            start: offsetX ?? offset,
            center: "50%",
            end: "auto",
          }
          return map[align]
        }),
        insetEnd: mapResponsive(placement, (v) => {
          const [, align] = v.split("-")
          const map: Dict = {
            start: "auto",
            center: "50%",
            end: offsetX ?? offset,
          }
          return map[align]
        }),
        translate: mapResponsive(placement, (v) => {
          const [side, align] = v.split("-")
          const mapX: Dict = { start: "-50%", center: "-50%", end: "50%" }
          const mapY: Dict = { top: "-50%", middle: "-50%", bottom: "50%" }
          return `${mapX[align]} ${mapY[side]}`
        }),
      }),
      [offset, offsetX, offsetY, placement],
    )

    return <chakra.div ref={ref} css={styles} {...rest} />
  },
)
