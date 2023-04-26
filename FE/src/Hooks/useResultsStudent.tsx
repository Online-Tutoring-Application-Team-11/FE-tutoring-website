import { useState, useEffect } from "react";
import APlus from "../API/APlus";
import { useAppSelector } from './stateHooks';

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const currUser = useAppSelector((state) => state.user.value);

    const studentNameAPI : any = async (emailreq : string) => {
      if (emailreq.length > 0) {
        try {
            const response = await APlus.get(`/students/get/${emailreq}`, {})
                .catch(() => useAppSelector((state) => { return {data: state.user.value} }));
            console.log("response: " + JSON.stringify(response.data.fname))
            setResults(response.data)

        } catch (e) {
            setErrorMessage("Something went wrong!");
        }
      }
    };

    const tutorNameAPI : any = async (emailreq : string) => {
      if (emailreq.length > 0) {
        try {
            const response = await APlus.get(`/tutors/get/${emailreq}`, {})
                .catch(() => useAppSelector((state) => { return {data: state.user.value} }));
            setResults(response.data)
        } catch (e) {
            setErrorMessage("Something went wrong!")
        }
      }
    }

    useEffect(() => {
        if (currUser.tutor) {
            tutorNameAPI(currUser.email);
        } else {
            studentNameAPI(currUser.email);
        }
    }, []);
    
    return [studentNameAPI, results, errorMessage];
};