import jsdom from 'jsdom-global'
import React from 'react'
import ReactGA from 'react-ga'
import { Route, browserHistory } from 'react-router'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import RouterComponent from './router'
import RootComponent from 'routes/root/component'

describe('Router', () => {
  beforeEach(function() {
    this.jsdom = jsdom('<body/>', { url: 'https://jdolle.github.io/' })
  })

  afterEach(function() {
    this.jsdom()
  })

  describe('Pageview', () => {
    before(() => {
      sinon.spy(ReactGA, 'pageview')
      sinon.stub(console, 'error', () => {}) // dont log react router warnings
    })

    after(() => {
      ReactGA.pageview.restore()
      console.error.restore()
    })

    it('calls ReactGA.pageview onUpdate', () => {
      mount(<RouterComponent />)
      browserHistory.push('/test')
      expect(ReactGA.pageview.calledOnce).to.equal(true)
    })
  })

  it('routes to routes :)', () => {
    const wrapper = shallow(<RouterComponent />)

    expect(wrapper.children()).to.have.length(1)
    expect(wrapper.children().contains(<Route component={RootComponent} path='/' />)).to.equal(true)
  })
})
