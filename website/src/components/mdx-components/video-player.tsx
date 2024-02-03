import { AspectRatio, Box } from '@chakra-ui/react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'

export function VideoPlayer(props: ReactPlayerProps) {
  return (
    <Box mt={3}>
      <AspectRatio ratio={16 / 8.84}>
        <ReactPlayer
          width='100%'
          height='100%'
          {...props}
          config={{
            youtube: {
              playerVars: {
                controls: true,
              },
            },
          }}
        />
      </AspectRatio>
    </Box>
  )
}
