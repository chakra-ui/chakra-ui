import { HTMLChakraProps, SystemStyleObject, chakra } from "@chakra-ui/system"

import { useProgressStyles } from "./progress"

export interface ProgressLabelProps extends HTMLChakraProps<"div"> {}

/**
 * ProgressLabel is used to show the numeric value of the progress.
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressLabel: React.FC<ProgressLabelProps> = (props) => {
  const styles = useProgressStyles()
  const labelStyles: SystemStyleObject = {
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    ...styles.label,
  }
  return <chakra.div {...props} __css={labelStyles} />
}

ProgressLabel.displayName = "ProgressLabel"
