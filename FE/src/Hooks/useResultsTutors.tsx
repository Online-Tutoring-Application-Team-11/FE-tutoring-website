/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import APlus from "../API/APlus";

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
        };
        
        return [allTutorsAPI, results, errorMessage];
    }