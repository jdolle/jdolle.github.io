import React from 'react'

class Component extends React.Component {
  constructor() {
    super()

    this.refCanvasFn = (canvas) => {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
    }

    this.mouse = {
      x: 0,
      y: 0
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentDidMount() {
    this.ctx.lineWidth = 3
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.strokeStyle = '#00CC99'
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillUnmount() {
    // Prevent memory leak when component is unmounted while painting
    this.canvas.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  updateMouseFromEvent(event) {
    this.mouse.x = event.pageX - this.canvas.offsetLeft
    this.mouse.y = event.pageY - this.canvas.offsetTop

    return this.mouse
  }

  handleMouseDown(event) {
    this.updateMouseFromEvent(event)
    this.ctx.beginPath()
    this.ctx.moveTo(this.mouse.x, this.mouse.y)

    this.canvas.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove(event) {
    this.updateMouseFromEvent(event)
    this.paintLine(this.mouse)
  }

  handleMouseUp(event) {
    if (event.target === this.canvas) {
      this.updateMouseFromEvent(event)
      this.paintLine(this.mouse)
    }
    this.canvas.removeEventListener('mousemove', this.handleMouseMove)
  }

  paintLine({ x, y }) {
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }

  render() {
    return (
      <canvas className='face-canvas-component'
          onMouseDown={this.handleMouseDown}
          ref={this.refCanvasFn}
      />
    )
  }
}

Component.displayName = 'FaceCanvasComponent'

export default Component
