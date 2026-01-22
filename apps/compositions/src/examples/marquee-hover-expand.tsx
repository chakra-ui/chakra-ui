import { Box, Center, Marquee } from "@chakra-ui/react"
import {
  IoLogoAmazon,
  IoLogoAndroid,
  IoLogoAngular,
  IoLogoBehance,
  IoLogoFigma,
  IoLogoGitlab,
  IoLogoJavascript,
  IoLogoLinkedin,
  IoLogoNodejs,
  IoLogoPython,
  IoLogoReact,
  IoLogoTwitter,
  IoLogoVimeo,
  IoLogoVue,
} from "react-icons/io5"

const logos = [
  { icon: IoLogoBehance, color: "#1769ff" },
  { icon: IoLogoFigma, color: "#F24E1E" },
  { icon: IoLogoTwitter, color: "#1da1f2" },
  { icon: IoLogoLinkedin, color: "#0077b5" },
  { icon: IoLogoReact, color: "#61dafb" },
  { icon: IoLogoNodejs, color: "#339933" },
  { icon: IoLogoPython, color: "#3776ab" },
  { icon: IoLogoAngular, color: "#dd0031" },
  { icon: IoLogoAmazon, color: "#FF9900" },
  { icon: IoLogoGitlab, color: "#fc6d26" },
  { icon: IoLogoVimeo, color: "#1ab7ea" },
  { icon: IoLogoVue, color: "#42b883" },
  { icon: IoLogoJavascript, color: "#f7df1e" },
  { icon: IoLogoAndroid, color: "#3ddc84" },
]

export const MarqueeHoverExpand = () => {
  return (
    <Box py="20">
      <Marquee.Root pauseOnInteraction>
        <Marquee.Viewport>
          <Marquee.Content>
            {logos.map((src, i) => (
              <Marquee.Item
                key={i}
                height={"140px"}
                display={"flex"}
                alignItems="center"
                justifyContent="center"
              >
                <Center
                  boxSize="100px"
                  bg="gray.100"
                  borderRadius="xl"
                  cursor="pointer"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.2)",
                    boxShadow: "sm",
                    zIndex: 10,
                    bg: "white",
                  }}
                >
                  <Box as={src.icon} color={src.color} w="60px" h="60px" />
                </Center>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Box>
  )
}
