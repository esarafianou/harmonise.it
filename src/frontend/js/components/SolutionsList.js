import React from 'react'
import { Link } from 'found'
import { graphql, createFragmentContainer } from 'react-relay'
import { withStyles } from 'material-ui/styles'
import { List, ListItem, Grid, Paper, Typography, Divider } from 'material-ui'
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
  },
  link: {
    textDecoration: 'none',
    color: 'blue'
  },
  text: {
    marginTop: 10,
    marginBottom: 10
  }
})

class SolutionsList extends React.Component {
  createSolutionsList (solutions) {
    return solutions.map((solution, i) => {
      let solutionLink = '/solutions/' + solution.id
      return (
        <div key={i}>
          <Divider />
          <ListItem>
            <List>
              <ListItem>Given voice: {solution.theme.given_voice}</ListItem>
              <ListItem>
                <SolutionData solution={solution} themeData={solution.theme.theme_data} givenVoice={solution.theme.given_voice} />
              </ListItem>
              <Link to={solutionLink} className={this.props.classes.link}>Continue editing</Link>
            </List>
          </ListItem>
        </div>
      )
    })
  }

  render () {
    const { classes } = this.props
    return (
      <Grid justify='center' spacing={24} container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography type='title' className={classes.text}>
            My Solutions
          </Typography>
          <List>
            { this.createSolutionsList(this.props.solutions) }
          </List>
        </Paper>
      </Grid>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(SolutionsList),
  graphql`
    fragment SolutionsList_solutions on SolutionTheme @relay(plural: true) {
      id,
      theme {
        given_voice,
        theme_data
      }
      ...SolutionData_solution
    }
  `
)
