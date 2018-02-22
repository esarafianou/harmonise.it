import React from 'react'
import axios from 'axios'
import { Link } from 'found'
import { AppBar, Toolbar, Typography, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1,
    color: 'white'
  },
  divide: {
    marginLeft: 50,
    color: 'white'
  },
  userLinks: {
    marginLeft: 15,
    color: 'white'
  },
  loggedUserLinks: {
    clear: 'none'
  },
  fontColor: {
    color: 'white'
  }
}

class Navigation extends React.Component {
  constructor () {
    super()
    this.createNavBar = this.createNavBar.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout () {
    axios.get('/api/logout')
    .then((response) => {
      if (response.status === 200) {
        this.props.handleLogout()
        this.props.router.push('/')
      } else {
        window.alert('Something went wrong. Please retry')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  createNavBar () {
    const { classes } = this.props

    return (
      <AppBar position='static' className={classes.root}>
        <Toolbar className={classes.fontColor}>
          <Typography type='title' className={classes.flex}>
            <Link to='/' className={classes.fontColor}>
              harmonise.it
            </Link>
            <Link to='/' className={classes.divide}>
              Themes
            </Link>
            { this.props.loggedIn
            ? <Link to='/solutions' className={classes.userLinks}>
                My Solutions
              </Link>
            : null }
          </Typography>
          { this.props.loggedIn
          ? <Typography type='title' className={classes.userLinks}>
            Hi, {this.props.username}
            <Button className={classes.userLinks} onClick={this.logout}>
                Logout
            </Button>
          </Typography>
          : <Typography type='title' className={classes.userLinks}>
            <Link to='/register' className={classes.userLinks}>
                Register
            </Link>
            <Link to='/login' className={classes.userLinks}>
                Login
            </Link>
          </Typography>
        }
        </Toolbar>
      </AppBar>
    )
  }

  render () {
    return (
      <div>
        { this.createNavBar() }
      </div>
    )
  }
}

export default withStyles(styles)(Navigation)
