import { Button, Marquee, useMarquee } from "@chakra-ui/react"
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

const items = [
  { icon: IoLogoBehance, label: "Behance", color: "#1769ff" },
  { icon: IoLogoFigma, label: "Figma", color: "#F24E1E" },
  { icon: IoLogoTwitter, label: "Twitter", color: "#1da1f2" },
  { icon: IoLogoLinkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: IoLogoReact, label: "React", color: "#61dafb" },
  { icon: IoLogoNodejs, label: "Node.js", color: "#339933" },
  { icon: IoLogoPython, label: "Python", color: "#3776ab" },
  { icon: IoLogoAngular, label: "Angular", color: "#dd0031" },
  { icon: IoLogoAmazon, label: "Amazon", color: "#FF9900" },
  { icon: IoLogoGitlab, label: "GitLab", color: "#fc6d26" },
  { icon: IoLogoVimeo, label: "Vimeo", color: "#1ab7ea" },
  { icon: IoLogoVue, label: "Vue.js", color: "#42b883" },
  { icon: IoLogoJavascript, label: "JavaScript", color: "#f7df1e" },
  { icon: IoLogoAndroid, label: "Android", color: "#3ddc84" },
]

export const MarqueeProgrammaticControl = () => {
  const marquee = useMarquee()

  return (
    <>
      <Marquee.RootProvider value={marquee}>
        <Marquee.Viewport>
          <Marquee.Content
            style={{
              animationPlayState: marquee.paused ? "paused" : "running",
            }}
          >
            {items.map((item, i) => (
              <Marquee.Item key={i} style={{ padding: "0 2rem" }}>
                {item.icon && (
                  <item.icon
                    size="3rem"
                    aria-label={item.label}
                    color={item.color}
                  />
                )}
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <Button
          colorScheme="red"
          variant="solid"
          onClick={() => marquee.pause()}
        >
          Pause
        </Button>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={() => marquee.resume()}
        >
          Resume
        </Button>
      </div>
    </>
  )
}
