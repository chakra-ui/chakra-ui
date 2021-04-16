/**
 * @todo add Roadmap.sh here
 */
interface User {
  name: string
  image: string
  url: string
  type: "company" | "project" | "portfolio"
}

const users: User[] = [
  {
    name: "EchoBinde",
    image: "/logos/echobind.svg",
    url: "https://echobind.com/",
    type: "company",
  },
  {
    name: "Lattice",
    image:
      "https://assets-global.website-files.com/5b5a66e9f3166b36708705fa/5d9a24a24aefbe7193967c21_logo.svg",
    url: "https://lattice.com/",
    type: "company",
  },
  {
    name: "DataStory",
    image: "/logos/datastory.svg",
    url: "https://www.datastory.org/",
    type: "company",
  },
  {
    name: "Shogun",
    image:
      "https://assets-global.website-files.com/6019b5ca8a4b1bb6fcbcdbe1/603965ab496482ca15b0ecfb_shogunlogo-black.svg",
    url: "https://getshogun.com/",
    type: "company",
  },
  {
    name: "Brikl",
    image:
      "https://www.brikl.com/hs-fs/hubfs/Brand%20Assets/BRIKL-LOGO-removebg-preview.png?width=667&height=231&name=BRIKL-LOGO-removebg-preview.png",
    url: "https://www.brikl.com/",
    type: "company",
  },
  {
    name: "Usability Hub",
    image: "/logos/usability-hub.png",
    url: "https://usabilityhub.com/",
    type: "company",
  },
  {
    name: "Shoot Proof",
    image:
      "https://assets-global.website-files.com/5e5fc9d32793216b14649599/5ec7e43bf972fae797ba4ffb_ShootProof%20Logo%20-%20Blue%20nav.png",
    url: "https://www.shootproof.com/hp",
    type: "company",
  },
  {
    name: "Tuteria",
    image: "/logos/tuteria.png",
    url: "https://tuteria.com/",
    type: "company",
  },
  {
    name: "Virus Cafe",
    image: "🥰 Virus Cafe",
    url: "https://virus.cafe/",
    type: "project",
  },
]

export default users
