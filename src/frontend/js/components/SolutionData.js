import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Button, Chip } from 'material-ui'
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
        voice: '',
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
    return renderSolution(element, solutionInfo, this.props.editable, this.state.cursor, this.props.givenVoice)
  }

  getNoteOctave () {
    if (this.state.cursor.stave !== 0) {
      return '/3'
    } else {
      return '/4'
    }
  }

  eventListener (event) {
    const cursor = {...this.state.cursor}
    const voiceMapper = {
      'soprano': 0,
      'alto': 1,
      'tenoro': 2
    }
    const reverseVoiceMapper = {
      0: 'soprano',
      1: 'alto',
      2: 'tenoro'
    }
    if (event.key === 'ArrowUp' && event.getModifierState('Control')) {
      const solutionData = {...this.state.solutionData}
      const [ key, currentOctave ] = solutionData[cursor.voice][cursor.position].key.split('/')
      solutionData[cursor.voice][cursor.position].key = key + '/' + (parseInt(currentOctave, 10) + 1)
      this.setState({solutionData: solutionData})
    } else if (event.key === 'ArrowDown' && event.getModifierState('Control')) {
      const solutionData = {...this.state.solutionData}
      const [ key, currentOctave ] = solutionData[cursor.voice][cursor.position].key.split('/')
      solutionData[cursor.voice][cursor.position].key = key + '/' + (parseInt(currentOctave, 10) - 1)
      this.setState({solutionData: solutionData})
    } else if (event.key === 'ArrowRight') {
      cursor.position += 1
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowLeft') {
      cursor.position = Math.max(cursor.position - 1, 0)
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowDown') {
      if (cursor.stave === 0 && voiceMapper[cursor.voice] < 2) {
        cursor.voice = reverseVoiceMapper[voiceMapper[cursor.voice] + 1]
      } else if (cursor.voice === 'tenoro') {
        cursor.voice = 'bass'
        cursor.stave = 1
      }
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowUp') {
      if (cursor.stave === 0) {
        cursor.voice = reverseVoiceMapper[Math.max(voiceMapper[cursor.voice] - 1, 0)]
      } else {
        cursor.voice = 'tenoro'
        cursor.stave = 0
      }
      this.setState({cursor: cursor})
    } else if (event.keyCode >= 65 && event.keyCode <= 71) {
      const solutionData = {...this.state.solutionData}
      const noteOctave = this.getNoteOctave()
      if (cursor.voice === this.props.givenVoice) {
        console.log('not editable')
      } else {
        solutionData[cursor.voice][cursor.position].key = event.key + noteOctave
        solutionData[cursor.voice][cursor.position].type = 'note'
      }
      this.setState({solutionData: solutionData})
    }
  }

  handleModification (accidental) {
    const solutionData = {...this.state.solutionData}
    const cursor = this.state.cursor
    if (cursor.voice === this.props.givenVoice) {
      console.log('not editable')
    } else {
      const currentNote = solutionData[cursor.voice][cursor.position]
      if (currentNote.accidental !== accidental && currentNote.type === 'note') {
        solutionData[cursor.voice][cursor.position].accidental = accidental
      } else if (currentNote.accidental !== '') {
        solutionData[cursor.voice][cursor.position].accidental = ''
      }
    }
    this.setState({solutionData: solutionData})
  }

  componentDidMount () {
    document.addEventListener('keydown', this.eventListener)
    this.setState({ themeData: JSON.parse(this.props.themeData), solutionData: JSON.parse(this.props.solution.solution_data) })
    const cursor = {...this.state.cursor}
    cursor.voice = this.props.givenVoice
    this.setState({ cursor: cursor })
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
            <Chip className={classes.icon} label={'\u266D'} onClick={() => this.handleModification('b')} />
            <Chip className={classes.icon} label={'\u266F'} onClick={() => this.handleModification('#')} />
            <Chip className={classes.icon} label={'\u266E'} onClick={() => this.handleModification('n')} />
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
