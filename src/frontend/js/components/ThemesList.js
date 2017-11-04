import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem } from 'material-ui'
import renderTheme from '../helpers/vexFlowThemeRendering'
import ThemeData from './ThemeData'

class ThemesList extends React.Component {
  createthemesList = (themes) => {
    let id
    return themes.map((theme, i) => {
      return (
        <ListItem key={i}>
          <List>
            <ListItem> Given voice: {theme.given_voice} </ListItem>
            <ListItem> {theme.description} </ListItem>
            <ListItem> <ThemeData theme={theme} /> </ListItem>
          </List>
        </ListItem>
      )
    })
  }

  render () {
    return (
      <List>
        { this.createthemesList(this.props.themes) }
      </List>
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
