import React from 'react'

class Component extends React.PureComponent {
  componentDidMount() {
    const { src, onLoad } = this.props
    const img = this.img = Image ? new Image() : document.createElement('img')

    img.src = src
    img.onload = onLoad
  }

  componentWillUnmount() {
    delete this.img
  }

  render() {
    return false
  }
}

Component.displayName = 'ImagePreloaderComponent'

Component.propTypes = {
  src: React.PropTypes.string.isRequired,
  onLoad: React.PropTypes.func.isRequired
}

export default Component
