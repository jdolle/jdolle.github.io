import React from 'react'
import shallowequal from 'shallowequal'

class Component extends React.PureComponent {
  componentDidMount() {
    this.preloadSrc()
  }

  componentWillUnmount() {
    delete this.img
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowequal(this.props, nextProps)) {
      this.preloadSrc()
    }
  }

  preloadSrc() {
    if (this.img) { delete this.img }

    const { src, onLoad } = this.props
    const img = this.img = typeof Image !== 'undefined' ? new Image() : document.createElement('img')

    img.src = src
    img.onload = onLoad
  }

  shouldComponentUpdate() { return false }

  render() { return false }
}

Component.displayName = 'ImagePreloaderComponent'

Component.propTypes = {
  src: React.PropTypes.string.isRequired,
  onLoad: React.PropTypes.func.isRequired
}

export default Component
