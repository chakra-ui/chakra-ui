"use client"

import * as React from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system"
import { Circle } from "../box"
import type { CircleProps } from "../box"
import { Stack } from "../stack"
import type { StackProps } from "../stack"

const { withContext, PropsProvider } = createRecipeContext({
  key: "skeleton",
})

export interface SkeletonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"skeleton">,
    UnstyledProp {}

export const Skeleton = withContext<HTMLDivElement, SkeletonProps>("div")

export const SkeletonPropsProvider =
  PropsProvider as React.Provider<SkeletonProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SkeletonCircleProps extends SkeletonProps {
  size?: CircleProps["size"]
}

export const SkeletonCircle = React.forwardRef<
  HTMLDivElement,
  SkeletonCircleProps
>(function SkeletonCircle(props, ref) {
  const { size, ...rest } = props
  return (
    <Circle size={size} asChild ref={ref}>
      <Skeleton {...rest} />
    </Circle>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface SkeletonTextProps extends SkeletonProps {
  noOfLines?: number
  rootProps?: StackProps
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, rootProps, ...rest } = props
    return (
      <Stack gap={gap} width="full" ref={ref} {...rootProps}>
        {Array.from({ length: noOfLines }).map((_, index) => (
          <Skeleton
            height="4"
            key={index}
            _last={{ maxW: noOfLines === 1 ? "100%" : "80%" }}
            {...rest}
          />
        ))}
      </Stack>
    )
  },
)
