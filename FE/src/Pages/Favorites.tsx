import React, { useEffect } from 'react'
import { getAllTutors } from '../API/Endpoints/appointEndpoint'

import '../output.css'
import { UserGet } from '../API/DTOs/userTypes'
import { subjectArray } from '../API/DTOs/subjectTypes'
import TutorCard from '../Components/TutorCard'
import { useAppSelector } from '../Hooks/stateHooks'
import { Skeleton, Typography } from '@mui/material'


const Favorites = () => {

    const user = useAppSelector((state) => state.user.value)

    const subjList = subjectArray;

    const [loading, setLoading] = React.useState(false);

    const [tutorList, setTutorList] = React.useState<Array<Array<UserGet>>>([]);
    const [totalList, setTotalList] = React.useState<Array<UserGet>>([]);

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

            let newTutorList = [[]] as Array<Array<UserGet>>;
            let outerIndex = 0;
            let innerIndex = 0;
            for (let i = 0; i < data.length; i++) {
                if (!data[i].fav) {
                    innerIndex--;
                } else {
                    newTutorList[outerIndex].push(data[i])
                }
                if ((innerIndex + 1) % 3 == 0) {
                    newTutorList.push([]);
                    outerIndex++;
                }
                innerIndex++;
            }
            setTotalList(data);
            setTutorList(newTutorList);
        }).finally(() => { setLoading(false); })
    }

    useEffect(() => {
        getList();
      }, []);

    const updateList = (favId: number) => {
        const data = totalList.filter((tutor) => tutor.id != favId);

        let newTutorList = [[]] as Array<Array<UserGet>>;
        let outerIndex = 0;
        let innerIndex = 0;
        for (let i = 0; i < data.length; i++) {
            if (!data[i].fav) {
                innerIndex--;
            } else {
                newTutorList[outerIndex].push(data[i])
            }
            if ((innerIndex + 1) % 3 == 0) {
                newTutorList.push([]);
                outerIndex++;
            }
            innerIndex++;
        }
        setTotalList(data);
        setTutorList(newTutorList);
    }

    return(
      <main className="m-4">
        <div className="grid-flow-col">
            <div className="grid-flow-row">
                <Typography variant="h3"> &nbsp;&nbsp;&nbsp; Favorites</Typography>
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
                                <TutorCard key={tutor.id} tutor={tutor} onHandleFavorite={updateList}/>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
        
      </main>
    )
}

export default Favorites