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
    const { classes } = this.props

    const chipStyle = {
      backgroundColor: difficulty[solution.theme.difficulty].color,
      color: 'white',
      fontWeight: 'bold',
      float: 'right'
    }
    return (
      <Grid container>
        <Grid item md={6}>
          <Typography type='body2' className={classes.descr}>{solution.theme.description}</Typography>
        </Grid>
        <Grid item md={6}>
          <Chip label={difficulty[solution.theme.difficulty].name} style={chipStyle} />
        </Grid>
        <Grid item md={12}>
          <SolutionData solution={solution} themeData={solution.theme.theme_data}
            givenVoice={solution.theme.given_voice} editable />
        </Grid>
      </Grid>
    )
  }

  render () {
    const { classes } = this.props
    return (
      <Grid justify='center' spacing={0} container className={classes.root}>
        <Paper className={classes.paper}>
          { this.createSolutionDetails(this.props.solution) }
        </Paper>
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
