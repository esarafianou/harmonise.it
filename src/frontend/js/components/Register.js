import React from 'react'
import { Button, Grid, Paper, TextField } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import registerUserMutation from './registerUserMutation'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    justify: 'center',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 350
  },
  textField: {
    justify: 'center',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

class Register extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      confrimPassword: '',
      passwordsNotMatch: false
    }
  }

  showPasswordsNotMatch () {
    return (
      <p className='notification'> Passwords do not match </p>
    )
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

  handleConfirmPassword (event) {
    this.setState({
      confirmPassword: event.target.value
    })
  }

  handleSubmit (event) {
    let username = this.refs.username.value
    let password = this.refs.password.value
    let confirmPassword = this.refs.confirmpassword.value
    if (password === confirmPassword) {
      registerUserMutation.commit(this.props, username, password, confirmPassword)
    } else {
      this.setState({ passwordsNotMatch: true })
      this.refs.password.value = ''
      this.refs.confirmpassword.value = ''
    }
  }

  render () {
    const {classes} = this.props
    return (
      <div>
        { this.state.passwordsNotMatch ? this.showPasswordsNotMatch() : null }
        <Grid justify='center' spacing={24} container className={classes.root}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className={classes.container}>
              <TextField
                id='.username'
                label='Username'
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleUsername('username')}
                margin='normal'
              />
              <TextField
                id='password'
                label='Password'
                className={classes.textField}
                type='password'
                value={this.state.password}
                onChange={this.handlePassword('password')}
                margin='normal'
              />
              <TextField
                id='confirmPassword'
                label='Confirm Password'
                className={classes.textField}
                type='password'
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPassword('confirmPassword')}
                margin='normal'
              />
            </form>
            <Button raised type='submit' value='Submit'
              onClick={(event) => { this.handleSubmit(event) }}>Register
            </Button>
          </Paper>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Register)
