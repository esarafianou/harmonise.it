import React from 'react'
import { Link } from 'found'
import { AppBar, Toolbar, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    width: '100%',
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
  fontColor: {
    color: 'white'
  }
}

class Navigation extends React.Component {
  render () {
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
            <Link to='/solutions' className={classes.userLinks}>
              My Solutions
            </Link>
          </Typography>
          <Link to='/register'>
            <Typography type='title' className={classes.flex}>
              Register
            </Typography>
          </Link>
          <Link to='/login' className={classes.userLinks}>
            <Typography type='title' className={classes.flex}>
              Login
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Navigation)
