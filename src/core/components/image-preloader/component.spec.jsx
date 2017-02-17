import jsdom from 'jsdom-global'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import _ from 'lodash'
import Component from './component'
global.Image = global.Image || require('canvas').Image

describe('Components', () => {
  describe('ImagePreloader', () => {
    beforeEach(function() {
      this.clock = sinon.useFakeTimers()
      this.jsdom = jsdom()
    })

    afterEach(function() {
      this.jsdom()
      this.clock.restore()
    })

    it('should not render', () => {
      const wrapper = shallow(<Component src='' onLoad={_.noop} />)

      expect(wrapper.html()).to.equal(null)
    })

    it('preloads an Image on mount', () => {
      sinon.spy(Component.prototype, 'componentDidMount')
      const wrapper = mount(<Component src='/test.gif' onLoad={_.noop} />)
      const image = wrapper.instance().image

      expect(Component.prototype.componentDidMount.calledOnce).to.equal(true)
      Component.prototype.componentDidMount.restore()
      expect(image.constructor.name).to.equal('Image')
      expect(image.src).to.equal('/test.gif')
    })

    describe('without Image object', function() {
      before(function() {
        global.Image = undefined
      })

      after(function() {
        global.Image = global.Image || require('canvas').Image
      })

      it('preloads using an img element', function() {
        sinon.spy(Component.prototype, 'componentDidMount')
        const wrapper = mount(<Component src='/test.gif' onLoad={_.noop} />)
        const image = wrapper.instance().image

        expect(Component.prototype.componentDidMount.calledOnce).to.equal(true)
        expect(_.lowercase(image.tagName)).to.equal('img')
        expect(image.src).to.equal('/test.gif')
      })
    })

    it('deletes the image on unload', () => {
      const wrapper = mount(<Component src='/test.gif' onLoad={_.noop} />)
      const instance = wrapper.instance()

      expect(instance.image).to.exist
      wrapper.unmount()
      expect(instance.image).to.equal(undefined)
    })

    it('preloads an image on props change', () => {
      sinon.spy(Component.prototype, 'componentWillReceiveProps')
      const wrapper = mount(<Component src='/test.gif' onLoad={_.noop} />)

      wrapper.setProps({ src: '/new.gif' })

      expect(Component.prototype.componentWillReceiveProps.calledOnce)
        .to.equal(true)

      const image = wrapper.instance().image

      expect(image.constructor.name).to.equal('Image')
      expect(image.src).to.equal('/new.gif')
    })

    it('calls onError when timing out', function() {
      const props = {
        src: '/error.gif',
        timeout: 3000,
        onLoad: _.noop,
        onError: _.noop
      }

      sinon.spy(props, 'onError')
      sinon.spy(props, 'onLoad')
      const wrapper = mount(<Component {...props} />)
      const timer = wrapper.instance().timer

      expect(timer).to.exist
      expect(props.onError.calledOnce).to.equal(false)
      this.clock.tick(3000)
      expect(props.onError.calledOnce).to.equal(true)
    })

    it('calls onError when not loading an image', function() {
      const props = {
        src: 'data:text/plain;base64,ZmFpbA==',
        onLoad: _.noop,
        onError: _.noop,
        timeout: 3000
      }

      sinon.spy(props, 'onLoad')
      sinon.spy(props, 'onError')
      mount(<Component {...props} />)
      expect(props.onError.calledOnce).to.equal(false)
      this.clock.tick(3000)
      expect(props.onError.calledOnce).to.equal(true)
    })

    it('calls onLoad when the image is valid', (done) => {
      /* eslint-disable max-len */
      const props = {
        src: 'data:image/png;base64,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',
        onLoad: _.noop,
        onError: _.noop
      }
      /* eslint-enable max-len */

      sinon.spy(props, 'onError')
      sinon.stub(props, 'onLoad', () => {
        expect(props.onError.calledOnce).to.equal(false)
        done()
      })

      mount(<Component {...props} />)
    })
  })
})
