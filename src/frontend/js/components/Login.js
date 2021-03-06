import React from 'react'
import { Link } from 'found'
import { Button, Grid, Paper, TextField, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import axios from 'axios'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
    width: 300
  },
  textField: {
    justify: 'center',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  container: {
    margin: 'auto',
    width: 230
  },
  button: {
    marginTop: 20,
    clear: 'both',
    float: 'right'
  },
  text: {
    paddingTop: 20,
    clear: 'both',
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none',
    color: 'blue'
  }
})

class Login extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }

  handleUsername (event) {
    this.setState({
      username: event.target.value
    })
  }

  handlePassword (event) {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit (event) {
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    const config = {
      validateStatus: function (status) {
        return status === 200 || status === 401
      }
    }
    axios.post('/api/login', data, config)
    .then((response) => {
      if (response.status === 200) {
        this.props.router.push('/')
        this.props.handleLogin(response.data.username)
      } else {
        console.log('Invalid username or password')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    const {classes} = this.props

    return (
      <Grid justify='center' spacing={24} container className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit} className={classes.container}>
            <TextField
              id='username'
              label='Username'
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleUsername}
              margin='normal'
            />
            <TextField
              id='password'
              label='Password'
              className={classes.textField}
              type='password'
              value={this.state.password}
              onChange={this.handlePassword}
              margin='normal'
            />
          </form>
          <Button raised className={classes.button} type='submit' value='Submit'
            onClick={(event) => { this.handleSubmit(event) }}> Login
          </Button>
          <Typography className={classes.text}>
            New to harmonise.it? {' '}
            <Link to='/register' className={classes.link}>
               Register now!
            </Link>
          </Typography>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(Login)
