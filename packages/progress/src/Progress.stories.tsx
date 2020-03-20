import * as React from "react"
import { CircularProgress, CircularProgressLabel } from "./Progress.circular"
import { Progress } from "./Progress"

export default {
  title: "Progress",
}

export const BasicUsage = () => <Progress value={50} />

export const WithThemeColor = () => <Progress color="pink" value={20} />

export const Indeterminate = () => (
  <Progress margin="20px" variantSize="xs" value={undefined} />
)

export const WithStripe = () => <Progress color="green" hasStripe value={20} />

export const WithSizes = () => (
  <div>
    <Progress color="green" variantSize="sm" value={20} />
    <br />
    <Progress color="green" variantSize="md" value={20} />
    <br />
    <Progress color="green" variantSize="lg" value={20} />
  </div>
)

export const WithAnimation = () => (
  <Progress color="green" hasStripe isAnimated value={20} />
)

export const CircularProgress_ = () => (
  <CircularProgress size="120px" value={60}>
    <CircularProgressLabel>60%</CircularProgressLabel>
  </CircularProgress>
)

export const Indeterminate_ = () => (
  <CircularProgress trackColor="transparent" thickness={10} value={undefined} />
)
