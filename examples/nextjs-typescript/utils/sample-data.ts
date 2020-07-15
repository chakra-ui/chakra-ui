import faker from "faker"

//  Set seed so generated data is always the same
faker.seed(5)

const NO_PROPERTIES_TO_GENERATE = 7

const additionalValues = [
  { title: "Modern home on the seafront", img: "" },
  { title: "Stylish classic in the heart of town", img: "" },
  { title: "Local favourite great for groups", img: "" },
  { title: "Comfortable town house with garden", img: "" },
  { title: "Delightful small converted barn", img: "" },
  { title: "Attractive building in a country setting", img: "" },
  { title: "Luxurious, picture perfect property", img: "" },
]

const generateProperty = () => {
  const overrides = faker.helpers.randomize(additionalValues)
  return {
    id: faker.random.uuid(),
    isNew: faker.random.boolean(),
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: faker.random.number({ min: 1, max: 6 }),
    baths: faker.random.number({ min: 1, max: 3 }),
    title: overrides.title,
    formattedPrice: faker.commerce.price(1000, 5000, 2, "$"),
    reviewCount: faker.random.number(100),
    rating: faker.random.number({ min: 1, max: 5, precision: 2 }),
  }
}

export const properties = Array(NO_PROPERTIES_TO_GENERATE)
  .fill("")
  .map(generateProperty)
