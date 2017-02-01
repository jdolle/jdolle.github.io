import React from 'react'
import _ from 'lodash'

class Component extends React.PureComponent {
  constructor() {
    super()
    this.inputRef = (input) => { this.input = input }
    this.rulerRef = (ruler) => { this.ruler = ruler }
  }

  measureRulerWidth() {
    const { props: { value, placeholder }, ruler, input } = this
    const inputStyle = window.getComputedStyle(input)

    ruler.style.display = 'inline-block'
    ruler.style.fontSize = inputStyle.fontSize
    ruler.style.fontFamily = inputStyle.fontFamily
    ruler.style.fontWeight = inputStyle.fontWeight
    ruler.style.fontStyle = inputStyle.fontStyle
    ruler.style.padding = inputStyle.padding
    ruler.style.letterSpacing = inputStyle.letterSpacing

    ruler.innerText = value !== null && value !== '' && !_.isUndefined(value) ? value : placeholder
    const width = `${parseInt(ruler.scrollWidth, 10) + 5}px`

    ruler.style.display = 'none'
    return width
  }

  componentDidMount() {
    this.input.style.width = this.measureRulerWidth()
    setTimeout(() => this.input.style.width = this.measureRulerWidth())
  }

  componentDidUpdate() {
    this.input.style.width = this.measureRulerWidth()
  }

  render() {
    return (
      <div className='resize-input-component'>
        <input ref={this.inputRef}
          {...this.props}
        />
        <span ref={this.rulerRef} className='ruler'/>
      </div>
    )
  }
}

Component.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string
}

Component.displayName = 'ResizeInputComponent'

export default Component
