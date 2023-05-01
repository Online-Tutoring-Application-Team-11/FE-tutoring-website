import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { HoursGet } from '../API/DTOs/appointTypes'
import { deleteTutorHours } from '../API/Endpoints/appointEndpoint'
import { useAppSelector } from '../Hooks/stateHooks'
import { FaTimes } from 'react-icons/fa'
import dayjs from 'dayjs'
import { dayArray } from '../API/DTOs/subjectTypes'

const TimeBlock = (props: {block: HoursGet, onHandleDelete?: (endTime: string, day: string) => void}) => {

  const user = useAppSelector((state) => state.user.value);
  const utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);

  const [startHr, setStartHr] = React.useState(0);
  const [endHr, setEndHr] = React.useState(0);
  const [startAMPM, setStartAMPM] = React.useState("");
  const [endAMPM, setEndAMPM] = React.useState("");

  const [selectDelete, setSelectDelete] = React.useState(false);

  const handleDelete = () => {
    console.log(props.block)
    var formatteddate = dayjs((props.block.startTime as string));
    var dayOfWeek = props.block.dayOfWeek;
    if (formatteddate.hour() - (dayjs().utcOffset() / 60) >= 24) {
      formatteddate = formatteddate.subtract(24, 'hour');
      dayOfWeek = dayOfWeek == 'SATURDAY' ? 'SUNDAY' : dayArray[dayArray.indexOf(dayOfWeek) + 1];
    }
    formatteddate = formatteddate.subtract(dayjs().utcOffset(), 'minute');
  
    deleteTutorHours(user.email, dayOfWeek, formatteddate.format('HH:mm:ss')).then((data) => {
      setSelectDelete(!selectDelete);
        if (props.onHandleDelete)
          props.onHandleDelete(data[0].endTime as string, props.block.dayOfWeek);
    })
   
  }

  // convert from military time format to AM/PM time format
  const convertTimes = () => {
    if((props.block.startTime as Date).getHours() > 12) {
      setStartHr((props.block.startTime as Date).getHours() - 12);
      setStartAMPM("PM");
    }
    else if((props.block.startTime as Date).getHours() == 12) {
      setStartHr(12);
      setStartAMPM("PM");
    }
    else if((props.block.startTime as Date).getHours() == 0) {
      setStartHr(12);
      setStartAMPM("AM");
    }
    else{
      setStartHr((props.block.startTime as Date).getHours());
      setStartAMPM("AM");
    }
  
    if((props.block.endTime as Date).getHours() > 12) {
      setEndHr((props.block.endTime as Date).getHours() - 12);
      setEndAMPM("PM");
    }
    else if((props.block.endTime as Date).getHours() == 12) {
      setEndHr(12);
      setEndAMPM("PM");
    }
    else if((props.block.endTime as Date).getHours() == 0) {
      setEndHr(12);
      setEndAMPM("AM");
    }
    else{
      setEndHr((props.block.endTime as Date).getHours())
      setEndAMPM("AM");
    }
  }

  useEffect(() => {
    convertTimes();
  }, []);
    
  return(
    <Card className="m-2 p-2 justify-content-start">
      <div className="grid grid-flow-row space-y-4">
        <div className="grid grid-cols-9 space-x-4">
          <div className="col-span-3">
            <Typography>{props.block.dayOfWeek}</Typography>
          </div>
          <div className="col-span-3">
            <Typography>
              {startHr}:{
                (props.block.startTime as Date).getMinutes() >= 10 ? 
                (props.block.startTime as Date).getMinutes() : 
                "0" + (props.block.startTime as Date).getMinutes()} {startAMPM}
                &nbsp; - &nbsp;
              {endHr}:{
                (props.block.endTime as Date).getMinutes() >= 10 ? 
                (props.block.endTime as Date).getMinutes() : 
                "0" + (props.block.endTime as Date).getMinutes()
              } {endAMPM}
            </Typography>
            </div>
            {
              props.onHandleDelete ? 
              <div className="col-span-3 flex justify-end">
                <Stack direction="row" spacing={1}>
                  <Button onClick={handleDelete}><FaTimes color="gray"/></Button>
                </Stack>
              </div>
              : <div/>
            }
          </div>
        </div>
      </Card>
    )
}

export default TimeBlock