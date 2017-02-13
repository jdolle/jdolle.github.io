import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import RouterComponent from './core/router'
import CONFIG from 'config'

if (location.hostname == 'localhost') {
  window[`ga-disable-${CONFIG.google_analytics.tracking_id}`] = true
  ReactGA.set({ sendHitTask: null })
}

ReactGA.initialize(CONFIG.google_analytics.tracking_id)

render(<RouterComponent />, document.getElementById('root'))
