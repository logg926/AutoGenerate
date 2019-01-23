import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Window from './Window'
// import blue from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: { 
      primary: {
        light: '#5e91f2',
        main: '#1564bf',
        dark: '#003b8e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#62727b',
        main: '#37474f',
        dark: '#102027',
        contrastText: '#fff',
      },
  typography: { useNextVariants: true },
},
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Window/>
    </MuiThemeProvider>
  );
}

export default App;