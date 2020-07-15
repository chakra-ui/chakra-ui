import { Heading, Wrap } from "@chakra-ui/core"
import { Layout } from "../../components/Layout"
import { properties } from "../../utils/sample-data"
import { PropertySummary } from "../../components/PropertySummary"
import { NextChakraLink } from "../../components/NextChakraLink"

const PropertiesPage = () => (
  <Layout title="Next.js + TypeScript example | View properties">
    <Heading mb={4}>Available this weekend</Heading>
    <Wrap>
      {properties.map((property) => (
        <NextChakraLink
          key={property.id}
          href="/properties/[id]"
          as={`/properties/${property.id}`}
        >
          <PropertySummary property={property} />
        </NextChakraLink>
      ))}
    </Wrap>
  </Layout>
)

export default PropertiesPage
