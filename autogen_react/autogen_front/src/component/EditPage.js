import React from 'react';
import SimpleSlider from './SimpleSlider';
import './EditPage.css';
import Button from '@material-ui/core/Button'
import TabContainer from './TabContainer'
const optionsForChange = ['Contrast', 'Brightness','Threshold']



class EditPage extends React.Component {

    contrast_setter(){

    }

    state = {
        contrast: 50,

      };
    
      handleContrastChange = (event, contrast) => {
        this.setState({ contrast });
      };

      
    render(){
        return <TabContainer><div className="slider-container">
        

        <img className='img'src={this.props.loading?"https://via.placeholder.com/150":this.props.url} alt="modified"></img>
<div className='place-holder'></div>
<SimpleSlider/>
<SimpleSlider/>
<SimpleSlider/>
<Button variant="contained" color="primary" className='button'>
        Export to Auto Create
      </Button>
        </div>
        </TabContainer>
    }
    
}



export default EditPage;