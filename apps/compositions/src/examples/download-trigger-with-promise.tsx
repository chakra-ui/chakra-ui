"use client"

import { Button, DownloadTrigger } from "@chakra-ui/react"
import { LuImageDown } from "react-icons/lu"

const data = async () => {
  const res = await fetch("https://picsum.photos/200/300")
  return res.blob()
}

export const DownloadTriggerWithPromise = () => {
  return (
    <DownloadTrigger
      data={data}
      fileName="sample.jpg"
      mimeType="image/jpeg"
      asChild
    >
      <Button variant="outline">
        <LuImageDown /> Download
      </Button>
    </DownloadTrigger>
  )
}
