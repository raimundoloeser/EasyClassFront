import React, { useState } from 'react';
import login from '../queries/login'
import { 
        Alert,
        CircularProgress,
        Button,
        Box,
        IconButton, 
        OutlinedInput, 
        InputLabel,
        InputAdornment,
        FormControl,
        TextField,
 } from '@mui/material';
 import { VisibilityOff, Visibility, Send } from '@mui/icons-material';
 import { Typography } from '@mui/material';


const LoginForm = () => {
    const [successMessage, setSuccessMessage] = useState(null)
    const [failureMessage, setFailureMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const user = JSON.parse(localStorage.getItem('user')) || null
    const [values, setValues] = useState({
        "mail": user ? user.mail : '',
        "password": ""
    });

    const [showPassword, setShowPassword] = useState(false);

        
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (user) => {
        setLoading(true)
        login(user).then(val => {
            if (val) {
                console.log(val)
                if (val.access) {
                    setSuccessMessage("Usuario ingresado con éxito")
                    setFailureMessage(null)
                    setLoading(null)
                    // set current user
                    localStorage.setItem('access-token', val.access)
                    localStorage.setItem('refresh-token', val.refresh)
                    return val
                } else {
                    setFailureMessage("Usuario o contraseña incorrectos")
                    setError(val)
                }
                    setLoading(null)
            } else {
                setLoading(null)
                setError('Error al iniciar sesión')
            }
        })
    }
    if (loading) return <CircularProgress />
    return (
        <Box  sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center'  }}>
            <div>
                <Typography fontFamily='sans-serif' variant="h4" component="div" gutterBottom>
                    Iniciar Sesión
                </Typography>
                {!!successMessage && <Alert severity='success'>{successMessage}</Alert>}
                {!!failureMessage && <Alert severity='error'>{failureMessage}</Alert>}
                <TextField
                    error={!!error && !!error.mail}
                    label="Email"
                    value={values.mail ? values.mail : ''}
                    id="outlined-start-adornment"
                    onChange={handleChange('mail')}
                    sx={{ m: 1, width: '35ch' }}
                    // helpertext={(!!error && !!error.mail && error.mail[0]) || undefined}
                    helpertext='helper'
                />
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-login-password"
                        error={!!error && !!error.password}
                        helpertext={(!!error && !!error.password && error.password[0]) || undefined}
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ?  <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>
            <Button 
                variant="outlined"
                endIcon={<Send />}
                sx={{ m: 1, width: '50ch' }}
                onClick={() => handleSubmit(values)}>
                Ingresar
            </Button>
        </Box>
      );
}

export default LoginForm;
