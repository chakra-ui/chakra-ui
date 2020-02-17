import * as React from "react";
import { storiesOf } from "@storybook/react";
import useCollapse from "./Collapse";

const stories = storiesOf("Collapse", module);

function Example() {
  const collapse = useCollapse({
    collapseStyles: {
      opacity: 0.01,
      transitionProperty: "opacity, height, transform",
      transform: "translateY(-0.1rem)",
    },
    expandStyles: {
      opacity: 1,
      transitionProperty: "opacity, height, transform",
      transform: "translateY(0)",
    },
  });
  return (
    <>
      <button {...collapse.toggle}>Toggle</button>
      <div {...collapse.collapse}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </>
  );
}
stories.add("basic", () => <Example />);

// stories.add("changing static height", () => {
//   function Example() {
//     const [show, setShow] = React.useState(false);

//     const on = () => setShow(!show);

//     return (
//       <>
//         <Collapse startingHeight={20} isOpen={show}>
//           Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
//           terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
//           labore wes anderson cred nesciunt sapiente ea proident.
//         </Collapse>
//         <button onClick={handleToggle}>{show ? "Collapse" : "Expand"}</button>
//       </>
//     );
//   }

//   return <Example />;
// });
