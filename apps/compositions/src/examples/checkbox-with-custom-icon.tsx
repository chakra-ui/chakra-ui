import { Checkbox } from "compositions/ui/checkbox"
import { HiOutlinePlus } from "react-icons/hi"

export const CheckboxWithCustomIcon = () => {
  return (
    <Checkbox defaultChecked icon={<HiOutlinePlus />}>
      With Custom Icon
    </Checkbox>
  )
}
