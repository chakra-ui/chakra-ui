import React, { Component } from "react";
import { render } from "react-dom";
import Button from "../../lib/Button";
import { ThemeProvider, UIModeProvider } from "../../lib";

class Demo extends Component {
  render() {
    return (
      <ThemeProvider>
        <UIModeProvider>
          <Button variant="solid" color="red">
            Welcome Home
          </Button>
          <h1>chakra-ui Demo</h1>
        </UIModeProvider>
      </ThemeProvider>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
