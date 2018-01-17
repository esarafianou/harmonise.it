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
            <li><Link to='/'>Themes</Link></li>
            <li><Link to='/solutions'>My Solutions</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
