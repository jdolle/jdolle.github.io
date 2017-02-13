import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import RouterComponent from './core/router'

ReactGA.initialize('UA-91813851-1')

render(<RouterComponent />, document.getElementById('root'))
