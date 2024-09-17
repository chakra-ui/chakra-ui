"use client"

import { forwardRef, useMemo } from "react"
import {
  type ConditionalValue,
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"
import { mapObject } from "../../utils"

type Dict = Record<string, any>

export interface FloatOptions {
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

export interface FloatProps
  extends Omit<HTMLChakraProps<"div">, keyof FloatOptions>,
    FloatOptions {}

export const Float = forwardRef<HTMLDivElement, FloatProps>(
  function Float(props, ref) {
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
        insetBlockStart: mapObject(placement, (v) => {
          const [side] = v.split("-")
          const map: Dict = {
            top: offsetY ?? offset,
            middle: "50%",
            bottom: "auto",
          }
          return map[side]
        }),
        insetBlockEnd: mapObject(placement, (v) => {
          const [side] = v.split("-")
          const map: Dict = {
            top: "auto",
            middle: "50%",
            bottom: offsetY ?? offset,
          }
          return map[side]
        }),
        insetStart: mapObject(placement, (v) => {
          const [, align] = v.split("-")
          const map: Dict = {
            start: offsetX ?? offset,
            center: "50%",
            end: "auto",
          }
          return map[align]
        }),
        insetEnd: mapObject(placement, (v) => {
          const [, align] = v.split("-")
          const map: Dict = {
            start: "auto",
            center: "50%",
            end: offsetX ?? offset,
          }
          return map[align]
        }),
        translate: mapObject(placement, (v) => {
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
