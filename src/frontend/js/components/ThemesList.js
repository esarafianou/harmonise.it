import React from 'react'
import { Link } from 'found'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem, Button, Divider, Grid, Paper, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import ThemeData from './ThemeData'
import createSolutionMutation from './createSolutionMutation'

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
    marginTop: 20,
    marginBottom: 5
  }
})

class ThemesList extends React.Component {
  createSolution (theme) {
    createSolutionMutation.commit(this.props, theme)
  }

  createthemesList (themes) {
    let difficulty = {
      1: 'very easy',
      2: 'easy',
      3: 'medium',
      4: 'advanced',
      5: 'expert'
    }

    return themes.map((theme, i) => {
      return (
        <div key={i}>
          <Divider />
          <ListItem>
            <List>
              <ListItem key='1'>{theme.description}</ListItem>
              <ListItem key='2'>Given voice: {theme.given_voice}</ListItem>
              <ListItem key='3'>Difficulty: {difficulty[theme.difficulty]}</ListItem>
              <ListItem key='4'><ThemeData theme={theme} /></ListItem>
              {this.props.loggedIn
              ? <Button raised key='5' onClick={() => { this.createSolution(theme) }}>Solve it!</Button>
              : <Link to='/login' key='5' className={this.props.classes.link}>Login to start solving!</Link>
              }
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
          <Typography type='title'>
            Themes
          </Typography>
          <Typography type='subheading' className={classes.text}>
            Choose a theme and start solving its music harmony
          </Typography>
          <List className={this.props.classes.root}>
            { this.createthemesList(this.props.themes) }
          </List>
        </Paper>
      </Grid>
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
