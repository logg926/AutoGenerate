import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import UploadButton from './UploadButton';

class App extends Component {
  onOpenCvReady(){
    console.log("opencv ready");

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <UploadButton/>
        </header> 
      </div>
    );
  }
}


export default App;

