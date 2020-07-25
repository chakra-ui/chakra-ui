import { Flex } from "@chakra-ui/core"
import { CheckIcon } from "@chakra-ui/icons"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Transition } from "@chakra-ui/transition"
import { AnimatePresence } from "framer-motion"
import * as React from "react"

// type WizardProps = {
//   activeStep: number
// }

export type WizardProps = PropsOf<typeof chakra.div> & {
  activeStep: number
  orientation?: "vertical" | "horizontal"
}

const Square = chakra("div", {
  baseStyle: {
    width: "40px",
    height: "40px",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
})

const OuterCircle = chakra("div", {
  baseStyle: {
    width: "38px",
    height: "38px",
    display: "flex",
    borderRadius: "19px",
    alignItems: "center",
    justifyContent: "center",
  },
})

const InnerCircle = chakra("div", {
  baseStyle: {
    width: "36px",
    height: "36px",
    display: "flex",
    borderRadius: "18px",
    alignItems: "center",
    justifyContent: "center",
  },
})

const SpacerLine = chakra("div", {
  baseStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "2px",
  },
})

export const Wizard = React.forwardRef(function Wizard(
  { children, activeStep, orientation }: WizardProps,
  ref: React.Ref<any>,
) {
  const childArr = React.Children.toArray(children)

  const stepCount = childArr.length

  const spacerRef = React.useRef<HTMLDivElement>(null)

  const [spacerWidth, setSpacerWidth] = React.useState(0)

  React.useEffect(() => {
    if (spacerRef && spacerRef.current) {
      setSpacerWidth(spacerRef.current.offsetWidth)
    }
  }, [])

  React.useLayoutEffect(() => {
    if (spacerRef && spacerRef.current) {
      setSpacerWidth(spacerRef.current?.offsetWidth)
    }
  }, [spacerRef.current?.offsetWidth])

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
              <AnimatePresence>
                {isCompletedStep ? (
                  <Flex>
                    <OuterCircle bg="accent.500">
                      <Transition styles={iconStyles}>
                        {(style) => (
                          <CheckIcon width="24px" height="24px" style={style} />
                        )}
                      </Transition>
                    </OuterCircle>
                  </Flex>
                ) : (
                  <Square>
                    <OuterCircle bg={isCurrentStep ? "accent.500" : "gray.200"}>
                      <InnerCircle bg={isCurrentStep ? "gray.200" : "gray.100"}>
                        <chakra.span
                          __css={{ color: isCompletedStep ? "white" : "black" }}
                        >
                          {i + 1}
                        </chakra.span>
                      </InnerCircle>
                    </OuterCircle>
                  </Square>
                )}
              </AnimatePresence>
              {!isLastStep && (
                <Flex
                  pos="relative"
                  flexDirection="column"
                  justifyContent="center"
                  flex={1}
                >
                  <SpacerLine ref={spacerRef} bg="gray.100" />
                  <Transition styles={lineStyles}>
                    {(style) =>
                      isCompletedStep && (
                        <SpacerLine bg="accent.500" style={style} />
                      )
                    }
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
}

// export type ConnectorProps = PropsOf<typeof chakra.div>

// const Connector = React.forwardRef(function Connector(
//   { children, activeStep }: ConnectorProps,
//   ref,
// ) {
//   return
// })
