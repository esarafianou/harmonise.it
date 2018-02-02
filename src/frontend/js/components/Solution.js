import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem } from 'material-ui'
import SolutionData from './SolutionData'

class Solution extends React.Component {
  createSolutionDetails (solution) {
    return (
      <List>
        <ListItem> Given voice: {solution.theme.given_voice} </ListItem>
        <ListItem> {solution.theme.description} </ListItem>
        <ListItem> {solution.theme.difficulty} </ListItem>
        <ListItem> <SolutionData solution={solution} themeData={solution.theme.theme_data} givenVoice={solution.theme.given_voice} /> </ListItem>
      </List>
    )
  }

  render () {
    return (
      <div>
        { this.createSolutionDetails(this.props.solution) }
      </div>
    )
  }
}

export default createFragmentContainer(Solution,
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
