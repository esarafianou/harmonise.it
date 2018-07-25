import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Grid, Paper, Typography, Chip } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { difficulty } from '../utils'
import SolutionData from './SolutionData'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
    width: 1000
  }
})

class Solution extends React.Component {
  createSolutionDetails (solution) {
    const chipStyle = {
      backgroundColor: difficulty[solution.theme.difficulty].color,
      color: 'white',
      fontWeight: 'bold',
      float: 'right'
    }
    return (
      <Grid container>
        <Grid item md={10}>
          <Typography type='body2'>{solution.theme.description}</Typography>
        </Grid>
        <Grid item md={2}>
          <Chip label={difficulty[solution.theme.difficulty].name} style={chipStyle} />
        </Grid>
        <Grid item md={12}>
          <SolutionData solution={solution} themeData={solution.theme.theme_data} id={solution.id}
            givenVoice={solution.theme.given_voice} router={this.props.router} editable />
        </Grid>
      </Grid>
    )

  componentDidMount () {
    if (!this.props.loggedIn) {
      window.sessionStorage.setItem('location', this.props.location.pathname)
      this.props.router.push('/login')
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Grid justify='center' spacing={0} container className={classes.root}>
        { this.props.loggedIn
        ? <Paper className={classes.paper}>
          { this.createSolutionDetails(this.props.solution) }
        </Paper>
        : null }
      </Grid>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(Solution),
  graphql`
    fragment Solution_solution on SolutionTheme {
      id,
      theme {
        description
        difficulty,
        given_voice,
        theme_data
      }
      ...SolutionData_solution
    }
  `
)
