import React from 'react'
import shallowequal from 'shallowequal'
import _ from 'lodash'

class Component extends React.PureComponent {
  constructor() {
    super()
    this.img = null
    this.timer = null
    this.handleLoad = this.handleLoad.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    const { src } = this.props

    this.preloadImage(src)
  }

  componentWillUnmount() {
    delete this.image
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowequal(this.props, nextProps)) {
      this.preloadImage(nextProps.src)
    }
  }


  handleLoad(image) {
    clearTimeout(this.timer)
    this.timer = null
    if (image.naturalWidth && image.naturalHeight) {
      this.props.onLoad(image)
    } else {
      this.props.onError(image)
    }
  }

  handleError(image) {
    clearTimeout(this.timer)
    this.timer = null
    this.props.onError(image)
  }

  preloadImage(src) {
    if (this.image) { delete this.image }

    const image = this.image = typeof Image !== 'undefined' ? new Image() : document.createElement('img')

    image.src = src
    image.addEventListener('load', _.wrap(image, this.handleLoad))
    image.addEventListener('error', _.wrap(image, this.handleError))

    if (this.props.timeout)
      this.timer = setTimeout(() => {
        this.handleError(image)
      }, this.props.timeout)
  }

  shouldComponentUpdate() { return false }

  render() { return false }
}

Component.displayName = 'ImagePreloaderComponent'

Component.propTypes = {
  src: React.PropTypes.string.isRequired,
  onLoad: React.PropTypes.func.isRequired,
  timeout: React.PropTypes.number,
  onError: React.PropTypes.func
}

Component.defaultProps = {
  timeout: 3000,
  onError: _.noop
}

export default Component
