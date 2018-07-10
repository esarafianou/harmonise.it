import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Button, Chip, Avatar } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import renderSolution from '../helpers/vexFlowSolutionRendering'
import { constructThemeSolutionData } from '../helpers/constructThemeSolutionData'
import updateSolutionMutation from './updateSolutionMutation'

const styles = theme => ({
  icon: {
    width: 35,
    height: 35,
    marginLeft: 5,
    backgroundColor: '#BEEBEF',
    '&:hover': {
      backgroundColor: '#BEEBEF'
    },
    '&:focus': {
      backgroundColor: '#BEEBEF'
    }
  }
})

class SolutionData extends React.Component {
  constructor () {
    super()
    this.state = {
      cursor: {
        stave: 0,
        voice: 0,
        position: 0
      },
      themeData: '',
      solutionData: '',
      saveButton: 'save'
    }
    this.eventListener = this.eventListener.bind(this)
    this.handleModification = this.handleModification.bind(this)
  }

  saveSolution () {
    updateSolutionMutation.commit(this.props, this.state.solutionData)
    this.setState({saveButton: 'Saved'})
    setTimeout(() => { this.setState({saveButton: 'Save'}) }, 2000)
  }

  _renderSolution (element, solutionInfo) {
    return renderSolution(element, solutionInfo, this.props.editable, this.state.cursor)
  }

  eventListener (event) {
    const cursor = {...this.state.cursor}
    if (event.key === 'ArrowRight') {
      cursor.position += 1
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowLeft') {
      cursor.position = Math.max(cursor.position - 1, 0)
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowDown') {
      if (cursor.stave === 0 && cursor.voice < 2) {
        cursor.voice = cursor.voice + 1
      } else if (cursor.voice === 2) {
        cursor.voice = 0
        cursor.stave = 1
      }
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowUp') {
      if (cursor.stave === 0) {
        cursor.voice = Math.max(cursor.voice - 1, 0)
      } else {
        cursor.voice = 2
        cursor.stave = 0
      }
      this.setState({cursor: cursor})
    } else if (event.keyCode >= 65 && event.keyCode <= 71) {
      const solutionData = {...this.state.solutionData}
      if (this.props.givenVoice === 'soprano') {
        if (cursor.stave === 0) {
          if (cursor.voice !== 0) {
            solutionData[cursor.voice - 1][cursor.position].key = event.key + '/4'
            solutionData[cursor.voice - 1][cursor.position].type = 'note'
          } else {
            console.log('Not editable')
          }
        } else {
          solutionData[2][cursor.position].key = event.key + '/3'
          solutionData[2][cursor.position].type = 'note'
        }
      } else {
        if (cursor.stave === 0) {
          solutionData[cursor.voice][cursor.position].key = event.key + '/4'
          solutionData[2][cursor.position].type = 'note'
        } else {
          console.log('Not editable')
        }
      }
      this.setState({solutionData: solutionData})
    }
  }

  handleModification (accidental) {
    let currentNote
    const solutionData = {...this.state.solutionData}
    if (this.props.givenVoice === 'soprano') {
      if (this.state.cursor.stave === 0) {
        if (this.state.cursor.voice !== 0) {
          currentNote = solutionData[this.state.cursor.voice - 1][this.state.cursor.position]
          if (currentNote.accidental !== accidental && currentNote.type === 'note') {
            solutionData[this.state.cursor.voice - 1][this.state.cursor.position].accidental = accidental
          } else if (currentNote.accidental !== '') {
            solutionData[this.state.cursor.voice - 1][this.state.cursor.position].accidental = ''
          }
        } else {
          console.log('Not editable')
        }
      } else {
        console.log(this.state.cursor.voice)
        currentNote = solutionData[2][this.state.cursor.position]
        if (currentNote.accidental !== accidental && currentNote.type === 'note') {
          solutionData[2][this.state.cursor.position].accidental = accidental
        } else {
          solutionData[2][this.state.cursor.position].accidental = ''
        }
      }
    } else {
      if (this.state.cursor.stave === 0) {
        currentNote = solutionData[this.state.cursor.voice][this.state.cursor.position]
        if (currentNote.accidental !== accidental && currentNote.type === 'note') {
          solutionData[this.state.cursor.voice][this.state.cursor.position].accidental = accidental
        } else {
          solutionData[this.state.cursor.voice][this.state.cursor.position].accidental = ''
        }
      } else {
        console.log('Not editable')
      }
    }
    this.setState({solutionData: solutionData})
  }

  componentDidMount () {
    document.addEventListener('keydown', this.eventListener)
    this.setState({ themeData: JSON.parse(this.props.themeData), solutionData: JSON.parse(this.props.solution.solution_data) })

    const themeSolutionData = constructThemeSolutionData(JSON.parse(this.props.themeData), JSON.parse(this.props.solution.solution_data), this.props.givenVoice)
    this._renderSolution(this.el, themeSolutionData)
  }

  componentDidUpdate () {
    const themeSolutionData = constructThemeSolutionData(this.state.themeData, this.state.solutionData, this.props.givenVoice)
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild)
    }
    this._renderSolution(this.el, themeSolutionData)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.eventListener)
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <Chip className={classes.icon} label={<Avatar src='../../../../assets/images/music_flat_sign.png' />}
          onClick={() => this.handleModification('b')} />
        <Chip className={classes.icon} label={<Avatar src='../../../../assets/images/music_sharp_sign.png' />}
          onClick={() => this.handleModification('#')} />
        <Chip className={classes.icon} label={<Avatar src='../../../../assets/images/music_none_sign.png' />}
          onClick={() => this.handleModification('n')} />
        <div ref={el => { this.el = el }} />
        { this.props.editable ? <Button raised onClick={() => { this.saveSolution() }}>{this.state.saveButton}</Button> : null }
      </div>
    )
  }
}

export default createFragmentContainer(withStyles(styles)(SolutionData),
  graphql`
    fragment SolutionData_solution on SolutionTheme {
      solution_data
    }
  `
)
