import React from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  browserHistory
} from 'react-router'
import ReactGA from 'react-ga'
import RootComponent from 'routes/root/component'

ReactGA.initialize('UA-91813851-1')

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

render((
  <Router history={browserHistory} onUpdate={logPageView}>
    <Route
        component={RootComponent}
        path='/'
    />
  </Router>
), document.getElementById('root'))
