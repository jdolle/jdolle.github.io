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

    it('preloads an image', () => {
      sinon.spy(Component.prototype, 'componentDidMount')
      const wrapper = mount(<Component src='/test.gif' onLoad={() => {}} />)
      const image = wrapper.instance().img

      expect(Component.prototype.componentDidMount.calledOnce).to.equal(true)
      expect(_.lowercase(image.tagName)).to.equal('img')
      expect(image.src).to.equal('/test.gif')
    })

    it('delete the image on unload')
  })
})
