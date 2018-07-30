import React from 'react'
import { Button, Typography, Modal } from 'material-ui'
import { withStyles } from 'material-ui/styles'

function getModalStyle () {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    border: '3px solid purple'

  },
  form: {
    float: 'right',
    clear: 'none'
  },
  deleteImage: {
    height: 100,
    width: 100,
    margin: 'auto',
    display: 'block'
  },
  button: {
    color: 'purple'
  }
})

class DeletionModal extends React.Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: true
    }
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  render () {
    const { classes } = this.props
    return (
      <div>
        <Modal open={this.state.modalIsOpen} onClose={this.handleClose} className={classes.modal}>
          <div style={getModalStyle()} className={classes.paper}>
            <img className={classes.deleteImage} src='/assets/images/delete.svg' />
            <Typography type='body2'>
              You are about to delete a solution. Are you sure?
            </Typography>
            <form className={classes.form}>
              <Button onClick={() => { this.closeModal(); this.props.closeModal() }}>Cancel</Button>
              <Button className={classes.button} onClick={() => { this.closeModal(); this.props.deleteSolution() }}>Delete</Button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default withStyles(styles)(DeletionModal)
