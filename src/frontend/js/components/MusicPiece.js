import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderMusicPiece from '../helpers/vexFlowPieceRendering'

class MusicPiece extends React.Component {
  _renderMusic = (element, musicPieceInfo) => {
    return renderMusicPiece(element, JSON.parse(musicPieceInfo))
  }
  componentDidMount(){
    { this._renderMusic(this.el, this.props.viewer.musicPieces.edges[0].node.info) }
  }
	render() {
		return(
			<div ref={el => this.el = el}>
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
