import { Flex } from "@chakra-ui/core"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { chakra, GetProps } from "@chakra-ui/system"
import { Transition } from "@chakra-ui/transition"
import { BoxModel, getBox } from "@chakra-ui/utils"
import throttle from "lodash.throttle"
import * as React from "react"
import Connector from "./connecter"
import WizardStepLabel from "./wizard-step-label"

// type WizardProps = {
//   activeStep: number
// }

export type WizardProps = GetProps<typeof chakra.div> & {
  activeStep: number
  orientation?: "vertical" | "horizontal"
}

// function debounce(fn, ms) {
//   let timer
//   return (_) => {
//     clearTimeout(timer)
//     timer = setTimeout((_) => {
//       timer = null
//       fn.apply(this, arguments)
//     }, ms)
//   }
// }

function useThrottledResize(ref: React.RefObject<HTMLElement>, delay?: 500) {
  const [dimensions, setDimensions] = React.useState<BoxModel | null>(null)
  const rafId = React.useRef<number>()

  useSafeLayoutEffect(() => {
    if (!ref.current) return

    const node = ref.current

    function measure() {
      rafId.current = requestAnimationFrame(() => {
        const boxModel = getBox(node)
        setDimensions(boxModel)
      })
    }

    const throttledMeasure = throttle(measure, delay)

    window.addEventListener("resize", throttledMeasure)
    window.addEventListener("scroll", throttledMeasure)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      window.removeEventListener("resize", throttledMeasure)
      window.removeEventListener("scroll", throttledMeasure)
    }
  }, [])

  return dimensions
}

export const Wizard = React.forwardRef(function Wizard(
  { children, activeStep, orientation }: WizardProps,
  ref: React.Ref<any>,
) {
  const childArr = React.Children.toArray(children)

  const stepCount = childArr.length

  const spacerRef = React.useRef<HTMLDivElement>(null)

  const dimensions = useThrottledResize(spacerRef)

  const [spacerWidth, setSpacerWidth] = React.useState(0)

  // const { spacerWidth } = useWizard({ activeStep, orientation })

  React.useEffect(() => {
    if (dimensions) {
      setSpacerWidth(dimensions.borderBox.width)
    }
  }, [dimensions])

  const iconStyles = {
    init: {
      transform: "scale(0)",
    },
    entered: {
      transform: "scale(1)",
    },
    exiting: {
      transform: "scale(0)",
    },
  }

  const lineStyles = {
    init: {
      width: 0,
    },
    entered: {
      width: spacerWidth,
    },
    exiting: {
      width: 0,
    },
  }

  return (
    <>
      <Flex
        p={4}
        flex={1}
        ref={ref}
        justifyContent={stepCount === 1 ? "flex-end" : "space-between"}
        flexDirection={orientation === "horizontal" ? "row" : "column"}
        alignItems={orientation === "horizontal" ? "center" : "flex-start"}
      >
        {childArr.map((_, i) => {
          const isCompletedStep = i < activeStep
          const isLastStep = i === stepCount - 1
          const isCurrentStep = i === activeStep
          return (
            <React.Fragment key={i}>
              <WizardStepLabel
                index={i}
                isCurrentStep={isCurrentStep}
                isCompletedStep={isCompletedStep}
              />
              {!isLastStep && (
                <Flex
                  flex={1}
                  pos="relative"
                  ref={spacerRef}
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Connector />
                  <Transition
                    styles={lineStyles}
                    in={activeStep === i + 1 || isCompletedStep}
                  >
                    {(style) => <Connector bg="green.500" style={style} />}
                  </Transition>
                </Flex>
              )}
            </React.Fragment>
          )
        })}
      </Flex>
      {childArr[activeStep]}
    </>
  )
})

Wizard.defaultProps = {
  orientation: "horizontal",
  activeStep: 0,
}
