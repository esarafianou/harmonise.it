import React from 'react'
import { Link } from 'found'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem, Button, Divider, Grid, Paper, Typography, Chip } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import ThemeData from './ThemeData'
import createSolutionMutation from './createSolutionMutation'
import { difficulty } from '../utils'

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
    marginTop: 20,
    marginBottom: 5
  },
  descr: {
    marginTop: 10
  },
  button: {
    marginBottom: 10
  }
})

class ThemesList extends React.Component {
  createSolution (theme) {
    createSolutionMutation.commit(this.props, theme)
  }

  createthemesList (themes) {
    return themes.map((theme, i) => {
      const chipStyle = {
        backgroundColor: difficulty[theme.difficulty].color,
        color: 'white',
        fontWeight: 'bold',
        float: 'right'
      }

      const { classes } = this.props

      return (
        <div key={i}>
          <Divider />
          <ListItem>
            <Grid container>
              <Grid item md={6}>
                <Typography type='body2' className={classes.descr}>{theme.description}</Typography>
              </Grid>
              <Grid item md={6}>
                <Chip label={difficulty[theme.difficulty].name} style={chipStyle} />
              </Grid>
              <Grid item md={12}>
                <ThemeData theme={theme} />
              </Grid>
              {this.props.loggedIn
              ? <Button raised key='5' className={classes.button}onClick={() => { this.createSolution(theme) }}>Solve it!</Button>
              : <Link to='/login' key='5' className={classes.link}>Login to start solving!</Link>
              }
            </Grid>
          </ListItem>
        </div>
      )
    })
  }

  render () {
    const { classes } = this.props
    return (
      <Grid justify='center' spacing={0} container className={classes.root}>
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
      ...ThemeData_theme
    }
  `
)
