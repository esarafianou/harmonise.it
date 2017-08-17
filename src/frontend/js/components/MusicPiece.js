import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderMusicPiece from '../helpers/vexFlowPieceRendering'

class MusicPiece extends React.Component {
  _renderMusic = (musicPieceInfo) => {
    return renderMusicPiece(JSON.parse(musicPieceInfo))
  }

	render() {
		return(
			<div id="vexflow">
				{ this._renderMusic(this.props.viewer.musicPieces.edges[0].node.info) }
			</div>
    )
  }
}

export default createFragmentContainer(MusicPiece, {
  viewer: graphql`
    fragment MusicPiece_viewer on User {
      musicPieces(
        first: 1 
      ) @connection(key: "MusicPiece_musicPieces") {
        edges {
          node {
            id, 
						info
          },  
        },  
      },  
    }   
  `,  
});
