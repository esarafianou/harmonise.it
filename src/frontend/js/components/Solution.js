import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem, Grid, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
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
    let difficulty = {
      1: 'very easy',
      2: 'easy',
      3: 'medium',
      4: 'advanced',
      5: 'expert'
    }

    return (
      <List>
        <ListItem> {solution.theme.description} </ListItem>
        <ListItem> Given voice: {solution.theme.given_voice} </ListItem>
        <ListItem> Difficulty: {difficulty[solution.theme.difficulty]} </ListItem>
        <ListItem> <SolutionData solution={solution} themeData={solution.theme.theme_data} givenVoice={solution.theme.given_voice} /> </ListItem>
      </List>
    )
  }

  render () {
    const { classes } = this.props
    return (
      <Grid justify='center' spacing={24} container className={classes.root}>
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
