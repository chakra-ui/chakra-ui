import { Button, Card, Field, Heading, SegmentGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const SegmentedControlInCard = () => {
  return (
    <Card.Root width="320px">
      <Card.Header>
        <Heading size="lg">Find your dream home</Heading>
      </Card.Header>
      <Card.Body gap="6">
        <Field.Root>
          <Field.Label>Bedrooms</Field.Label>
          <SegmentGroup.Root defaultValue="Any">
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={["Any", "1", "2", "3", "3+"]} />
          </SegmentGroup.Root>
        </Field.Root>
        <Field.Root>
          <Field.Label>Beds</Field.Label>
          <SegmentGroup.Root defaultValue="1">
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={["Any", "1", "2", "2+"]} />
          </SegmentGroup.Root>
        </Field.Root>
        <Field.Root>
          <Field.Label>Bathrooms</Field.Label>
          <SegmentGroup.Root defaultValue="3">
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={["Any", "1", "2", "3"]} />
          </SegmentGroup.Root>
        </Field.Root>
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
