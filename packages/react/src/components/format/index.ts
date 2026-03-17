import { Format } from "@ark-ui/react/format"

export const FormatNumber = Format.Number
FormatNumber.displayName = "FormatNumber"
export const FormatByte = Format.Byte
FormatByte.displayName = "FormatByte"

export interface FormatNumberProps extends Format.NumberProps {}
export interface FormatByteProps extends Format.ByteProps {}
