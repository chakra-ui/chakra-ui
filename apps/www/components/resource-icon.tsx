import { Icon } from "@chakra-ui/react"
import {
  IoDocumentText,
  IoLink,
  IoLogoGithub,
  IoLogoNpm,
} from "react-icons/io5"
import { LuFigma, LuGlobe, LuYoutube } from "react-icons/lu"

interface ResourceIconProps {
  type:
    | "github"
    | "source"
    | "npm"
    | "docs"
    | "storybook"
    | "recipe"
    | "ark"
    | "figma"
    | "site"
    | "youtube"
    | (string & {})
}

const IoLogoStorybook = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="1em"
      width="1em"
      viewBox="0 0 32 32"
      fill="currentColor"
      {...props}
    >
      <path d="m21.786.318-.161 3.615c-.005.203.229.328.391.203l1.411-1.068 1.198.932c.156.104.365 0 .375-.188l-.135-3.677 1.776-.135c.922-.063 1.708.672 1.708 1.599v28.802c0 .917-.766 1.646-1.682 1.599l-21.469-.958c-.833-.036-1.505-.708-1.531-1.547l-1-26.401c-.052-.885.62-1.646 1.505-1.693l17.599-1.109zm-4.093 12.083c0 .625 4.214.318 4.786-.109 0-4.266-2.292-6.521-6.479-6.521-4.198 0-6.531 2.297-6.531 5.724 0 5.932 8 6.036 8 9.276 0 .938-.427 1.469-1.401 1.469-1.281 0-1.802-.651-1.734-2.88 0-.479-4.865-.641-5.026 0-.359 5.375 2.974 6.932 6.797 6.932 3.724 0 6.63-1.984 6.63-5.573 0-6.359-8.135-6.188-8.135-9.333 0-1.292.964-1.464 1.505-1.464.604 0 1.667.094 1.589 2.49z" />
    </svg>
  )
}

const IoLogoArk = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="1.2em"
      height="1.2em"
      viewBox="0 0 242 242"
      fill="currentColor"
      style={{ scale: "1.2" }}
      {...props}
    >
      <path d="M109.577 101.869C101.049 126.756 92.5453 151.54 84.0999 176.344C83.6351 177.709 83.0286 178.127 81.5853 178.122C65.6442 178.064 49.7028 178.086 33.7614 178.086C33.2431 178.086 32.7248 178.085 32 178.085C46.4893 135.275 60.9102 92.6656 75.3404 50.0294C75.971 50.0294 76.5035 50.0294 77.036 50.0294C106.373 50.0292 135.711 50.0369 165.048 50C166.216 49.9985 166.755 50.3056 167.146 51.4246C181.605 92.8214 196.097 134.207 210.583 175.594C210.713 175.965 210.819 176.345 211 176.924C185.792 176.924 160.701 176.924 135.445 176.924C135.445 189.057 135.445 201.003 135.445 212.949C135.341 212.966 135.237 212.983 135.132 213C125.259 185.153 115.387 157.305 105.44 129.251C106.055 129.198 106.555 129.118 107.054 129.118C117.682 129.111 128.309 129.112 138.937 129.112C142.059 129.112 142.459 128.574 141.435 125.687C135.641 109.346 129.841 93.0069 124.043 76.6675C123.406 74.8705 122.803 73.06 122.104 71.287C121.916 70.8118 121.709 70.0387 121.087 70.0387C120.466 70.0387 120.256 70.846 120.086 71.3342C117.893 77.6121 115.746 83.9057 113.587 90.1953C112.263 94.0539 110.939 97.9126 109.577 101.869Z" />
    </svg>
  )
}

export const ResourceIcon = (props: ResourceIconProps) => {
  return (
    <Icon fontSize="lg" color="fg.muted">
      {(() => {
        switch (props.type) {
          case "github":
          case "source":
          case "recipe":
            return <IoLogoGithub />
          case "npm":
            return <IoLogoNpm />
          case "docs":
            return <IoDocumentText />
          case "storybook":
            return <IoLogoStorybook />
          case "ark":
            return <IoLogoArk />
          case "figma":
            return <LuFigma />
          case "site":
            return <LuGlobe />
          case "youtube":
            return <LuYoutube />
          default:
            return <IoLink />
        }
      })()}
    </Icon>
  )
}
