import React, { useState, useEffect} from 'react';
import register from '../queries/register'
import { default as getCommunes }  from '../queries/communes'
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
        Autocomplete,
 } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';




const RegisterForm = () => {
    const [successMessage, setSuccessMessage] = useState(null)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [values, setValues] = useState({
        "nombre": "",
        "apellido": "",
        "password": "",
        "password2": "",
        "email": "",
        "celular": "",
        "comunas": "",
        "ramos": "",
        "materias": "",
        "instituciones": "",
        "precio": 0,
        "descripcion": "",
        "is_teacher": true
    });

    const [showPassword, setShowPassword] = useState(false);
    const [communes, setCommunes] = useState([])

    useEffect(() => {
        if (communes.length !== 0) return
        getCommunes().then(res => {
            setCommunes(res)
        })
    }, [communes])

        
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
        register(user).then(val => {
            if (val) {
                if (val.id) {
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
                setError('Error al registrar usuario')
            }
        })
    }   
    if (loading) return <CircularProgress />
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <div>
          {!!successMessage && <Alert severity='success'>{successMessage}</Alert>}
            <TextField
                error={!!error && !!error.nombre}
                label="Nombre"
                id="outlined-start-adornment"
                onChange={handleChange('nombre')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.nombre && error.nombre[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.apellido}
                label="Apellido"
                id="outlined-start-adornment"
                onChange={handleChange('apellido')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.apellido && error.apellido[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.celular}
                label="Celular"
                id="outlined-start-adornment"
                onChange={handleChange('celular')}
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">+569</InputAdornment>,
                }}
                helpertext={(!!error && !!error.celular && error.celular[0]) || undefined}
            />
            <Autocomplete
                error={!!error && !!error.comunas}
                multiple
                disablePortal
                id="combo-box-demo"
                options={communes}
                getOptionLabel={(option) => option.nombre}
                isOptionEqualToValue={(option, value) => option.codigo === value.codigo}
                sx={{ m: 1, width: '25ch' }}
                onChange={handleChange('comunas')}
                renderInput={(params) => <TextField {...params} label="Comunas" />}
                helpertext={(!!error && !!error.comunas && error.comunas[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.ramos}
                label="Ramos"
                id="outlined-start-adornment"
                onChange={handleChange('ramos')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.ramos && error.ramos[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.materias}
                label="Materias"
                id="outlined-start-adornment"
                onChange={handleChange('materias')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.materias && error.materias[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.instituciones}
                label="Instituciones"
                id="outlined-start-adornment"
                onChange={handleChange('instituciones')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.instituciones && error.instituciones[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.precio}
                label="Precio"
                id="outlined-start-adornment"
                onChange={handleChange('precio')}
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                helpertext={(!!error && !!error.precio && error.precio[0]) || undefined}
            />
            <TextField
                error={!!error && !!error.descripcion}
                label="Descripción"
                id="outlined-start-adornment"
                onChange={handleChange('descripcion')}
                sx={{ m: 1, width: '25ch' }}
                helpertext={(!!error && !!error.descripcion && error.descripcion[0]) || undefined}
            />
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
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password2">Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password2"
                    type={showPassword ? 'text' : 'password'}
                    error={!!error && !!error.password2}
                    helpertext={(!!error && !!error.password2 && error.password2[0]) || undefined}
                    value={values.password2}
                    onChange={handleChange('password2')}
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
                    label="password2"
                />
            </FormControl>
            <Button onClick={() => handleSubmit(values)}>Registrar</Button>
          </div>
        </Box>
      );
}

export default RegisterForm;
