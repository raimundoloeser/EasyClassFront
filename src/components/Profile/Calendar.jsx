import React from 'react';
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
import Paper from '@mui/material/Paper';

const Calendar = (props) => {

  // obtengo el dia actual
  var currentDate = new Date();
  var dd = String(currentDate.getDate()).padStart(2, '0');
  var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = currentDate.getFullYear();
  currentDate = yyyy + '-' + mm + '-' + dd;

  // aca va mi conexion con la api para tener los datos
  const schedulerData = [
    {
      title: 'Website Re-Design Plan',
      startDate: '2022-05-25T09:45',
      endDate: '2022-05-25T11:45',
      id: 0,
      location: 'Room 1',
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
      return <AppointmentForm.Label
      { ...props} 
      text="Precio Modulo"
      />  
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
      return <AppointmentForm.TextEditor
      { ...props}
      type='numberEditor'
      placeholder='Precio'
      />
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

  // retorno el calendario 
  return (
    <>
    <h1 style={{ 'textAlign': 'center' }}>Horario del Profesor:</h1>
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