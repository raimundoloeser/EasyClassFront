import React, { useState, useEffect} from 'react'
import './TeacherList.css';
import { default as getCommunes }  from '../../queries/communes';
import { default as getSubjects }  from '../../queries/subjects';
import { default as getInstitutions }  from '../../queries/institutions';
import { default as getTeachers }  from '../../queries/teachersList';
import { TextField, Autocomplete, Slider} from '@mui/material';
import { default as TeacherCard } from '../../components/TeacherCard';

const TeacherList = () => {
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        "comunas": "",
        "subjects": "",
        "institutions": "",
        "price_min": "",
        "price_max": "",
        "first_name": "",
    });
    const [communes, setCommunes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [price, setPrice] = useState([0, 100000]);
    const [firstName, setFirstName] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        if (communes.length !== 0) return
        getCommunes().then(res => {
            setCommunes(res)
        })
    }, [communes])

    useEffect(() => {
        if (subjects.length !== 0) return
        getSubjects().then(res => {
            setSubjects(res)
        })
    }, [subjects])

    useEffect(() => {
        if (institutions.length !== 0) return
        getInstitutions().then(res => {
            setInstitutions(res)
        })
    }, [institutions])

    useEffect(() => {
        getTeachers(values.comunas, values.subjects, values.institutions,
                    values.price_min, values.price_max, values.first_name).then(res => {
            setTeachers(res);
            console.log(res);
        })
    }, [values])

    const handleChange = (prop) => (event, value) => {
        let new_values = {...values};
        if (value && value.nombre) {
            new_values[prop] = value.nombre;
        } else if (value && value.name){
            new_values[prop] = value.name;
        } else {
            new_values[prop] = '';
        }
        setValues(new_values);
    };

    const handleChangePrice = (prop) => (event, value) => {
        setPrice(value);
        let new_values = {...values};
        new_values['price_min'] = value[0];
        new_values['price_max'] = value[1];
        setValues(new_values);
    };

    const handleChangeFirstName = (prop) => (event) => {
        setFirstName(event.target.value);
        let new_values = {...values};
        new_values[prop] = event.target.value;
        setValues(new_values);
    };

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 card-margin">
                        <div class="card search-form">
                            <div class="card-body p-0">
                                <form id="search-form">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="row no-gutters">
                                                <div class="col-lg-3 col-md-3 col-sm-12 p-2">
                                                <Autocomplete
                                                    error={!!error && !!error.comunas}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    freeSolo={true}
                                                    options={communes}
                                                    getOptionLabel={option => option.nombre || option}
                                                    onChange={handleChange('comunas')}
                                                    renderInput={(params) => <TextField {...params} label="Comuna" />}
                                                    helpertext={(!!error && !!error.comunas && error.comunas[0]) || undefined}
                                                />
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-12 p-2">
                                                <Autocomplete
                                                    error={!!error}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    freeSolo={true}
                                                    options={subjects}
                                                    getOptionLabel={option => option.name || option}
                                                    onChange={handleChange('subjects')}
                                                    renderInput={(params) => <TextField {...params} label="Materia" />}
                                                    helpertext={(!!error) || undefined}
                                                />
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-12 p-2">
                                                <Autocomplete
                                                    error={!!error}
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    freeSolo={true}
                                                    options={institutions}
                                                    getOptionLabel={option => option.name || option}
                                                    onChange={handleChange('institutions')}
                                                    renderInput={(params) => <TextField {...params} label="Institución" />}
                                                    helpertext={(!!error) || undefined}
                                                />
                                                </div>
                                                <div class="col-lg-3 col-md-3 col-sm-12 px-5 pt-1">
                                                <h6>Precio por hora</h6>
                                                <Slider
                                                    getAriaLabel={() => 'Minimum distance shift'}
                                                    color={'primary'}
                                                    value={price}
                                                    min={0}
                                                    max={100000}
                                                    onChange={handleChangePrice('price')}
                                                    valueLabelDisplay="auto"
                                                    getAriaValueText={() => 'Minimum distance shift'}
                                                    step={1000}
                                                    disableSwap
                                                />
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12 p-2">
                                                    <TextField
                                                    label="Nombre profesor"
                                                    value={firstName}
                                                    onChange={handleChangeFirstName('first_name')}
                                                    fullWidth={true}
                                                    classes={'form-control'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                        <div class="col-12">
                            <div class="card card-margin">
                                <div class="card-body">
                                    <div class="row search-body">
                                        <div class="col-lg-12">
                                            <div class="search-result">
                                                <div class="result-header">
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="records">Mostrando: <b>{teachers.length}</b> de <b>{teachers.length}</b> resultados</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="result-body">
                                                    <div class="table-responsive">
                                                        <table class="table widget-26">
                                                            <tbody>
                                                            {
                                                                teachers.map(teacher => {
                                                                return (
                                                                    <>
                                                                    <TeacherCard
                                                                    teacher={teacher}
                                                                    />
                                                                    </>
                                                                );
                                                                })
                                                            }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default TeacherList;