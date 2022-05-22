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
import { VisibilityOff, Visibility } from '@mui/icons-material';




const LoginForm = () => {
    const [successMessage, setSuccessMessage] = useState(null)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [values, setValues] = useState({
        "email": "",
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
                if (val.access) {
                    setSuccessMessage("Usuario creado con éxito")
                    setResponse(val)
                    setLoading(null)
                    // set current user
                    // localStorage.setItem('easy-class-first-name', val.nombre)
                    // localStorage.setItem('easy-class-email', val.email)
                    return val
                } else {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
          {!!successMessage && <Alert severity='success'>{successMessage}</Alert>}
            <TextField
                error={!!error && !!error.email}
                label="Email"
                id="outlined-start-adornment"
                onChange={handleChange('email')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.email && error.email[0]) || undefined}
            />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
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
            <Button onClick={() => handleSubmit(values)}>Ingresar</Button>
          </div>
        </Box>
      );
}

export default LoginForm;
