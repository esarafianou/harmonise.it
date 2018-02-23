import React from 'react'
import { Link } from 'found'
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
        <div key={i}>
          <Divider />
          <ListItem>
            <List>
              <ListItem key='1'>Given voice: {theme.given_voice}</ListItem>
              <ListItem key='2'>{theme.description}</ListItem>
              <ListItem key='3'><ThemeData theme={theme} /></ListItem>
              {this.props.loggedIn
              ? <Button raised key='4' onClick={() => { this.createSolution(theme) }}>Solve it!</Button>
              : <Link to='/login' key='4'>Login to start solving!</Link>
              }
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
          <h1>Themes</h1>
        </header>
        <div>Choose a theme and start solving its music harmony</div>
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
