import faker from "faker"
import { Property } from "../interfaces/Property"

//  Set seed so generated data is always the same
faker.seed(4)

const NO_PROPERTIES_TO_GENERATE = 15

const additionalValues = [
  {
    title: "Modern home on the seafront",
    img:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=634&h=400",
  },
  {
    title: "Stylish classic in the heart of town",
    img:
      "https://images.unsplash.com/photo-1509660933844-6910e12765a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80&h=400",
  },
  {
    title: "Local favourite great for groups",
    img:
      "https://images.unsplash.com/photo-1585351923007-bf6a01cb19de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80&h=400",
  },
  {
    title: "Comfortable town house with garden",
    img:
      "https://images.unsplash.com/photo-1564357645071-9726b526a8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&h=400&q=80",
  },
  {
    title: "Delightful small converted barn",
    img:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80&h=400",
  },
  {
    title: "Attractive building in a country setting",
    img:
      "https://images.unsplash.com/photo-1562182384-08115de5ee97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80&h=400",
  },
  {
    title: "Luxurious, instagram friendly",
    img:
      "https://images.unsplash.com/photo-1556821862-33ec0be5c2c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80&h=400",
  },
]

const generateProperty = () => {
  const overrides = faker.helpers.randomize(additionalValues)
  return {
    id: faker.random.uuid(),
    isNew: faker.random.boolean(),
    imageUrl: overrides.img,
    //  empty - image adds no value for the user
    imageAlt: "",
    beds: faker.random.number({ min: 1, max: 6 }),
    baths: faker.random.number({ min: 1, max: 3 }),
    title: overrides.title,
    formattedPrice: faker.commerce.price(1000, 5000, 2, "£"),
    reviewCount: faker.random.number(100),
    rating: faker.random.number({ min: 1, max: 5, precision: 2 }),
    description: faker.lorem.paragraphs(2, "\n\n"),
  }
}

export const properties: Property[] = Array(NO_PROPERTIES_TO_GENERATE)
  .fill("")
  .map(generateProperty)
