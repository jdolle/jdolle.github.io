import React from 'react'
import {
  Router,
  Route,
  browserHistory
} from 'react-router'
import ReactGA from 'react-ga'
import RootComponent from 'routes/root/component'

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export default function Component() {
  return (
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route component={RootComponent} path='/' />
    </Router>
  )
}
