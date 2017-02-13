import 'jsdom-global/register'
import jsdom from 'jsdom-global'
import React from 'react'
import { Route } from 'react-router'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import RouterComponent from './router'
import RootComponent from 'routes/root/component'

describe('Router', () => {
  beforeEach(function() {
    this.jsdom = jsdom()
  })

  afterEach(function() {
    this.jsdom()
  })

  it('emits to ReactGA onUpdate')

  it('routes to routes :)', () => {
    const wrapper = shallow(<RouterComponent />)

    expect(wrapper.children()).to.have.length(1)
    expect(wrapper.children().contains(<Route component={RootComponent} path='/' />)).to.equal(true)
  })
})
