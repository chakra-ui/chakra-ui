import { docsConfig } from "@/docs.config"
import { LinkButton, LinkButtonProps } from "compositions/ui/link-button"
import { FaHeart } from "react-icons/fa"

export const SponsorButton = (props: LinkButtonProps) => (
  <LinkButton
    href={docsConfig.donationUrl}
    target="_blank"
    aria-label="Sponsor Chakra UI on Open Collective"
    rel="noopener noreferrer"
    variant="ghost"
    size="sm"
    {...props}
    _icon={{
      color: "red.500",
    }}
  >
    <FaHeart />
    Sponsor
  </LinkButton>
)
