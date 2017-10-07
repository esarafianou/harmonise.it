import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderMusicPiece from '../helpers/vexFlowPieceRendering'

class MusicPiece extends React.Component {
  _renderMusic = (element, musicPieceInfo) => {
    return renderMusicPiece(element, JSON.parse(musicPieceInfo))
  }
  componentDidMount(){
    console.log(this.props.user)
    { this._renderMusic(this.el, this.props.user.musicPieces.edges[0].node.content) }
  }
	render() {
		return(
			<div ref={el => this.el = el}>
			</div>
    )
  }
}

export default createFragmentContainer(MusicPiece, {
  user: graphql`
    fragment MusicPiece_user on User {
      musicPieces(
        first: 1 
      ) @connection(key: "MusicPiece_musicPieces") {
        edges {
          node {
            id, 
						content
          },  
        },  
      },  
    }   
  `,  
});
