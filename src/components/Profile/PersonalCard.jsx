import React, { Fragment, useEffect } from 'react'
import { List, Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const PersonalCard = (props) => {
  const [teacher, setTeacher] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [reserved, setReserved] = React.useState(false);

  useEffect(() => {
    props.teacher ? setTeacher(props.teacher) : setTeacher({})
    setLoading(false);
  }, [props.teacher]);

  useEffect(() => {
    props.reserved ? setReserved(props.reserved) : setReserved(false)
}, [props.reserved]);

  if (loading) return <CircularProgress />

  return (
    <Fragment>
      <Avatar
          alt="Remy Sharp"
          src={(!!teacher && teacher.picture) || 'http://127.0.0.1:8000/media/posts/default.png'}
          sx={{ border: 1,
              borderColor: 'rgba(0, 0, 0, 0.54)',
              width: 1/2,
              height: 1/2, 
              margin: 'auto' }}
      />
      <h1 style={{ 'textAlign': 'center' }}>{!!teacher && teacher.first_name} {!!teacher && teacher.last_name}</h1>
      <h3 style={{ 'textAlign': 'center' }}>{!!teacher && teacher.description}</h3>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
              <ListItemIcon>
              <MailIcon />
              </ListItemIcon>
              {reserved ? 
              <ListItemText primary={!!teacher && teacher.mail} /> :
              <p>¡Haz una reserva para ver su contacto!</p>
              }
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
              <ListItemIcon>
              <PhoneIcon />
              </ListItemIcon>
              {reserved ? 
              <ListItemText primary={!!teacher && teacher.phone} /> :
              <p>¡Haz una reserva para ver su contacto!</p>
              }
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
              <ListItemIcon>
              <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={!!teacher && teacher.price} />
          </ListItemButton>
        </ListItem>
      </List>
    </Fragment>
  )
}

export default PersonalCard