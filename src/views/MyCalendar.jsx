import React, { useEffect, Fragment } from 'react';
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
  import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import modulesListStudent from '../queries/modulesListStudent';
import createReservation from '../queries/createReservation';
import deleteReservation from '../queries/deleteReservation';


const MyCalendar = (props) => {
    const [modules, setModules] = React.useState([])

    useEffect(() => {
        modulesListStudent(JSON.parse(localStorage.user).id).then(res => {
            res.forEach(module => {
                module['startDate'] = new Date(module.date + 'T' + module.start_time)
                module['endDate'] = new Date(module.date + 'T' + module.end_time)
            })
            setModules(res)
        })
    }, [localStorage])

    // obtengo el dia actual
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = currentDate.getFullYear();
    currentDate = yyyy + '-' + mm + '-' + dd;

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
            if (restProps.data.reservation_bool && JSON.parse(localStorage.user).id === restProps.data.student_id){
                return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                    ...style,
                    backgroundColor: '#16e00b',
                    }}
                >
                    <p style={{ 'textAlign': 'center', 'color': 'white' }}> {'Reservado por mi'} </p>
                    {children}
                </Appointments.Appointment>
                )
            } else if (restProps.data.reservation_bool){
                return (
                <Appointments.Appointment
                    {...restProps}
                    style={{
                    ...style,
                    backgroundColor: '#FB8B8B',
                    }}
                >
                    <p style={{ 'textAlign': 'center', 'color': 'white' }}> {'No Disponible'} </p>
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
                    <p style={{ 'textAlign': 'center', 'color': 'white' }}> {'Disponible'} </p>
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
        if (JSON.parse(localStorage.user).is_student && !appointmentData.reservation_bool){
            return (
                <AppointmentTooltip.Header
                  {...restProps}
                  appointmentData={appointmentData}
                >
                  <Button variant="contained"
                    onClick={() => { 
                        createReservation(appointmentData.id).then(res => {
                            window.location.reload();
                        })
                    }}
                  >
                    Reservar Hora
                  </Button>
                </AppointmentTooltip.Header>
              )
        } else if (JSON.parse(localStorage.user).is_student && appointmentData.reservation_bool && JSON.parse(localStorage.user).id === appointmentData.student_id){
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

    // retorno el calendario 
    return (
        <>
         <Fragment>
            <Container maxWidth="lg">
                <h1 style={{ 'textAlign': 'center' }}>Tu Calendario:</h1>
                    <Paper>
                    <Scheduler
                    data={modules}
                    >

                    <ViewState
                        defaultCurrentDate={currentDate}
                        defaultCurrentViewName="Week"
                    />

                    <EditingState/>
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
                        showCloseButton={false}
                        showOpenButton={false}
                        showDeleteButton={false}
                    />
                    <AppointmentForm
                    readOnly={true}
                    visible={false}
                    basicLayoutComponent={BasicLayout}
                    booleanEditorComponent={BoolEditor}
                    labelComponent={LabelComponent}
                    textEditorComponent={InputComponent}
                    />
                    </Scheduler>
                </Paper>
                <br />
                <br />
            </Container>
        </Fragment>
        </>
    )
}

export default MyCalendar;