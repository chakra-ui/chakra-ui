"use client"

import { useControllableState } from "@chakra-ui/hooks"
import { dataAttr } from "@chakra-ui/utils"
import { useId } from "react"
import { stepsAnatomy } from "../../anatomy"

export interface ElementIds {
  root?: string
  list?: string
  triggerId?(index: number): string
  contentId?(index: number): string
}

export interface UseStepsProps {
  /**
   * The current value of the stepper
   */
  id?: string
  /**
   * The custom ids for the stepper elements
   */
  ids?: ElementIds
  /**
   * The current value of the stepper
   */
  value?: number
  /**
   * The default value of the stepper
   */
  defaultValue?: number
  /**
   * Callback to be called when the value changes
   */
  onStepChange?: (value: number) => void
  /**
   * Callback to be called when a step is completed
   */
  onStepComplete?: () => void
  /**
   * If `true`, the stepper will allow you to skip steps
   */
  skippable?: boolean
  /**
   * The orientation of the stepper
   */
  orientation?: "horizontal" | "vertical"
  /**
   * The total number of steps
   */
  count: number
  /**
   * The direction of the text in the stepper
   */
  dir?: "ltr" | "rtl"
}

export interface StepItemProps {
  index: number
}

export interface StepItemState {
  index: number
  triggerId: string
  contentId: string
  current: boolean
  completed: boolean
  last: boolean
  first: boolean
}

type DataAttrs = Record<string, any>
type OmitProp<T> = Omit<T, "translate" | "content" | "color" | "ref">

interface PropTypes {
  element: OmitProp<React.HTMLAttributes<HTMLElement>> & DataAttrs
  button: OmitProp<JSX.IntrinsicElements["button"]> & DataAttrs
}

const parts = stepsAnatomy.build()

export function useSteps(props: UseStepsProps) {
  const {
    value: valueProp,
    defaultValue,
    onStepChange,
    skippable = true,
    orientation = "horizontal",
    count,
    id: idProp,
    ids,
    dir,
    onStepComplete,
  } = props

  const uid = useId()
  const id = idProp || uid

  const rootId = ids?.root ?? `${id}-root`
  const listId = ids?.list ?? `${id}-list`

  const getTriggerId = (index: number) =>
    ids?.triggerId?.(index) ?? `${id}-trigger-${value}`

  const getContentId = (index: number) =>
    ids?.contentId?.(index) ?? `${id}-content-${value}`

  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue || 0,
    onChange(value) {
      onStepChange?.(value)
      if (value === count) {
        onStepComplete?.()
      }
    },
  })

  const percent = (value / (count - 1)) * 100

  const getItemState = (props: StepItemProps): StepItemState => {
    return {
      triggerId: getTriggerId(props.index),
      contentId: getContentId(props.index),
      current: props.index === value,
      completed: props.index < value,
      index: props.index,
      first: props.index === 0,
      last: props.index === count - 1,
    }
  }

  const resetValue = (): void => {
    setValue(0)
  }

  const goToNextStep = (): void => {
    setValue((prev) => Math.min(prev + 1, count))
  }

  const goToPrevStep = (): void => {
    setValue((prev) => Math.max(prev - 1, 0))
  }

  const setIndex = (index: number): void => {
    const inRange = index >= 0 && index < count
    if (!inRange) throw new RangeError(`Index ${index} is out of bounds`)
    setValue(index)
  }

  const hasNextStep = value < count
  const hasPrevStep = value > 0

  const getRootProps = (): PropTypes["element"] => {
    return {
      ...parts.root.attrs,
      id: rootId,
      dir,
      "data-orientation": orientation,
      style: {
        ["--percent" as string]: `${percent}%`,
      },
    }
  }

  const getListProps = (): PropTypes["element"] => {
    return {
      ...parts.list.attrs,
      dir,
      id: listId,
      role: "tablist",
      "aria-orientation": orientation,
      "data-orientation": orientation,
    }
  }

  const getItemProps = (props: StepItemProps): PropTypes["element"] => {
    const itemState = getItemState(props)
    return {
      ...parts.item.attrs,
      dir,
      "aria-current": itemState.current ? "step" : undefined,
      "data-orientation": orientation,
    }
  }

  const getTriggerProps = (props: StepItemProps): PropTypes["button"] => {
    const itemState = getItemState(props)
    return {
      ...parts.trigger.attrs,
      id: itemState.triggerId,
      role: "tab",
      dir,
      tabIndex: skippable || itemState.current ? 0 : -1,
      "aria-selected": itemState.current,
      "aria-controls": itemState.contentId,
      "data-state": itemState.current ? "open" : "closed",
      "data-orientation": orientation,
      "data-complete": dataAttr(itemState.completed),
      "data-current": dataAttr(itemState.current),
      "data-incomplete": dataAttr(!itemState.current),
      onClick(event) {
        if (event.defaultPrevented) return
        if (!skippable) return
        setValue(props.index)
      },
    }
  }

  const getContentProps = (props: StepItemProps): PropTypes["element"] => {
    const itemState = getItemState(props)
    return {
      ...parts.content.attrs,
      dir,
      id: itemState.contentId,
      role: "tabpanel",
      tabIndex: 0,
      hidden: !itemState.current,
      "data-state": itemState.current ? "open" : "closed",
      "data-orientation": orientation,
      "aria-labelledby": itemState.triggerId,
    }
  }

  const getIndicatorProps = (props: StepItemProps): PropTypes["element"] => {
    const itemState = getItemState(props)
    return {
      ...parts.indicator.attrs,
      dir,
      "aria-hidden": true,
      "data-complete": dataAttr(itemState.completed),
      "data-current": dataAttr(itemState.current),
      "data-incomplete": dataAttr(!itemState.current),
    }
  }

  const getSeparatorProps = (props: StepItemProps): PropTypes["element"] => {
    const itemState = getItemState(props)
    return {
      ...parts.separator.attrs,
      dir,
      "data-complete": dataAttr(itemState.completed),
      "data-current": dataAttr(itemState.current),
      "data-incomplete": dataAttr(!itemState.current),
    }
  }

  const getNextTriggerProps = (): PropTypes["button"] => {
    return {
      ...parts.nextTrigger.attrs,
      dir,
      type: "button",
      disabled: !hasNextStep,
      onClick(event) {
        if (event.defaultPrevented) return
        goToNextStep()
      },
    }
  }

  const getPrevTriggerProps = (): PropTypes["button"] => {
    return {
      dir,
      ...parts.prevTrigger.attrs,
      type: "button",
      disabled: !hasPrevStep,
      onClick(event) {
        if (event.defaultPrevented) return
        goToPrevStep()
      },
    }
  }

  const getProgressProps = (): PropTypes["element"] => {
    return {
      dir,
      ...parts.progress.attrs,
      role: "progressbar",
      "aria-valuenow": percent,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuetext": `${percent}% complete`,
      "data-complete": dataAttr(percent === 100),
    }
  }

  return {
    value,
    percent,
    count,
    setValue,
    setIndex,
    resetValue,
    goToNextStep,
    goToPrevStep,
    hasNextStep,
    hasPrevStep,
    getRootProps,
    getListProps,
    getItemProps,
    getItemState,
    getTriggerProps,
    getContentProps,
    getIndicatorProps,
    getSeparatorProps,
    getNextTriggerProps,
    getPrevTriggerProps,
    getProgressProps,
  }
}

export interface UseStepsReturn extends ReturnType<typeof useSteps> {}
