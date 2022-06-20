import React, { useState, useEffect, useRef } from 'react';
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
import { VisibilityOff, Visibility, HowToReg, FileUpload, FormatListNumberedRtlRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';



const RegisterForm = (props) => {
    const isTeacher = props.isTeacher
    const isStudent = !isTeacher
    const [successMessage, setSuccessMessage] = useState(null)
    const [failureMessage, setFailureMessage] = useState(null)
    const [comunasSelected, setComunasSelected] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [values, setValues] = useState({
        "first_name": "",
        "last_name": "",
        "mail": "",
        "password": "",
        "password2": "",
        "phone": "",
        "comunas": "",
        "subjects": "",
        "institutions": "",
        "price": 0,
        "description": "",
        "picture": null,
        "is_teacher": isTeacher,
        "is_student": isStudent
    });

    const [showPassword, setShowPassword] = useState(false);
    const [communes, setCommunes] = useState([])
    const fileInput = useRef()

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
        const formData = new FormData();

        formData.append("first_name", user.first_name || '');
        formData.append("last_name", user.last_name || '');
        formData.append("mail", user.mail || '');
        formData.append("password", user.password || '');
        formData.append("password2", user.password2 || '');
        formData.append("phone", user.phone || '');
        formData.append("comunas", user.comunas || '');
        formData.append("subjects", user.subjects || '');
        formData.append("institutions", user.institutions || '');
        formData.append("comunas", user.comunas || '');
        formData.append("price", user.price || 0);
        formData.append("description", user.description || '');
        user.picture && formData.append("picture", user.picture);
        formData.append("is_teacher", user.is_teacher);
        formData.append("is_student", user.is_student);


        register(formData).then(val => {
            if (val) {
                if (val.id) {
                    setSuccessMessage("Usuario creado con éxito")
                    setLoading(null)
                    setFailureMessage(null)
                    // set current user
                    localStorage.setItem('user', JSON.stringify(val))
                    return val
                } else {
                    setError(val)
                    setFailureMessage("Revise los campos ingresados")
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center'  }}>
            <div>
            <Typography fontFamily='sans-serif' variant="h4" component="div" gutterBottom>
                Registrarse
            </Typography>
            {!!successMessage && <Alert severity='success'>{successMessage}</Alert>}
            {!!failureMessage && <Alert severity='error'>{failureMessage}</Alert>}
                <TextField
                    error={!!error && !!error.first_name}
                    label="Nombre"
                    id="nombre"
                    value={values.first_name}
                    onChange={handleChange('first_name')}
                    sx={{ m: 1, width: '25ch' }}
                    helpertext={(!!error && !!error.first_name && error.first_name[0]) || undefined}
                />
                <TextField
                    error={!!error && !!error.last_name}
                    label="Apellido"
                    id="apellido"
                    value={values.last_name}
                    onChange={handleChange('last_name')}
                    sx={{ m: 1, width: '25ch' }}
                    helpertext={(!!error && !!error.last_name && error.last_name[0]) || undefined}
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <TextField
                        error={!!error && !!error.phone}
                        label="Celular"
                        id="celular"
                        value={values.phone}
                        onChange={handleChange('phone')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+569</InputAdornment>,
                        }}
                        helpertext={(!!error && !!error.phone && error.phone[0]) || undefined}
                    />
                </FormControl>
                 {isTeacher && (
                     <>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={(!!error && !!error.comunas) || undefined}>
                        
                        <Autocomplete
                            multiple
                            disablePortal
                            value={comunasSelected ? comunasSelected : null}
                            id="comunas"
                            limitTags={3}
                            options={communes}
                            getOptionLabel={(option) => option.nombre}
                            isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                            onChange={(event, newValue) => {
                                setValues({ 
                                            ...values, 
                                            'comunas': [newValue.map(function(val) {return val.nombre;})].join(',') 
                                        });
                                setComunasSelected(newValue)
                            }}
                            renderInput={(params) => <TextField {...params} label="Comunas" />}
                            helpertext={(!!error && !!error.comunas && error.comunas[0]) || undefined}
                        />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={(!!error && !!error.subjects) || undefined}>
                            
                            <Autocomplete
                                multiple
                                freeSolo
                                value={(!!values.subjects && values.subjects.split(',')) || []}
                                id="subjects"
                                limitTags={3}
                                options={[]}
                                onChange={(event, newValue) => {
                                    setValues({ ...values, 'subjects': newValue.join(',') });
                                }}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Materias" />}
                                helpertext={(!!error && !!error.subjects && error.subjects[0]) || undefined}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={(!!error && !!error.institutions) || undefined}>
                            
                            <Autocomplete
                                multiple
                                freeSolo
                                id="institutions"
                                value={(!!values.institutions && values.institutions.split(',')) || []}
                                limitTags={3}
                                options={[]}
                                onChange={(event, newValue) => {
                                    setValues({ ...values, 'institutions': newValue.join(',') });
                                }}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Instituciones" />}
                                helpertext={(!!error && !!error.institutions && error.institutions[0]) || undefined}
                            />
                        </FormControl>
                        <TextField
                            error={(!!error && !!error.precio) || values.price > 99999 }
                            label="Precio"
                            id="precio"
                            value={values.price}
                            onChange={handleChange('price')}
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            helpertext={(!!error && !!error.precio && error.precio[0]) || undefined}
                        />
                     </>
                 )}
                
                <TextField
                    error={!!error && !!error.descripcion}
                    label="Descripción"
                    id="descripcion"
                    value={values.description}
                    onChange={handleChange('description')}
                    sx={{ m: 1, width: '25ch' }}
                    helpertext={(!!error && !!error.descripcion && error.descripcion[0]) || undefined}
                />
                <TextField
                    error={!!error && !!error.mail}
                    label="Email"
                    id="email"
                    value={values.mail}
                    onChange={handleChange('mail')}
                    sx={{ m: 1, width: '25ch' }}
                    helpertext={(!!error && !!error.mail && error.mail[0]) || undefined}
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
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={()=>fileInput.current.click()}
                        endIcon={<FileUpload />}
                    >
                        {values.picture ? 'Cambiar Foto ' : 'Subir Foto '}
                    </Button>
                    {!!values.picture && !!values.picture.name && <Typography variant="body2">{values.picture.name}</Typography>}
                    <input 
                        // value={values.picture ? values.picture : ''}
                        ref={fileInput} 
                        type="file" 
                        id="picture"
                        onChange={e => {
                            setValues({ ...values, 'picture': e.target.files[0] });
                          }}
                        style={{ display: 'none' }} 
                    />
                </FormControl>
            </div>
            <Button 
                variant="outlined"
                endIcon={<HowToReg />}
                sx={{ m: 1, width: '80ch' }}
                onClick={() => handleSubmit(values)}>
                Registrarme
            </Button>
        </Box>
      );
}

export default RegisterForm;
