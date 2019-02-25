//todo: type check
import React from 'react';
import Button from '@material-ui/core/Button';
import './UploadPage.css'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FilePond, registerPlugin } from 'react-filepond';
import './filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import './filepond-plugin-image-preview.css';




registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginImageResize ,FilePondPluginFileValidateType ,FilePondPluginFileValidateSize);


class UploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.inputEvent = this.inputEvent.bind(this);
  }

  componentDidMount() {

  }
  inputEvent = (e) => {
  //   console.log(12345)
  //   const datae = new FormData();
  //   datae.append('photo', e.target.files[0])
  //   let theLink = this.props.link
  //   let theURL = ""
  //   this.setState({ uploadbuttonEnable: false })


  //   let config = {
  //     onUploadProgress: function (progressEvent) {
  //       var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //       console.log(percentCompleted)
  //       // let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
  //     }
  //   };
  //   Axios({
  //     method: 'post',
  //     url: theLink,
  //     data: datae,
  //     config
  //   })
  //     .then(function (response) {
  //       //handle success
  //       return response.data
  //       // console.log(response);
  //     }).then((myJson) => {
  //       theURL = theLink + myJson.url
  //       this.props.setId(myJson.id)
  //       this.props.change(theURL)
  //       this.props.finishLoading()
  //       this.props.setNewId(myJson.newid)
  //       this.props.changeValue(1)

  //       this.setState({ uploadbuttonEnable: true })
  //     }).catch((error) => {
  //       // handle error

  //       this.setState({ uploadbuttonEnable: true })
  //       console.log(error);
  //     })
    // fetch(theLink,{
    //     method: "POST",
    //     body: datae
    // }).then(function(response) {
    //     return response.json();
    //   })
    //   .then((myJson)=> {
    //     theURL=theLink+myJson.url
    //     this.props.setId(myJson.id)
    //     this.props.change(theURL)
    //     this.props.finishLoading()
    //     this.props.setNewId(myJson.newid)

    //   }).catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       })

    // console.log(theURL)
  }

  // loadingcomponent() {

  //   // if (this.state.uploadbuttonEnable){

  //   if (this.state.uploadbuttonEnable) {
  //     return <><input
  //       accept="image/*"
  //       className='input'
  //       id="flat-button-file"
  //       type="file"
  //       onChange={this.inputEvent}
  //     />
  //       {/* <input type="file" 
  // id="flat-button-file" class="nodisplay" name="files[]" multiple="" accept=".jpg,.jpeg,.png,.gif,.apng,.tiff,.tif,.bmp"></input> */}
  //       <label htmlFor="flat-button-file">
  //         <Button component="span" className='component-upload-button' variant="contained" color="primary" disabled={!this.state.uploadbuttonEnable} >Upload</Button>
  //       </label></>
  //   } else {
  //     return <CircularProgress className='component-upload-button' />
  //   }
  // }
  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}


  render() {
    // const { classes } = this.props;
    return <div className='button-container'>
      <FilePond
        allowMultiple={false}
        labelIdle='<b>Click<span class="filepond--label-action"> here </span>to upload your photo!</b>'
        className='component-upload-filepond'
        allowFileTypeValidation={true}
        acceptedFileTypes={['image/*']}
        // server={this.props.link}
        allowFileSizeValidation = {true}
        maxFileSize = '1536KB'
        server={
          {
              timeout: 99999,
              process: (fieldName, file, metadata, load, error, progress, abort) => {

                  const formData = new FormData()
                  formData.append('photo', file, file.name)

                  // aborting the request
                  const CancelToken = axios.CancelToken
                  const source = CancelToken.source()
                  let theURL = ""

                  axios({
                      method: 'POST',
                      url: this.props.link,
                      data: formData,
                      cancelToken: source.token,
                      onUploadProgress: (e) => {
                          // updating progress indicator
                          progress(e.lengthComputable, e.loaded, e.total)
                      }
                  }).then(response => {
                      // passing the file id to FilePond
                      // load(response.file)
                        return response.data
                  }).then((myJson) => {
                    theURL = this.props.link + myJson.url
                    this.props.setId(myJson.id)
                    this.props.change(theURL)
                    this.props.finishLoading()
                    this.props.setNewId(myJson.newid)
                    this.props.changeValue(1)
            
                    // this.setState({ uploadbuttonEnable: true })
                  }).catch((thrown) => {
                      if (axios.isCancel(thrown)) {
                          console.log('Request canceled', thrown.message)
                      } else {
                          // handle error
                      }
                  })
                  // Setup abort interface
                  return {
                      abort: () => {
                          source.cancel('Operation canceled by the user.')
                          abort()
                      }
                  }
              }

          }
      }
      />
      {/* {this.loadingcomponent()} */}

    </div>
  }
}


// export default withStyles(styles, { withTheme: true })(UploadPage);
export default UploadPage;