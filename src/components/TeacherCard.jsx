import React, { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const TeacherCard = props => {
  const [teacher, setTeacher] = React.useState({});
  const [promedio, setPromedio] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    setLoading(true)
    props.teacher ? setTeacher(props.teacher) : setTeacher({})
    props.promedio ? setPromedio(props.promedio) : setPromedio({})
    setLoading(false)
  }, [props.teacher, props.promedio]);

  if (loading) return <CircularProgress />

  return (
    <tr>
        <td>
            <div className="widget-26-job-emp-img">
                <img src={teacher.picture} alt="profile-icon" />
            </div>
        </td>
        <td>
            <div className="widget-26-job-title">
                <a href={`teacher/${teacher.id}`}>{teacher.first_name + ' ' + teacher.last_name}</a>
                <p className="m-0 employer-name text-muted time"> {'He trabajado con alumnos de: ' + teacher.institutions}</p>
            </div>
        </td>
        <td>
            <div className="widget-26-job-info">
                <p className="type m-0">Trabajo</p>
                <p className="text-muted m-0">en <span className="location">{teacher.comunas}</span></p>
            </div>
        </td>
        <td>
            <div className="widget-26-job-salary">$ {teacher.price + ' '}/ hr</div>
        </td>
        <td>
            { promedio[teacher.id] === 5 ? 
            <div className="widget-26-job-category indicator-wrap bg-soft-success">
                <i className="indicator bg-success"></i>
                <span>Calificación 5/5</span>
            </div>: promedio[teacher.id] === 4 ? 
            <div className="widget-26-job-category indicator-wrap bg-soft-success">
                <i className="indicator bg-success"></i>
                <span>Calificación 4/5</span>
            </div>: promedio[teacher.id] === 3 ? 
            <div className="widget-26-job-category indicator-wrap bg-soft-warning">
                <i className="indicator bg-warning"></i>
                <span>Calificación 3/5</span>
            </div>: promedio[teacher.id] === 2 ? 
            <div className="widget-26-job-category indicator-wrap bg-soft-danger">
                <i className="indicator bg-danger"></i>
                <span>Calificación 2/5</span>
            </div> : promedio[teacher.id] === 1 ? 
            <div className="widget-26-job-category indicator-wrap bg-soft-danger">
                <i className="indicator bg-danger"></i>
                <span>Calificación 1/5</span>
            </div> : 
            <div className="widget-26-job-category indicator-wrap bg-soft-info">
                <i className="indicator bg-info"></i>
                <span>Sin Calificación</span>
            </div>}
        </td>
        <td>
        </td>
    </tr>
  );
};

export default TeacherCard;