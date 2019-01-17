
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  image: {
    display: 'none',
  },
});

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.inputEvent = this.inputEvent.bind(this);
    this.state = {
      imgsrc: ""
    };
    // this.image = React.createRef();

    this.imgRef = React.createRef();
  }

  inputEvent = (e) => {

    this.setState({

      imgsrc: URL.createObjectURL(e.target.files[0])
    });
  } 

  imageLoading = (e) => {
    let img = window.cv.imread("imageSrc");
    let dst = new window.cv.Mat();
    // window.cv.cvtColor(img, dst, window.cv.COLOR_RGBA2GRAY);

    let height =img.rows;
    let width = img.cols;
    let widthheightratio = 1.3;
    let outputpixelWidth = 133;
    let outputpixelHeight = 114;

    if (  width/ height >= outputpixelWidth*widthheightratio/outputpixelHeight){
      window.cv.resize(img,dst,[outputpixelWidth, Math.trunc(height*outputpixelWidth/ width* widthheightratio )],0.0,0.0,window.cv.INTER_LINEAR );
    }
    else{
      console.log([Math.trunc(( width*outputpixelHeight/ height)/widthheightratio),outputpixelHeight]);
      window.cv.resize(img,dst,[Math.trunc(( width * outputpixelHeight/ height ) / widthheightratio),outputpixelHeight],0.0,0.0,window.cv.INTER_LINEAR );
    }
    
    window.cv.imshow('canvasOutput', dst);
    img.delete();
    dst.delete();
  }



  render() {

    const { classes } = this.props;
    if (this.state.imgsrc == "") {
      return (
        <div>
          <input
            accept="image/*"
            className={classes.input}
            id="flat-button-file"
            multiple
            type="file"
            onInput={this.inputEvent}
          />
          <label htmlFor="flat-button-file">
            <Button component="span" color="primary" variant="contained" className={classes.button}>

              Upload
            </Button>
          </label>
        </div>
      );
    } else {

      return (
        <div>
          <>
            <input
              accept="image/*"
              className={classes.input}
              id="flat-button-file"
              multiple
              type="file"
              onInput={this.inputEvent}
            />
            <label htmlFor="flat-button-file">
              <Button variant="contained" color="secondary" className={classes.button}>
                Change
               </Button>
              <Button component="span" color="primary" variant="contained" className={classes.button}>
                Upload
              </Button>
            </label>
          </>
          <img id="imageSrc" alt="No Image" src={this.state.imgsrc}
            onLoad={this.imageLoading}
          />
          <canvas id="canvasOutput" ></canvas>



        </div>


      );

    }
  }
}

export default withStyles(styles)(UploadButton);
