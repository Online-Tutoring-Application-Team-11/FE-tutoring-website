import { Avatar, Chip, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from '@mui/material';
import React from 'react';
import { Card } from "react-bootstrap";
import { UserGet } from '../API/DTOs/userTypes';
import { nameToColor, nameToInitials } from '../Helpers/avatarHelper';
import { FaStar, FaUser, FaEllipsisH, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../Hooks/stateHooks';
import { updateStudent } from '../API/Endpoints/userEndpoints';
import { setUser } from '../Hooks/userSlice';
import { useNavigate } from 'react-router-dom';


const TutorCard = (props: { tutor: UserGet, onHandleFavorite?: (id: number) => void }) => {

    const navigate = useNavigate();
    const [isFav, setFav] = React.useState(props.tutor.fav)

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

    }

    const actions = [
      { icon: <FaUser />, name: 'View Profile', func: navToProfile },
      { icon: <FaStar />, name: isFav ? 'Remove from Favorites' : 'Add to Favorites', func: handleFavorite },
      { icon: <FaCalendarCheck />, name: 'Schedule an Appointment', func: handleAppointment }
    ];

      return(
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
      )
  }
  
  export default TutorCard;