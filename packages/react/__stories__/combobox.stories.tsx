import Combobox from "../src/components/combobox/combobox"

export default {
  title: "Components/Combobox",
  component: Combobox,
}

const Template = (args) => <Combobox {...args} />

export const Default = Template.bind({})
Default.args = {
  options: ["Apple", "Orange", "Banana", "Pear"],
}
