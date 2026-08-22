import { Table } from "@chakra-ui/react"

export const TableWithStickyHeaderAndColumn = () => {
  return (
    <Table.ScrollArea h="500px" borderWidth="1px" rounded="md" maxW="2xl">
      <Table.Root
        size="sm"
        stickyHeader
        css={{
          "& [data-sticky]": {
            position: "sticky",
            zIndex: 1,
            bg: "bg",

            _after: {
              content: '""',
              position: "absolute",
              pointerEvents: "none",
              top: "0",
              bottom: "-1px",
              width: "32px",
            },
          },

          "& [data-sticky=end]": {
            _after: {
              insetInlineEnd: "0",
              translate: "100% 0",
              shadow: "inset 8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },

          "& [data-sticky=start]": {
            _after: {
              insetInlineStart: "0",
              translate: "-100% 0",
              shadow: "inset -8px 0px 8px -8px rgba(0, 0, 0, 0.16)",
            },
          },

          "& thead tr": {
            shadow: "0 1px 0 0 {colors.border}",
            "&:has(th[data-sticky])": {
              zIndex: 2,
            },
          },
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader data-sticky="end" minW="160px" left="0">
              Product
            </Table.ColumnHeader>
            <Table.ColumnHeader minW="400px">Category</Table.ColumnHeader>
            <Table.ColumnHeader minW="200px" textAlign="end">
              Price
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell data-sticky="end" left="0">
                {item.name}
              </Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell textAlign="end">{item.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

const items = [
  { id: 1, name: "Headphones", category: "Electronics", price: 834.12 },
  { id: 2, name: "Desk Chair", category: "Furniture", price: 245.88 },
  { id: 3, name: "Microwave", category: "Home Appliances", price: 379.26 },
  { id: 4, name: "Backpack", category: "Accessories", price: 112.47 },
  { id: 5, name: "Football", category: "Sports", price: 95.14 },
  { id: 6, name: "Smartphone", category: "Electronics", price: 921.63 },
  { id: 7, name: "Wrist Watch", category: "Accessories", price: 418.52 },
  { id: 8, name: "T-Shirt", category: "Clothing", price: 35.29 },
  { id: 9, name: "Vacuum Cleaner", category: "Home Appliances", price: 601.22 },
  { id: 10, name: "Lamp", category: "Furniture", price: 157.88 },
  { id: 11, name: "Drone", category: "Electronics", price: 836.15 },
  { id: 12, name: "Perfume", category: "Beauty", price: 128.9 },
  { id: 13, name: "Camping Tent", category: "Outdoors", price: 458.4 },
  { id: 14, name: "Cookware Set", category: "Home Appliances", price: 292.86 },
  { id: 15, name: "Camera", category: "Electronics", price: 792.54 },
  { id: 16, name: "Sneakers", category: "Clothing", price: 154.61 },
  { id: 17, name: "Monitor", category: "Electronics", price: 348.57 },
  { id: 18, name: "Gaming Console", category: "Electronics", price: 896.01 },
  { id: 19, name: "Keyboard", category: "Electronics", price: 94.71 },
  { id: 20, name: "Sofa", category: "Furniture", price: 719.33 },
  { id: 21, name: "Tablet", category: "Electronics", price: 612.57 },
  { id: 22, name: "Action Figure", category: "Toys", price: 73.49 },
  { id: 23, name: "Smartwatch", category: "Electronics", price: 482.46 },
  { id: 24, name: "Tent", category: "Outdoors", price: 623.3 },
  { id: 25, name: "Cookware Set", category: "Home Appliances", price: 257.38 },
  { id: 26, name: "Helmet", category: "Sports", price: 88.26 },
  { id: 27, name: "Hair Dryer", category: "Beauty", price: 164.79 },
  { id: 28, name: "Lamp", category: "Furniture", price: 122.1 },
  {
    id: 29,
    name: "Electric Kettle",
    category: "Home Appliances",
    price: 69.42,
  },
  { id: 30, name: "Sneakers", category: "Clothing", price: 182.13 },
  { id: 31, name: "Drone", category: "Electronics", price: 934.72 },
  { id: 32, name: "Coffee Maker", category: "Home Appliances", price: 148.99 },
  { id: 33, name: "Backpack", category: "Accessories", price: 81.22 },
  { id: 34, name: "Microwave", category: "Home Appliances", price: 399.53 },
  { id: 35, name: "T-Shirt", category: "Clothing", price: 45.33 },
  {
    id: 36,
    name: "Vacuum Cleaner",
    category: "Home Appliances",
    price: 552.87,
  },
]
