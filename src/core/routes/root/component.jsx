import classnames from 'classnames'
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
      <div key='content' className={styles.content}>
        <header>
          <div className={classnames(styles.logo, styles.first)} />
          <div className={classnames(styles.logo, styles.last)} />
        </header>
        <ul>
          <li>
            THIS SITE IS<br/>
            <img src={constructionImg} alt='construction' />
          </li>
          <li>is something you might expect to see if you are a 90s kid like me</li>
          <li><a href={resume} target='_blank'>R&Eacute;SUM&Eacute;</a></li>
        </ul>
        <footer>
          <marquee>This site was intentionally over-engineered by Jeff Dolle.</marquee>
        </footer>
      </div>
    )
  }

  render() {
    const { items } = this.state

    return (
      <div>
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
