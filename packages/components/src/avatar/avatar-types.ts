import { SystemProps } from "@chakra-ui/system"

export interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   *
   * @default false
   */
  showBorder?: boolean
  /**
   * The badge in the bottom right corner of the avatar.
   */
  children?: React.ReactNode
  /**
   * The image url of the `Avatar`
   */
  src?: string
  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string
  /**
   * Defines loading strategy
   */
  loading?: "eager" | "lazy"
  /**
   * The border color of the avatar
   * @type SystemProps["borderColor"]
   */
  borderColor?: SystemProps["borderColor"]
  /**
   * Function called when image failed to load
   */
  onError?: () => void
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   * @type React.ReactElement
   */
  icon?: React.ReactElement
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string
  /**
   * Defining which referrer is sent when fetching the resource.
   * @type React.HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy
}
