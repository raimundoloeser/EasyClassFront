import React, { Fragment, useEffect } from 'react'
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CircularProgress from '@mui/material/CircularProgress';

const SubjectsCard = (props) => {
    const [subjects, setSubjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
  
    useEffect(() => {
      props.subjects ? setSubjects(props.subjects.split(',')) : setSubjects([]);
      setLoading(false);
    }, [props.subjects]);
  
    if (loading) return <CircularProgress />
    return (
      <Fragment>
        <h1 style={{ 'textAlign': 'center' }}> Materias</h1>
        <Divider />
        <List>
        {!!subjects && subjects.map( (subject, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                    <FolderOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={subject} />
              </ListItemButton>
              <Divider />
            </ListItem>
        ))}
      </List>
      </Fragment>
    )
}

export default SubjectsCard