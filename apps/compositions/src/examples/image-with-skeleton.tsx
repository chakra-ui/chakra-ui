"use client"

import { Image } from "@chakra-ui/react"
import { SkeletonCircle } from "compositions/ui/skeleton"
import { useEffect, useState } from "react"

export const ImageWithSkeleton = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 2000)
  }, [])

  return (
    <SkeletonCircle loaded={isLoaded} boxSize="150px">
      <Image
        src="https://bit.ly/gleb-koshcheev"
        alt="Gleb Koshcheev"
        borderRadius="full"
        boxSize="150px"
      />
    </SkeletonCircle>
  )
}
