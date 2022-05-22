import React from 'react'
import RegisterForm from '../components/RegisterForm';
import { Card, CardContent, Grid } from '@mui/material';

const Register = () => {
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
                    sx={{ maxWidth: 600 }}>
                    <CardContent sx={{ minWidth: 475 }}>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </Grid>   
        </Grid> 
                
    )
};

export default Register;