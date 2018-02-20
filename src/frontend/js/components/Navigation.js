import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Link } from 'found'
import { AppBar, Toolbar, Typography } from 'material-ui'
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
    this.state = {
      loggedIn: false,
      username: null
    }
  }

  componentWillMount () {
    if (this.props.user !== null) {
      this.setState({
        loggedIn: true,
        username: this.props.user.username
      })
    }
  }

  createNavBar () {
    const { classes } = this.props
    let username = this.props.username || this.state.username
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
            { this.state.loggedIn || this.props.loggedIn
            ? <Link to='/solutions' className={classes.userLinks}>
                My Solutions
              </Link>
            : null }
          </Typography>
          { this.state.loggedIn || this.props.loggedIn
          ? <Typography type='title' className={classes.userLinks}>
            Hi, { username }
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

export default createFragmentContainer(withStyles(styles)(Navigation),
  graphql`
    fragment Navigation_user on User {
      id,
      username
    }
  `
)
