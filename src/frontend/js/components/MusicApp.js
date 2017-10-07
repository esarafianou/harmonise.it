import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Link } from 'found';
import MusicPiece from './MusicPiece'

class MusicApp extends React.Component {
  render () {
    return (
      <div>
        <section>
          <header>
            <h1>
              Music Piece Rendering
            </h1>
          </header>
          {this.props.children}
        </section>
        <Link to='/test'> Link to test </Link>
      </div>
    )
  }
}

export default createFragmentContainer(MusicApp, {
  user: graphql`
    fragment MusicApp_user on User {
      userName,
    }   
  `
})
