import React from 'react'
import EditProfileForm from '../components/EditProfileForm';
import { Card, CardContent, Grid } from '@mui/material';

const EditProfile = () => {
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
                        <EditProfileForm />
                    </CardContent>
                </Card>
            </Grid>   
        </Grid> 
                
    )
};

export default EditProfile;