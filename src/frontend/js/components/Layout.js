import React from 'react'
import Navigation from '../components/Navigation'
import { withStyles } from 'material-ui/styles'


export default class Layout extends React.Component {
  render () {
    const { classes } = this.props
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
