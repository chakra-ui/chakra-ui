import {
  LuCode,
  LuExternalLink,
  LuFileText,
  LuUsers,
  LuVideo,
  LuWandSparkles,
  LuYoutube,
} from "react-icons/lu"

export interface LaunchItem {
  day: string
  date: string
  title: string
  subtitle: string
  description: string
  player: {
    image: string
    title: string
    description: string
    url: string
  }
  icon: React.ElementType
  color: string
  features: string[]
  cards: {
    title: string
    url: string
    icon: React.ElementType
  }[]
}

export const LAUNCH_DATA: LaunchItem[] = [
  {
    day: "Day 1",
    date: "Wednesday, July 30",
    title: "Chakra UI MCP Server",
    subtitle: "AI agent meets Chakra UI",
    player: {
      image: "/images/chakra-ui-mcp.png",
      title: "MCP Server Launch",
      description:
        "A brand new way to connect Chakra UI to AI tools using Model Context Protocol",
      url: "https://youtu.be/C5XKWTeyY3Q",
    },
    description:
      "Introducing the Chakra UI MCP Server, a brand new way to connect Chakra UI to AI tools using Model Context Protocol. It lets LLMs like Claude use Chakra UI tokens to create scalable applications and design systems.",
    icon: LuWandSparkles,
    color: "teal",
    features: [
      "Instant answers in your IDE",
      "Smart design-to-code handoffs",
      "Build components with AI",
    ],
    cards: [
      {
        title: "Blog Post",
        url: "/blog/10-announcing-chakra-ui-mcp-server",
        icon: LuFileText,
      },
      {
        title: "Docs - MCP Server",
        url: "/docs/get-started/ai/mcp-server",
        icon: LuExternalLink,
      },
    ],
  },
  {
    day: "Day 2",
    date: "Thursday, July 31",
    title: "Developer Experience Day",
    subtitle: "Faster dev time",
    description:
      "Improving developer experience with new tools and smoother workflows. From Stackblitz integration to AI-ready docs, we're making it easier than ever to build with Chakra UI.",
    icon: LuCode,
    color: "blue",
    features: [
      "Open any example in Stackblitz",
      "Copy .llm.mdx files for every component",
      "New Code Block component",
    ],
    player: {
      url: "https://youtu.be/cvLrBEYlCEg",
      image: "/images/chakra-ui-mcp.png",
      title: "New Tools & Smoother Workflows",
      description:
        "Code Block components, Stackblitz integration, and AI-ready docs",
    },
    cards: [
      {
        title: "New Components",
        url: "Code Block",
        icon: LuVideo,
      },
      {
        title: "Enhanced Docs",
        url: "Stackblitz & AI-ready files",
        icon: LuExternalLink,
      },
    ],
  },
  // {
  //   day: "Day 3",
  //   date: "Friday, August 1",
  //   title: "Community Day",
  //   subtitle: "Time to wrap it up together 🎉",
  //   description:
  //     "We're going live on YouTube to recap everything we launched, give live demos, and invite YOU (the community!) to ask questions, share what you're building, or just vibe with us.",
  //   icon: LuUsers,
  //   color: "purple",
  //   features: [
  //     "Recap everything we launched",
  //     "Give live demos",
  //     "Community Q&A & showcases",
  //     "Giveaways & dev shoutouts",
  //   ],
  //   player: {
  //     image: "/images/chakra-ui-mcp.png",
  //     title: "Live Community Celebration",
  //     description:
  //       "Join us on YouTube for live demos, Q&A, giveaways, and community showcases",
  //   },
  //   cards: [
  //     {
  //       title: "YouTube Live",
  //       url: "Interactive community celebration",
  //       icon: LuYoutube,
  //     },
  //     {
  //       title: "Giveaways",
  //       url: "Amazing prizes for the community",
  //       icon: LuExternalLink,
  //     },
  //   ],
  // },
]
