import { render, userEvent, renderHook, invoke } from "@chakra-ui/test-utils"
import React from "react"
import { Checkbox } from "../Checkbox"
import useCheckbox from "../Checkbox.hook"

test("Checkbox renders correctly", () => {
  const utils = render(<Checkbox />)
  expect(utils.asFragment()).toMatchSnapshot()
})

test("useCheckbox should return object", () => {
  const { result } = renderHook(() => useCheckbox({}))
  expect(typeof result.current).toBe("object")
})

test("useCheckbox should return object with 4 keys", () => {
  const { result } = renderHook(() => useCheckbox({}))
  expect(Object.keys(result.current).length).toEqual(4)
})

test("", () => {})

// test("Uncontrolled - should check and uncheck", () => {
//   const utils = render(
//     <Checkbox>
//       <CheckboxHiddenInput data-testid="input" />
//       <CustomCheckbox>Checkbox</CustomCheckbox>
//     </Checkbox>,
//   )

//   const input = utils.getByTestId("input")
//   const checkbox = utils.getByText("Checkbox")

//   // click the first time, it's checked
//   userEvent.click(checkbox)
//   expect(input).toBeChecked()
//   expect(checkbox).toHaveAttribute("data-checked")

//   // click the second time, it's unchecked
//   userEvent.click(checkbox)
//   expect(input).not.toBeChecked()
//   expect(checkbox).not.toHaveAttribute("data-checked")
// })

// test("Uncontrolled - should not check if disabled", () => {
//   const utils = render(
//     <Checkbox isDisabled>
//       <CheckboxHiddenInput data-testid="input" />
//       <CustomCheckbox>Checkbox</CustomCheckbox>
//     </Checkbox>,
//   )

//   const input = utils.getByTestId("input")
//   const checkbox = utils.getByText("Checkbox")

//   expect(input).toBeDisabled()
//   expect(checkbox).toHaveAttribute("data-disabled")

//   userEvent.click(checkbox)

//   expect(input).not.toBeChecked()
//   expect(checkbox).not.toHaveAttribute("data-checked")
// })

// test("indeterminate state", () => {
//   const { getByText } = render(
//     <Checkbox isIndeterminate>
//       <CheckboxHiddenInput data-testid="input" />
//       <CustomCheckbox>Checkbox</CustomCheckbox>
//     </Checkbox>,
//   )

//   const checkbox = getByText("Checkbox")
//   expect(checkbox).toHaveAttribute("data-mixed")
// })

// test("Controlled - should check and uncheck", () => {
//   let checked = false
//   const onChange = jest.fn(e => (checked = e.target.checked))

//   const Component = (props: CheckboxHookProps) => {
//     return (
//       <Checkbox {...props}>
//         <CheckboxHiddenInput data-testid="input" />
//         <CustomCheckbox data-testid="checkbox">
//           This is custom checkbox
//         </CustomCheckbox>
//       </Checkbox>
//     )
//   }

//   const { getByTestId, rerender } = render(
//     <Component isChecked={checked} onChange={onChange} />,
//   )

//   const input = getByTestId("input")
//   const checkbox = getByTestId("checkbox")

//   expect(input).not.toHaveAttribute("data-checked")

//   userEvent.click(checkbox)
//   expect(onChange).toHaveBeenCalled()

//   rerender(<Component isChecked={checked} onChange={onChange} />)

//   expect(onChange).toHaveBeenCalled()
//   expect(checkbox).toHaveAttribute("data-checked")

//   userEvent.click(checkbox)
//   expect(onChange).toHaveBeenCalled()

//   rerender(<Component isChecked={checked} onChange={onChange} />)

//   expect(onChange).toHaveBeenCalled()
//   expect(checkbox).not.toHaveAttribute("data-checked")
// })
