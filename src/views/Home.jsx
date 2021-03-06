import React from 'react'
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({
    page: {
        marginTop: '1%',
        height: `${window.innerHeight}px`,
        backgroundImage: 'url(img/background.png)',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        
    },
    content: {
        opacity: '0.95',
        borderRadius: '50px',
        marginTop: '1%',
        height: '70%',
        backgroundColor: '#2A65B4',
        width: '70%',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
    },
    welcome: {
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2A65B4',
        boxShadow: '0px 0px 10px #184D94',
        borderRadius: '50px',
        width: '100%',

    },
    logo: {
        height: '100%',
    },
    paragraph: {
        color: 'white',
        
    },
    title: {
        color: 'white',
        
    },
    typo:{
        width: '90%',
        marginBottom: '5%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '2%',
        textColor: 'white',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '2%',
    },
    button: {
        marginRight: '10%',
    },
    buttons2: {
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div className = {classes.page}>
            <div className={classes.content}>
                <div className = {classes.welcome}>
                    <img src = {'img/logo4.png'} alt = {'logo'} className = {classes.logo}/>
                </div>
                <div className = {classes.typo}>
                    <Typography variant = {'h4'} className = {classes.title}>
                        ??Bienvenido a Easy Class! 
                    </Typography>
                    <Typography variant = {'h6'} className = {classes.paragraph} align='justify'>
                        Easy Class es una plataforma que busca conectar a profesores con alumnos de manera f??cil, rapida y eficiente. 
                        Si eres un profesor puedes publicar las materias que dominas y tus horarios disponibles, 
                        y si eres alumno podr??s buscar profesores seg??n lo que quieras aprender y el horario que m??s te acomode, 
                        reservando clases a trav??s de la plataforma.
                    </Typography>
                </div>
                {!localStorage.getItem('access-token') ? (
                    <div className= {classes.buttons2}>
                        <div className={classes.buttons}>
                            <Button variant="contained" style={{marginRight: 10}} className={classes.button} href='/register/teacher'>Registro Profesores</Button>
                            <Button variant="contained" href='/register/student'>Registro Alumnos</Button>
                        </div> 
                        <Button variant="contained" href= '/login'>Inicio Sesi??n</Button>
                    </div> 
                ) : (
                    <Button variant="contained" href='/teachers'>Buscar Profesores</Button>    
                )}
            </div>
        </div>                
    )
};

export default Home;