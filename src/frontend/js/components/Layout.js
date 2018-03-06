import React from 'react'
import { graphql, createRefetchContainer } from 'react-relay'
import { withStyles } from 'material-ui/styles'
import Navigation from '../components/Navigation'

const styles = theme => ({
  root: {
    marginLeft: 20
  }
})

class Layout extends React.Component {
  constructor () {
    super()
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin (username) {
    this.props.relay.refetch()
  }

  handleLogout () {
    this.props.relay.refetch()
  }

  render () {
    let username, loggedIn
    if (this.props.me) {
      username = this.props.me.username
      loggedIn = true
    } else {
      username = null
      loggedIn = false
    }

    return (
      <div>
        <Navigation username={username} loggedIn={loggedIn} router={this.props.router} handleLogout={this.handleLogout} />
        <section className={this.props.classes.root}>
          {React.cloneElement(this.props.children, { loggedIn: loggedIn, handleLogin: this.handleLogin })}
        </section>
      </div>
    )
  }
}

export default createRefetchContainer(withStyles(styles)(Layout),
  graphql`
    fragment Layout_me on User {
      id,
      username
    }
  `,
  graphql`
    query LayoutRefetchQuery {
      me {
        ...Layout_me
      }
    }
  `
)
