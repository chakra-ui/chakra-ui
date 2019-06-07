import React, { Component } from "react";
import { render } from "react-dom";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>chakra-ui Demo</h1>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
