import React from 'react';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 7 , overflowX: 'hidden'}}>
        {props.children}
      </Typography>
    );
  }

export default TabContainer
