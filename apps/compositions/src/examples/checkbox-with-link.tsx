import { Link } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"

export const CheckboxWithLink = () => {
  return (
    <Checkbox>
      I agree to the{" "}
      <Link colorPalette="teal" href="https://google.com">
        terms and conditions
      </Link>
    </Checkbox>
  )
}
