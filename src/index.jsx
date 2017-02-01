import React from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  browserHistory
} from 'react-router'

import Root from './routes/root/component'

render((
  <Router history={browserHistory}>
    <Route
        component={Root}
        path="/"
    />
  </Router>
), document.getElementById('root'))
