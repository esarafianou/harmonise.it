import React from 'react'
import { graphql, createRefetchContainer } from 'react-relay'
import Navigation from '../components/Navigation'

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
        <Navigation username={username} loggedIn={loggedIn} handleLogout={this.handleLogout} />
        <section>
          {React.cloneElement(this.props.children, { loggedIn: loggedIn, handleLogin: this.handleLogin })}
        </section>
      </div>
    )
  }
}

export default createRefetchContainer(Layout,
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
