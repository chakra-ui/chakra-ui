interface User {
  name: string
  image: string
  url: string
  type: "company" | "project" | "portfolio"
}

const users: User[] = [
  {
    name: "Usability Hub",
    image: "/logos/usability-hub.png",
    url: "https://usabilityhub.com/",
    type: "company",
  },
  {
    name: "Tradeling",
    image: "/logos/tradeling.svg",
    url: "https://tradeling.com/",
    type: "company",
  },
  {
    name: "Codelify",
    // issue with downloading logo locally
    image:
      "https://res.cloudinary.com/codelify/image/upload/f_auto,q_auto/v1583158030/logo-green-grad_b5mjgi.svg",
    url: "https://codelify.dev/",
    type: "company",
  },
  {
    name: "NullServe",
    image: "/logos/null-serve.svg",
    url: "https://nullserve.com/",
    type: "company",
  },
  {
    name: "Virus Cafe",
    image: "🥰 Virus Cafe",
    url: "https://virus.cafe/",
    type: "project",
  },
  {
    name: "Dokz",
    image: "/logos/dokz.svg",
    url: "https://dokz.site/",
    type: "project",
  },
  {
    name: "Cataloged",
    image: "Cataloged",
    url: "https://cataloged.co/",
    type: "company",
  },
  {
    name: "Common Grounds",
    image: "Common Grounds",
    url: "https://www.commongrounds.co/",
    type: "company",
  },
  {
    name: "Meeshkan",
    image: "/logos/meeshkan.svg",
    url: "https://meeshkan.com/",
    type: "company",
  },
  {
    name: "Tuteria",
    image: "/logos/tuteria.png",
    url: "https://tuteria.com/",
    type: "company",
  },
]

export default users
