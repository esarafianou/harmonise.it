import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem } from 'material-ui'
import SolutionData from './SolutionData'

class SolutionsList extends React.Component {
  createSolutionsList = (solutions) => {
    console.log(solutions)
    return solutions.map((solution, i) => {
      console.log(solution)
      return (
        <ListItem key={i}>
          <List>
            <ListItem>Given voice: {solution.theme.given_voice} </ListItem>
            <ListItem>
              <SolutionData solution={solution} themeData={solution.theme.theme_data} givenVoice={solution.theme.given_voice} />
            </ListItem>
          </List>
        </ListItem>
      )
    })
  }

  render () {
    return (
      <List>
        { this.createSolutionsList(this.props.solutions) }
      </List>
    )
  }
}

export default createFragmentContainer(SolutionsList,
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
