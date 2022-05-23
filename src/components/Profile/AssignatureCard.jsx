import React, { Fragment, useEffect } from 'react'
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import CircularProgress from '@mui/material/CircularProgress';

const AssignatureCard = (props) => {
    const [assignature, setAssignature] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
  
    useEffect(() => {
      props.assignature ? setAssignature(props.assignature.split(',')) : setAssignature([]);
      setLoading(false);
    }, [props.assignature]);
  
    if (loading) return <CircularProgress />
    return (
      <Fragment>
        <h1 style={{ 'textAlign': 'center' }}> Asignaturas</h1>
        <Divider />
        <List>
        {!!assignature && assignature.map( (assignature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary={assignature} />
              </ListItemButton>
              <Divider />
            </ListItem>
        ))}
      </List>
      </Fragment>
    )
}

export default AssignatureCard