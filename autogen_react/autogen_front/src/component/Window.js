import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UploadPage from './UploadPage'
import EditPage from './EditPage'
import ConfirmPage from './ConfirmPage'
import "./Window.css";
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.primary,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});

// const link = "http://127.0.0.1:5000/"
const link = "http://127.0.0.1:8000"
// const link = ""

class Window extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'',
            value: 0,
            modifyLoading: false,
            id : '',
            newid: '',
            exportCode: "",
            exporting: false
        }
        this.changeURL = this.changeURL.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.finishLoading =this.finishLoading.bind(this)
        this.startLoading = this.startLoading.bind(this)
      }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    changeURL =(url)=>{
        this.setState({url})
        console.log(url)
    }

    changeValue(value){
        this.setState({value})

    }
    startLoading(){

        this.setState({modifyLoading: true})
    }
    finishLoading(){

        this.setState({modifyLoading: false})
    }
    

    render() {
        //   console.log(this.props.theme);
        const { classes} = this.props;
        const{value}= this.state;

        

        return (
            <div className={classes.root}>
                <AppBar >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                    >
                        <Tab label="Upload" />
                        <Tab label="Modify" disabled={!this.state.url} />
                        <Tab label="Export" disabled={!this.state.url||!this.state.newid}/>
                        
                    </Tabs>
                </AppBar>
                {/* <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    style={viewstyle}
                    containerStyle={viewstyle}
                > */}
                    {/* <TabContainer dir={theme.direction}> */}
                    <div className='theview'>
                {value === 0 && <UploadPage 
                    setId = {(id)=>{
                        this.setState({id})
                    }}
                    link={link}
                    changeValue={this.changeValue} 
                    change={this.changeURL} 
                    finishLoading={this.finishLoading}
                    setNewId = {(newid)=>{this.setState({newid:newid})}}
                />}
               
                {value === 1 && <EditPage 
                    id={this.state.id}
                    setLoading={this.startLoading} 
                    setFinishLoading={this.finishLoading} 
                    link={link} 
                    url={this.state.url} 
                    change={this.changeURL} 
                    loading={this.state.modifyLoading} 
                    setNewId = {(newid)=>{this.setState({newid:newid})}}
                    newid = {this.state.newid}
                    setExportCode= {(hashedid)=>{this.setState({exportCode:hashedid})}}
                    changeValue={(value)=>{this.setState({value})}} 
                    setExporting={()=>{this.setState({exporting: true})}}
                    setFinishExporting={()=>{this.setState({exporting: false})}}
                />}
                {value === 2 && <ConfirmPage link={link} exportCode ={this.state.exportCode}/>}
                </div>
                    
                    
{/*                     
                </SwipeableViews> */}
            </div>
        );
    }
}

Window.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Window);