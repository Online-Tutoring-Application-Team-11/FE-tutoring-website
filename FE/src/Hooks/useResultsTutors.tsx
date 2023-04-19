import { useState, useEffect } from "react";
import APlus from "../API/APlus";

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const allTutorsAPI:any = async () => {
        try {
            const response = await APlus.get(`/tutors/get/all`, {});
            console.log("response of GET ALL TUTORS: " +(response.data))
            setResults(response.data)

        } catch (e) {
            setErrorMessage("Something went wrong!");
        }
    };

    useEffect(() => {
        allTutorsAPI();
    }, []);
    
    return [allTutorsAPI, results, errorMessage];
};