import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Component from './component'
import styles from './styles'

describe('Routes', () => {
  describe('Root', () => {
    it('should have a component class', () => {
      const wrapper = shallow(<Component />)

      expect(wrapper.hasClass(styles.component)).to.equal(true)
    })

    it('preloads 3 images')

    it('renders contentContainer after the images load')

    it('renders a link to the resume')
  })
})
