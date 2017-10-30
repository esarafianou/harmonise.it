import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { List, ListItem } from 'material-ui'

class ThemesList extends React.Component {

    createthemesList =  (themes) => {
        return themes.map((theme, i) => {
            return <ListItem key={i}> {theme.description} </ListItem>
        })
    }

  render() {
    return(
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
    }  
  `,  
);
