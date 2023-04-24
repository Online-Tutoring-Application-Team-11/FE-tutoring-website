import { Alert, AlertColor, Avatar, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography } from '@mui/material';
import React from 'react';
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserGet } from '../API/DTOs/userTypes';
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper';
import { FaStar, FaUser, FaEllipsisH, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../Hooks/stateHooks';
import { updateStudent } from '../API/Endpoints/userEndpoints';
import { setUser } from '../Hooks/userSlice';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { createAppointment, getAllAppointments } from '../API/Endpoints/appointEndpoint';
import { AppointmentGet, AppointmentSend } from '../API/DTOs/appointTypes';
import { LoadingButton } from '@mui/lab';


const TutorCard = (props: { tutor: UserGet, onHandleFavorite?: (id: number) => void }) => {

    const navigate = useNavigate();
    const [validTime, setValidTime] = React.useState(false);
    const [appointOpen, setAppointOpen] = React.useState(false);
    const [loadingAppoint, setLoadingApp] = React.useState(false);
    const [appointDate, setDate] = React.useState<Dayjs>();
    const [subject, setSubject] = React.useState("");

    const [errorMessage, setErrorMessage] = React.useState("");
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("success");

    const [isFav, setFav] = React.useState(props.tutor.fav);
    const [appointments, setAppointments] = React.useState<Array<AppointmentGet>>([]);

    const user = useAppSelector((state) => state.user.value)
    const dispatch = useAppDispatch();

    const handleFavorite = () => {
      let newFavIds = user.favouriteTutorIds || [];
      if (!isFav) {
        newFavIds = newFavIds.concat(props.tutor.id);
      } else {
        newFavIds = newFavIds.filter((id) => id != props.tutor.id);
      }

      const studentInfo = {
        email: user.email,
        year: user.year || 0,
        favouriteTutorIds: newFavIds
      }
      updateStudent(studentInfo).then((response) => {
        dispatch(setUser({
          ...response,
          fName: response.fname,
          lName: response.lname,
          favouriteTutorIds: newFavIds
        }));
        setFav(!isFav);
        if (props.onHandleFavorite)
          props.onHandleFavorite(props.tutor.id);
      })
    }

    const navToProfile = () => {
      navigate(`/profile/view/tutor/${props.tutor.email}`);
    }

    const handleAppointment = () => {
      getAllAppointments(props.tutor.email).then((response) => {
        setAppointments(response);
      }).finally(() => { 
        setValidTime(false);
        setAppointOpen(true); 
      })
    }

    const actions = [
      { icon: <FaUser />, name: 'View Profile', func: navToProfile },
      { icon: <FaStar />, name: isFav ? 'Remove from Favorites' : 'Add to Favorites', func: handleFavorite },
      { icon: <FaCalendarCheck />, name: 'Schedule an Appointment', func: handleAppointment }
    ];

    const disableDate = (date: Dayjs): boolean => {
      appointments.map((value) => {
        const appointmentTime = dayjs(value.startTime);
        if (appointmentTime.isSame(date)) {
          return true;
        }
      })
      return false;
    };

    const disableMonth = (date: Dayjs): boolean => {
      const currMonth = dayjs().month();
      const nextMonth = currMonth == 11 ? 0 : currMonth + 1;

      if (!(date.month() == currMonth || date.month() == nextMonth)) {
        return true;
      }
      return false;
    }

    const valiDate = (date?: Dayjs | null) => {
      let valid: boolean = true;
      setErrorMessage("");

      if (date) {
        setDate(date);

        if (date.isBefore(dayjs())) {
          setErrorMessage("Selected time cannot be in the past");
          valid = false;
        }

        else if (date.isBefore(dayjs().add(1, 'day'))) {
          setErrorMessage("Appointments must be scheduled 24 hours in advance");
          valid = false;
        }

        else if (!(date.minute() == 0 || date.minute() == 30)) {
          setErrorMessage("Selected time is not a 30 minute interval (:00 or :30)");
          valid = false;
        }

        appointments.map((value) => {
          const appointmentTime = dayjs(value.startTime);
          if (appointmentTime.isSame(date)) {
            setErrorMessage("Selected time overlaps an existing appointment");
            valid = false;
          }
        });
      } else {
        valid = false;
      }

      setValidTime(valid);
    };

    const scheduleAppointment = () => {
      if (validTime && appointDate) {
        const newAppointment: AppointmentSend = {
          requestedStartTime: appointDate.format('YYYY-MM-DDTHH:mm:ss'),
          requestedEndTime: appointDate.add(30, 'minute').format('YYYY-MM-DDTHH:mm:ss'),
          studentEmail: user.email,
          tutorEmail: props.tutor.email,
          subject: subject
        }
        setLoadingApp(true);
        createAppointment(newAppointment)
          .then(() => {
            setSeverity("success");
            setSnackBarMessage("Scheduled Appointment!")
          }).catch((error) => {
            setSeverity("error");
            setSnackBarMessage(error.message);
          }).finally(() => {
            setLoadingApp(false);
            setAppointOpen(false);
          })
      }
    }

      return(
        <div>
          <Card className="m-2 p-2 justify-content-start">
            <div className="grid grid-flow-row space-y-4">
              <div className="grid grid-cols-4 space-x-4">
                <div className="space-y-2 flex flex-col items-center">
                  <Avatar sx={{ width: 80, height: 80, fontSize: 32, bgcolor: nameToColor(props.tutor.fname || " ") }} src={props.tutor.profilePic}>
                    {nameToInitials(props.tutor.fname || " ", props.tutor.lname || " ")}
                  </Avatar>
                  <Typography align="center">{props.tutor.fname} {props.tutor.lname}</Typography>
                </div>
                <div className="col-span-2">
                  <Typography variant="h6">About Me</Typography>
                  <Typography>{props.tutor.aboutMe}</Typography>
                </div>
                <div className="flex justify-end">
                  { isFav ?
                    <FaStar size="32" color="gold"></FaStar> : <div/>
                  }
                  <SpeedDial
                    sx={{ '& .MuiFab-primary': { width: 36, height: 32, paddingTop: 1, backgroundColor: "green", '&:hover': {backgroundColor: 'green'} } }}
                    direction="down"
                    ariaLabel="InteractTutor"
                    icon={<SpeedDialIcon icon={<FaEllipsisH/>} openIcon={<FaTimes/>} />}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        sx={{width: 36, height: 30}}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                      />
                    ))}
                  </SpeedDial>
                </div>
              </div>
              <div className="grid grid-cols-3">
                {props.tutor.subjects.map((subject) =>
                  <Chip color="success" className="m-1" key={subject} label={subject}/>
                )}
              </div>
            </div>
          </Card>

          <Dialog open={appointOpen}>
            <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogContent className="flex flex-col space-y-4" sx={{height: 240, width: 400}}>
                <DialogContentText>Select an available date and time</DialogContentText>
                <DesktopDateTimePicker
                  disablePast
                  minutesStep={30}
                  showDaysOutsideCurrentMonth
                  views={['day', 'hours', 'minutes']}
                  shouldDisableDate={disableDate}
                  shouldDisableMonth={disableMonth}
                  onError={() => setValidTime(false)}
                  onChange={(value) => valiDate(value)}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                  }}
                />
                <TextField
                  select
                  SelectProps={{
                    native: false
                  }}
                  required
                  id="type"
                  label="Subject"
                  onChange={(event) => {
                    setSubject(event.target.value);
                    valiDate(appointDate);
                  }}
                >
                  {props.tutor.subjects.map((option) => 
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button color="error" onClick={() => setAppointOpen(false)}>Cancel</Button>
                <LoadingButton
                  loading={loadingAppoint}
                  color="success"
                  disabled={!(validTime && subject.length > 0)}
                  onClick={() => scheduleAppointment()}
                >
                  Schedule
                </LoadingButton>
              </DialogActions>
          </Dialog>

          <Snackbar
            open={snackBarMessage.length > 0}
            autoHideDuration={4000}
            onClose={() => {setSnackBarMessage("")}}
          >
            <Alert severity={severity as AlertColor} sx={{width: "100%"}} variant="filled">
              {snackBarMessage}
            </Alert>
          </Snackbar>
        </div>
      )
  }
  
  export default TutorCard;