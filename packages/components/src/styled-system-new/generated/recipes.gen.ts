import { DistributiveOmit, Pretty } from "@chakra-ui/utils"
import { SystemStyleObject } from "../css.types"

type ButtonRecipeVariants = {
  size: "sm" | "md" | "lg"
  variant: "solid" | "outline" | "ghost" | "link"
  shape: "rounded" | "pill" | "square"
}

export interface ConfigRecipes {
  Button: ConfigRecipeFn<ButtonRecipeVariants>
}

export interface AlertVariants {
  status: "info" | "warning" | "success" | "error"
  variant: "subtle" | "solid" | "left-accent" | "top-accent"
}

export interface ConfigSlotRecipes {
  Alert: SlotRecipFn<"root" | "title", AlertVariants>
}

interface ConfigRecipeFn<T> {
  (props?: Partial<T>): SystemStyleObject
  variantMap: {
    [key in keyof T]: Array<T[key]>
  }
  variantKeys: Array<keyof T>
  splitVariantProps<P extends T>(
    props: P,
  ): [T, Pretty<DistributiveOmit<P, keyof T>>]
}

interface SlotRecipFn<S extends string, T> {
  (props?: Partial<T>): Record<S, SystemStyleObject>
  variantMap: {
    [key in keyof T]: Array<T[key]>
  }
  variantKeys: Array<keyof T>
  splitVariantProps<P extends T>(
    props: P,
  ): [T, Pretty<DistributiveOmit<P, keyof T>>]
}
