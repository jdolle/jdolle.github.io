import jsdom from 'jsdom-global'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import _ from 'lodash'
import Component from './component'

describe('Components', () => {
  describe('ImagePreloader', () => {
    beforeEach(function() {
      this.jsdom = jsdom()
    })

    afterEach(function() {
      this.jsdom()
    })

    it('should not render', () => {
      const wrapper = shallow(<Component src='' onLoad={() => {}} />)

      expect(wrapper.html()).to.equal(null)
    })

    it('preloads an image on mount', () => {
      sinon.spy(Component.prototype, 'componentDidMount')
      const wrapper = mount(<Component src='/test.gif' onLoad={() => {}} />)
      const image = wrapper.instance().image

      expect(Component.prototype.componentDidMount.calledOnce).to.equal(true)
      expect(_.lowercase(image.tagName)).to.equal('img')
      expect(image.src).to.equal('/test.gif')
    })

    it('deletes the image on unload', () => {
      const wrapper = mount(<Component src='/test.gif' onLoad={() => {}} />)
      const instance = wrapper.instance()

      expect(instance.image).to.exist
      wrapper.unmount()
      expect(instance.image).to.equal(undefined)
    })

    it('preloads an image on props change', () => {
      sinon.spy(Component.prototype, 'componentWillReceiveProps')
      const wrapper = mount(<Component src='/test.gif' onLoad={() => {}} />)

      wrapper.setProps({ src: '/new.gif' })

      expect(Component.prototype.componentWillReceiveProps.calledOnce).to.equal(true)

      const image = wrapper.instance().image

      expect(_.lowercase(image.tagName)).to.equal('img')
      expect(image.src).to.equal('/new.gif')
    })
  })
})
