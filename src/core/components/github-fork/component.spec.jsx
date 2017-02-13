import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Component from './component'
import styles from './styles'

describe('Components', () => {
  describe('GithubFork', () => {
    it('should have a component class', () => {
      const wrapper = shallow(<Component />)

      expect(wrapper.hasClass(styles.component)).to.equal(true)
    })

    it('links to github profile', () => {
      const wrapper = shallow(<Component />)
      const link = wrapper.find({ href: 'https://github.com/jdolle/jdolle.github.io' })

      expect(link.exists()).to.equal(true)
      expect(link.name()).to.equal('a')
    })
  })
})
