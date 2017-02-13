import jsdom from 'jsdom-global'
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import _ from 'lodash'
import Component from './component'
import styles from './styles'
import ImagePreloaderComponent from 'components/image-preloader/component'

describe('Routes', () => {
  describe('Root', () => {
    beforeEach(function() {
      this.jsdom = jsdom()
    })

    afterEach(function() {
      this.jsdom()
    })

    it('should have a component class', () => {
      const wrapper = shallow(<Component />)

      expect(wrapper.hasClass(styles.component)).to.equal(true)
    })

    it('preloads 3 images', () => {
      const wrapper = shallow(<Component />)

      expect(wrapper.find(ImagePreloaderComponent).length).to.equal(3)
    })

    it('displays content after loading 3 images', (done) => {
      const wrapper = shallow(<Component />)

      expect(wrapper.state('items').length).to.equal(0)
      _.times(3, (n) => _.delay(wrapper.instance().handleImageLoad, n - 1))
      setTimeout(() => {
        expect(wrapper.state('items').length).to.equal(1)
        done()
      }, 5)
    })
  })
})
