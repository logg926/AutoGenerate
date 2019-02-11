import React, { Component } from 'react'
import './ConfirmPage.css'
import Paper from './Paper'
import TabContainer from './TabContainer'

class ConfirmPage extends Component {
  render() {
    return (
      <TabContainer>
      <Paper header="Your Program's Id:" >
      Please Screen Capture this Confirm Page <br></br>
      <Paper header={
          this.props.exportCode

      } />
      </Paper>

      </TabContainer>
    )
  }
}

export default ConfirmPage
