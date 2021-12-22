import * as React from "react"
import { useBoolean } from "@chakra-ui/hooks"
import { Bar } from "react-chartjs-2"

import { Collapse, CollapseProps } from "../src/collapse"

export default {
  title: "Components / Transition / Collapse",
}

export const BarChartExample = () => {
  const [open, { toggle }] = useBoolean()
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <>
      <button onClick={toggle}>Toggle Collapse</button>
      <Collapse in={open} unmountOnExit>
        <Bar type="bar" data={data} options={options} />
      </Collapse>
    </>
  )
}

const CollapseExample = (props: CollapseProps) => {
  const [open, { toggle }] = useBoolean()
  return (
    <>
      <button onClick={toggle}>Toggle Collapse</button>
      <Collapse in={open} {...props}>
        <div
          style={{
            background: "red",
            padding: 30,
            marginTop: 8,
          }}
        >
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
    </>
  )
}

export const Basic = () => <CollapseExample />

export const WithStartingHeight = () => <CollapseExample startingHeight={40} />

export const WithUnmount = () => <CollapseExample unmountOnExit />

export const WithoutOpacityTransition = () => (
  <CollapseExample animateOpacity={false} />
)

export const WithInitialIn = () => (
  <Collapse in>
    <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  </Collapse>
)
