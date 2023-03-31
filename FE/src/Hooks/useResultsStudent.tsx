import { useState, useEffect } from "react";
import APlus from "../API/APlus";

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const studentNameAPI:any = async (emailreq: string) => {
        try {
            const response = await APlus.get(`/students/get/${emailreq}`, {});
            console.log("response: " + JSON.stringify(response.data.fname))
            setResults(response.data)

        } catch (e) {
            setErrorMessage("Something went wrong!");
        }
    };

    useEffect(() => {
        studentNameAPI("anirudh.umarji@utdallas.edu");
    }, []);
    
    return [studentNameAPI, results, errorMessage];
};