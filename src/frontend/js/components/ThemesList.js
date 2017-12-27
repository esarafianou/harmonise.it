import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem, RaisedButton } from 'material-ui'
import ThemeData from './ThemeData'
import createSolutionMutation from './createSolutionMutation'

class ThemesList extends React.Component {
  createSolution (theme) {
    createSolutionMutation.commit(this.props, theme)
  }

  createthemesList (themes) {
    return themes.map((theme, i) => {
      return (
        <ListItem key={i}>
          <List>
            <ListItem> Given voice: {theme.given_voice} </ListItem>
            <ListItem> {theme.description} </ListItem>
            <ListItem> <ThemeData theme={theme} /> </ListItem>
            <RaisedButton onClick={() => { this.createSolution(theme) }}>Solve it! </RaisedButton>
          </List>
        </ListItem>
      )
    })
  }

  render () {
    return (
      <div>
        <header>
          <h1> Themes </h1>
        </header>
        <div> Choose a theme and start solving its music harmony </div>
        <List>
          { this.createthemesList(this.props.themes) }
        </List>
      </div>
    )
  }
}

export default createFragmentContainer(ThemesList,
  graphql`
    fragment ThemesList_themes on Theme @relay(plural: true) {
      id,
      description
      difficulty,
      given_voice,
      ...ThemeData_theme
    }
  `
)
