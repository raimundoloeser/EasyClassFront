import React from 'react'
import LoginForm from '../components/LoginForm';
import { Card, CardContent, Grid } from '@mui/material';

const Login = () => {
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
                <Card 
                    variant="outlined"
                    sx={{ maxWidth: 400 }}>
                    <CardContent 
                        sx={{ minWidth: 275 }}>
                        <LoginForm />
                    </CardContent>
                </Card>
            </Grid>   
        </Grid> 
                
    )
};

export default Login;