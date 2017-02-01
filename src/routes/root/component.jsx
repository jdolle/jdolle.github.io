import React from 'react'
import FaceCanvasComponent from 'components/face-canvas/component'
import ResizeInputComponent from 'components/resize-input/component'

class Component extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.resizeInputRef = (resizeInput) => { this.resizeInput = resizeInput }
  }

  componentDidMount() {
    this.resizeInput.input.focus()
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.name !== this.state.name
  }

  handleNameChange(event) {
    let { value } = event.target

    value = value ? value : ''
    this.setState({ name: value })
  }

  render() {
    return (
      <div className='route-root-component'>
        <h1>
          {'Hello, '}
          <ResizeInputComponent onChange={this.handleNameChange}
              placeholder='Enter Name'
              ref={this.resizeInputRef}
              value={this.state.name}
          />
        </h1>
        <FaceCanvasComponent />
      </div>
    )
  }
}

Component.displayName = 'RootComponent'

export default Component
