import React from 'react'
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Home from './views/Home';
import TeacherList from './views/TeacherList/TeacherList';
import { ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import themeEasyClass from './styles/theme';
import Login from './views/Login';
import Register from './views/Register';
import TeacherProfile from './views/TeacherProfile';
import ResponsiveAppBar from './components/Navbar/Navbar';
import MyCalendar from './views/MyCalendar';

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
      <ResponsiveAppBar />
      <ThemeProvider theme={themeEasyClass}>
        <div className={classes.containerApp}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teacher/:id" element={<TeacherProfile />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/teacher" element={<Register isTeacher={true}/>} />
            <Route path="/register/student" element={<Register isTeacher={false}/>} />
            <Route path="/mycalendar" element={<MyCalendar />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
