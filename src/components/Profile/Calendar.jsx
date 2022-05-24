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
import Paper from '@mui/material/Paper';

const Calendar = (props) => {
    const [teacher, setTeacher] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        props.teacher ? setTeacher(props.teacher) : setTeacher({})
        setLoading(false);
    }, [props.teacher]);

    // obtengo el dia actual
    var currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();
    currentDate = yyyy + '-' + mm + '-' + dd;

    // aca va mi conexion con la api para tener los datos
    const schedulerData = [
        {
        startDate: '2022-05-25T09:45',
        endDate: '2022-05-25T11:45',
        }
    ];

    // checkeo si soy el current user
    const isNormalUser = false

    // manejo el crear, editar y delete horario
    const commitChanges = (added, changed, deleted) => {
        console.log(added);
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


    if (loading) return <CircularProgress />

    // retorno el calendario 
    return (
        <>
        <h1 style={{ 'textAlign': 'center' }}>Horario de {teacher.first_name}:</h1>
            <Paper>
            <Scheduler
            data={schedulerData}
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
            <Appointments />
            <AppointmentTooltip
                showCloseButton
                showOpenButton
            />
            <AppointmentForm
                readOnly={isNormalUser}
                basicLayoutComponent={BasicLayout}
                booleanEditorComponent={BoolEditor}
                labelComponent={LabelComponent}
                textEditorComponent={InputComponent}
            />
            </Scheduler>
        </Paper>
        <br />
        <br />
        </>
    )
}

export default Calendar