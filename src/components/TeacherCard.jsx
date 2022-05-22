import React from 'react';

const TeacherCard = props => {
  const teacher = props.teacher;
  console.log(teacher);
  return (
    <tr>
        <td>
            <div class="widget-26-job-emp-img">
                <img src={teacher.picture} alt="profile-icon" />
            </div>
        </td>
        <td>
            <div class="widget-26-job-title">
                <a href="#">{teacher.first_name + ' ' + teacher.last_name}</a>
                <p class="m-0 employer-name text-muted time"> {'He trabajado con alumnos de: ' + teacher.institutions}</p>
            </div>
        </td>
        <td>
            <div class="widget-26-job-info">
                <p class="type m-0">Trabajo</p>
                <p class="text-muted m-0">en <span class="location">{teacher.comunas}</span></p>
            </div>
        </td>
        <td>
            <div class="widget-26-job-salary">$ {teacher.price + ' '}/ hr</div>
        </td>
        <td>
            <div class="widget-26-job-category indicator-wrap bg-soft-warning">
                <i class="indicator bg-warning"></i>
                <span>Calificación 5/5</span>
            </div>
            <div class="widget-26-job-category indicator-wrap bg-soft-success">
                <i class="indicator bg-success"></i>
                <span>Calificación 3/5</span>
            </div>
            <div class="widget-26-job-category indicator-wrap bg-soft-danger">
                <i class="indicator bg-danger"></i>
                <span>Calificación 1/5</span>
            </div>
            <div class="widget-26-job-category indicator-wrap bg-soft-info">
                <i class="indicator bg-info"></i>
                <span>No tiene calificación</span>
            </div>
        </td>
        <td>
        </td>
    </tr>
  );
};

export default TeacherCard;