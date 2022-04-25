import React from 'react'
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Home from './views/Home';
import { ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import themeEasyClass from './styles/theme';

const useStyles = makeStyles(() => ({
  containerApp: {
    backgroundColor: 'rgb(255, 255, 255)',
    height: '100%',
    width: '100%',
  },
}));

const App = () => {

  const classes = useStyles()
  return (

    <Router>
      <ThemeProvider theme={themeEasyClass}>
        <div className={classes.containerApp}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
