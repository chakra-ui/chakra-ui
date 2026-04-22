"use client"

import { Tour } from "@chakra-ui/react"

interface TourOverlayProps {
  showProgress?: boolean
  closable?: boolean
}

export const TourOverlay = (props: TourOverlayProps) => {
  const { showProgress = true, closable = true } = props
  return (
    <>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow>
            <Tour.ArrowTip />
          </Tour.Arrow>
          {closable && <Tour.CloseTrigger />}
          {showProgress && <Tour.ProgressText />}
          <Tour.Title />
          <Tour.Description />
          <Tour.Control>
            <Tour.ActionTriggers />
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </>
  )
}
