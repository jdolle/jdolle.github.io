import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash'
import backgroundImg from './assets/background.gif'
import constructionImg from './assets/flashing-construction-sign.gif'
import logoImg from './assets/logo.gif'
import resume from './assets/resume.pdf'
import styles from './styles'
import GithubForkComponent from 'components/github-fork/component'
import ImagePreloader from 'components/image-preloader/component'

class Component extends React.Component {
  static get IMAGES() { return [logoImg, backgroundImg, constructionImg] }

  constructor() {
    super()
    this.state = {
      complete: 0,
      items: []
    }

    this.handleImageLoad = this.handleImageLoad.bind(this)
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.items !== this.state.items
  }

  handleImageLoad() {
    let { complete, items } = this.state

    if (++complete === Component.IMAGES.length) {
      items = items.concat(this.renderContentContainer())
    }

    this.setState({ items, complete })
  }

  renderContentContainer() {
    return (
      <div key='content' className={styles.contentContainer}>
        <img src={logoImg} alt='Jeff Dolle' />
        <ul>
          <li>
            THIS SITE IS<br/>
            <img src={constructionImg} alt='construction' />
          </li>
          <li>is something you might expect to see if you are a 90s kid like me</li>
          <li><a href={resume} target='_blank'>R&Eacute;SUM&Eacute;</a></li>
        </ul>
      </div>
    )
  }

  render() {
    const { items } = this.state

    return (
      <div className={styles.component}>
        <GithubForkComponent />
        {
          _.map(Component.IMAGES, (img, index) => {
            return <ImagePreloader key={index} src={img} onLoad={this.handleImageLoad} />
          })
        }
        <ReactCSSTransitionGroup transitionName={styles}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {items}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Component.displayName = 'RootComponent'

export default Component
