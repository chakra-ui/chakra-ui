import { __DEV__ } from "@chakra-ui/utils"
import React, { createContext, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface FramerMotionMethods {
  motion: typeof motion
  AnimatePresence: typeof AnimatePresence
}

const FramerMotionContext = createContext<FramerMotionMethods | null>(null)

if (__DEV__) {
  FramerMotionContext.displayName = "FramerMotionContext"
}

export function useFramerMotion() {
  const framerMotion = useContext(FramerMotionContext)
  return framerMotion
}

export interface EnvironmentProviderProps {
  children?: React.ReactNode
  methods: FramerMotionMethods
}

export function FramerMotionProvider(props: EnvironmentProviderProps) {
  const { children, methods } = props

  return (
    <FramerMotionContext.Provider value={methods}>
      {children}
    </FramerMotionContext.Provider>
  )
}

if (__DEV__) {
  FramerMotionProvider.displayName = "FramerMotionProvider"
}
