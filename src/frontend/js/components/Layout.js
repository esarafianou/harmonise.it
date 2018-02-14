import React from 'react'
import Navigation from '../components/Navigation'

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <Navigation />
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}
