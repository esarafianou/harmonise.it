import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import Navigation from '../components/Navigation'

class Layout extends React.Component {
  render () {
    return (
      <div>
        <Navigation user={this.props.me} />
        <section>
          {this.props.children}
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
