import React from 'react';
import SimpleSlider from './SimpleSlider';
import './EditPage.css';
import Button from '@material-ui/core/Button'
import TabContainer from './TabContainer'
const optionsForChange = ['Contrast', 'Brightness','Threshold']



class EditPage extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      contrast: 0,
      brightness: 0,
      threshold: 0 
    };
    this.contrast_setter=this.contrast_setter.bind(this)
    this.threshold_setter=this.threshold_setter.bind(this)
    this.brightness_setter=this.brightness_setter.bind(this)
    this.updatephoto=this.updatephoto.bind(this)
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

      console.log(this.state.contrast)

        datae.append('contrast', this.state.contrast.toString())
        datae.append('brightness', this.state.brightness.toString())
        datae.append('threshold', this.state.threshold.toString())
      let theLink = this.props.link+'/'+this.props.id
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
        this.props.setFinishLoading()
      }).catch(function (error) {
            // handle error
            console.log(error);
          })
          console.log(theURL)
          this.props.setLoading()
    }
    
      handleContrastChange = (event, contrast) => {
        this.setState({ contrast });
      };

      
    render(){
        return <TabContainer><div className="slider-container">
        

        {/* <img key={(new Date()).getTime()} source={{ uri: this.props.loading?"https://via.placeholder.com/150":this.props.url+'?time'+(new Date()).getTime(), headers: {Pragma: 'no-cache' } }} />
        <img className='img'src={this.props.loading?"https://via.placeholder.com/150":this.props.url, headers: {Pragma: 'no-cache' }} alt="modified"></img> */}
        {/* <img className='img'src={this.props.loading?"https://via.placeholder.com/150":this.props.url+"#"+new Date().getTime()} alt="modified"></img> */}
        <img className='img'src={this.props.url==""? "https://via.placeholder.com/150":this.props.url+"#"+new Date().getTime()} alt="modified"></img>

<div className='place-holder'></div>
<SimpleSlider  min={-100} max={100} text="Contrast:" value={this.state.contrast} setter={this.contrast_setter} onDragEnd={()=>{this.updatephoto()}}/>
<SimpleSlider  min={-100} max={100} text="Brightness:" value={this.state.brightness} setter={this.brightness_setter}  onDragEnd={()=>{this.updatephoto()}}/>
<SimpleSlider min={0} max={100} text="Threshold:" value={this.state.threshold} setter={this.threshold_setter} onDragEnd={()=>{this.updatephoto()}}/>
<Button variant="contained" color="primary" className='button'>
  Export to Auto Create
</Button>
</div>
</TabContainer>
    }
}



export default EditPage;