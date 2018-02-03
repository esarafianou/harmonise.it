import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem, Button, Divider } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import ThemeData from './ThemeData'
import createSolutionMutation from './createSolutionMutation'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

class ThemesList extends React.Component {
  createSolution (theme) {
    createSolutionMutation.commit(this.props, theme)
  }

  createthemesList (themes) {
    return themes.map((theme, i) => {
      return (
        <div>
          <Divider />
          <ListItem key={i}>
            <List>
              <ListItem> Given voice: {theme.given_voice} </ListItem>
              <ListItem> {theme.description} </ListItem>
              <ListItem> <ThemeData theme={theme} /> </ListItem>
              <Button raised onClick={() => { this.createSolution(theme) }}>Solve it! </Button>
            </List>
          </ListItem>
        </div>
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
        <div>
          <List className={this.props.classes.root}>
            { this.createthemesList(this.props.themes) }
          </List>
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(ThemesList),
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
