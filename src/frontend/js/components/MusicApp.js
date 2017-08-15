import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import MusicPiece from './MusicPiece'

class MusicApp extends React.Component {
	render() {
    const musicPiece = this.props.viewer
		return(
			<div>
        <section>
          <header>
            <h1>
              Music Piece Rendering 
            </h1>
          </header>
          <MusicPiece viewer = {this.props.viewer} />
        </section>
			</div>
    )
  }
}

export default createFragmentContainer(MusicApp, {
  viewer: graphql`
    fragment MusicApp_viewer on User {
      id,
      ...MusicPiece_viewer
    }   
  `,  
}); 
