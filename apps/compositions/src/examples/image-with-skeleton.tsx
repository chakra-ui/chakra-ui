"use client"

import { Image, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const ImageWithSkeleton = () => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <Skeleton loading={isLoading} boxSize="150px" borderRadius="full">
      <Image
        src="https://bit.ly/gleb-koshcheev"
        alt="Gleb Koshcheev"
        borderRadius="full"
        boxSize="150px"
      />
    </Skeleton>
  )
}
