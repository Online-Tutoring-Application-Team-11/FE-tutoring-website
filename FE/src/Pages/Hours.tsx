import { Alert, Button, Card, CardActions, CardContent, Collapse, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { deleteAllTutorHours, getTutorHours, setTutorHours } from '../API/Endpoints/appointEndpoint';
import TimeBlock from '../Components/TimeBlock';
import { useAppSelector } from '../Hooks/stateHooks';
import { HoursGet, HoursSend } from '../API/DTOs/appointTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaTimes, FaTrash } from 'react-icons/fa';

const SetHours = () => {

    const dayArray = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const hourArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    const user = useAppSelector((state) => state.user.value);
    
    const [blockList, setBlockList] = React.useState<Array<HoursGet>>();
    const [selectDeleteAll, setSelectDeleteAll] = React.useState(false);

    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [errorMessage, setErrMsg] = React.useState('');

    const blockSchema = object({
        dayOfWeek: string().nonempty("Day is required"),
        startHr: string(),
        startMin: string(),
        endHr: string(),
        endMin: string(),
        startAMPM: string(),
        endAMPM: string()
      });
    
    type BlockInput = TypeOf<typeof blockSchema>

    const getAvailableHours = () => {
        getTutorHours(user.email).then((response) => {
            let newBlockList: Array<HoursGet> = [];
            response.forEach((block) => {
                const startTimeParse = (block.startTime as string).split(':');
                const endTimeParse = (block.endTime as string).split(':');
                const newBlock = {
                    ...block,
                    dayOfWeek: block.dayOfWeek.toUpperCase(),
                    startTime: new Date(0, 0, 0, +startTimeParse[0], +startTimeParse[1]),
                    endTime: new Date(0, 0, 0, +endTimeParse[0], +endTimeParse[1])
                };
                newBlockList.push(newBlock);
                newBlockList.sort((a, b) => 
                (dayArray.findIndex((element) => element === a.dayOfWeek) > dayArray.findIndex((element) => element === b.dayOfWeek)) 
                ? 1 : (a.dayOfWeek === b.dayOfWeek) ? ((a.startTime > b.startTime) ? 1 : -1) : -1 );
            })
            setBlockList(newBlockList);
        });
    };

    useEffect(() => {
        getAvailableHours();
      }, []);

    const onSubmitHandler: SubmitHandler<BlockInput> = (someBlock) => {
        if (isSubmitSuccessful) {
            let milStartHr: string | number;
            let milEndHr: string | number;

            if (someBlock.startAMPM == "PM" && +someBlock.startHr != 12)
                milStartHr = +someBlock.startHr + 12
            else if (someBlock.startAMPM == "AM" && +someBlock.startHr == 12)
                milStartHr = "0"
            else
                milStartHr = someBlock.startHr

            if (someBlock.endAMPM == "PM" && +someBlock.endHr != 12)
                milEndHr = +someBlock.endHr + 12
            else if (someBlock.endAMPM == "AM" && +someBlock.endHr == 12)
                milEndHr = "0"
            else
                milEndHr = someBlock.endHr

            milStartHr = (+milStartHr! >= 10 ? milStartHr! : "0" + milStartHr!)
            milEndHr = (+milEndHr! >= 10 ? milEndHr! : "0" + milEndHr!)

            if (+milStartHr >= +milEndHr) {
                setError(true);
                setErrMsg("End time must be after start time");
                return;
            }

            const newBlock: HoursSend = {
                email: user.email,
                dayOfWeek: someBlock.dayOfWeek,
                startTime: milStartHr + ":" + someBlock.startMin + ":00",
                endTime: milEndHr + ":" + someBlock.endMin + ":00"
            }

            console.log(newBlock)

            setTutorHours(newBlock).then(() => {
                getAvailableHours();
                setSuccess(true);
            }).catch((err) => {
                setError(true);
                setErrMsg(err.message)
            })
        }
      };
    
      const {
        register,
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
      } = useForm<BlockInput>({
        resolver: zodResolver(blockSchema),
      });
      
      const deleteAllHours = () => {
        //console.log(user.email);
        //console.log(props.block.dayOfWeek);
    
        //var formatteddatestr = moment(props.block.startTime).format('hh:mm:ss');
        //console.log(formatteddatestr);
        
        deleteAllTutorHours(user.email).then(() => {
          setSelectDeleteAll(!selectDeleteAll);
          getAvailableHours();
            //if (props.onHandleDelete)
              //props.onHandleDelete();
        })
        //console.log("Did we make it??");
      } 

    return(
        <main className="m-4">
            <div className="grid-flow-col">
                <div className="grid-flow-row">
                    <div className="grid-flow-col grid-cols-12">
                        <div className="col-span-6">
                            <Typography variant="h4"> &nbsp; Set Available Hours</Typography>
                        </div>
                        <div className="col-span-5 flex justify-end">
                            <Button variant="contained" color="error" sx={{marginRight: 16}} onClick={deleteAllHours}>Delete All &nbsp; <FaTrash color="white"/></Button>
                        </div>
                    </div>
                    <div className="grid grid-flow-col grid-cols-12">
                        <div className="col-span-5">
                        <Card>
                            <CardContent>
                                <div className="grid grid-flow-row col-span-5 form-elements">
                        
                                <Typography variant="h5">&nbsp; Day</Typography>
                                <TextField
                                    select
                                    required
                                    className="m-2"
                                    size="small"
                                    id="type"
                                    error={!!errors['dayOfWeek']}
                                    helperText={errors['dayOfWeek'] ? errors['dayOfWeek'].message : ''}
                                    {...register('dayOfWeek')}
                                >
                                    {dayArray.map((option) => 
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    )}
                                </TextField>

                                <Typography variant="h5">&nbsp; Start Time</Typography>
                                <div className="grid grid-flow-col grid-cols-8">
                                    <div className="col-span-2">
                                        <TextField
                                            select
                                            required
                                            className="m-2"
                                            size="small"
                                            id="type"
                                            defaultValue={7}
                                            {...register('startHr')}
                                        >
                                        {hourArray.map((option) => 
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        )}
                                        </TextField>
                                    </div>
                                    <div className="col-span-1"><Typography align="center" variant="h4">:</Typography></div>
                                    <div className="col-span-2">
                                        <TextField
                                            select
                                            required
                                            className="m-2"
                                            size="small"
                                            id="type"
                                            defaultValue={"00"}
                                            {...register('startMin')}
                                        >
                                            <MenuItem value={"00"}>00</MenuItem>
                                            <MenuItem value={"30"}>30</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="col-span-1"></div>
                                    <div className="col-span-2">
                                        <TextField
                                            select
                                            required
                                            className="m-2"
                                            size="small"
                                            id="type"
                                            defaultValue={"AM"}
                                            {...register('startAMPM')}
                                        >
                                            <MenuItem value={"AM"}>AM</MenuItem>
                                            <MenuItem value={"PM"}>PM</MenuItem>
                                        </TextField>
                                    </div>

                                </div>
                            
                                <Typography variant="h5">&nbsp; End Time</Typography>
                                <div className="grid grid-flow-col grid-cols-8">
                                    <div className="col-span-2">
                                        <TextField
                                            select
                                            required
                                            className="m-2"
                                            size="small"
                                            id="type"
                                            defaultValue={9}
                                            {...register('endHr')}
                                        >
                                            {hourArray.map((option) => 
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    </div>
                                    <div className="col-span-1"><Typography align="center" variant="h4">:</Typography></div>
                                    <div className="col-span-2">
                                        <TextField
                                            select
                                            required
                                            className="m-2"
                                            size="small"
                                            id="type"
                                            defaultValue={"00"}
                                            {...register('endMin')}
                                        >
                                            <MenuItem value={"00"}>00</MenuItem>
                                            <MenuItem value={"30"}>30</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="col-span-1"></div>
                                    <div className="col-span-2">
                                        <TextField
                                            select
                                            required
                                            className="m-2"
                                            size="small"
                                            id="type"
                                            defaultValue={"AM"}
                                            {...register('endAMPM')}
                                        >
                                            <MenuItem value={"AM"}>AM</MenuItem>
                                            <MenuItem value={"PM"}>PM</MenuItem>
                                        </TextField>
                                    </div>

                                </div>
                                <div className = "row-span-6"></div>

                                </div>
                                
                            </CardContent>
                            <CardActions>
                                <Button className="m-3" variant="contained" color="primary" onClick={handleSubmit(onSubmitHandler)}>+ Add Block</Button>
                            </CardActions>
                            <Collapse in={error}>
                                <Alert
                                severity="error"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setError(false);
                                    }}
                                    >
                                    <FaTimes fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                >
                                {errorMessage}
                                </Alert>
                            </Collapse>
                            <Collapse in={success}>
                                <Alert
                                severity="success"
                                action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setSuccess(false);
                                    }}
                                    >
                                    <FaTimes fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                                >
                                Updated Hours
                                </Alert>
                            </Collapse>
                        </Card>
                        </div>
                        <div className="col-span-1"></div>

                        <div className="col-span-5">
                            {
                                blockList && blockList.length > 0 ?
                                blockList?.map((block) => 
                                    <TimeBlock key={block.dayOfWeek + block.startTime} block={block} onHandleDelete={getAvailableHours}/>
                                ) :
                                <Typography variant="h4" align="center" sx={{marginTop: 16}}>There are no time blocks set</Typography>
                            }
                        </div>

                    </div>

                </div>

            </div>
        
        </main>
    )
}

export default SetHours