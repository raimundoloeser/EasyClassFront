import React, { Fragment, useEffect } from 'react'
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from '@mui/material/CircularProgress';

const ComunasCard = (props) => {
  const [comunas, setComunas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    props.comunas ? setComunas(props.comunas.split(',')) : setComunas([]);
    setLoading(false);
  }, [props.comunas]);

  if (loading) return <CircularProgress />
  return (
    <Fragment>
      <h1 style={{ 'textAlign': 'center' }}> Comunas</h1>
      <Divider />
      <List>
      {!!comunas && comunas.map( (comuna, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary={comuna} />
            </ListItemButton>
            <Divider />
          </ListItem>
      ))}
    </List>
    </Fragment>
  )
}

export default ComunasCard