import React, { useEffect } from 'react'
import { getAllTutors, getTutorHours } from '../../API/Endpoints/appointEndpoint'

import '../../output.css'
import './appointment.css'
import { UserGet } from '../../API/DTOs/userTypes'
import { InputAdornment, MenuItem, Skeleton, TextField } from '@mui/material'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { subjectArray } from '../../API/DTOs/subjectTypes'
import TutorCard from '../../Components/TutorCard'
import { useAppSelector } from '../../Hooks/stateHooks'
import { HoursGet } from '../../API/DTOs/appointTypes'


const SearchTutors = () => {

    const user = useAppSelector((state) => state.user.value)

    const subjList = subjectArray;

    const [loading, setLoading] = React.useState(false);

    const [tutorList, setTutorList] = React.useState<Array<Array<UserGet>>>([]);
    const [totalList, setTotalList] = React.useState<Array<UserGet>>([]);
    const [subjectFilter, setSubjectFilter] = React.useState("");
    const [nameFilter, setNameFilter] = React.useState<string | null>(null);

    const updateSubject = (subject: string) => {
        setSubjectFilter(subject);
        updateList(subject, nameFilter);
    }

    const updateName = (name: string) => {
        setNameFilter(name);
        updateList(subjectFilter, name);
    }

    const getList = () => {
        if (!subjList.find((val) => val == "All Subjects")) {
            subjList.push("All Subjects");
        }
        
        setLoading(true);
        getAllTutors().then((data: Array<UserGet>) => {
            for (let i = 0; i < data.length; i++) {
                if (user.favouriteTutorIds && user.favouriteTutorIds.find((val) => val == data[i].id) != undefined) {
                    data[i].fav = true;
                } else {
                    data[i].fav = false;
                }
            }

            removeUnavailable(data);
        }).catch(() => setLoading(false));
    }

    const removeUnavailable = (data: Array<UserGet>) => {
        const newTutorList = [];
        for (const tutor of data) {
            const hours: HoursGet[] = tutor.availableHours!;
            if (hours.length != 0 && (tutor.profilePic && tutor.profilePic.length > 0)) {
                newTutorList.push(tutor);
            }
        }

        setTotalList(newTutorList);
        updateList('All Subjects', '', newTutorList);
        setLoading(false);
    }

    useEffect(() => {
        getList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const updateList = (subject: string, name: string | null, list?: Array<UserGet>) => {
        const data = list || totalList;

        let newTutorList = [[]] as Array<Array<UserGet>>;
        let outerIndex = 0;
        let innerIndex = 0;
        for (let i = 0; i < data.length; i++) {
            if (name && name.length > 0 && !((data[i].fname! + " " + data[i].lname!).toLowerCase().includes(name.toLowerCase()))) {
                innerIndex--;
            } else if (subject && subject != "All Subjects" && !(data[i].subjects.includes(subject))) {
                innerIndex--;
            } else {
                newTutorList[outerIndex].push(data[i])
            }
            if ((innerIndex + 1) % 3 === 0) {
                newTutorList.push([]);
                outerIndex++;
            }
            innerIndex++;
        }
        setTutorList(newTutorList);
    }

    return(
      <main className="m-4">
        <div className="grid-flow-col">
            <div className="grid-flow-row">
                <div>
                    <TextField
                        id="input-with-icon-textfield"
                        sx={{ width: 800, marginTop: 2, marginRight: 6 }}
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaSearch/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        onChange={(event) => {updateName(event.target.value)}}
                    />
                    <TextField
                        className="m-2"
                        sx={{ width: 200 }}
                        select
                        id="type"
                        label="Subject"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaFilter/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => {updateSubject(event.target.value)}}
                    >
                        {subjList.map((option) => 
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        )}
                    </TextField>
                </div>
                {
                    loading ?
                    <div className="grid grid-cols-3 space-x-4 m-2">
                        <Skeleton variant="rounded" height={280}/>
                        <Skeleton variant="rounded" height={280}/>
                        <Skeleton variant="rounded" height={280}/>
                    </div> :
                    tutorList.map((tutors) => 
                        <div className="grid grid-cols-3 space-x-4">
                            {tutors.map((tutor) => 
                                <TutorCard tutor={tutor}/>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
        
      </main>
    )
}

export default SearchTutors