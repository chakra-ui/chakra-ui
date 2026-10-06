"use client"

import * as React from "react"
import {
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  createRecipeContext,
} from "../../styled-system/index.ts"
import type { CircleProps } from "../circle/index.tsx"
import { Circle } from "../circle/index.tsx"
import type { StackProps } from "../stack/index.ts"
import { Stack } from "../stack/index.ts"

const { withContext, PropsProvider } = createRecipeContext({
  key: "skeleton",
})

export interface SkeletonProps
  extends HTMLChakraProps<"div">, RecipeProps<"skeleton">, UnstyledProp {}

export const Skeleton = withContext<HTMLDivElement, SkeletonProps>("div")

export const SkeletonPropsProvider =
  PropsProvider as React.Provider<SkeletonProps>

////////////////////////////////////////////////////////////////////////////////////

export interface SkeletonCircleProps extends SkeletonProps {
  size?: CircleProps["size"] | undefined
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

SkeletonCircle.displayName = "SkeletonCircle"

////////////////////////////////////////////////////////////////////////////////////

export interface SkeletonTextProps extends SkeletonProps {
  noOfLines?: number | undefined
  rootProps?: StackProps | undefined
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { loading = true, noOfLines = 3, gap, rootProps, ...rest } = props
    return (
      <Stack gap={gap} width="full" ref={ref} {...rootProps}>
        {Array.from({ length: loading ? noOfLines : 1 }).map((_, index) => (
          <Skeleton
            key={index}
            loading={loading}
            height={loading ? "4" : undefined}
            maxW={
              loading
                ? index === noOfLines - 1 && noOfLines > 1
                  ? "80%"
                  : "100%"
                : undefined
            }
            {...rest}
          />
        ))}
      </Stack>
    )
  },
)

SkeletonText.displayName = "SkeletonText"
