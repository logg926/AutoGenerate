import React from 'react';
import SimpleSlider from './SimpleSlider';
import './EditPage.css';
import Button from '@material-ui/core/Button'
import TabContainer from './TabContainer'
import CircularProgress from '@material-ui/core/CircularProgress';
// const optionsForChange = ['Contrast', 'Brightness','Threshold']



class EditPage extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      contrast: 0,
      brightness: 0,
      threshold: 0 ,
      loadingedit : false
    };
    this.contrast_setter=this.contrast_setter.bind(this)
    this.threshold_setter=this.threshold_setter.bind(this)
    this.brightness_setter=this.brightness_setter.bind(this)
    this.updatephoto=this.updatephoto.bind(this)
    this.exportPhoto= this.exportPhoto.bind(this)
  }

  exportPhoto=(e)=>{
  // fetch newid
  const datae = new FormData();
  datae.append('newid', this.props.newid)
  let theLink = this.props.link+'/'+this.props.id
  let theURL = ""
  fetch(theLink,{
    method: "POST",
    body: datae
}).then(function(response) {
    return response.json();
  })
  .then((myJson)=> {
    this.props.setExportCode(myJson.hashedid)
    this.props.setFinishExporting()
  }).catch(function (error) {
        // handle error
        console.log(error);
      })
      this.props.setExporting()
this.props.changeValue(2)

}
    contrast_setter=(event,value)=>{
      this.setState({
        contrast: value
      })
      // this.updatephoto()
    }
    brightness_setter=(event,value)=>{
      this.setState({
        brightness: value
      })
      // this.updatephoto()

    }
    threshold_setter=(event,value)=>{
      this.setState({
        threshold: value
      })
      // this.updatephoto()
    }

    updatephoto(){

      const datae = new FormData();
      console.log("loadingedit:")
      console.log(this.state.loadingedit)

        datae.append('contrast', this.state.contrast.toString())
        datae.append('brightness', this.state.brightness.toString())
        datae.append('threshold', this.state.threshold.toString())
      let theLink = this.props.link+'/'+this.props.id
      // dont change the empty link below
      let theURL = ""
      fetch(theLink,{
        method: "PATCH",
        body: datae
    }).then(function(response) {
        return response.json();
      })
      .then((myJson)=> {
        theURL=this.props.link+myJson.url
        this.props.change(theURL)
        this.props.setNewId(myJson.newid)
        this.props.setFinishLoading()
      }).catch(function (error) {
            // handle error
            console.log(error);
          })
          console.log(theURL)
          this.props.setFinishLoading()
    }
    
      handleContrastChange = (event, contrast) => {
        this.setState({ contrast });
      };

      
    render(){
        return <TabContainer><div className="slider-container">
        {/* <img key={(new Date()).getTime()} source={{ uri: this.props.loading?"https://via.placeholder.com/150":this.props.url+'?time'+(new Date()).getTime(), headers: {Pragma: 'no-cache' } }} /> */}
        {/* <img className='img'src={this.props.loading?"https://via.placeholder.com/150":this.props.url, headers: {Pragma: 'no-cache' }} alt="modified"></img> */}
        {/* <img className='img'src={this.props.loading?"https://via.placeholder.com/150":this.props.url+"#"+new Date().getTime()} alt="modified"></img> */}
        <img className='img'src={this.props.url} alt="modified"  style={this.props.loading?{opacity: 0.5}:{opacity:1}} ></img>
        {/* {()=>{
          // if (this.props.url!=""){
            return <img className='img'src={this.props.url} alt="modified"></img>
          // }else{
            // return <CircularProgress />
          // }
          
        }} */}
        
        
<div className='place-holder'></div>
<SimpleSlider  min={-100} max={100} text="Contrast:" value={this.state.contrast} setter={this.contrast_setter} />
<SimpleSlider  min={-100} max={100} text="Brightness:" value={this.state.brightness} setter={this.brightness_setter}  />
<SimpleSlider min={0} max={100} text="Threshold:" value={this.state.threshold} setter={this.threshold_setter}/>
<Button variant="contained" color="secondary" className='button' onClick={(e)=>{

  this.updatephoto()

}} disabled={this.props.loading}>
  Apply Changes
</Button>
<br/>
<Button variant="contained" color="primary" className='button' onClick={this.exportPhoto}>
  Export to Auto Create
</Button>
</div>
</TabContainer>
    }
}



export default EditPage;