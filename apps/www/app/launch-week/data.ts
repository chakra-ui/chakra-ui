import {
  LuCode,
  LuExternalLink,
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
  image: string
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
    image: "/images/mcp-server.png",
    description:
      "Introducing the Chakra UI MCP Server, a brand new way to connect Chakra UI to AI tools using Model Context Protocol. It lets LLMs like Claude use Chakra UI tokens to create scalable applications and design systems.",
    icon: LuWandSparkles,
    color: "teal",
    features: [
      "Smarter design-to-code handoffs",
      "AI tools that know your theme",
      "Developer workflows that feel... magical",
    ],
    cards: [
      {
        title: "Blog Post",
        url: "/blog/10-announcing-chakra-ui-mcp-server",
        icon: LuVideo,
      },
      {
        title: "Docs - MCP Server",
        url: "/docs/get-started/ai/mcp-server",
        icon: LuExternalLink,
      },
    ],
  },
  // {
  //   day: "Day 2",
  //   date: "Thursday, July 31",
  //   title: "Developer Experience Day",
  //   subtitle: "Faster dev time",
  //   description:
  //     "Here's what's coming: New Components like Command Palette for quick actions & navigation via keyboard, and Code Block with syntax-highlighted code with Chakra theming.",
  //   icon: LuCode,
  //   color: "blue",
  //   features: [
  //     "Open any example in Stackblitz",
  //     "Copy .llm.mdx files for every component",
  //     "Plug Chakra into your AI tools",
  //   ],
  //   cards: [
  //     {
  //       title: "New Components",
  //       description: "Command Palette & Code Block",
  //       icon: LuVideo,
  //     },
  //     {
  //       title: "Enhanced Docs",
  //       description: "Stackblitz & AI-ready files",
  //       icon: LuExternalLink,
  //     },
  //   ],
  // },
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
