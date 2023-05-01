import { useState, useEffect } from "react";
import APlus from "../API/APlus";
import { useAppSelector } from './stateHooks';
import { getAuthToken } from '../Hooks/useAuthToken';
import axios from 'axios'

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const allTutorsAPI : any = async () => {
        try {
            const response = await APlus.get(`/tutors/get/all`, {})
            // console.log("result from useResultsTutors hook: " + JSON.stringify(response.data));
            setResults(response.data);
        } catch (e) {
            setErrorMessage("Something went wrong!");
        }

        // let config = {
        //   method: 'get',
        //   maxBodyLength: Infinity,
        //   url: process.env.REACT_APP_DB_URL + `/tutors/get/all?${subject}`,
        //   headers: { 
        //     'Content-Type': 'application/json',
        //     'Authorization': `${getAuthToken()}`
        //   }
        };
        
        return [allTutorsAPI, results, errorMessage];

        // axios.request(config).then((response) => response.data);
        // setResults(response.data);
    }

    // useEffect(() => {
    //     if (currUser.tutor) {
    //         tutorNameAPI(currUser.email);
    //     } else {
    //         studentNameAPI(currUser.email);
    //     }
    // }, []);
    
    // return [studentNameAPI, results, errorMessage];
// };