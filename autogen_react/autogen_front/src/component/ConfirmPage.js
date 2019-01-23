import React, { Component } from 'react'
import './ConfirmPage.css'
import Paper from './Paper'
import TabContainer from './TabContainer'

const id = 'HY_hihi'
class ConfirmPage extends Component {
  render() {
    return (
      <TabContainer>
      <Paper header="Id:" >
      Please Screen Capture this Confirm Page <br></br>
      <Paper header={
          id

      } />
      </Paper>

      </TabContainer>
    )
  }
}

export default ConfirmPage
