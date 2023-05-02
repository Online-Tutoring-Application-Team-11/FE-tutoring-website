import React, { useEffect } from 'react'
import { AppointmentGet, AppointmentSend } from '../API/DTOs/appointTypes'
import { Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper'
import { deleteAppointment } from '../API/Endpoints/appointEndpoint'
import dayjs from 'dayjs';
import { getTutor } from '../API/Endpoints/userEndpoints'
import { UserSend } from '../API/DTOs/userTypes'
import { useNavigate } from 'react-router-dom'

const AppointCardStudent = (props: {appointment: AppointmentGet, onHandleDelete?: () => void}) => {

    //const user = useAppSelector((state) => state.user.value);
    const navigate = useNavigate();

    const [selectDelete, setSelectDelete] = React.useState(false);
    const [cancel, setCancel] = React.useState(true);

    const handleDelete = () => {

      const appointmentToCancel: AppointmentSend = {
        studentEmail: props.appointment.studentEmail,
        tutorEmail: props.appointment.tutorEmail,
        subject: props.appointment.subject,
        requestedStartTime: props.appointment.startTime as string,
        requestedEndTime: props.appointment.endTime as string
      };      

      deleteAppointment(appointmentToCancel).then(() => {
        setSelectDelete(!selectDelete);
          if (props.onHandleDelete)
            props.onHandleDelete();
      });
    };

    /*
    // time conversion stuff ... *sigh*
    const [startLocalTime, setStartLocalTime] = React.useState("");
    const [startLocalAMPM, setStartLocalAMPM] = React.useState("");
    const [endLocalTime, setEndLocalTime] = React.useState("");
    const [endLocalAMPM, setEndLocalAMPM] = React.useState("");
    const convertTimes = () => {

      let startGetHour = (props.appointment.startTime as Date).getHours();
      var newStartHour = +startGetHour - (dayjs().utcOffset() / 60);
      setStartLocalTime(newStartHour.toString() + ':' + (props.appointment.startTime as Date).getMinutes().toString());
      if(newStartHour < 12){
        setStartLocalAMPM("AM");
      }
      else{
        newStartHour -= 12;
        setStartLocalAMPM("PM");
      }

      let endGetHour = (props.appointment.endTime as Date).getHours();
      var newEndHour = +endGetHour - (dayjs().utcOffset() / 60);
      setEndLocalTime(newEndHour.toString() + ':' + (props.appointment.endTime as Date).getMinutes().toString());
      if(newEndHour < 12){
        setEndLocalAMPM("AM");
      }
      else{
        newEndHour -= 12;
        setEndLocalAMPM("PM");
      }
    };

    useEffect(() => {
      convertTimes();
    }, []);
    */

    const [user, setUser] = React.useState<UserSend>({email:""});

    const fetchUser = () => {
      getTutor(props.appointment.tutorEmail || "").then((response) => {
        const newTutor: UserSend = {
          ...response,
          fName: response.fname,
          lName: response.lname
        };
        setUser(newTutor);

        if (dayjs().subtract(dayjs().utcOffset(), 'minute').add(1, 'day').isAfter(dayjs(props.appointment.startTime))) {
          setCancel(false);
        }
      })
    };

    useEffect(() => {
      fetchUser();
    }, []);

    // still need to convert from UTC to user's local time
    const [appointmentDate, setAppointmentDate] = React.useState("");
    const [startLocalTime, setStartLocalTime] = React.useState("");
    const [startLocalAMPM, setStartLocalAMPM] = React.useState("");
    const [endLocalTime, setEndLocalTime] = React.useState("");
    const [endLocalAMPM, setEndLocalAMPM] = React.useState("");
    

    const utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);

    const parseDateTimes = () => {
      let dateStringParse: string[];
      dateStringParse = (props.appointment.startTime as string).split('T');
      let dateStringParse2: string[];
      dateStringParse2 = (props.appointment.endTime as string).split('T');

      const startTimeParse = (dateStringParse[1]).split(':');
      startTimeParse[0] = +startTimeParse[0] + (dayjs().utcOffset() / 60) + "";
      const endTimeParse = (dateStringParse2[1]).split(':');
      endTimeParse[0] = +endTimeParse[0] + (dayjs().utcOffset() / 60) + "";

      if (+startTimeParse[0] < 0) {
        dateStringParse[0] = dayjs(dateStringParse[0]).subtract(1, 'day').format('MM/DD/YYYY');
        startTimeParse[0] = +startTimeParse[0] + 24 + "";
        endTimeParse[0] = +endTimeParse[0] + 24 + "";
      } else {
        dateStringParse[0] = dayjs(dateStringParse[0]).format('MM/DD/YYYY');
      }

      setAppointmentDate(dateStringParse[0]);
      //setStartLocalTime(dateStringParse[1]);
      //setEndLocalTime(dateStringParse2[1]);
      setStartLocalTime(startTimeParse[0] + ':' + startTimeParse[1]);
      setEndLocalTime(endTimeParse[0] + ':' + endTimeParse[1]);

      if (+startTimeParse[0] == 0) {
        setStartLocalTime(12 + ':' + startTimeParse[1]);
        setStartLocalAMPM("AM");
      }
      else if (+startTimeParse[0] < 12) {
        setStartLocalAMPM("AM");
      }
      else {
        if (+startTimeParse[0] > 12) {
          setStartLocalTime(+startTimeParse[0] - 12 + ':' + startTimeParse[1]);
        }
        setStartLocalAMPM("PM");
      }

      if (+endTimeParse[0] == 0) {
        setEndLocalTime(12 + ':' + endTimeParse[1]);
        setEndLocalAMPM("AM");
      }
      else if (+endTimeParse[0] < 12) {
        setEndLocalAMPM("AM");
      }
      else {
        if (+endTimeParse[0] > 12) {
          setEndLocalTime(+endTimeParse[0] - 12 + ':' + endTimeParse[1]);
        }
        setEndLocalAMPM("PM");
      }

    }

    useEffect(() => {
      parseDateTimes();
    }, []);

    const navToProfile = () => {
      navigate(`/profile/view/tutor/${user.email}`);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
      <Card className="m-2 p-2 justify-content-start">
      <div className="grid grid-flow-row space-y-4">
        <div className="grid grid-cols-4 space-x-4">
          <div className="col-span-2">
            <Avatar className="cursor-pointer" onClick={navToProfile}
                  sx={{ width: 80, height: 80, fontSize: '80px', bgcolor: nameToColor(user.fName || " ") }} src={user.profilePic}>
                  {nameToInitials(user.fName|| " ", user.lName || " ")}
            </Avatar>
          </div>
          <div className="col-span-2">
            <Typography variant="h6">{user.fName} {user.lName}</Typography>
          </div>
          <div className="col-span-4 row-span-1">
            <Typography variant="h6">{props.appointment.subject}</Typography>
          </div>
          <div className="col-span-4 row-span-1">
            <Typography variant="h6">
            {startLocalTime} {startLocalAMPM}
            &nbsp;-&nbsp;
            {endLocalTime} {endLocalAMPM}
            </Typography>
          </div>
          <div className="col-span-4 row-span-1">
            <Typography variant="h6">{appointmentDate}</Typography>
          </div>
          <div className="col-span-4 row-span-1">
            {
              cancel ?
              <Button variant="contained" color="error" onClick={handleClickOpen}>Cancel Appointment</Button> :
              <div/>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Cancel Appointment?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    A cancellation may be made up to 24 hours prior to the scheduled appointment.
                    Please note that this action cannot be undone. 
                    The only way to reschedule an appointment is to make a new appointment.
                    Do you still wish to cancel this appointment?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
          </div>
          
        </div>
        
      </div>
    </Card>
    )

}

export default AppointCardStudent