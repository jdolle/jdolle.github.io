import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Component from './component'

describe('Components', () => {
  describe('ImagePreloader', () => {
    it('should not render', () => {
      const wrapper = shallow(<Component src='' onLoad={() => {}} />)

      expect(wrapper.html()).to.equal(null)
    })

    it('preloads an image')
  })
})
