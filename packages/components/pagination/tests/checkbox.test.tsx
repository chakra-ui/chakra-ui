import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Icon } from "@chakra-ui/icon"
import { fireEvent, render, screen, testA11y } from "@chakra-ui/test-utils"
import * as React from "react"
import {} from "../src"

// it("passes a11y test", async () => {
//   await testA11y(<Checkbox>label</Checkbox>)
// })

// test("Uncontrolled - should check and uncheck", () => {
//   const Component = () => {
//     const { htmlProps, getInputProps, getCheckboxProps } = useCheckbox()

//     return (
//       <label {...htmlProps}>
//         <input data-testid="input" {...getInputProps()} />
//         <div data-testid="checkbox" {...getCheckboxProps()}>
//           Checkbox
//         </div>
//       </label>
//     )
//   }
//   render(<Component />)

//   const input = screen.getByTestId("input")
//   const checkbox = screen.getByTestId("checkbox")

//   // click the first time, it is checked
//   fireEvent.click(input)
//   expect(input).toBeChecked()
//   expect(checkbox).toHaveAttribute("data-checked")

//   // click the second time, it is unchecked
//   fireEvent.click(input)
//   expect(input).not.toBeChecked()
//   expect(checkbox).not.toHaveAttribute("data-checked")
// })
