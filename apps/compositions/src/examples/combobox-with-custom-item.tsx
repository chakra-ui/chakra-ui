"use client"

import {
  Combobox,
  HStack,
  Image,
  Portal,
  Span,
  Stack,
  useComboboxContext,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

function ComboboxValue() {
  const combobox = useComboboxContext()
  const selectedItems = combobox.selectedItems as (typeof items)[number][]
  return (
    <Stack mt="2">
      {selectedItems.map((item) => (
        <HStack key={item.value} textStyle="sm" p="1" borderWidth="1px">
          <Image
            boxSize="10"
            p="2"
            src={item.logo}
            alt={item.label + " logo"}
          />
          <span>{item.label}</span>
        </HStack>
      ))}
    </Stack>
  )
}

export const ComboboxWithCustomItem = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="320px"
      placeholder="Example: Audi"
      multiple
      closeOnSelect
    >
      <Combobox.Label>Search and select car brands</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <ComboboxValue />
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                <Image boxSize="5" src={item.logo} alt={item.label + " logo"} />
                <Span flex="1">{item.label}</Span>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

export const items = [
  {
    label: "Audi",
    value: "audi",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/audi-logo.png",
  },
  {
    label: "BMW",
    value: "bmw",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/bmw-logo.png",
  },
  {
    label: "Citroen",
    value: "citroen",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/citroen-logo.png",
  },
  {
    label: "Dacia",
    value: "dacia",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/dacia-logo.png",
  },
  {
    label: "Fiat",
    value: "fiat",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/fiat-logo.png",
  },
  {
    label: "Ford",
    value: "ford",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/ford-logo.png",
  },
  {
    label: "Ferrari",
    value: "ferrari",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/ferrari-logo.png",
  },
  {
    label: "Honda",
    value: "honda",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/honda-logo.png",
  },
  {
    label: "Hyundai",
    value: "hyundai",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/hyundai-logo.png",
  },
  {
    label: "Jaguar",
    value: "jaguar",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/jaguar-logo.png",
  },
  {
    label: "Jeep",
    value: "jeep",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/jeep-logo.png",
  },
  {
    label: "Kia",
    value: "kia",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/kia-logo.png",
  },
  {
    label: "Land Rover",
    value: "land rover",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/land-rover-logo.png",
  },
  {
    label: "Mazda",
    value: "mazda",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mazda-logo.png",
  },
  {
    label: "Mercedes",
    value: "mercedes",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mercedes-logo.png",
  },
  {
    label: "Mini",
    value: "mini",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mini-logo.png",
  },
  {
    label: "Mitsubishi",
    value: "mitsubishi",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/mitsubishi-logo.png",
  },
  {
    label: "Nissan",
    value: "nissan",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/nissan-logo.png",
  },
  {
    label: "Opel",
    value: "opel",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/opel-logo.png",
  },
  {
    label: "Peugeot",
    value: "peugeot",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/peugeot-logo.png",
  },
  {
    label: "Porsche",
    value: "porsche",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/porsche-logo.png",
  },
  {
    label: "Renault",
    value: "renault",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/renault-logo.png",
  },
  {
    label: "Saab",
    value: "saab",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/saab-logo.png",
  },
  {
    label: "Skoda",
    value: "skoda",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/skoda-logo.png",
  },
  {
    label: "Subaru",
    value: "subaru",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/subaru-logo.png",
  },
  {
    label: "Suzuki",
    value: "suzuki",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/suzuki-logo.png",
  },
  {
    label: "Toyota",
    value: "toyota",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/toyota-logo.png",
  },
  {
    label: "Volkswagen",
    value: "volkswagen",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/volkswagen-logo.png",
  },
  {
    label: "Volvo",
    value: "volvo",
    logo: "https://s3.amazonaws.com/cdn.formk.it/example-assets/car-brands/volvo-logo.png",
  },
]
