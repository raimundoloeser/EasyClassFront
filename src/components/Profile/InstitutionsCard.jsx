import React, { Fragment, useEffect } from 'react'
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SchoolIcon from '@mui/icons-material/School';
import CircularProgress from '@mui/material/CircularProgress';

const InstitutionsCard = (props) => {
  const [institutions, setInstitutions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    props.institutions ? setInstitutions(props.institutions.split(',')) : setInstitutions([]);
    setLoading(false);
  }, [props.institutions]);

  if (loading) return <CircularProgress />
  return (
    <Fragment>
      <h1 style={{ 'textAlign': 'center' }}> Instituciones</h1>
      <Divider />
      <List>
      {!!institutions && institutions.map( (institution, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={institution} />
            </ListItemButton>
            <Divider />
          </ListItem>
      ))}
    </List>
    </Fragment>
  )
}

export default InstitutionsCard