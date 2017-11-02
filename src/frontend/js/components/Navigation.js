import React from 'react'
import { Link } from 'found'

export default class Navigation extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand'>Harmonise.it</Link>
          </div>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/test'>Test</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
