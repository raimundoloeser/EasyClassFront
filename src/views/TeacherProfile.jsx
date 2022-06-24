import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_teacher from '../queries/teacher'
import hasReservation from '../queries/hasReservation'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { CircularProgress, Container } from '@mui/material';
import PersonalCard from '../components/Profile/PersonalCard';
import ComunasCard from '../components/Profile/ComunasCard';
import InstitutionsCard from '../components/Profile/InstitutionsCard';
import SubjectsCard from '../components/Profile/SubjectsCard';
import Calendar from '../components/Profile/Calendar';
import CommentSection from '../components/Profile/CommentSection';
import AddComment from '../components/Profile/AddComment';

const TeacherProfile = () => {

  const { id } = useParams()
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reserved, setReserved] = useState(false)

  useEffect(() => {
    get_teacher(id).then(val => {
      setTeacher(val)
    })
    setLoading(false)
  }, [id])

  useEffect(() => {
    if (teacher && localStorage.user) {
      let myId = JSON.parse(localStorage.user).id || null
      let teacherId = teacher.id || null
      hasReservation(teacherId, myId).then(val => {
        setReserved(val.checkReservation)
      })
    }
  }, [teacher])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));
  
  if (loading) return <CircularProgress />
  return (
    <>
    <Fragment>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <PersonalCard teacher={teacher} reserved={reserved}/>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <ComunasCard comunas={!!teacher && teacher.comunas} />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <InstitutionsCard institutions={!!teacher && teacher.institutions} />
              </Item>
              <br></br>
              <Item>
                <SubjectsCard subjects={!!teacher && teacher.subjects} />
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Calendar teacher={teacher} />
        <AddComment teacher={teacher} reserved={reserved}/>
        <CommentSection teacher={teacher}/>
      </Container>
    </Fragment>
  </>
    
  )
}

export default TeacherProfile
