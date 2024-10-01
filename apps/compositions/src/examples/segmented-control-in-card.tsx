import { Button, Card, Heading } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import { SegmentedControl } from "compositions/ui/segmented-control"
import { LuSearch } from "react-icons/lu"

export const SegmentedControlInCard = () => {
  return (
    <Card.Root width="320px">
      <Card.Header>
        <Heading size="lg">Find your dream home</Heading>
      </Card.Header>
      <Card.Body gap="6">
        <Field label="Bedrooms">
          <SegmentedControl
            defaultValue="Any"
            items={["Any", "1", "2", "3", "3+"]}
          />
        </Field>
        <Field label="Beds">
          <SegmentedControl defaultValue="1" items={["Any", "1", "2", "2+"]} />
        </Field>
        <Field label="Bathrooms">
          <SegmentedControl defaultValue="3" items={["Any", "1", "2", "3"]} />
        </Field>
      </Card.Body>
      <Card.Footer justifyContent="space-between" mt="3">
        <Button variant="surface">Reset</Button>
        <Button>
          <LuSearch /> 20 results
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
