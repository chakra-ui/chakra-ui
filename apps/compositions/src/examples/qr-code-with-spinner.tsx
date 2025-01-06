import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react"
import { QrCode } from "compositions/ui/qr-code"

export const QrCodeWithSpinner = () => {
  return (
    <Box position="relative">
      <QrCode
        value="https://www.google.com"
        overlay={
          <AbsoluteCenter bg="bg/80" boxSize="100%">
            <Spinner color="red" />
          </AbsoluteCenter>
        }
      />
    </Box>
  )
}
