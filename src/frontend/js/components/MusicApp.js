import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import MusicPiece from './MusicPiece'
import { Link } from 'found';

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
  viewer: graphql`
    fragment MusicApp_viewer on User {
      id,
    }   
  `
})
