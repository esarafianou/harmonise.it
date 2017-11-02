import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <Navigation />
        <section className='container-fluid'>
          <header>
            <h1>
              Music Piece Rendering
            </h1>
          </header>
          {this.props.children}
        </section>
        <Footer />
      </div>
    )
  }
}
