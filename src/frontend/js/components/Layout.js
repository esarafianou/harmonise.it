import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import Navigation from '../components/Navigation'

class Layout extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin (username) {
    this.setState({
      loggedIn: true,
      username: username
    })
  }

  handleLogout () {
    this.setState({
      loggedIn: false,
      username: null
    })
  }

  render () {
    let username, loggedIn
    if (this.props.me) {
      username = this.props.me.username
      loggedIn = true
    } else {
      username = this.state.username
      loggedIn = this.state.loggedIn
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

export default createFragmentContainer(Layout,
  graphql`
    fragment Layout_me on User {
      id,
      username
    }
  `
)
