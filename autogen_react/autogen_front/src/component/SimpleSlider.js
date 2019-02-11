import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
// import Slider from 'rc-slider';

const styles = {
  root: {
    width: 'auto',
  },
  slider: {
    padding: '22px 0px',
  },
};

class SimpleSlider extends React.Component {
  state = {
    value: 0,

  };

  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log(value)

    return (
      <div className={classes.root}>
        <Typography id="label">{this.props.text}</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={this.props.value}
          aria-labelledby="label"
          onChange = {this.props.setter}
          onDragEnd ={this.props.onDragEnd}
          onDragStop = {this.props.onDragEnd}
          min= {this.props.min}
          max={this.props.max}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);