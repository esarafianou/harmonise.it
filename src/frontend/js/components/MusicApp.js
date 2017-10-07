import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Link } from 'found';
import MusicPiece from './MusicPiece'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'


class MusicApp extends React.Component {
  render () {
    return (
      <div>
        <Navigation/>
        <section className='container-fluid'>
          <header>
            <h1>
              Music Piece Rendering
            </h1>
          </header>
          {this.props.children}
        </section>
        <Footer/>
      </div>
    )
  }
}

export default createFragmentContainer(MusicApp, {
  user: graphql`
    fragment MusicApp_user on User {
      id,
      userName,
    }   
  `
})
