import React from 'react'
import { Link } from 'found'
import { graphql, createFragmentContainer } from 'react-relay'
import { withStyles } from 'material-ui/styles'
import { List, ListItem } from 'material-ui'
import SolutionData from './SolutionData'

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'blue'
  }
})

class SolutionsList extends React.Component {
  createSolutionsList (solutions) {
    return solutions.map((solution, i) => {
      let solutionLink = '/solutions/' + solution.id
      return (
        <ListItem key={i}>
          <List>
            <ListItem>Given voice: {solution.theme.given_voice}</ListItem>
            <ListItem>
              <SolutionData solution={solution} themeData={solution.theme.theme_data} givenVoice={solution.theme.given_voice} />
            </ListItem>
            <Link to={solutionLink} className={this.props.classes.link}>Continue editing</Link>
          </List>
        </ListItem>
      )
    })
  }

  render () {
    return (
      <div>
        <header>
          <h1> My Solutions </h1>
        </header>
        <List>
          { this.createSolutionsList(this.props.solutions) }
        </List>
      </div>
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
