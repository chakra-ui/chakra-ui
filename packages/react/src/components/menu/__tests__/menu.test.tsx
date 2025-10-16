import * as React from "react"
import { render } from "@testing-library/react"
import {
	MenuRoot,
	MenuTrigger,
	MenuPositioner,
	MenuContent,
	MenuItem,
} from "../menu"

describe("Menu a11y", () => {
	it("adds aria-current when item is active", () => {
		const { getByText } = render(
			<MenuRoot>
				<MenuTrigger>Open</MenuTrigger>
				<MenuPositioner>
					<MenuContent>
						<MenuItem isActive>Dashboard</MenuItem>
					</MenuContent>
				</MenuPositioner>
			</MenuRoot>,
		)

		expect(getByText("Dashboard")).toHaveAttribute("aria-current", "page")
	})
})


