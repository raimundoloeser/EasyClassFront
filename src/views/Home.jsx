import React from 'react'
import RegisterForm from './Register';
import LoginForm from './Login';
import { Card, CardContent, Grid } from '@mui/material';

const Home = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >

            <Grid item xs={3}>
                <Card sx={{ maxWidth: 300 }}>
                    <CardContent sx={{ minWidth: 275 }}>
                    {/* <RegisterForm /> */}
                        <LoginForm />
                    </CardContent>
                </Card>
            </Grid>   
            
        </Grid> 
                
    )
};

export default Home;