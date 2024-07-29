"use client"

import { Rating } from "compositions/ui/rating"
import { useState } from "react"

export const RatingControlled = () => {
  const [value, setValue] = useState(3)
  return <Rating value={value} onValueChange={(e) => setValue(e.value)} />
}
