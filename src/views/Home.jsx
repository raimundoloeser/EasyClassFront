import React, { Fragment } from 'react'
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() => ({
    page: {
        marginTop: '1%',
        height: '100vh',
        backgroundColor: '#2A65B4',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        
    },
    welcome: {
        width: '70%',
        height: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: '100%',
    },
    paragraph: {
        marginTop: '15%',
        color: 'white',

    },
    typo:{
        width: '70%',
        height: '70%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '2%',
        textColor: 'white',
    }
}));

const Home = () => {
    const classes = useStyles();
    console.log(`${window.innerHeight*0.1}px`)
    return (
        <div className = {classes.page}>
            <div className = {classes.welcome}>
                <img src = {'img/logo4.png'} alt = {'logo'} className = {classes.logo}/>
            </div>
            <div className = {classes.typo}>
                <Typography variant = {'h4'} className = {classes.paragraph}>
                    ¡Bienvenido a Easy Class! 
                </Typography>
                <Typography variant = {'h6'} className = {classes.paragraph}>
                    Easy Class es una plataforma que busca conectar a profesores con alumnos de manera fácil, rapida y eficiente. 
                    Si eres un profesor puedes publicar las materias que dominas y tus horarios disponibles, 
                    y si eres alumno podrás buscar profesores según lo que quieras aprender y el horario que más te acomode, 
                    reservando clases a través de la plataforma.
                </Typography>
            </div>
        </div>                
    )
};

export default Home;