import React, { useEffect } from 'react'
import { getAllAppointments } from '../../API/Endpoints/appointEndpoint'
import { useAppSelector } from '../../Hooks/stateHooks';
import { AppointmentGet } from '../../API/DTOs/appointTypes';
import AppointCard from '../../Components/AppointCardTutor';
import { Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';

const UpcomingTutor = () => {

    const user = useAppSelector((state) => state.user.value);

    const [appointmentsList, setAppointmentsList] = React.useState<Array<AppointmentGet>>();
    const [loading, setLoading] = React.useState(false);

    const utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);

    const getAppointmentsWithStudents = () => {
        setLoading(true);
        getAllAppointments(user.email).then((response) => {
            const newAppointmentsList: Array<AppointmentGet>= [];
            response.forEach((appointment) => {
                
                const formatData = (input: number) => {
                    if (input > 9) {
                      return input;
                    } else return `0${input}`;
                  };

                var startTimeDate = new Date(appointment.startTime as string);
                const startTimeData = {
                    dd: formatData(startTimeDate.getDate()),
                    mm: formatData(startTimeDate.getMonth() + 1),
                    yyyy: startTimeDate.getFullYear(),
                    HH: formatData(startTimeDate.getHours()),
                    MM: formatData(startTimeDate.getMinutes()),
                    SS: formatData(startTimeDate.getSeconds()),
                };
                const startTimeFormat = startTimeData.yyyy.toString() + '-' +
                                        startTimeData.mm.toString() + '-' + 
                                        startTimeData.dd.toString() + 'T' +
                                        startTimeData.HH.toString() + ':' +
                                        startTimeData.MM.toString() + ':' +
                                        startTimeData.SS.toString();

                var endTimeDate = new Date(appointment.endTime as string);
                const endTimeData = {
                    dd: formatData(endTimeDate.getDate()),
                    mm: formatData(endTimeDate.getMonth() + 1),
                    yyyy: endTimeDate.getFullYear(),
                    HH: formatData(endTimeDate.getHours()),
                    MM: formatData(endTimeDate.getMinutes()),
                    SS: formatData(endTimeDate.getSeconds()),
                };                     
                const endTimeFormat = endTimeData.yyyy.toString() + '-' +
                                      endTimeData.mm.toString() + '-' + 
                                      endTimeData.dd.toString() + 'T' +
                                      endTimeData.HH.toString() + ':' +
                                      endTimeData.MM.toString() + ':' +
                                      endTimeData.SS.toString();                
                                        
                if (dayjs(startTimeFormat).isAfter(dayjs())) {
                    const newAppointment = {
                        ...appointment,
                        startTime: startTimeFormat,
                        endTime: endTimeFormat,
                    };

                    newAppointmentsList.push(newAppointment);
                }
            });

            newAppointmentsList.sort((a, b) =>
                    (a.startTime as Date) > (b.startTime as Date) ? 1 : -1);
            setAppointmentsList(newAppointmentsList);
        }).finally(() => { setLoading(false); })
    }

    useEffect(() => {
        getAppointmentsWithStudents();
      }, []);

    return(
        <main className="m-4">
            <div className="grid-flow-col">
                <div className="grid-flow-row">
                    <Typography variant="h4">&nbsp; Upcoming Appointments</Typography>
                    {
                        loading ?
                        <div className="grid grid-cols-4 space-x-4 mt-4">
                            <Skeleton variant="rounded" width={350} height={244}/>
                            <Skeleton variant="rounded" width={350} height={244}/>
                            <Skeleton variant="rounded" width={350} height={244}/>
                            <Skeleton variant="rounded" width={350} height={244}/>
                        </div>
                        :
                        <div className="grid grid-cols-4 space-x-4">
                        {
                            appointmentsList && appointmentsList.length > 0 ?
                            appointmentsList?.map((appointment) => 
                                <AppointCard key={appointment.startTime as string} appointment={appointment} onHandleDelete={getAppointmentsWithStudents}/>
                                ) :
                                <div className="col-span-4">
                                <Typography variant="h4" align="center" sx={{marginTop: 16}}>There are no upcoming appointments scheduled</Typography>
                                </div>
                        }
                    </div>
                    }
                    <Typography variant="body1" align="center" sx={{marginTop: 8}}>Total Hours: {user.totalHours}</Typography>
                </div>
            </div>
        </main>
    )
}

export default UpcomingTutor