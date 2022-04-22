import { chakra, PropsOf, ChakraComponent } from "@chakra-ui/system"
import { AnimatePresence, CustomDomComponent, motion } from "framer-motion"
import * as React from "react"

function __motion<T extends ChakraComponent<any, any>>(
  el: T,
): CustomDomComponent<PropsOf<T>> {
  const m = motion as any
  if ("custom" in m && typeof m.custom === "function") {
    return m.custom(el)
  }
  return m(el)
}

// @future: only call `motion(chakra.svg)` when we drop framer-motion v3 support
const MotionSvg = __motion(chakra.svg)

const CheckIcon = (props: PropsOf<typeof MotionSvg>) => (
  <MotionSvg
    width="1.2em"
    viewBox="0 0 12 10"
    variants={{
      unchecked: {
        opacity: 0,
        strokeDashoffset: 16,
      },
      checked: {
        opacity: 1,
        strokeDashoffset: 0,
        transition: { duration: 0.2 },
      },
    }}
    style={{
      fill: "none",
      strokeWidth: 2,
      stroke: "currentColor",
      strokeDasharray: 16,
    }}
    {...props}
  >
    <polyline points="1.5 6 4.5 9 10.5 1" />
  </MotionSvg>
)

const IndeterminateIcon = (props: PropsOf<typeof MotionSvg>) => (
  <MotionSvg
    width="1.2em"
    viewBox="0 0 24 24"
    variants={{
      unchecked: {
        scaleX: 0.65,
        opacity: 0,
      },
      checked: {
        scaleX: 1,
        opacity: 1,
        transition: {
          scaleX: { duration: 0 },
          opacity: { duration: 0.02 },
        },
      },
    }}
    style={{ stroke: "currentColor", strokeWidth: 4 }}
    {...props}
  >
    <line x1="21" x2="3" y1="12" y2="12" />
  </MotionSvg>
)

const CheckboxTransition = ({ open, children }: any) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        variants={{
          unchecked: { scale: 0.5 },
          checked: { scale: 1 },
        }}
        initial="unchecked"
        animate="checked"
        exit="unchecked"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export interface CheckboxIconProps extends PropsOf<typeof MotionSvg> {
  isIndeterminate?: boolean
  isChecked?: boolean
}

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 *
 * @todo allow users pass their own icon svgs
 */
export const CheckboxIcon: React.FC<CheckboxIconProps> = (props) => {
  const { isIndeterminate, isChecked, ...rest } = props
  const IconEl = isIndeterminate ? IndeterminateIcon : CheckIcon
  return (
    <CheckboxTransition open={isChecked || isIndeterminate}>
      <IconEl {...rest} />
    </CheckboxTransition>
  )
}
