//todo: type check
import React from 'react';
import Button from '@material-ui/core/Button';
import './UploadPage.css'
import Axios from 'axios';

class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.inputEvent = this.inputEvent.bind(this);
      }

    componentDidMount() {

    }
    inputEvent = (e) => {
        const datae = new FormData();
        datae.append('photo',e.target.files[0])
        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        // const instance = Axios.create();
        //   Axios.post('http://127.0.0.1:5000/',{data
        //   }).then(function (response) {
        //     // handle success
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   })
        let theLink = this.props.link
        let theURL = ""
        fetch(theLink,{
            method: "POST",
            body: datae
        }).then(function(response) {
            return response.json();
          })
          .then((myJson)=> {
            theURL=theLink+myJson.url
            this.props.setId(myJson.id)
            this.props.change(theURL)
            this.props.finishLoading()
          }).catch(function (error) {
                // handle error
                console.log(error);
              })
              console.log(theURL)
            this.props.changeValue(1)
        //     function(res){ return res.json(); })
        // .then(function(data){ alert( JSON.stringify( data ) ) }).catch(function (error) {
        //     console.log(error);
        //   });

        // this.props.change(URL.createObjectURL(e.target.files[0]))
        

        // this.setState({
    
        //   imgsrc: 
        // });
      }


    render(){
        // const { classes } = this.props;
        return<div className='button-container'>
<input
            accept="image/*"
            className='input'
            id="flat-button-file"
            multiple
            type="file"
            onInput={this.inputEvent}
          />
          <label htmlFor="flat-button-file">
          
<Button component="span" className = 'component-upload-button' variant="contained" color="primary" >Upload</Button>
        
</label>
        </div> 
    }
}


// export default withStyles(styles, { withTheme: true })(UploadPage);
export default UploadPage;