import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
class ChangeButton extends React.Component {

    
    handleClick() {
        let src = cv.imread('canvasInput');
        let dst = new cv.Mat();
        // To distinguish the input and output, we graying the image.
        // You can try different conversions.
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow('canvasOutput', dst);
        src.delete();
        dst.delete();
      }

    render() {

    const { classes } = this.props;
    return (
        <div>
        
        <Button onClick={this.handleClick} component="span" color="primary" variant="contained" className={classes.button}>
        
          do
        </Button>
      </div>
          
    );
    }
}

export default withStyles(styles)(UploadButton);
