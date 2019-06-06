import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>chakra-ui Demo</h1>
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
