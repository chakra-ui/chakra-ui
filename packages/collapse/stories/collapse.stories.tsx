import * as React from "react"
import { Collapse } from "../src"
import { useDisclosure } from "@chakra-ui/hooks"

export default {
  title: "Collapse",
}

export function SampleSpring() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <React.Fragment>
      <button onClick={onToggle}>Click</button>
      <Collapse isOpen={isOpen}>
        <div style={{ padding: 20, background: "tomato", color: "white" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </Collapse>
    </React.Fragment>
  )
}

export function WithStringAsChild() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <React.Fragment>
      <button style={{ marginBottom: 10 }} onClick={onToggle}>
        Click
      </button>
      <Collapse isOpen={isOpen}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
      </Collapse>
    </React.Fragment>
  )
}

export function WithStartingHeight() {
  const [show, setShow] = React.useState(false)

  const handleToggle = () => setShow(!show)

  return (
    <>
      <Collapse startingHeight={20} isOpen={show}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident. Anim pariatur
        cliche reprehenderit, enim eiusmod high life accusamus terry richardson
        ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
        cred nesciunt sapiente ea proident. Anim pariatur cliche reprehenderit,
        enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
        sapiente ea proident.
      </Collapse>
      <button onClick={handleToggle}>{show ? "Collapse" : "Expand"}</button>
    </>
  )
}
