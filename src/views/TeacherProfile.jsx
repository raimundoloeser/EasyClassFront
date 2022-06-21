import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_teacher from '../queries/teacher'
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

  useEffect(() => {
    get_teacher(id).then(val => {
      setTeacher(val)
    })
    setLoading(false)
  }, [id])

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
                <PersonalCard teacher={teacher} />
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
        <AddComment teacher={teacher}/>
        <CommentSection />
      </Container>
    </Fragment>
  </>
    
  )
}

export default TeacherProfile
