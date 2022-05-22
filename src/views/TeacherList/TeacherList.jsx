import React, { useState, useEffect} from 'react'
import './TeacherList.css';
import { default as getCommunes }  from '../../queries/communes';
import { default as getSubjects }  from '../../queries/subjects';
import { default as getInstitutions }  from '../../queries/institutions';
import { default as getTeachers }  from '../../queries/teachersList';
import { TextField, Autocomplete, Slider} from '@mui/material';

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
                                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
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
                                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
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
                                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
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
                                                <div class="col-lg-12 col-md-12 col-sm-12 p-0">
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
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Senior Software Engineer / Developer</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">1 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Full-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">London, UK</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 50/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-base">
                                                                            <i class="indicator bg-info"></i>
                                                                            <span>Software Development</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Marketing &amp; Communication Supervisor</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">AxiomUI Llc.</a> <span class="text-muted time">2 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 60/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-warning">
                                                                            <i class="indicator bg-warning"></i>
                                                                            <span>Marketing</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Senior Data Analyst / Scientist</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">4 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 60/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-success">
                                                                            <i class="indicator bg-success"></i>
                                                                            <span>Artificial Intelligence</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">UX Designer &amp; UI Developer</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">5 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">Toronto, CAN</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 35/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-danger">
                                                                            <i class="indicator bg-danger"></i>
                                                                            <span>Design</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Information Security Analyst / Expert</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">6 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">Mumbai, IN</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 70/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-info">
                                                                            <i class="indicator bg-info"></i>
                                                                            <span>Infra Supervision</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star starred"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Senior Software Engineer / Developer</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">1 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Full-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">London, UK</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 50/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-base">
                                                                            <i class="indicator bg-info"></i>
                                                                            <span>Software Development</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Marketing &amp; Communication Supervisor</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">AxiomUI Llc.</a> <span class="text-muted time">2 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 60/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-warning">
                                                                            <i class="indicator bg-warning"></i>
                                                                            <span>Marketing</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Senior Data Analyst / Scientist</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">4 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">New York, US</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 60/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-success">
                                                                            <i class="indicator bg-success"></i>
                                                                            <span>Artificial Intelligence</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">UX Designer &amp; UI Developer</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">AxiomUI Inc.</a> <span class="text-muted time">5 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">Toronto, CAN</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 35/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-danger">
                                                                            <i class="indicator bg-danger"></i>
                                                                            <span>Design</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="widget-26-job-emp-img">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Company" />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-title">
                                                                            <a href="#">Information Security Analyst / Expert</a>
                                                                            <p class="m-0"><a href="#" class="employer-name">Axiom Corp.</a> <span class="text-muted time">6 days ago</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-info">
                                                                            <p class="type m-0">Part-Time</p>
                                                                            <p class="text-muted m-0">in <span class="location">Mumbai, IN</span></p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-salary">$ 70/hr</div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-category indicator-wrap bg-soft-info">
                                                                            <i class="indicator bg-info"></i>
                                                                            <span>Infra Supervision</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="widget-26-job-starred">
                                                                            <a href="#">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    stroke-width="2"
                                                                                    stroke-linecap="round"
                                                                                    stroke-linejoin="round"
                                                                                    class="feather feather-star starred"
                                                                                >
                                                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <nav class="d-flex justify-content-center">
                                        <ul class="pagination pagination-base pagination-boxed pagination-square mb-0">
                                            <li class="page-item">
                                                <a class="page-link no-border" href="#">
                                                    <span aria-hidden="true">«</span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li class="page-item active"><a class="page-link no-border" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link no-border" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link no-border" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link no-border" href="#">4</a></li>
                                            <li class="page-item">
                                                <a class="page-link no-border" href="#">
                                                    <span aria-hidden="true">»</span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default TeacherList;