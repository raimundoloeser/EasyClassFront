import React, { useEffect } from 'react'
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  DayView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import modulesList from '../../queries/modulesList';
import createModule from '../../queries/createModule';
import deleteModule from '../../queries/deleteModule';
import editModule from '../../queries/editModule';
import createReservation from '../../queries/createReservation';
import deleteReservation from '../../queries/deleteReservation';

const Calendar = (props) => {
    const [teacher, setTeacher] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [modules, setModules] = React.useState([])
    // checkeo si soy el current user
    const [isNormalUser, setIsNormalUser] = React.useState(true)

    useEffect(() => {
        modulesList(teacher.id).then(res => {
            res.forEach(module => {
                module['startDate'] = new Date(module.date + 'T' + module.start_time)
                module['endDate'] = new Date(module.date + 'T' + module.end_time)
            })
            console.log(res);
            setModules(res)
        })
        if (teacher && teacher.id) {
            setIsNormalUser(localStorage.getItem('id') !== teacher.id.toString())
        }
    }, [teacher])

    useEffect(() => {
        props.teacher ? setTeacher(props.teacher) : setTeacher({})
        setLoading(false);
    }, [props.teacher]);

    // obtengo el dia actual
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = currentDate.getFullYear();
    currentDate = yyyy + '-' + mm + '-' + dd;

    // manejo el crear, editar y delete horario
    const commitChanges = (added) => {
        if (added.added) {
            let hour_start_time = String(added.added.startDate.getHours()).padStart(2, '0');
            let minute_start_time = String(added.added.startDate.getMinutes()).padStart(2, '0');
            let start_time = hour_start_time + ':' + minute_start_time + ':00';
            let hour_end_time = String(added.added.endDate.getHours()).padStart(2, '0');
            let minute_end_time = String(added.added.endDate.getMinutes()).padStart(2, '0');
            let end_time = hour_end_time + ':' + minute_end_time + ':00';
            let dd = String(added.added.startDate.getDate()).padStart(2, '0');
            let mm = String(added.added.startDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = added.added.startDate.getFullYear();
            let date = yyyy + '-' + mm + '-' + dd;
            createModule(start_time, end_time, date).then(res => {
                console.log(res);
            })
        } 
        if (added.deleted) {
            deleteModule(added.deleted);
        }
        if (added.changed) {
            editModule(added.changed);
        }
        window.location.reload();
    };

    // saco y edito componentes inecesarios
    const BoolEditor = (props) => {
        return null;
    };
    const LabelComponent = (props) => {
        if (props.text === 'Details') {
        return null  
        } else if (props.text === 'More Information') {
        return null
        } else if (props.text === '-') {
        return <AppointmentForm.Label
        { ...props}
        />  
        }
    };
    const InputComponent = (props) => {
        if (props.type === 'titleTextEditor') {
        return null
        }
    };
    const Appointment = ({
        children, style, ...restProps
      }) => {
            if (restProps.data.reservation_bool){
                return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                    ...style,
                    backgroundColor: '#FB8B8B',
                    }}
                >
                    {children}
                </Appointments.Appointment>
                )
            } else {
                return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                    ...style,
                    }}
                >
                    {children}
                </Appointments.Appointment>
                )
            }
    }

    // cambio el layout
    const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => { 
        return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}   
        >
        </AppointmentForm.BasicLayout>
        );
    };
    const Header = ({
        children, appointmentData, ...restProps
      }) => {
        if (localStorage.getItem('is_student') && !appointmentData.reservation_bool){
            return (
                <AppointmentTooltip.Header
                  {...restProps}
                  appointmentData={appointmentData}
                >
                  <Button variant="contained"
                    onClick={() => { 
                        createReservation(appointmentData.id).then(res => {
                            console.log(res);
                            window.location.reload();
                        })
                    }}
                  >
                    Reservar Hora
                  </Button>
                </AppointmentTooltip.Header>
              )
        } else if (localStorage.getItem('is_student') && appointmentData.reservation_bool && parseInt(localStorage.getItem('id')) === appointmentData.student_id){
            return (
                <AppointmentTooltip.Header
                  {...restProps}
                  appointmentData={appointmentData}
                >
                  <Button variant="contained"
                    color="error"
                    onClick={() => { 
                        deleteReservation(appointmentData.reservation_id)
                        window.location.reload();
                    }}
                  >
                    Cancelar
                  </Button>
                </AppointmentTooltip.Header>
              )
        } else {
            return (
                <AppointmentTooltip.Header
                  {...restProps}
                  appointmentData={appointmentData}
                >
                </AppointmentTooltip.Header>
              )
        }
      };


    if (loading) return <CircularProgress />

    // retorno el calendario 
    return (
        <>
        <h1 style={{ 'textAlign': 'center' }}>Horario de {teacher.first_name}:</h1>
            <Paper>
            <Scheduler
            data={modules}
            >

            <ViewState
                defaultCurrentDate={currentDate}
                defaultCurrentViewName="Week"
            />

            <EditingState
                onCommitChanges={commitChanges}
            />
            <IntegratedEditing />

            <DayView
                startDayHour={7}
                endDayHour={23}
            />
            <WeekView startDayHour={7} endDayHour={23} />

            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <ConfirmationDialog />
            <Appointments
            appointmentComponent={Appointment} 
            />
            <AppointmentTooltip
                headerComponent={Header}
                showCloseButton={!isNormalUser}
                showOpenButton={!isNormalUser}
                showDeleteButton={!isNormalUser}
            />
            {!isNormalUser
                ? <AppointmentForm
                readOnly={isNormalUser}
                basicLayoutComponent={BasicLayout}
                booleanEditorComponent={BoolEditor}
                labelComponent={LabelComponent}
                textEditorComponent={InputComponent}
                />
                : <AppointmentForm
                readOnly={isNormalUser}
                visible={false}
                basicLayoutComponent={BasicLayout}
                booleanEditorComponent={BoolEditor}
                labelComponent={LabelComponent}
                textEditorComponent={InputComponent}
                />
            }
            </Scheduler>
        </Paper>
        <br />
        <br />
        </>
    )
}

export default Calendar