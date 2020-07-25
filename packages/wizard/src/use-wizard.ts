import { createRef, useEffect, useState } from "react"

export interface UseWizardProps {
  /**
   * The orientation of the wizard component.
   */
  orientation?: "vertical" | "horizontal"
  /**
   * Callback when the step index (controlled or un-controlled) changes.
   */
  onStepChange?: (index: number) => void
  /**
   * The index of the active step
   */
  activeStep?: number
  /**
   * Used to load wizard on a step other than the default
   */
  initialStep?: number
}

/**
 * Tabs hooks that provides all the states, and accessibility
 * helpers to keep all things working properly.
 *
 * It's returned object will be passed unto a Context Provider
 * so all child components can read from it.
 *
 * @see Docs https://chakra-ui.com/components/useTabs
 */
export function useWizard(props: UseWizardProps) {
  const {
    initialStep,
    onStepChange,
    activeStep,
    orientation = "horizontal",
    ...htmlProps
  } = props

  const spacerRef = createRef<HTMLDivElement>()

  const [spacerWidth, setSpacerWidth] = useState(0)

  useEffect(() => {
    if (spacerRef && spacerRef.current) {
      return setSpacerWidth(spacerRef.current.offsetWidth)
    }
  }, [spacerRef])

  return {
    orientation,
    htmlProps,
    spacerRef,
    spacerWidth,
  }
}
