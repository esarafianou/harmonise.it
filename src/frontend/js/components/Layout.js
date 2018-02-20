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
  }

  handleLogin (username) {
    this.setState({
      loggedIn: true,
      username: username
    })
  }

  render () {
    return (
      <div>
        <Navigation user={this.props.me} username={this.state.username} loggedIn={this.state.loggedIn} />
        <section>
          {React.cloneElement(this.props.children, { loggedIn: this.state.loggedIn, handleLogin: this.handleLogin })}
        </section>
      </div>
    )
  }
}

export default createFragmentContainer(Layout,
  graphql`
    fragment Layout_me on User {
      ...Navigation_user
    }
  `
)
