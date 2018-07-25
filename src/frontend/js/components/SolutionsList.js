import React from 'react'
import { Link } from 'found'
import { graphql, createFragmentContainer } from 'react-relay'
import { withStyles } from 'material-ui/styles'
import { List, ListItem, Grid, Paper, Typography, Divider, Chip } from 'material-ui'
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
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
    marginBottom: 10
  },
  text: {
    marginTop: 10,
    marginBottom: 10
  }
})

class SolutionsList extends React.Component {
  createSolutionsList (solutions) {
    const { classes } = this.props

    return solutions.map((solution, i) => {
      const solutionLink = '/solutions/' + solution.id
      const chipStyle = {
        backgroundColor: difficulty[solution.theme.difficulty].color,
        color: 'white',
        fontWeight: 'bold',
        float: 'right'
      }

      return (
        <div key={i}>
          <Divider />
          <ListItem>
            <Grid container>
              <Grid item md={10}>
                <Typography type='body2' className={classes.descr}>{solution.theme.description}</Typography>
              </Grid>
              <Grid item md={2}>
                <Chip label={difficulty[solution.theme.difficulty].name} style={chipStyle} />
              </Grid>
              <Grid item md={12}>
                <SolutionData solution={solution} themeData={solution.theme.theme_data}
                  givenVoice={solution.theme.given_voice} editable={false} />
              </Grid>
              <Link to={solutionLink} className={classes.link}>Continue editing</Link>
            </Grid>
          </ListItem>
        </div>
      )
    })

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
        <Paper className={classes.paper}>
          <Typography type='title' className={classes.text}>
            My Solutions
          </Typography>
          {this.props.loggedIn
          ? <List>
            { this.createSolutionsList(this.props.solutions) }
          </List>
          : null}
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
        description
        difficulty
        given_voice
        theme_data
      }
      ...SolutionData_solution
    }
  `
)
