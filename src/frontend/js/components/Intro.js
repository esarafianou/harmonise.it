import React from 'react'
import { Button, Grid, Paper, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
    width: 800
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
    marginRight: 10,
    justify: 'center',
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none',
    color: 'blue'
  },
  centralize: {
    justify: 'center',
    textAlign: 'center'
  }
})

class Intro extends React.Component {
  constructor () {
    super()
    this.moveToThemes = this.moveToThemes.bind(this)
    this.moveToRegistration = this.moveToRegistration.bind(this)
  }

  moveToThemes () {
    this.props.router.push('/themes')
  }

  moveToRegistration () {
    this.props.router.push('/register')
  }

  render () {
    const {classes} = this.props

    return (
      <Grid justify='center' spacing={24} container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography type='title' paragraph>
            Welcome to harmonise.it!
          </Typography>
          <Typography align='justify' type='subheading' paragraph>
            harmonise.it is a platform which <b> helps classical music theory and harmony students
            practice harmony rules</b>. Based on a theme with a given soprano or bass voice,
            you can complete the rest of the voices and create a music piece with four voices
            (soprano, alto, tenoro, bass) that comply with the music harmony rules.
          </Typography>
          <Typography align='justify' type='subheading' paragraph>
            The platform provides a variety of music themes both with a
            given soprano and bass and with different levels of difficulty. You can
            choose to start solving a music theme, continue editing music themes or
            review your completed music pieces.
          </Typography>
          <div className={classes.centralize}>
            {!this.props.loggedIn
            ? <Button raised color='primary' className={classes.button} type='submit' value='Submit'
              onClick={this.moveToRegistration}> Register now to start solving
            </Button>
            : null}
            <Button raised className={classes.button} type='submit' value='Submit'
              onClick={this.moveToThemes}>  Check the available themes
            </Button>
          </div>
        </Paper>
      </Grid>
    )
  }
}

export default withStyles(styles)(Intro)
